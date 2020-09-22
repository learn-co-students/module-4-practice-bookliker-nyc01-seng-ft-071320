import React from "react";
import {
  Menu,
} from "semantic-ui-react";
import BookDetails from "./Components/BookDetails";


class App extends React.Component {
  
  state = {
    books: [],
    clickedBook: null,
    liked: false,
    currentUser: {"id":1, "username":"pouros"}
  }

  componentDidMount() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  getBookList = () => {
    return this.state.books.map(book => {
      return(
        <Menu.Item key={book.id} as={"a"} onClick={e => this.showBookDetails(e, book)}>
          {book.title}
        </Menu.Item>
      )
    })
  }

  showBookDetails = (e, bookObj) => {
    const likedByUser = bookObj.users.some(user => user.id === this.state.currentUser.id)
    e.persist()
    this.setState(() => ({
      clickedBook: bookObj,
      liked: likedByUser
    }))
  }

  updateLike = e => {
    e.persist()
    this.setState(() => ({
      liked: !this.state.liked
    }))
  }

  getBookDetails = () => {
    if(this.state.clickedBook) {
      return <BookDetails book={this.state.clickedBook} liked={this.state.liked} currentUser={this.state.currentUser} updateLike={this.updateLike} updateBook={this.updateBook}/>
    }
    return null
  }

  updateBook = bookObj => {
    let newBooks = [...this.state.books]
    let foundBook = newBooks.find(book => book.id === bookObj.id)
    foundBook.users = bookObj.users
    this.setState(() => ({
      books: newBooks
    }))
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            {this.getBookList()}
          </Menu>
          {this.getBookDetails()}
        </main>
      </div>
    )
  }
}

export default App;
