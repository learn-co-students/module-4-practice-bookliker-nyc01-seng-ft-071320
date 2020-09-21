import React from "react";
import {
  Header,
  Button,
  Image
} from "semantic-ui-react";

class Book extends React.Component {
    render() {
        return (
            <>
                <Header>{this.props.book.title}</Header>
                <Image
                src={this.props.book.img_url}
                onClick={e => console.log("book clicked!")}
                size="small"
                />
                <p>{this.props.book.description}</p>
                <Button
                color="red"
                content= {this.props.book.users.find(user => user.id === 1)
                    ?
                    "Unlike"
                    :
                    "Like"
                }
                icon="heart"
                label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: this.props.book.users.length
                }}
                onClick={() => this.props.likeListener(this.props.book)}
                />
            </>
        )
    }
}

export default Book