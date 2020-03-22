let bookArray;
let readers;

document.addEventListener("DOMContentLoaded", () => {

  fetchBooks()
    .then(results => {
      //console.log(results);
      bookArray = results;
      renderAllBooksOnPage(bookArray)
    });

});

function fetchBooks() {
  return fetch('http://localhost:3000/books')
    .then(response => response.json())
};

function addOneBook(book) {
  const bookList = document.getElementById('list');
  const li = document.createElement('li');

  li.innerText = book.title;
  li.setAttribute('data-id', book.id);
  li.addEventListener('click', showBook);
  bookList.appendChild(li);
}

function renderAllBooksOnPage(books) {
    books.forEach(book => addOneBook(book))
};

function showBook(event) {
  const bookId = event.target.dataset.id
  const showPanel = document.querySelector('#show-panel');
  showPanel.innerHTML = "";
  const newDiv = document.createElement('div');
  newDiv.setAttribute('data-id', bookId);

  fetch(`http://localhost:3000/books/${bookId}`)
    .then(response => response.json())
    .then(book => {
      const image = document.createElement('img');
      image.setAttribute('src', book.img_url);
      newDiv.appendChild(image);

      const p = document.createElement('p')
      p.innerText = book.description;
      newDiv.appendChild(p);

      book.users.forEach(user => {
        const h4Tag = document.createElement('h4');
        h4Tag.id = user.id
        h4Tag.innerText = user.username;
        newDiv.appendChild(h4Tag);
      }) 
      const button = document.createElement('button');
      button.innerText = 'Read Book';
      button.addEventListener('click', likeBook);
      newDiv.appendChild(button);           
      showPanel.appendChild(newDiv)                     
    })
  
  
}

function likeBook(event) {
  const lastElement = event.target.previousElementSibling
  const bookId = event.target.parentNode.dataset.id;
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "users": [
        {"id":2, "username":"auer"},
        {"id":8, "username":"goodwin"},
        {"id":1, "username":"pouros"}
      ]
    })
  })
  .then(response => response.json())
  .then(results => {
    let newUser = results.users.pop()
    const h4Tag = document.createElement('h4');
    h4Tag.innerText = newUser.username;
    lastElement.append(h4Tag);
  })
};


