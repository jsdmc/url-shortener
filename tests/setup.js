var jsdom = require('jsdom').jsdom;
var storageMock = require('./mocks/storageMock');

global.document = jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.Element = global.window.Element;
global.HTMLElement = global.window.HTMLElement;

global.window.sessionStorage = storageMock();
