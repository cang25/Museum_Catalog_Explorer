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
  const [isExpanded, setIsExpanded] = useState(false);

  const router = useRouter();

  function submitForm(e) {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchField("");
    setIsExpanded(false);
  }

  function handleNavToggle() {
    let isAlreadyExpanded = isExpanded;
    if (isAlreadyExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }

  function handleNavLinkClick() {
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar
        className="fixed-top navbar-dark bg-dark"
        expanded={isExpanded}
        expand="lg"
      >
        <Container>
          <Navbar.Brand>Christine Ang</Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            onClick={handleNavToggle}
          />

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={handleNavLinkClick}>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link onClick={handleNavLinkClick}>
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>

            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button
                variant="outline-success"
                type="submit"
                disabled={!searchField}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
