const { v4: uuid } = require("uuid");

class Book {
    constructor(data) {
        this.id = uuid();
        this.title = data?.title;
        this.description = data?.description;
        this.authors = data?.authors;
        this.favorite = data?.favorite;
        this.fileCover = data?.fileCover;
        this.fileName = data?.fileName;
    }
}

const books = [new Book(), new Book()];

module.exports = {
    books
}