import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./BookList.module.css";
import { BookInterface } from "../../interface/Book.interface";
import { ArrowClockwise, Trash, Wrench } from "react-bootstrap-icons";

interface BookListProps {
  books: Array<BookInterface>;
  onDeleteClick: (id: string) => void;
  onUpdateClick: (id: string) => void;
  onRefreshClick: () => void;
}

const BOOK_STATUS = ["Not Read", "Reading", "Read"];

const BookList: React.FC<BookListProps> = ({
  books,
  onDeleteClick,
  onUpdateClick,
  onRefreshClick,
}) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th
            style={{ cursor: "pointer" }}
            onClick={(evt) => {
              onRefreshClick();
            }}
          >
            <ArrowClockwise />
          </th>
          <th>Title</th>
          <th>Authors</th>
          <th>Current Status</th>
          <th>Is Available?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.authors.join(" | ")}</td>
              <td>{BOOK_STATUS[book.status]}</td>
              <td>{book.available ? "Yes" : "No"} </td>
              <td className="d-flex flex-row-reverse justify-content-evenly">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={(event) => onUpdateClick(book.id as string)}
                >
                  <Wrench className="text-light" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(event) => onDeleteClick(book.id as string)}
                >
                  <Trash className="text-dark" />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BookList;
