import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { Library, Login } from "./containers";
import { auth } from "./firebase.config";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const loginHandler = (user: any) => {
    if (auth && auth.currentUser) {
      setAuthenticated(true);
      setLoggedInUser(auth.currentUser.email as string);
    }
  };

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <div className="mb-2 bg-warning text-dark fs-1 fw-light d-flex justify-content-between">
            <span className="">Pathagar</span>
            <span className="fs-5  align-self-center">
              {authenticated ? `Hello, ${loggedInUser}` : ``}
            </span>
          </div>
        </Row>
      </Container>

      {authenticated ? (
        <Library user={loggedInUser} />
      ) : (
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 4 }} className={"p-3 mb-2"}>
              <Login onLogin={loginHandler} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default App;
