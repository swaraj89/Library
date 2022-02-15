import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./AddBook.module.css";
import { BookInterface } from "../../interface/Book.interface";

interface AddBookProps {
  submitHandler: (newBook: BookInterface) => void;
  book: BookInterface | null;
}

const AddBook: React.FC<AddBookProps> = ({ submitHandler, book }) => {
  let initTitle = "";
  let initAuthor = "";
  let initStatus = -1;
  let initAvailable = false;

  if (book !== null) {
    initAuthor = book?.authors[0];
    initTitle = book?.title;
    initAvailable = book?.available as boolean;
    initStatus = book?.status;
  }

  const [title, setTitle] = useState(initTitle);
  const [author, setAuthor] = useState(initAuthor);
  const [status, setStatus] = useState(initStatus);
  const [available, setAvailable] = useState(initAvailable);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newBook: BookInterface = {
      title,
      authors: [author],
      status: status === -1 ? 0 : status,
      available,
    };

    submitHandler(newBook);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setStatus(-1);
    setAvailable(false);
  };

  return (
    <>
      <pre>{JSON.stringify(book, undefined, 2)}</pre>
      <pre>{title}</pre>
      <pre>{author}</pre>
      <pre>{available}</pre>
      <pre>{status}</pre>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <div className="input-group p-3 mb-2">
            <span className="input-group-text">Title</span>
            <Form.Control
              type="text"
              placeholder="Book Title"
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <div className="input-group p-3 mb-2">
            <span className="input-group-text">Author</span>
            <Form.Control
              type="text"
              placeholder="Author"
              onChange={(evt) => setAuthor(evt.target.value)}
              value={author}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Select
            id="currentStatus"
            onChange={(evt) => setStatus(parseInt(evt.target.value))}
            value={status}
          >
            <option value="-1">Current Status</option>
            <option value="0">Not Read</option>
            <option value="1">Reading</option>
            <option value="2">Read</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="p-3 mb-2">
          <Form.Check
            type="checkbox"
            id="isAvailableCheck"
            label="Book is available"
            onChange={(evt) => setAvailable(evt.target.checked)}
          />
        </Form.Group>

        <Button variant="dark" size="sm" type="submit" className="p-3 mt-2">
          Add or Update
        </Button>
      </Form>
    </>
  );
};

export default AddBook;
