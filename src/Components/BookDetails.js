import React from 'react'
import {
  Container,
  Header,
  Button,
  List,
  Image
} from "semantic-ui-react";

class BookDetails extends React.Component {

  getUsers = () => {
    return this.props.book.users.map(user => <List.Item key={user.id} icon="user" content={user.username} />)
  }

  updateLike = e => {
    let newUsers
    if (this.props.liked) {
      newUsers = this.props.book.users.filter(user => user.id !== this.props.currentUser.id)
    } else {
      newUsers = [...this.props.book.users]
      newUsers.push(this.props.currentUser)
    }
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        users: newUsers
      })
    }
    fetch(`http://localhost:3000/books/${this.props.book.id}`, options)
    .then(res => res.json())
    .then(book => {
      this.props.updateBook(book)
      this.props.updateLike(e)
    })
  }

  render() {
    return (
        <Container text>
          <Header>{this.props.book.title}</Header>
          <Image
            src={this.props.book.img_url}
            size="small"
          />
          <p>{this.props.book.description}</p>
        <Button
          color="red"
          content={this.props.liked ? "Unlike" : "Like"}
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: `${this.props.book.users.length}`
          }}
          onClick={this.updateLike}
          />
        <Header>Liked by</Header>
        <List>
          {this.getUsers()}
        </List>
          </Container>
    )
  }
}

export default BookDetails
