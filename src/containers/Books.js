import React, { Component } from 'react';
import Book from '../components/Book';
import { connect } from 'react-redux';
import { fetchBooks } from '../actions/book.actions';
import { deleteBook } from '../actions/book.actions';
// import {editBook} from '../actions/book.actions';
import { history } from '../index';

class Books extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onFetch();
    }

    handleEdit(book) {
        // var List=book
        // console.log("--List",List);
        history.push({
            pathname: `/edit/${book.id}`,
            state: {
                book: book,
            }
        })
    }

    render() {      
        if (this.props.isLoading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
         
            )
        } else if (this.props.error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {this.props.error.message}
                </div>
            )
        } else {
            return (
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.books.map(book => {
                                    return (
                                        <Book
                                            key={book.id}
                                            book={book}
                                            onDelete={this.props.onDelete}
                                            onEdit=
                                            // {this.props.onEdit}
                                            {this.handleEdit.bind(this)}
                                            
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.booksData.books || [],
        error: state.booksData.error || null,
        isLoading: state.booksData.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetch: () => {
            dispatch(fetchBooks());
        },

        onDelete: (id) => {
            dispatch(deleteBook(id))
        },
        // onEdit:()=>{
        //     dispatch(editBook(id))
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);