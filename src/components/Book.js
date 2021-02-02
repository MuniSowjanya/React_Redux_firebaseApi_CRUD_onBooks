import React from 'react';

const Book = ({book, onDelete, onEdit}) => {
    console.log("---book",book);
  
    return (
        <tr>
            {/* <td>{book.id}</td> */}
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
                <button type="button" className="btn btn-danger"
                    onClick={() => onDelete(book.id)}>
                    Delete
                </button>
                <button type="button" className="btn btn-default"
                    onClick={() => onEdit(book)}>
                    Edit
                </button>
            </td>
         </tr>
    )
}
// console.log("--book",book);
export default Book;