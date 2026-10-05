const fs = require('fs');
const path = require('path');

const jsPath = path.resolve('frontend/public/assets/sales-dashboard.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');

// Basic mock
const elements = {};
function createMockEl(tag, id = '') {
  return {
    tagName: tag.toUpperCase(),
    id: id,
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    innerHTML: '',
    textContent: '',
    appendChild: (c) => c,
    contains: () => true,
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    closest: () => null
  };
}

global.document = {
  getElementById: (id) => elements[id] || (elements[id] = createMockEl('div', id)),
  createElement: (tag) => createMockEl(tag),
  body: createMockEl('body'),
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {},
  removeEventListener: () => {},
  readyState: 'complete'
};
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  location: { hash: '#sales-funnel', pathname: '/', search: '' },
  history: { pushState: () => {} }
};
global.location = global.window.location;
global.history = global.window.history;

try {
  eval(jsCode);
  console.log('SUCCESS: Evaluated sales-dashboard.js cleanly without syntax or top-level errors.');
} catch (e) {
  console.error('ERROR in eval:', e);
  process.exit(1);
}
