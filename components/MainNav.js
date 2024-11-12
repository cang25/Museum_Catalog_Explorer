import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";

export default function MainNav() {
  const router = useRouter();

  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function submitForm(e) {
    e.preventDefault();
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, searchField]);
    setIsExpanded(false);
    router.push(`/artwork?${queryString}`);
    setSearchField("");
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
                <Nav.Link
                  onClick={handleNavLinkClick}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  onClick={handleNavLinkClick}
                  active={router.pathname === "/search"}
                >
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
            &nbsp;&nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={handleNavLinkClick}
                    active={router.pathname === "/favourites"}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    onClick={handleNavLinkClick}
                    active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
