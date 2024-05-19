let USER_DATA;

function dat_load() {
  USER_DATA = JSON.parse(localStorage.startpageDat || "{}");

  USER_DATA = Object.assign({
    widgets: [], // [ { widgetObj }, ... ]

    data: {
      name: "User",
    }
  }, USER_DATA);
}

function dat_save() {
  localStorage.startpageDat = JSON.stringify(USER_DATA || {});
}

function dat_clear() {
  delete localStorage.startpageDat;
  dat_load();
}

function dat_reload() {
  dat_clear();
  location.reload();
}