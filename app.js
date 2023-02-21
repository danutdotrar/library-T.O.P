let myLibrary = [];

// Functions
// Constructor Book
function Book(title, author, pages, read = true) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${
            read ? "read" : "not read yet"
        }`;
    };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);

// console.log(theHobbit.info());

// Add book to library
function addBookToLibrary() {
    myLibrary.push(new Book());
}

myLibrary.push(theHobbit);

// Loop array
for (const index in myLibrary) {
    console.log(myLibrary[index].info());
}
