const addBook = document.getElementById("add-book");
const hiddenRead = document.getElementById("hidden");
const container = document.getElementById("container");

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

// Testing books
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
const meditations = new Book("Meditations", "Marcus Aurelius", "200", true);

// console.log(theHobbit.info());

// Add book to library
function addBookToLibrary(e) {
    // Prevent form from submitting
    e.preventDefault();
    // Take in the inputs from the form
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read;

    // Find if it is read or not
    let readCheckbox = Array.from(document.getElementsByName("read")).find(
        (read) => read.checked
    );

    // Set the read to true or false based on readCheckbox
    if (readCheckbox) {
        readCheckbox.value == "true" ? (read = true) : (read = false);
        hiddenRead.classList.add("hidden");

        console.log(read);
    } else {
        hiddenRead.classList.remove("hidden");
    }

    myLibrary.push(new Book(title, author, pages, read));

    console.log(myLibrary);

    // Loop array
    for (let i in myLibrary) {
        // Create a card for each book added
        const content = `
        <div class="card">
        <div class="info library-title">${title}</div>
        <div class="info library-author">${author}</div>
        <div class="info library-pages">${pages}</div>
        <div class="info library-read">${read ? "Read :)" : "Not read :("}</div>
    </div>
        `;

        container.innerHTML += content;
        console.log(myLibrary[i].info());
    }
}

// myLibrary.push(theHobbit, meditations);

// Event Listeners
addBook.addEventListener("click", addBookToLibrary);
