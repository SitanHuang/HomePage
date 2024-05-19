const embedConsole = new EmbedConsole('console');

function help() {
  const text = Object.values(window)
    .filter(x => typeof x == 'function' && x.name.match(/^[a-z]+(_[a-z]+)+$/))
    .map(x => x.toString().replace(/(^function )|( {.*$)/gs, ''))
    .join("\n");

  console_msg({
    output: text,
    javascript: false,
    outputClass: 'javascript'
  });
}

// todo: output help

function console_msg(obj) {
  if (!obj?.output) {
    obj = {
      output: typeof obj == "string" ? string_replace(obj) : obj,
      javascript: false,
      // klass: 'log-event',
    };
  }


  embedConsole.add(obj);
}