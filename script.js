const container = document.querySelector("#container");
let myLibrary = [];

function Book (name, author, page) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.id = crypto.randomUUID();
    this.read = false;
}

Book.prototype.toggle = function() {
    this.read = !this.read;
}

function addBookToLibrary(name, author, page) {
    const newBook = new Book(name, author, page);
    myLibrary.push(newBook);
}

function displayLibrary() {
    const library = document.createElement("table");
    for (book of myLibrary) {
        const newRow = document.createElement("tr");
        const newShelf = document.createElement("td");
        newShelf.textContent = book.name;
        newRow.appendChild(newShelf);
        library.appendChild(newRow);

        const status = document.createElement("button");
        status.textContent="Reading";
        newRow.appendChild(status);
        status.addEventListener("click", () => {
            book.toggle();
            if (book.read == true) {
                status.textContent="Finished";
            }
            else {
                status.textContent="Reading";
            }
        })

        const removeBook = document.createElement("button");
        removeBook.textContent="Remove";
        newRow.appendChild(removeBook);

        removeBook.dataset.id=book.id;
        removeBook.addEventListener("click", () => {
            myLibrary = myLibrary.filter(b => b.id != removeBook.dataset.id); container.innerHTML=""; displayLibrary();
        })

        
    }
    container.appendChild(library);
    library.classList.add("book-table");

}


const addBook = document.createElement("button");
addBook.textContent= "Add Book";
document.body.appendChild(addBook);
const dialog = document.querySelector("dialog");
addBook.addEventListener("click", () => {dialog.showModal()});

const submitNewBook = document.querySelector(".Submit");
const cancelNewBook = document.querySelector(".CloseButton")

submitNewBook.addEventListener("click", (e) => {
    e.preventDefault()
    const newTitle = document.querySelector("#title").value;
    const newAuthor= document.querySelector("#author").value;
    const newPages= document.querySelector("#pages").value;

    addBookToLibrary(newTitle, newAuthor, newPages);
    container.innerHTML="";
    displayLibrary();
    dialog.close();

})

cancelNewBook.addEventListener("click", () => {dialog.close()});


addBookToLibrary("The Cruel Prince", "Holly Black", "600");
addBookToLibrary("Once Upon a Broken Heart", "Stephanie Garber", "400");
addBookToLibrary("Poison Ivy", "Willow Wilson", "100");
addBookToLibrary("Catcher in the Rye", "J D Salinger", "300");
addBookToLibrary("Flowers for Algernon", "Daniel Keyes", "300");

displayLibrary();



