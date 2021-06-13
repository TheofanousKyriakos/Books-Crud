var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');
var Book = require('../models/book');

/* GET home page. */
// URL: http://localhost:3000/books/
// list - SELECT
router.get('/list/:message?', function(req, res, next) {
    const query = "SELECT * FROM books";
    var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
    console.log(req.query);
    dbconnection.query(query, function(err, rows) {
        if(err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: req.params.message });
        } else {
            res.render('books', { title: 'Books', books:rows, message: req.params.message, url: fullUrl });
        }
    });
});

//URL: http://localhost:3000/books/add
// show the actual form for the model book in order to
// collect data from the client and send them to the back end
// form ADD - Insert
router.get('/add/', function(req, res, next) {
    res.render('books_new', { title: 'Books - Add New', message:'' });
});


// Actual INSERT
router.post('/add', function(req, res, next) {
    let book = new Book(undefined, req.body.title, req.body.author);
    
    const query = "INSERT INTO `books`(`title`, `author`) VALUES('"+ book.title + "', '" + book.author + "')";
    const query2 = `INSERT INTO books(title, author) VALUES('${book.title}', '${book.author}');`;
    dbconnection.query(query2, function(err, status) {
        // NOT OK - Error!!!
        if(err) {
            res.render("books_new", { title: 'Books - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
            res.redirect('/books/list/All OK!!!');
        }
        
    });
});

// DELETE
// http://localhost:3000/books/delete/1 <---- we delete the record with id = 1
router.get('/delete/:id', function(req, res, next) {
    var query = "DELETE FROM `books` WHERE `id` = ?";
    const bookId = req.params.id;
    dbconnection.execute(query, [bookId], function(err, result, fields) {
        if(err) {

        } else {
            res.redirect('/books/list/Book with id ' + bookId + " is deleted!");        
        }
    });
});

// UPDATE
// show form with data
router.get('/edit/:id', function(req, res, next) {
    const bookId = req.params.id;
    var query = "SELECT * FROM `books` WHERE `id` = ?";
    dbconnection.execute(query, [bookId], function(err, result, fields) {
        console.log(result[0]);
        let book = new Book(result[0].id, result[0].title, result[0].author);
        // console.log(book);
        res.render('books_edit', { title: 'Books - Edit', message:'',  book: book});
    });
});

// UPDATE
// call router.post('/update/:id')
// update where id = 

router.post('/edit', function(req, res, next) {
    
    let title = req.body.title
    let author = req.body.author
    let id = req.body.id
    const query = `UPDATE books SET title = ?, author =? WHERE id=?`
    
    dbconnection.query(query , [title,author,id], function(err, result) {
        if(err) {
            res.render("books_new", { title: 'Books - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
        
        res.redirect('/books/list/All OK!!!');  
        }
    });
});

module.exports = router;