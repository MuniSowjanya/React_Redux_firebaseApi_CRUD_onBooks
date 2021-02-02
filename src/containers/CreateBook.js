import React, { Component } from 'react';
import { createBook } from '../actions/book.actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
// import { Router, Route, browserHistory, IndexRoute} from 'react-router'
// import {syncHistoryWithStore, routerReducer} from 'react-router-redux'


import './CreateBook.css';
// import { getPortPromise } from 'portfinder';

class CreateBook extends Component {
    constructor(props) {
        super(props);
        // if(props.location.state.book!=undefined) {
        //     this.setState(props.location.state.book);
        // } else {
            this.state = {
                id: 0,
                Title: '',
                Author: '',
                Year: '',
            };
      //   }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state);
      
    }

    handleOnValueChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log("submit",this.state);
    }

    handleReset(e) {
        e.preventDefault();
        this.setState({
            id:'',
            Title: '',
            Author: '',
            Year: '',
        });
    }
  
    componentWillMount() {
        const props = this.props;
    //     // bookID=this.props.location.state.book.id
    //    console.log(bookID);
        if (props.location && props.location.state) {
            const book = props.location.state.book;
            console.log("--book", book);
                this.setState({
                    id: book.id,
                    Title: book.title,
                    Author: book.author,
                    Year: book.year,
                });
            
        }
       // console.log("state in create book",this.state);
    }
 
    componentDidMount(){
        var url ="https://books-88a4a-default-rtdb.firebaseio.com/books.json";
        
        
        fetch(url).then(response => response.json())
        .then(result => {
            const dataN=result
            console.log(dataN)
            
        
        })
        .catch(e => {
            console.log(e);
     
        });
        console.log("state in create book",this.state);
    }

    render() {
       // debugger;
        console.log("state in create book",this.state);
        // console.log("--props",);
        return (
            <div className="create-book">
                {this.state.id?<h1>Edit a book</h1>:<h1>Create a book</h1>}
                {this.props.error ? 
                    <div className="alert alert-danger" role="alert">
                        {this.props.error.message}
                    </div>: ''
                }
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input 
                            type="text"
                            required
                            className="form-control"
                            name="Title"
                            placeholder="Enter Title"
                            value={this.state.Title}
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            required
                            className="form-control"
                            name="Author"
                            placeholder="Enter Author"
                            value={this.state.Author}
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            required
                            className="form-control"
                            name="Year"
                            placeholder="Enter Year Published"
                            value={this.state.Year}
                            onChange={this.handleOnValueChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="sticky-top">
                        <Link to="/">Back to Home</Link>
                        </div>
                   
                    <button type="submit" 
                                className="btn btn-success">
                               {this.state.id ? 'Update': 'Add'} 
                        </button> 
                        
                        <button type="button" className="btn btn-danger"
                            onClick={this.handleReset.bind(this)}>
                            Clear
                        </button>
                       
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.booksData.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    // console.log("--book",book);
    return {
        onAdd: (book) => {
            dispatch(createBook(book));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook);