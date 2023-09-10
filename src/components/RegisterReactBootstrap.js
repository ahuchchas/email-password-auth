import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);
    setPasswordError("");
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Password should have at least 2 uppercase letters");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError(
        "Password should have at least 1 special character (!@#$&*)"
      );
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        form.reset();
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        setPasswordError(error.message);
      });
  };

  return (
    <div className="col-md-6 p-4 mx-auto">
      <h3 className="text-primary">Please Register</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">User created successfully</p>}

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterReactBootstrap;
