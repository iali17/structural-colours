let URL_PREFIX = `http://${window.location.hostname}:8000`;

if (process.env.NODE_ENV === 'production') {
  URL_PREFIX = 'http://' + window.location.hostname;
}

let TABS = Object.freeze(
  {
    "landing":0,
    "main":1,
    "profile":2,
  }
);

let COLOR_BAR_SIZE_1 = 60;
let COLOR_BAR_SIZE_2 = 80;

export {
  URL_PREFIX,
  TABS,
  COLOR_BAR_SIZE_1,
  COLOR_BAR_SIZE_2,
};
