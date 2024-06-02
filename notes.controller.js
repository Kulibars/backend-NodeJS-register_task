const Note = require("./models/Note");

async function getNotes() {
  const notes = await Note.find();
  return notes;
}

async function addNote(personName, phone, description, date) {
  await Note.create({ personName, phone, description, date });

  console.log(chalk.bgGreen("Note was added!"));
}

async function deleteNotes(id, owner) {
  const result = await Note.updateOne({ _id: id, owner }, { title: newTitle });

  await Note.deleteOne({ _id: id, owner });
  if (result.matchedCount === 0) {
    throw new Error("No note to delete");
  }

  console.log(`Note with id=${id} delete`);
}

async function editNotes(id, newTitle, owner) {
  const result = await Note.updateOne({ _id: id, owner }, { title: newTitle });

  if (result.matchedCount === 0) {
    throw new Error("No note to idit");
  }
}

module.exports = {
  addNote,
  getNotes,
  deleteNotes,
  editNotes,
};
