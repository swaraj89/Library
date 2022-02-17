import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header/header";
import { Library, Login } from "./containers";
import { auth } from "./firebase.config";
import { LoginService } from "./services";

function App() {
  const user = auth && auth.currentUser;

  const [authenticated, setAuthenticated] = useState(user ? true : false);
  const [loggedInUser, setLoggedInUser] = useState(user && user?.email);

  const loginHandler = (user: any) => {
    if (auth && auth.currentUser) {
      setAuthenticated(true);
      setLoggedInUser(auth.currentUser.email as string);
    }
  };

  const logoutHandler = () => {
    LoginService.signOut();
    setAuthenticated(false);
    setLoggedInUser("");
  };

  return (
    <div className="App">
      <Header userEmail={loggedInUser} onSignout={logoutHandler} />
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
