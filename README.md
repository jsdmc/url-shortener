# url-shortener
URL shortener example.
Built using React, Redux, Redux-Saga.

Test specs written using mocha, enzyme and running through webpack, so all webpack features available (aliases, style loaders, etc.)

- npm install
- npm start

Run tests in browser
- npm run test:webpack-dev-server
and then
- npm run test:browser


Run tests in console (currenly broken, because of using clipboard, needed mocks for jsdom)
- npm test

Prepare build for deploy (output in ./dist folder)
- npm run build

