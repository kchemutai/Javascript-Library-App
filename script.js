let cards = document.querySelector('.card-body') 
let addNewBook = document.querySelector('#addNewBook')
const submitBtn = document.querySelector('#submitBtn')
const deleteBtn = document.querySelector('.delete')
const cardBody = document.querySelector('.card-body')

//deleteBtn.addEventListener('click',deleteBook())
addNewBook.addEventListener('click',()=>{
    document.querySelector('#myForm').style.display = "inline"; 
})


//check what is clicked in the card holders
cardBody.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        deleteBook(e.target)
    }
    else if(e.target.classList.contains('update')){
        updateBook(e.target)
    }
})

submitBtn.addEventListener('click', addBook)

let myLibrary = []
function Book(title,author,pages,read){
    this.title =title,
    this.author=author,
    this.pages = pages,
    this.read=read,
    this.info = ()=>{
       return `The ${this.title} by ${this.author}, ${this.pages} pages, this Book is ${this.read}`
    }
}

function addBookToLibrary(Book){
    myLibrary.push(Book)
    saveBookToLocalStorage()
}

//get books from local storage and parse them
function getBooks(){
    let bookList = localStorage.getItem('myLibrary')
    myLibrary=JSON.parse(bookList)
    if(!myLibrary){
        myLibrary = []
    }
    return myLibrary
}

//save Book to local storage
function saveBookToLocalStorage(book){
    const bookList = getBooks()
    bookList.push(book)
    let books = JSON.stringify(bookList)
    localStorage.setItem('myLibrary',books)
    render()
}


function addBook(){
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('#read').checked;
    let myBook = new Book(title,author,pages,read)
    if(title ==="" || author ==="" || pages ==="")
    {
        showAlert('Please fill in all fields','info')
    }
    else{
        saveBookToLocalStorage(myBook)
        showAlert('Book successfully Saved', 'success')
    }
}

function render()
{
    getBooks()
    myLibrary.forEach((Book, index)=>{
        cards.innerHTML +=
        `<blockquote class="blockquote mb-0" data-indx=${index}>
            <div class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-header h4">${Book.title}</div>
                <div class="card-body text-primary">
                  <h5 class="card-title">Author:  ${Book.author}</h5>
                  <h5 class="card-title">Pages:  ${Book.pages}</h5>
                  <h5 class="card-title">Read:  ${Book.read}</h5>
                  <button type="button" class="btn btn-primary mr-4 update">Update</button>
                  <button type="button" class="btn btn-danger ml-4 delete">Delete</button>
                </div>
              </div>
        </blockquote>`
    })
}

render()

//delete from local storage
function deleteFromLocalStorage(index){
    let booksArray = getBooks();
    console.log(booksArray)
    booksArray.splice(index,1)
    console.log(booksArray)
    localStorage.setItem('myLibrary',JSON.stringify(booksArray))
    showAlert('Delete successful', 'success')
    console.log(getBooks())
}

//keeps track of all alerts
function showAlert(text, className){
    //format <div class='alert alert-<classname>'>text</div>
    // create a div and add classes and create the text as txt and append to the div
    const div = document.createElement('div')
    div.className = `alert alert-${className}`;
    let txt = document.createTextNode(text)
    div.appendChild(txt)

    //place it before the div that contains the form #myForm

    let myFormContainer = document.querySelector('#myForm')
    let card = document.querySelector('.card');
    card.insertBefore(div, myFormContainer)  

    //remove the alert after 3 seonds
    let alert = document.querySelector('.alert')
    setTimeout(()=>alert.remove(),3000);
}
function deleteBook(book){
    //delete from UI
    book.parentElement.parentElement.parentElement.remove()
    //delete from local storage
    const bookIndex = parseInt(book.parentElement.parentElement.parentElement.dataset.indx)
    deleteFromLocalStorage(bookIndex)
}

function updateBook(book){
    let books = getBooks()
    const bookIndex = book.parentElement.parentElement.parentElement.dataset.indx
    let bookToUpdate = books[bookIndex]
    openForm()
    let title = document.querySelector('#title').value = bookToUpdate.title
    let author = document.querySelector('#author').value = bookToUpdate.author
    let pages = document.querySelector('#pages').value = bookToUpdate.pages
    let read = document.querySelector('#read').checked;

    let newTitle = document.querySelector('#title').value
    let newAuthor = document.querySelector('#author').value
    let newPages = document.querySelector('#pages').value 
    books[bookIndex] = new Book(newTitle,newAuthor, newPages,read)
    console.log(books)
    showAlert('Update successful', 'success')
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

