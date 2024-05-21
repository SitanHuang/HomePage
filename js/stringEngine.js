
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

function string_duration_diff(it, date, opts={}) {
  date = date || it.daemon.widget._diff;

  opts = Object.assign({
    largest: 3,
    round: true,
    delimiter: " "
  }, opts);

  opts.units = (opts?.units || "y,mo,w,d").split(",");

  const diff = moment(date).diff(moment().endOf('day'));

  let str = humanizeDuration(diff, opts);

  if (diff)
    str = (diff < 0 ? '+' : '-') + "(" + str + ")";

  return str;
}

function string_perc_time_between(start, end) {
  // const start = moment(startTime, 'HH:mm:ss');
  // const end = moment(endTime, 'HH:mm:ss');

  // Get current time
  const now = moment();

  if (now.isBefore(start))
    return 0;

  const totalDuration = end.diff(start);
  const elapsedDuration = now.diff(start);

  return Math.round((elapsedDuration / totalDuration) * 1000) / 10;
}