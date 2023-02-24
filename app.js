const addBook = document.getElementById("add-book");
const hiddenRead = document.getElementById("hidden");
const container = document.getElementById("container");
const formContainer = document.getElementById("form-container");
const card = document.getElementById("card");
const closeModal = document.getElementById("close");
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");

let myLibrary = [];
let bookIndex;
let content;
let read;

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

// Add book to library
function addBookToLibrary(e) {
    // Prevent form from submitting
    e.preventDefault();
    // Take in the inputs from the form
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;

    // Find if it is read or not
    let readCheckbox = Array.from(document.getElementsByName("read")).find(
        (read) => read.checked
    );

    // Set the read to true or false based on readCheckbox
    if (readCheckbox) {
        readCheckbox.value == "true" ? (read = true) : (read = false);

        hiddenRead.classList.add("hidden");
    } else {
        hiddenRead.classList.remove("hidden");
    }

    myLibrary.push(new Book(title, author, pages, read));

    // Loop array
    for (let i in myLibrary) {
        // Create a card for each book added
        bookIndex = i;
        content = `
        <div class="card" id="card" data-book="${bookIndex}">
            <div class="info library-title">${title}</div>
            <div class="info library-author">${author}</div>
            <div class="info library-pages">${pages}</div>
            <div class="info library-read">${
                read ? "Read :)" : "Not read :("
            }</div>
            <button class="remove" id="remove">Remove book</button>
        </div>
        `;
    }
    // Add content to container
    container.insertAdjacentHTML("beforeend", content);
    formContainer.reset();

    // Close the modal
    closeModalFunc();
}

// Remove current book from the array and DOM
// Use event delegation - add event listener to the parent element
function removeCurrentBook(event) {
    // If the target element is the div that we want, execute
    if (event.target.matches(".remove")) {
        // Select the book card, use 'closest' to select the closest ancestor element with the class 'card', which will be the specific card that was clicked.
        const card = event.target.closest(".card");
        // Get data-book value
        const dataBookValue = card.dataset.book;

        // Find the current book index
        for (let i = 0; i < myLibrary.length; i++) {
            if ([i] == dataBookValue) {
                // Remove index book from library
                myLibrary.splice(i, 1);

                // Remove card from DOM
                card.remove();
            }
        }
    }
}

// Function close modal
function closeModalFunc() {
    modal.classList.add("hidden");
}

// Event Listeners
addBook.addEventListener("click", addBookToLibrary);
container.addEventListener("click", removeCurrentBook);
openModal.addEventListener("click", () => modal.classList.remove("hidden"));
closeModal.addEventListener("click", closeModalFunc);
