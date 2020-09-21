import React from 'react'
import ListIn from '../components/ListIn'
import {
    Container,
    Header,
    Button,
    List,
    Image
  } from "semantic-ui-react";
  // {props.el==="default" ? "https://react.semantic-ui.com/images/wireframe/image.png":img_url} 

function ContainerInside (props){
    return(
        <Container text>
          {/* {props.el==="default" ? "yes":"no"} */}
        <Header>{props.el==="default" ? "Book Title":props.el.title} </Header>
        <Image
          src={props.el==="default" ? "https://react.semantic-ui.com/images/wireframe/image.png":props.el.img_url} 
          size="small"
        />
        <p>{props.el==="default" ? "Book description":props.el.description}</p>
        <Button onClick={()=>props.likes(props.el.users)}
          color="red"
          content="Like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: props.el==="default" ? 2048:props.el.users.length
          }}
        />
        <Header>Liked by</Header>
        <List>
          {props.el==="default" ? "None" : props.el.users.map(el=><ListIn key={el.id} user={el}/>)}
        </List>
      </Container>
    )
}

export default ContainerInside

// {props.el==="default" ? "yes":"no"}
// <Header>Book Title</Header>
// <Image
//   src="https://react.semantic-ui.com/images/wireframe/image.png"
//   size="small"
// />
// <p>Book description</p>
// <Button
//   color="red"
//   content="Like"
//   icon="heart"
//   label={{
//     basic: true,
//     color: "red",
//     pointing: "left",
//     content: "2,048"
//   }}
// />
// <Header>Liked by</Header>
// <List>
//   <List.Item icon="user" content="User name" />
// </List>