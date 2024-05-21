const embedConsole = new EmbedConsole('console', {
  autocomplete: (val) => {
    const list = _console_commands_list();

    // Filter the list of commands to those that start with the current input
    const matches = list.filter(command => command.startsWith(val));

    if (matches.length === 0)
      return null;
    if (matches.length === 1) {
      console_msg({ output: matches[0], klass: 'log-event' });
      return matches[0].replace(/^([^\(]+\().*$/, '$1');
    }

    console_msg(matches.join("\n"));

    // Find the longest common prefix of the matched commands
    let commonPrefix = val;
    while (true) {
      const nextChar = matches[0][commonPrefix.length];
      if (nextChar && matches.every(command => command.startsWith(commonPrefix + nextChar)))
        commonPrefix += nextChar;
      else
        break;
    }

    return commonPrefix;
  },
});

function _console_commands_list() {
  return Object.values(window)
    .filter(x => typeof x == 'function' && x.name.match(/^[a-z]+(_[a-z]+)+$/))
    .map(x => x.toString().split(/[\n\r]/)[0].replace(/(^function )|({\s*$)/g, ''));
}

function help() {
  const text = _console_commands_list().join("\n");

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

function console_err(obj) {
  if (!obj?.output) {
    obj = {
      output: typeof obj == "string" ? string_replace(obj) : obj,
      javascript: false,
      klass: 'log-error',
    };
  }


  embedConsole.add(obj);
}