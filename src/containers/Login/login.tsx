import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { LoginService } from "../../services";

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Form>
      <Form.Group>
        <div className="input-group p-3 mb-2">
          <span className="input-group-text">E</span>
          <Form.Control
            type="text"
            placeholder="Email"
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
          />
        </div>
      </Form.Group>

      <Form.Group>
        <div className="input-group p-3 mb-2">
          <span className="input-group-text">A</span>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
          />
        </div>
      </Form.Group>

      <Form.Group className="input-group p-3 mb-2">
        <Button
          variant="dark"
          size="sm"
          className="p-3 mt-2"
          onClick={async (evt) => {
            const fbUser = await LoginService.signIn(email, password);
            debugger;
            onLogin(fbUser);
          }}
        >
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Login;
