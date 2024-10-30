import Link from "next/link";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();

  function submitForm(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark">
        <Container className="d-flex justify-content-between">
          <div className="d-flex">
            <Navbar.Brand>Christine Ang</Navbar.Brand>
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
          </div>

          <Form className="d-flex" onSubmit={submitForm}>
          <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
