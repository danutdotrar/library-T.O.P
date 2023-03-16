const addBook = document.getElementById("add-book");
const hidden = document.getElementById("hidden");
const container = document.getElementById("container");
const formContainer = document.getElementById("form-container");
const card = document.getElementById("card");

// Modal
const closeModal = document.getElementById("close");
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");

// Select input id's
let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
const smallHidden = document.getElementById("read-hidden");

let myLibrary = [];
let bookIndex;
let content;
let readAnswer;

// Functions
// Constructor Book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${title} by ${author}, ${pages} pages, ${
            read ? "read" : "not read yet"
        }`;
    }
}

// Add book to library
function addBookToLibrary(e) {
    // Prevent form from submitting
    e.preventDefault();
    // Take in the inputs from the form

    myLibrary.push(
        new Book(title.value, author.value, pages.value, readAnswer)
    );

    // Check required fields
    checkRequired([title, author, pages]);

    // Find if read or not
    let readCheckbox = Array.from(document.getElementsByName("read")).find(
        (read) => read.checked
    );

    // Check if read or not
    if (!readCheckbox) {
        smallHidden.classList.remove("hidden");
        return false;
    } else if (readCheckbox.value == "true") {
        readAnswer = true;
        smallHidden.classList.add("hidden");
    } else if (readCheckbox.value == "false") {
        readAnswer = false;
        smallHidden.classList.add("hidden");
    }

    // If the inputs values are null, stop function
    if (title.value == "" || author.value == "" || pages.value == "") {
        return false;
    }

    // Loop array
    for (let i in myLibrary) {
        // Create a card for each book added
        bookIndex = i;
        content = `
        <div class="card" id="card" data-book="${bookIndex}">
        <div class="info library-title">"${title.value}"</div>
        <div class="info library-author">${author.value}</div>
        <div class="info library-pages">${pages.value} pages</div>
        <div class="info library-read">${
            readAnswer ? "Read :)" : "Not read :("
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
            if ([i] == +dataBookValue) {
                // Remove index book from library
                myLibrary.splice(i, 0);

                // Remove card from DOM
                card.remove();
            }
        }
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input);
        } else {
            showSuccess(input);
        }
    });
}

// Show input error message
function showError(input) {
    // takes input parent element
    const formInput = input.parentElement;
    // Add error class to current input form-control
    formInput.className = "form-input error";
}

// Show success outline
function showSuccess(input) {
    const formInput = input.parentElement;
    formInput.className = "form-input success";
}

// Function close modal
function closeModalFunc() {
    modal.classList.add("modal-hidden");
    formContainer.reset();
    resetInputStyles([title, author, pages]);

    smallHidden.classList.add("hidden");
}

// Reset inputs styles
function resetInputStyles(inputArr) {
    inputArr.forEach((input) => {
        const formInput = input.parentElement;
        formInput.classList.remove("error");
        formInput.classList.remove("success");
    });
}

// Event Listeners
addBook.addEventListener("click", addBookToLibrary);
container.addEventListener("click", removeCurrentBook);
openModal.addEventListener("click", () =>
    modal.classList.remove("modal-hidden")
);
closeModal.addEventListener("click", closeModalFunc);
