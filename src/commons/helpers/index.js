// @flow

/**
 * Geometry helper for converting polar coordinates to cartesian ones
 * @param {Number} offX additional x
 * @param {Number} offY additional y
 * @param {Number} radius
 * @param {Number} degrees Polar angle
 */
export const polarToCartesian = (
  offX: number,
  offY: number,
  radius: number,
  degrees: number
): { x: number, y: number } => {
  // conversion to radian as polar conversion is conveniently expressed in radians
  //  subtraction of 90 is important as y axis increases downwards in browsers
  const radians = (degrees * Math.PI) / 180.0;
  return {
    x: offX + radius * Math.cos(radians),
    y: offY + radius * Math.sin(radians),
  };
};

/**
 * Calculates angle difference between a pair of cartesian coordinates
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
export const calcAngleDiff = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return (Math.atan2(x1 * y2 - y1 * x2, x1 * x2 + y1 * y2) * 180) / Math.PI;
};

/**
 * Creates an Arc using SVG arc function
 * @param {Number} centerX center of the circle
 * @param {Number} centerY center of the circle
 * @param {Number} radius radius of the circle
 * @param {Number} startAngle angle from the center of the circle  of starting point of the arc
 * @param {Number} endAngle angle from the center of the circle  of ending point of the arc
 */

/**
 * Make angles sane again
 */
export const normalizeAngle = (angle: number) => {
  if (angle > 360) {
    return angle - 360;
  } else if (angle < 0) {
    return 360 + angle;
  }
  return angle;
};
export const createCircularArc = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  useLargerArc: number | null = null,
  arcSweep: number = 1
) => {
  // this is because we want to draw from endpoint to counter clockwise
  let start = polarToCartesian(centerX, centerY, radius, endAngle);
  let end = polarToCartesian(centerX, centerY, radius, startAngle);

  // we want to use larger arc if the difference between the starting and ending point is > 180
  const angleDiff = normalizeAngle(endAngle - startAngle);
  useLargerArc =
    useLargerArc != null
      ? useLargerArc
      : (angleDiff > -180 && angleDiff) < 0 ||
        (angleDiff >= 180 && angleDiff < 360)
        ? 0
        : 1;

  return `M ${start.x} ${
    start.y
  } A ${radius} ${radius} 0 ${useLargerArc} ${arcSweep} ${end.x} ${end.y}`;
};

/**
 * Formats date into a specific text:
 * For eg: Monday 18 June, 2018
 * @param {Date} date
 */
export const getFormatedDate = (date: Date): string => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getMonthName = (date: Date): string => {
    return months[date.getMonth()];
  };
  const getDayName = (date: Date): string => {
    return days[date.getDay()];
  };

  return `${getDayName(date)} ${date.getDate()} ${getMonthName(
    date
  )}, ${date.getFullYear()}`;
};

/**
 * Formats current date into 12 hours format time
 * @param {Date} date
 */
export const formatAMPM = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
};
