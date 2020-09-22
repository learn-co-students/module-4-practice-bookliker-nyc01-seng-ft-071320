import React from "react";
import {
  Menu,
} from "semantic-ui-react";
import BookDetails from "./Components/BookDetails";

class App extends React.Component {

  state = {
    books: [],
    clickedBook: null
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
    e.persist()
    this.setState(() => ({
      clickedBook: bookObj
    }))
  }

  getBookDetails = () => {
    if(this.state.clickedBook) {
      return <BookDetails book={this.state.clickedBook}/>
    }
    return null
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
