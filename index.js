const express = require('express'); //express in imported to carryout api interface
const app = express(); //app instance is created
app.use(express.json()); // for parsing application/json


//Book class is created
class Book {
    constructor(title, author, ISBN) {
        // Initializing attributes
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
    displayInfo() {
        // Displaying book information
        return `Title of the book is ${this.title}, Author is ${this.author} and ISBN is ${this.ISBN}`;
    }
}

//EBook class is created and attributes and methods are inherited from Book class
class EBook extends Book {
    constructor(title, author, ISBN, fileFormat) {
        super(title, author, ISBN); //super() is used to transfer mentioned attributes to super class i.e. Book class
        // Initialize fileFormat
        this.fileFormat = fileFormat; // additional attribute
    }
    displayInfo() {
        // Overrided to display eBook information
        return `Title of the book is ${this.title}, Author is ${this.author}, ISBN is ${this.ISBN} and File format is ${this.fileFormat}`;
    }
}

// Library class is created
class Library {
    constructor() {
        this.books = []; // library is initiated with empty array
    }
    addBook(book) {
        // Add book to library
        this.books.push({...book})
        
    }
    displayBooks() {
        // Display all books in library
        const list = this.books
        return list  //returning all books in library
    }
    searchByTitle(title) {
        // Search books by title
        const list = this.books
        let data = "No such book is present in library";
        for (let i of list){
        if(i.title ===title){
            data = `${title} book is present in library`
            break;
        }
    }
    return data // returns statement informining presence or absence of book by searching using title of book
    }
    deleteBook(title){
        //Delete book by title
        let list = this.books
        let list_a = []
        for(let i of list){
            if(i.title!=title){
                list_a.push(i)
            }
        } 
        this.books = list_a
        return this.books //  //returning all books in library after deleting specific titled book
    }
}

class LibraryList{
    constructor(){
        this.librarylist = [] //Libraries list is initialised with empty array
    }
    addLibrary(libraryname) {
        // Add library to librarylist
        this.librarylist.push(libraryname)
    }
    displayLibraries() {
        // Display all libaries
        const list = this.librarylist
        return list  //returning all libraries in library List
    }
    deleteLibrary(libraryname){
        //Delete library from libraryList
        let list = this.librarylist
        let list_a = []
        for(let i of list){
            if(i != libraryname){
                list_a.push(i)
            }
        } 
        this.librarylist = list_a
        return this.librarylist //returning all libraries in library List after removing specific library
         
    }
}

const hyderabadlibrary = new Library()      // library instance is created 
const libraries = new LibraryList()         // libraries list is created 
libraries.addLibrary("hyderabadlibrary")    // library is added to libraries list
const book1 = new Book("harry potter","J.K.Rowling",255)    //following are the instances of Books 
const book2 = new Book("Huckleberry","Mark Twain",258)
const book3 = new Book("Treasure Island","Robert Louis",272)
const ebook1 = new EBook("Darkness to light","A.Helwa",124,"PDF")
const ebook2 = new EBook("The Alchemist","Paulo Coelho",128,"PDF")
const ebook3 = new EBook("The little prince","Richard Howard",135,"EPUB")

hyderabadlibrary.addBook(book1) // following are entries in to the library called hyderabadlibrary
hyderabadlibrary.addBook(book2)
hyderabadlibrary.addBook(book3)
hyderabadlibrary.addBook(ebook1)
hyderabadlibrary.addBook(ebook2)
hyderabadlibrary.addBook(ebook3)
const list_of_books = hyderabadlibrary.displayBooks()
console.log(list_of_books)      //displaying books in console

/* [
  { title: 'harry potter', author: 'J.K.Rowling', ISBN: 255 },
  { title: 'Huckleberry', author: 'Mark Twain', ISBN: 258 },
  { title: 'Treasure Island', author: 'Robert Louis', ISBN: 272 },
  { title: 'Darkness to light', author: 'A.Helwa', ISBN: 124, fileFormat: 'PDF'},
  { title: 'The Alchemist', author: 'Paulo Coelho', ISBN: 128, fileFormat: 'PDF'},
  { title: 'The little prince', author: 'Richard Howard', ISBN: 135, fileFormat: 'EPUB'}
    ]*/

console.log(hyderabadlibrary.searchByTitle("Treasure Island"))  //test case for checking searchByTitle 

/*Treasure Island book is present in library*/

console.log(libraries.displayLibraries())       // displaying all libraries in console

/*[ 'hyderabadlibrary' ]*/


// API Endpoints for books
app.post('/addBook', (req, res) => {
    // Logic to add a book
    const {title,author,ISBN} = req.body        // book details are sent through https body
    const data = new Book(title,author,ISBN)
    hyderabadlibrary.addBook(data)
    res.send(hyderabadlibrary.displayBooks()) //onresolving sending all books as response after adding a new book
});

app.get('/listBooks', (req, res) => {
    // Logic to list books
    res.send(hyderabadlibrary.displayBooks()) //onresolving sending all books as response 
});

app.delete('/deleteBook', (req, res) => {
    // Logic to delete a book
    const { bookname } = req.body;      // book details are sent through https body
    hyderabadlibrary.deleteBook(bookname)
    res.send(hyderabadlibrary.displayBooks())   //onresolving sending all books as response after deleting a book
});


//API EndPoints for Library
app.get('/listLibrary', (req, res) => {
    // Logic to list Library
    res.send(libraries.displayLibraries())     //onresolving sending all libraries as response
});

app.post('/addLibrary', (req, res) => {
    // Logic to add a library
    let {libraryname} = req.body        // library name is sent through https body
    libraries.addLibrary(libraryname)
    res.send(libraries.displayLibraries())      // on resolving sending all library names as response after adding a new library
});
app.delete('/deleteLibrary', (req, res) => {
    // Logic to delete a library
    const { libraryname } = req.body;       // library name is sent through https body
    libraries.deleteLibrary(libraryname)
    res.send(libraries.displayLibraries())   // on resolving sending all library names as response after deleting a library
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // server listens at port: 3000
});

    /*Server running on port 3000*/


