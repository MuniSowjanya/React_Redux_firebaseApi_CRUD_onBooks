import { 
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS, 
    DELETE_BOOK_ERROR,
    DELETE_BOOK_SUCCESS,
    EDIT_BOOK_ERROR,
    EDIT_BOOK_SUCCESS,       
    FETCH_BOOKS_ERROR,
    FETCH_BOOKS_LOADING,
    FETCH_BOOKS_SUCCESS     
} from '../actions/types';

const defaultState = {
    books: [],
    error: null,
    isLoading: false,
};

const bookReducer = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_BOOK_SUCCESS:
            return { ...state, books: [ ...state.books, action.payload ]};
        case ADD_BOOK_ERROR:
            return { ...state, error: action.payload };
        case DELETE_BOOK_SUCCESS:
            const filteredBooks = state.books.filter(book => book.id !== action.payload.id);
            return { ...state, books: filteredBooks };
        case DELETE_BOOK_ERROR:
            return { ...state, error: action.payload };
        case EDIT_BOOK_SUCCESS:
            const updatedBooks = state.books.filter(book => book.id != action.payload.id);
            return { ...state, books: [ ...updatedBooks, action.payload]};
        case EDIT_BOOK_ERROR:
            return { ...state, error: action.payload };
        case FETCH_BOOKS_SUCCESS:
            return { ...state, books: action.payload };
        case FETCH_BOOKS_LOADING:
            return { ...state, isLoading: action.payload };
        case FETCH_BOOKS_ERROR:
            return { ...state, error: action.payload };
        default: 
            return state;
    }
}

export default bookReducer;