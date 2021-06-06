const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  console.log("Adding Notes...");
  const notes = loadNotes();
  const duplicatesNotes = notes.find((note) => note.title === title);
  if (!duplicatesNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen.black("Succes! Note Added"));
  } else {
    console.log(chalk.bgRed("Failed! title taken"));
  }
};
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
const removeNotes = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  saveNotes(newNotes);
  if (newNotes.length !== notes.length)
    console.log(chalk.bgGreen.black("Success Note Removed"));
  else console.log(chalk.bgRed.black("No Note found!"));
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgGreen.black("Listing Your Notes"));
  for (let i = 0; i < notes.length; i++) {
    console.log(chalk.magenta(`${i + 1} ${notes[i].title}`));
  }
};
const readNotes = (title) => {
  const notes = loadNotes();
  const getNotes = notes.filter((note) => note.title === title);
  if (getNotes.length > 0) {
    console.log("Title:-   " + chalk.inverse(title));
    console.log("Body:-    " + chalk.green(getNotes[0].body));
  } else {
    console.log(chalk.bgRed.black("No Note found"));
  }
};
const about = () => {
  const fiveTab = "         ";
  console.log(
    chalk.bgGreen.black(
      fiveTab + "This is a Terminal Note Taking application" + fiveTab
    )
  );
  console.log(
    chalk.bgRed.black(
      fiveTab + "What can we do with this?" + fiveTab + fiveTab + "        \n"
    )
  );
  console.log(
    chalk.green("1. Add Notes using ") +
      chalk.magenta("node app.js add --title={title} --body={body}\n")
  );
  console.log(
    chalk.green("2. Read Notes using ") +
      chalk.magenta("node app.js read --title={title}\n")
  );
  console.log(
    chalk.green("3. List all Your Notes using ") +
      chalk.magenta("node app.js list\n")
  );
  console.log(
    chalk.green("4. Remove an Existing Notes using ") +
      chalk.magenta("node app.js remove --title={title}\n")
  );
};
module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
  about: about,
};
