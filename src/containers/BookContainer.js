import React from "react";
import Book from '../components/Book'

class BookContainer extends React.Component {

    book = () => {
        let displayBook = this.props.books.find(book => book === this.props.displayed)
        return <Book book={displayBook} key={displayBook.id} likeListener={this.props.likeListener} />
    }

    render() {
        return (
            this.book()
        )
    }
}



export default BookContainer