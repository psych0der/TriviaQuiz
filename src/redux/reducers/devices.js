// @flow

import * as Constants from '../../commons/constants';
export const FETCH_COMPLETE_DATA_START = 'BULBDATA/FETCH_COMPLETE_DATA_START';
export const FETCH_COMPLETE_DATA_SUCCESS =
  'BULBDATA/FETCH_COMPLETE_DATA_SUCCESS';
export const FETCH_COMPLETE_DATA_FAILED = 'BULBDATA/FETCH_COMPLETE_DATA_FAILED';

export const MODIFY_BULB_BRIGHTNESS = 'BULBDATA/MODIFY_BULB_BRIGHTNESS';
export const MODIFY_BULB_NAME = 'BULBDATA/MODIFY_BULB_NAME';
/* Buld data is broken down into data hash and data order to speedup data edits.
  Radial slider invokes lot of changes, so edits needs to be performant
 */
type State = {
  +dataHash: null | {
    +id: string,
    +name: string,
    +activity: boolean,
    +brightness: number,
  },
  +dataOrder: null | Array,
  +fetchCompleteDataState: string,
  +fetchCompleteDataError: any,
};

const initialState: State = {
  completeData: null,
  fetchCompleteDataState: Constants.IDLE,
  fetchCompleteDataError: null,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_COMPLETE_DATA_START:
      return {
        ...state,
        fetchCompleteDataState: Constants.IN_PROGRESS,
      };

    case FETCH_COMPLETE_DATA_SUCCESS:
      return Object.assign({}, state, {
        dataHash: action.result,
        dataOrder: Object.keys(action.result),
        fetchCompleteDataState: Constants.SUCCESS,
      });

    case FETCH_COMPLETE_DATA_FAILED:
      return {
        ...state,
        fetchCompleteDataState: Constants.FAILED,
        completeData: null,
        fetchCompleteDataError: action.error.toString(),
      };

    case MODIFY_BULB_BRIGHTNESS:
      // Modify bulb brightness
      // Turn off the bulb if brightness is 0
      let active = true;
      if (action.brightness === 0) {
        active = false;
      }
      return Object.assign({}, state, {
        dataHash: {
          ...state.dataHash,
          [action.id]: {
            ...state.dataHash[action.id],
            active,
            brightness: action.brightness,
          },
        },
      });

    case MODIFY_BULB_NAME:
      // Modify bulb name

      return Object.assign({}, state, {
        dataHash: {
          ...state.dataHash,
          [action.id]: {
            ...state.dataHash[action.id],
            name: action.name,
          },
        },
      });

    default:
      return state;
  }
};

// fetch complete data from server
export const fetchCompleteData = () => (dispatch: Dispatch) => {
  dispatch({
    types: [
      FETCH_COMPLETE_DATA_START,
      FETCH_COMPLETE_DATA_SUCCESS,
      FETCH_COMPLETE_DATA_FAILED,
    ],
    promise: () => {
      return fetch(
        `http://${process.env.REACT_APP_API_HOST}:${
          process.env.REACT_APP_API_PORT
        }/api/v1/device`
      )
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error(
            'Network response was not ok.: ' + response.statusText
          );
        })
        .then(function(jsonResult) {
          // process data
          // set brightness to 0 of turned off devices
          let data = jsonResult.data;
          let dataHash = {};
          data.forEach(bulb => {
            if (!bulb.active) {
              bulb.brightness = 0;
            }
            dataHash[bulb.id] = bulb;
          });
          return dataHash;
        });
    },
  });
};

/**
 * This method pushes the bulb data changes to server
 * This method optimistically updates the data on server
 * and doesn't track the result
 * @param {number} bulbId
 * @param {Object} data
 */
const pushBulbDataChange = (bulbId: number, data: Object) => {
  return fetch(
    `http://${process.env.REACT_APP_API_HOST}:${
      process.env.REACT_APP_API_PORT
    }/api/v1/device/${bulbId}`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ data }),
    }
  ).catch(e => console.error(e));
};

/**
 * Set bulb brightness value of particular bulb
 * @param {number} id
 * @param {number} brightness
 */
export const setBrightness = (id: number, brightness: number) => (
  dispatch: Dispatch
) => {
  // update changes on server
  pushBulbDataChange(id, { brightness, active: brightness > 0 ? true : false });
  dispatch({
    type: MODIFY_BULB_BRIGHTNESS,
    id,
    brightness,
  });
};

export const setBulbName = (id: number, name: string) => (
  dispatch: Dispatch
) => {
  // update changes on server
  pushBulbDataChange(id, { name });
  dispatch({
    type: MODIFY_BULB_NAME,
    id,
    name,
  });
};
