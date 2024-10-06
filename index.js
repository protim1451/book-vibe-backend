const express = require('express');
const cors = require('cors');
const fs = require('fs'); // To read the JSON file
const path = require('path'); // To define file paths
//require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: ["https://book-vibe-3f6df.firebaseapp.com","https://book-vibe-3f6df.web.app","http://localhost:5173"]
  }));

const filePath = path.join(__dirname, 'data', 'books.json');
const books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// API endpoint to get all products (books)
app.get('/api/books', (req, res) => {
    res.json(books);
  });
  
  // API endpoint to get a specific product by bookId
  app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.bookId === bookId);
  
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
  

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })