const _Promise = Promise;
const DEFAULT_TIMEOUT = 30000;
const TimeoutPromise = (construct, timeout) => {
  const stacktrace = new Error().stack.split('\n');

  return new _Promise((resolve, reject) => {
    construct(resolve, reject);
    setTimeout(() => reject({err: new Error('timeout error'), stacktrace}), timeout || DEFAULT_TIMEOUT);
  });
};

// TODO implement/wrap Promise.all

// TODO monkey patch ES6 promise
// (function load() {
//   if (!window.Promise) {
//     return setTimeout(load, 0);
//   }
//   window.Promise = TimeoutPromise;
//   console.log(`window.Promise shimmed to TimeoutPromise(fn(resolve, reject), timeout=${DEFAULT_TIMEOUT})`); // eslint-disable-line no-console
// })();

export default TimeoutPromise;
