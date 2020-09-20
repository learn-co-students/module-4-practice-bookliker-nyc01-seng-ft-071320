import React from 'react'
import { List, Header, Button, Container, Image} from 'semantic-ui-react'

export default class Book extends React.Component {

  renderUsers = () => {
    return this.props.book.users.map(user => <List.Item icon="user" content={user.username} key={user.id}/>)
  }

  clickHandler = () => {
      this.props.likeHandler(this.props.book)
  }

  render(){
    return(
      <Container text id="book-show">
        <Header>{this.props.book.title}</Header>
        <Image src={this.props.book.img_url} size="small" alt={this.props.book.title} />
        <p id="description">{this.props.book.description}}</p>
        <Button onClick={this.clickHandler} color="red" content="Like" icon="heart" label={{ basic: true, color: "red", pointing: "left", content: "2,048" }} />
        <Header>Liked by:</Header>
        <List>
          {this.renderUsers()}
        </List>
      </Container>
    )
  }

}
