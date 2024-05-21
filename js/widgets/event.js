
function _events_obj() {
  return USER_DATA.data.events = USER_DATA.data.events || {};
}

function events_set(name, date, { order, largest, units, startDate } = { order: 1, largest: 3, units: "y,mo,w,d" }) {
  const events = _events_obj();

  events[name] = {
    name: name,
    date: date,
    largest: largest,
    units: units,
    order: order,
    startDate: startDate,
  };
}

function events_get(name) {
  return _events_obj()[name];
}
function events_del(name) {
  delete _events_obj()[name];
}

function events_show() {
  return _events_obj();
}

function greeter_event_add(name, order=1, opts={}) {
  if (!events_get(name)) {
    console_err(`Event "${name}" is not found!`);
    return;
  }

  const w = _widget_new("event", order, Object.assign({
    redraw: true,

    _event: name,

    render: "_greeter_event_render",
  }, opts));;

  _widget_add(w);

  return w;
}

function _greeter_event_render(daemon) {
  if (!daemon.$ele) {
    daemon.$ele = $('<greeter><event-name></event-name>: <span></span></greeter>');

    _widget_append_greeter(daemon.$ele);
  }

  const event = events_get(daemon.widget._event);
  const ele = daemon.$ele;

  if (!event) {
    console_err(`Event "${name}" is not found!`);
    return;
  }

  ele.find('event-name').text(event.name);

  let diffText = string_duration_diff(null, event.date, { units: event.units, largest: event.largest });

  if (event.startDate)
    diffText += ` (${string_perc_time_between(moment(event.startDate), moment(event.date))}%)`;

  ele.find('span').text(diffText);
}