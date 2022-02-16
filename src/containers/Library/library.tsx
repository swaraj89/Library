import React, { useState, useEffect } from "react";
import { AddBook, BookList } from "../../components";
import { LibraryService } from "../../services";
import { BookInterface } from "../../interface/Book.interface";
import { Col, Container, Row, Spinner } from "react-bootstrap";

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user: any }) => {
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [activeBook, setActiveBook] = useState<BookInterface | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetchAllBooks();
    } catch (err) {
      console.error("Error in fetching books", err);
    }
  }, []);

  const fetchAllBooks = async () => {
    const data = await LibraryService.getAllBooks();
    const allBooks: Array<BookInterface> = data.docs?.map(
      (doc) => ({ ...doc.data(), id: doc.id } as BookInterface)
    );

    setBooks(allBooks);
    setLoading(false);
  };

  const fetchBook = async (id: string) => {
    const data = await LibraryService.getBook(id);
    setActiveBook({ ...data.data(), id: data.id } as BookInterface);
  };

  const deleteBookHandler = async (id: string) => {
    try {
      await LibraryService.deleteBook(id);
      fetchAllBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateBookHandler = async (id: string) => {
    try {
      fetchBook(id);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddBookHandler = (book: BookInterface) => {
    try {
      if (activeBook !== null) {
        updateBook(book);
      } else {
        addBook(book);
      }

      setLoading(true);
      fetchAllBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const refreshClickHandler = () => {
    try {
      setLoading(true);
      fetchAllBooks();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const addBook = (newBook: BookInterface) => {
    LibraryService.addBook(newBook);
  };

  const updateBook = (oldBook: BookInterface) => {
    LibraryService.updateBook(activeBook?.id as string, oldBook);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }} className={"p-3 mb-2"}>
            <AddBook submitHandler={onAddBookHandler} book={activeBook} />
          </Col>
        </Row>
        {loading ? (
          <>
            <pre>Loading....</pre>
            <Spinner animation="border" variant="dark" />
          </>
        ) : (
          <BookList
            books={books}
            onDeleteClick={deleteBookHandler}
            onUpdateClick={updateBookHandler}
            onRefreshClick={refreshClickHandler}
          />
        )}
      </Container>
    </>
  );
};

export default Library;
