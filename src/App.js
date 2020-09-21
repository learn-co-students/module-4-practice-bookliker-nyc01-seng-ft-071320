import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

class App extends React.Component {

  state = {
    books: [],
    clickedBook: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => {
      this.setState(()=>({books: data}))
    })
  }
  
  clickHandler = (book) => {
    this.setState(() => ({clickedBook: book}))
  }

  bookTitles = () => {
    return this.state.books.map(el => 
        <Menu.Item as={"a"} onClick={() => this.clickHandler(el)}>
          {el.title}
        </Menu.Item>
    )
  }

  renderBook = () => {
    let clickedBook = this.state.clickedBook
      return (
        <>
          <Header>{clickedBook.title}</Header>
          <Image
            src={clickedBook.img_url}
            size="small" />
          <p>{clickedBook.description}</p>  
        </>
      )
  }

  renderUsers = () => {
    return this.state.clickedBook.users.map(el => el.username).join(' || ')
  }

  likeHandler = () => {
    let me = {
        id:1, 
        username: "pouros"
    }

    let clickedBook = this.state.clickedBook
    let newUserList = clickedBook.users.concat(me)

    fetch(`http://localhost:3000/books/${clickedBook.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        users: newUserList})
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.users)
      let newArray = [...this.state.books]
      let likedBook = newArray.find(el => el.id === parseInt(clickedBook.id))
      likedBook.users = [...clickedBook.users, me]
      this.setState(()=>({books: newArray}))
      console.log('i am being liked', newArray, likedBook)
    })   
  }

  render () {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
        <Menu vertical inverted>
          {this.bookTitles()}
        </Menu>
        <Container text>
          {this.renderBook()}
          {this.state.clickedBook.length === 0 ? 
            null : <>
            <Button onClick={this.likeHandler}
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: "2,048"
            }} />
            <Header>Liked by</Header>
            <List>
              <List.Item icon="user" content={this.renderUsers()} />
            </List>
          </>}
        </Container>
        </main>
      </div>
    );
  }
}

export default App;
