
function greeter_string_new(string, order=1, opts={}) {
  return _string_new_internal("greeter", string, order, opts);
}

function greeter_string_add(string, order=1, opts={}) {
  let w = greeter_string_new(string, order, opts);

  _widget_add(w);

  return w;
}

function _string_new_internal(type, string, order, opts={}) {
  const widget = _widget_new("string", order, Object.assign({
    redraw: true,

    _type: type,
    _string: string,

    render: "_string_render",
  }, opts));

  return widget;
}

function _string_render(daemon) {
  if (!daemon.$ele) {
    daemon.$ele = $('<greeter></greeter>');

    _widget_append_greeter(daemon.$ele);
  }

  const ele = daemon.$ele;

  ele.html(string_replace_with_daemon(daemon.widget._string, daemon).trim());
}