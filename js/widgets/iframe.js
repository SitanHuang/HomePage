
function card_iframe_add(url, order = 1, opts = {}) {
  let w = card_iframe_new(url, order, opts);

  _widget_add(w);

  return w;
}

function card_iframe_new(url, order, opts = {}) {
  const widget = _widget_new("iframe", order, Object.assign({
    redraw: false,

    _url: url,

    render: "_iframe_render",
  }, opts));

  return widget;
}

function _iframe_render(daemon) {
  if (!daemon.$ele) {
    daemon.$ele = $('<div class="card iframe"><iframe loading="lazy"></iframe></div>');

    _widget_append_card(daemon.$ele);
  }

  const ele = daemon.$ele;

  ele.find('iframe').attr('src', daemon.widget._url);
}