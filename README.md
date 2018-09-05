# TriviaQuiz

Simple React/Redux quiz game to demonstrate best development practices. This game displays set of questions which are to be answered in true or false
and presents score thereafter itself.

View Storybook [here](https://psych0der.github.io/TriviaQuiz/)

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
> since it provides simple and battle-tested boilerplate with many goodies built in. However, this is an ejected version
> as I wanted some features not available by default

## Highlights

- CSS modules :boom:
- Flow integration :star:
- Jest and Enzyme :star2:
- Storybook support :dash:
- Redux :blue_book:
- React router :swimmer:
- Redux persist :bookmark:
- Hygen support :running:
- Pretty commits using Husky :tada:
- Prettier and eslint support :ok_hand:

## Table of contents

- [TriviaQuiz](#triviaquiz)
  - [Highlights](#highlights)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Modifications done on create-react-app boilerplate](#modifications-done-on-create-react-app-boilerplate)
    - [Environment variables](#environment-variables)
    - [Redux](#redux)
    - [Using Redux DevTools](#using-redux-devtools)
    - [Fetch](#fetch)
    - [Storybook](#storybook)
  - [Project structure](#project-structure)
  - [Application source code](#application-source-code)
  - [Configs](#configs)

---

## [Usage](#usage)

**This project uses node version 8. It is advisable to use [nvm](https://github.com/creationix/nvm). Project root contains `.nvmrc` file.**

> This project requires an API for questions. URL of a working API has been provided in `.env.sample` file.

- Copy requirement file from .env.sample `cp .env.sample .env`
- Install dependencies: `yarn install`
- Start development server: `yarn run start`
- Create a production build: `yarn run build`
- Run Test cases: `yarn run test`
- Start Storybook development server: `yarn run storybook`
- Build Storybook: `yarn run build-storybook`

---

## [Modifications done on create-react-app boilerplate](#modifications)

- Added support for CSS-modules. This avoids the major headache of maintaining distinct class names across all the components
  - This decision allows other developers to switch to CSS if they like and the code will look same
- Separate configuration for global css from node_modules which disables css-modules for these files
- Added [storybook](https://storybook.js.org/) for making UI testing and showcase a breeze
- Add [Flow](https://flow.org/) type checking. This allows writing code more confidently.
- Add [Prettier](https://github.com/prettier/prettier) code formatting. I am using VSCode and there's an excellent plugin for prettier that formats code on save
- I have also added a git pre-commit hook using [Husky](https://github.com/typicode/husky) that formats the code before committing it. So that you don't have to use VSCode to get automatic code formatting ;)
- I have added [Redux](https://redux.js.org/) for simple state management. This will also help in standardizing error handling for remote calls. I'll explain this another section.
- Use [React router](https://github.com/ReactTraining/react-router) for declarative routing. Although, we have a single page right now. But why not use a standardized way of creating route paths?
- I added [redux persist](https://github.com/rt2zz/redux-persist) for persisting redux state in localstroage. This allows game to resume from last point on browser restarts aswell.
- I have integrated [Hygen](http://www.hygen.io/) which helps in automating mundane task of creating predefined set of files for each component/container. This tool also makes it convenient to enfore standards such as test and storybook files.

---

### [Environment variables](#environment-variables)

This project uses environment variables for configurations like HTTP endpoint of the questions API. This allows the code to be decoupled from the configuration and configurables to be frozen at build time.
At the build time, this project looks for the .env file in the project root directory. This setup was done by create-react-app automatically while setting up this project. [Look here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables) for more info.
This project contains _.env.sample_ file to describe environment variables required by project. **Don't add any confidential values in this sample file. Original .env file is not checked in git for security reasons.**

> Create a .env file by copying it from .env.sample before running this project [`cp .env.sample .env`]

---

### [Redux](#redux)

I have used REDUX for state management. This allows for a single source of truth about application state. As there is scope for functionality addition which will require the state to be maintained at the application level, this is good to have added in this project.
Specifically, I have added REDUX for having a central and out of the box support for error handling of network requests. As all network requests have 3 states, namely in-progress, success, and failed, having a REDUX middleware at the application level that will handle all network calls allows to write error handling logic only once and the listen for different states to update UI.
Whenever a remote call is made, it has to be done through REDUX action creators, which will dispatch the relevant actions on a state change of network call.

### [Using Redux DevTools](#using-dev-tools)

[Redux Devtools](https://github.com/gaearon/redux-devtools) is enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

DevTools are not enabled during production.

### [Fetch](#fetch)

I have used new [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API for network calls in this project instead of AJAX. Since Fetch is a relatively newer API, it is not supported on older browsers.
To overcome this limitation a [polyfill](https://www.npmjs.com/package/whatwg-fetch) for Fetch has been used. This just wraps older XMLHttp method in Promise and exposes interface similar to native Fetch.
Please note that this does not simplify or modify the interface that of native Fetch. It just adds support for older browsers.

---

### [Storybook](#storybook)

[Storybook](https://github.com/storybooks/storybook) is a UI development and testing library. I have integrated storybook as this will provide required support
for developing new UI components. To run storybook, type this command -> `yarn run storybook`, and it will run a development server
for the storybook. For more options visit the link mentioned above.

The storybook configuration will load files with extension `.stories.js` inside the src directory.

---

## [Project structure](#project-structure)

```
TriviaQuiz
├── _templates
│   ├── dumb
│   └── enhanced
│   └── smart
├── .storybook
│   ├── config.js
│   └── webpack.config.js
├── config
│   ├── env.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── components
│   ├── containers
│   │   ├── App
│   │   │   ├── App.test.js
│   │   │   └── index.js
│   │   ├── Home
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── index.scss
│   │   └── index.js
│   ├── redux
│   │   ├── middlewares
│   │   │   └── augmentorMiddleware.js
│   │   ├── reducers
│   │   │   ├── index.js
│   │   │   └── sample.js
│   │   └── store.js
│   ├── index.css
│   ├── index.js
│   ├── index.scss
│   └── registerServiceWorker.js
├── .eslintrc
├── .flowconfig
├── .gitignore
├── .nvmrc
├── .prettierrc
├── README.md
├── package.json
└── yarn.lock
```

## [Application source code](#aps)

- All of the application source resides inside `src` directory.
- All Redux related code is inside `src/redux`
  - Reducers should reside in `src/redux/reducers`
- Containers/Stateful components should have a directory inside `src/containers`. Expose the default container using index.js file inside the folder
- Dumb/fully controlled components should have a directory inside `src/components/`
- All the static assets used by components/containers should be contained inside their respective directories. This is done to isolate their assets and dependencies
- Each component/container should contain their .story.js and .test.js files inside their directories

## [Configs](#configs)

ALl webpack related configs, and polyfills reside inside `config` directory

---
