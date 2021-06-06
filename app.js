const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");
// Add
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
// Read
yargs.command({
  command: "read",
  describe: "Read a Existing Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.readNotes(argv.title);
  },
});
//List
yargs.command({
  command: "list",
  describe: "List all the notes",
  handler: function () {
    notes.listNotes();
  },
});
//Remove
yargs.command({
  command: "remove",
  describe: "remove a Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});
yargs.command({
  command: "about",
  describe: "List all the notes",
  handler: function () {
    notes.about();
  },
});
yargs.parse();
