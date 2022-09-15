// trả về phần tử xác định

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// lấy dữ liệu và khởi tạo

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});
addNoteButton.addEventListener("click", () => addNote());

// tạo localstorage và đẩy dữ liệu vào

function getNotes() {
  return JSON.parse(localStorage.getItem("Anhtuss-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("Anhtuss-notes", JSON.stringify(notes));
}

// Tạo phần tử html mới/chèn thêm phần tử html

function createNoteElement(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.value = content;
  element.placeholder = "Điền vào chỗ trống";
  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

// set phương thức xóa phần tử

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Bạn muốn xóa chứ?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// set id cho phần tử và đẩy phần tử mới lên web

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

// lưu content

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

// xóa phần tử html đc chỉ định

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

