import React from "react";
import {Menu} from "semantic-ui-react";


class BookTitleContainer extends React.Component {

    bookTitles = () => {
        return this.props.books.map(book => <Menu.Item key={book.id} as={"a"} onClick={() => this.props.clickHandler(book)}>{book.title}</Menu.Item>)
    }

    render() {
        return (
            this.bookTitles()
        )
    }
}



export default BookTitleContainer