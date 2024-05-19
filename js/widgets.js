const _main_con = $('.main-con');

const __widget_scope = this;

let __widget_redraw_interval;

let RUNNING_WIDGETS = [];

function _widget_daemonize(widgetObj, state={}) {
  const daemon = {
    widget: widgetObj,
    state: state,
    $ele: null,
  };

  RUNNING_WIDGETS.push(daemon);

  return daemon;
}

function _widget_new(widget, order, opts={}) {
  return Object.assign({
    uuid: Math.random().toString().slice(2, 8),

    state: {},

    widget: widget,

    redraw: false,
    order: order,
  }), opts;
}

function _widget_add(widget) {
  USER_DATA.widgets.push(widget);
  widget_reload();
}

function widget_reload() {
  // remove all widgets
  RUNNING_WIDGETS = [];

  clearInterval(__widget_redraw_interval);

  _main_con.find('.controlled').remove();

  // add all widgets
  const sortedWidgets = [...USER_DATA.widgets].sort((a, b) => a.order - b.order);

  for (const widget of sortedWidgets) {
    let daemon = _widget_daemonize(widget, widget.state || {});

    __widget_scope[widget.render](daemon);

    daemon.$ele?.addClass('controlled');
  }

  // start redraw intervals
  __widget_redraw_interval = setInterval(function () {
    widget_redraw();
  }, 200);
}

function widget_redraw() {
  for (let daemon of RUNNING_WIDGETS) {
    if (daemon.widget.redraw)
      __widget_scope[daemon.widget.render](daemon);
  }
}

function _widget_append_greeter($ele) {
  _main_con.find('.greeters').append($ele);
}