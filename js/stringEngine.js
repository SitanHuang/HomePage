
function string_replace(string, opts={}) {
  const cloned = JSON.parse(JSON.stringify(USER_DATA.data));

  return Sqrl.render(string, Object.assign(cloned, opts));
}

function string_replace_with_daemon(string, daemon, opts = {}) {
  return string_replace(string, Object.assign({
    daemon: daemon,
    widget: daemon.widget,
    state: daemon.state,
  }, opts));
}

function _string_duration_diff(it, date, opts={}) {
  date = date || it.daemon.widget._diff;

  opts = Object.assign({
    units: (opts?.units || "y,mo,w,d").split(","),
    largest: 3,
    round: true,
    delimiter: " "
  }, opts);

  const diff = moment(date).diff(moment().endOf('day'));

  let str = humanizeDuration(diff, opts);

  if (diff)
    str = (diff < 0 ? '+' : '-') + "(" + str + ")";

  return str;
}