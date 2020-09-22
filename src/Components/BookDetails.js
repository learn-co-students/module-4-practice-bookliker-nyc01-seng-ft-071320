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
    return this.props.book.users.map(user => <List.Item icon="user" content={user.username} />)
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
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: `${this.props.book.users.length}`
          }}
          />
        <Header>Liked by</Header>
        <List>
          {this.getUsers()}
          {/* <List.Item icon="user" content="User name" /> */}
        </List>
          </Container>
    )
  }
}

export default BookDetails
