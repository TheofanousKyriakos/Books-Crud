class Book {
    constructor(id, title, author, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
module.exports = Book;