//PARENT CLASS FOR BOOKS 
class Book{
    constructor(title, Author, ISBN){
        this.Author = Author;
        this.title = title;
        this.ISBN = ISBN;
        this.borrowedBy = null;

    }

    Discription(){
        console.log(`${this.title} by ${this.Author}`)
    }
}

// Subclasses for different types of books (Polymorphism)
class NewsPaper extends Book{
    constructor(title, Author, ISBN, issue) {
        super(title, Author, ISBN);
        this.issue = issue;
      }
    
}

class Novel extends Book{
constructor(title, Author, ISBN, genre){
    super(title, Author, ISBN)
    this.genre = genre;
}
}

class ResearchPaper extends Book{
    constructor(title, Author, ISBN, field) {
      super(title, Author, ISBN);
      this.field = field;
    }
}   


//THE USER CLASS
class user{
    constructor(name, userId) {
        this.name = name;
        this.userId = userId;
        this.borrowedBooks = [];

    }
}

//LIBRARY CLASS
class Library{
    constructor(){
        this.books = [];
    }

//METHOD FOR ADDING BOOK
    addBook(book){
        this.books.push(book);
        console.log(`${book.title} by ${book.Author} was Added`);
    }


//METHOD FOR BORROWING BOOK
    borrowBook(user, bookTitle){
        const book = this.books.find(b => b.title === bookTitle)

        if(book && !book.borrowedBy){
            book.borrowedBy = user;
            user.borrowedBooks.push(book);
            console.log(`${book.title} was borrowed by ${user.name}`);
        }
        else{
            console.log(`Book titled "${bookTitle}" not found in the library.`);
        }

    }


//METHOD FOR RETURNING BOOK

    returnBook(user, bookTitle){
        const book = user.borrowedBooks.find(b => b.title === bookTitle);

        if(book && book.borrowedBy === user){
            book.borrowedBy = null;
            user.borrowedBooks = user.borrowedBooks.filter(b => b.title !== bookTitle)
            console.log(`${user.name} returned ${book.title}`)
        }
        else {
            console.log(`${user.name} does not have "${bookTitle}".`);
          }
    }

//METHOD TO DISPLAY ALL BOOKS IN LIBRARY   
    displayAvailableBooks(){
        console.log("Available Books:");

        this.books.forEach(book => {
            if(!book.borrowedBy){
                return `${book.Discription()}`
            }
        })
    }
}



//RUNING THE ABOVE OOP

const library = new Library()
// Create books
const novel = new Novel("Pride and Prejudice", "Jane Austen", "123456", "Romance");
const newsPaper = new NewsPaper("Tech Monthly", "Tech Inc.", "654321", "August 2024");
const researchPaper = new ResearchPaper("AI and Future", "John Doe", "112233", "Artificial Intelligence");

//Create user
const firstUser = new user("Franklin", "U101A")

//Add books
library.addBook(novel);
library.addBook(newsPaper);
library.addBook(researchPaper);

//Borrow books and display remaining books
library.borrowBook(firstUser, "Pride and Prejudice");
library.displayAvailableBooks();

//Return books and display remaining books
library.returnBook(firstUser, "Pride and Prejudice");
library.displayAvailableBooks();
