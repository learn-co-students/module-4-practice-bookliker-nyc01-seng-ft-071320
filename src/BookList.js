import React from 'react'
import { Menu }from 'semantic-ui-react'
import Book from './Book'

export default class BookList extends React.Component {

  state = {
    bookArray: [],
    currentBook: ""
  }

  componentDidMount(){
    fetch('http://localhost:3000/books')
    .then(resp=>resp.json())
    .then(data => {
      this.setState(()=>({
        bookArray: data
      }))
    })
  }

  bookListRender = () => {
    return this.state.bookArray.map(bookObj => <Menu.Item as={"a"} onClick={()=> this.clickHandler(bookObj)} key={bookObj.id}>{bookObj.title}</ Menu.Item>)
  }

  clickHandler = (bookObj) => {
    this.setState(()=>({
      currentBook: bookObj
    }))
  }

  likeHandler = (bookObj) => {
    const users = bookObj.users.map(user => user.username)
    if (users.includes('pouros')){
      bookObj.users = bookObj.users.filter(user => user.username !== 'pouros')
    } else {
      bookObj.users = [...bookObj.users, {"id":1, "username":"pouros"}]
    }
    const configObj = {
      method: 'PATCH', 
      headers: {"Content-Type": "application/json", "Accepts": "application/json"}, 
      body: JSON.stringify({ users: bookObj.users })
    }
    fetch(`http://localhost:3000/books/${bookObj.id}`, configObj)
    .then(resp=>resp.json())
    .then(bookResp => {
      const newArray = this.state.bookArray
      const found = newArray.find(book => book.id === bookResp.id)
      found.users = bookResp.users
      this.setState(()=>({
        bookArray: newArray
      }))
    })
  }

  render(){
    return (
      <div id="main-container">
        <Menu vertical inverted>
          {this.bookListRender()}
        </Menu>
        {this.state.currentBook.id ? <Book likeHandler={this.likeHandler} book={this.state.currentBook}/> : null}
      </div>
    )
  }

}