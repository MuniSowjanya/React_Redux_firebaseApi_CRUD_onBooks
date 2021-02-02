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
} from './types';

import axios from 'axios';
import { history } from '../index';

const url = 'https://books-88a4a-default-rtdb.firebaseio.com/books';

//CREATE---------------------------------------------------------------

export const createBookSuccess = (data) => {
    return {

        type: ADD_BOOK_SUCCESS,
        payload: data,
    }
};

export const createBookError = (data) => {
    return {
        type: ADD_BOOK_ERROR,
        payload: data,
    }
};

export const createBook = (book) => {
    debugger;
    if (book.id) {
        const data = {
            id: book.id,
            title: book.Title,
            author: book.Author,
            year: book.Year,
        };

        return (dispatch) => {
            dispatch(editBook(data));
        }
    } else {
        const data = {
            title: book.Title,
            author: book.Author,
            year: book.Year,
        };
    
        return (dispatch) => {
            return axios.post(url+'.json', data)
            
                .then(response => {
                    const id = response.data;
    console.log("--id",id);
                    axios.get(`${url}/${id}`)
                        .then(response => {
                            const data = response.data;
                            const normalizedData = {
                                id: data.ID,
                                title: data.Title,
                                author: data.Author,
                                year: data.Year,
                            };
    
                            dispatch(createBookSuccess(normalizedData));
                            history.push('/');
                        }).catch(error => {
                            const errorPayload = {};
    
                            errorPayload['message'] = error.message;
                            errorPayload['status'] = error.status;
            
                            dispatch(createBookError(errorPayload));
                        });
                }).catch(error => {
                    const errorPayload = {};
    
                    errorPayload['message'] = error.response.data.message;
                    errorPayload['status'] = error.response.status;
    
                    dispatch(createBookError(errorPayload));
                });
        }
    }
}

//EDIT-----------------------------------------------------------------

export const editBookError = (data) => {
    return {
        type: EDIT_BOOK_ERROR,
        payload: data,
    };
};

export const editBookSuccess = (data) => {
    return {
        type: EDIT_BOOK_SUCCESS,
        payload: data,
    };
};

export const editBook = (data) => {
    const id = data.id;

    return (dispatch) => {
        return axios.put(`${url}/${id}.json`, data)
            .then(() => {
                return axios.get(`${url}/${id}.json`)
                    .then(response => {
                        dispatch(editBookSuccess(response.data));
                        history.push('/');
                    }).catch(error => {
                        const errorPayload = {};

                        errorPayload['message'] = error.response.data.message;
                        errorPayload['status'] = error.response.status;

                        dispatch(editBookError(errorPayload));
                    });
            }).catch((error) => {
                const errorPayload = {};

                errorPayload['message'] = error.response.data.message;
                errorPayload['status'] = error.response.status;

                dispatch(editBookError(errorPayload));
            });
    }

}

//DELETE---------------------------------------------------------------

export const deleteBookSuccess = (id) => {
    return {
        type: DELETE_BOOK_SUCCESS,
        payload: {
            id: id,
        }
    }
};

export const deleteBookError = (data) => {
    return {
        type: DELETE_BOOK_ERROR,
        payload: data,
    }
};

export const deleteBook = (id) => {
    console.log("--delete id",id);
    return (dispatch) => {
        return axios.delete(`${url}/${id}.json`)
            .then(() => {
                dispatch(deleteBookSuccess(id));
            }).catch((error) => {
                const errorPayload = {};

                errorPayload['message'] = error.response.data.message;
                errorPayload['status'] = error.response.status;

                dispatch(deleteBookError(errorPayload))
            })
    }
}

//FETCH----------------------------------------------------------------

export const fetchBooksSuccess = (data) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data,
    }
}

export const fetchBooksLoading = (data) => {
    console.log("--fetchbooksloading",data);
    return {
        type: FETCH_BOOKS_LOADING,
        payload: data,
    };
};

export const fetchBooksError = (data) => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: data,
    };
}

const normalizeResponse = (data) => {
    console.log("--data",data);
    const arr=[]
    var obj;
    //if(data.length>1) {
        for(const key in data){
            let obj = data[key];
            obj['id']= key
            arr.push(obj);
            console.log("arr", arr  );        
        }
   /* } else {
        arr.push(data);
    }*/

    // const arr1 = arr.map(item => {
    //     const keys = Object.keys(item);
    
    //     keys.forEach(k => {
    //         item[k.toLowerCase()] = item[k];
    //         delete item[k];
    //     });

    //     return item;
    // });

    return arr;
}

export const fetchBooks = () => {
    //let isLoading = true;

    return (dispatch) => {
        dispatch(fetchBooksLoading(true));
        return axios.get(url+'.json')
            .then(response => {
                //console.log("--rsponse",response.data);
                const data = normalizeResponse(response.data);
                dispatch(fetchBooksSuccess(data));
               
                //isLoading = false;             
                dispatch(fetchBooksLoading(false)); 
                console.log("--1data", data);  
            }).catch(error => {
                const errorPayload = {};
                errorPayload['message'] = error.message;
                errorPayload['status'] = error.status;
                dispatch(fetchBooksError(errorPayload));

               // isLoading = false;
                dispatch(fetchBooksLoading(false));
            });
    };
}