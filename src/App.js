import React from "react";
import {
  Container,
  Header,
  Menu,
  List
} from "semantic-ui-react";
import BookTitleContainer from './containers/BookTitleContainer'
import BookContainer from './containers/BookContainer'
import LikerContainer from './containers/LikerContainer'

class App extends React.Component {
  bookURL = 'http://localhost:3000/books/'
  userURL = 'http://localhost:3000/users/'
  state = {
    books: []
  }

  componentDidMount = () => {
    fetch(this.bookURL)
    .then(resp => resp.json())
    .then(books => this.setState({books: books}))
  }

  clickHandler = (book) => {
    this.setState({displayed: book})
  }

  changeLikesDisplay = (likedBook, newArray) => {
    let newStateArray = this.state.books
    let book = newStateArray.find(book => book.id === likedBook.id)
    book.users = newArray
    this.setState({books: newStateArray})
  }

  likeListener = (likedBook) => {
    let user = likedBook.users.find(user => user.id === 1)
    let newArray
    if (user) { 
      let index = likedBook.users.findIndex(user => user.id === 1)
      likedBook.users.splice(index, 1)
      newArray = likedBook.users
      this.changeLikesDisplay(likedBook, newArray)
    } else {
      fetch(this.userURL + "1")
      .then(resp => resp.json())
      .then(liker => {
        newArray = [...likedBook.users, liker]
        this.changeLikesDisplay(likedBook, newArray)
      })
    }
  }
  
  changeLikes = (likedBook, newArray) => {
    fetch(this.bookURL + likedBook.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        users: newArray
      })
    })
  }


  

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            <BookTitleContainer books={this.state.books} clickHandler={this.clickHandler}/>
          </Menu>
          {this.state.displayed 
          ?
          <Container text>
            <BookContainer books={this.state.books} displayed={this.state.displayed} likeListener={this.likeListener}/>
            <Header>Liked by</Header>
            <List>
              <LikerContainer displayed={this.state.displayed} />
            </List>
          </Container>
          :
          null
          }
        </main>
      </div>
    )
  }
}

export default App;
