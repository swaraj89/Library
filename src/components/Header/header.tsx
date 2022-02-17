import React from "react";
import { Container, Row } from "react-bootstrap";
import { Power } from "react-bootstrap-icons";

interface HeaderProps {
  userEmail: string | null;
  onSignout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onSignout }) => {
  return (
    <Container fluid>
      <Row>
        <div className="mb-2 bg-warning text-dark fs-1 fw-light d-flex justify-content-between">
          <span className="">Pathagar</span>
          {userEmail ? (
            <>
              <span className="fs-5  align-self-center">
                Hello, ${userEmail} |{" "}
                <Power
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onSignout();
                  }}
                />
              </span>
            </>
          ) : (
            ``
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Header;
