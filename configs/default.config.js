// load configs/*.config.js in index.html for personal customization

if (!localStorage.startpageDat) {
  greeter_string_add("Hey, {{ it.name }}!");
  greeter_string_add("This is the default config editable in configs/default.config.js.");

  dat_save();
}