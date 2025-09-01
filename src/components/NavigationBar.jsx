import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

// cart prop'u eklendi
function NavigationBar({ currentUser, handleLogout, cart }) {
  
  // Sepetteki toplam ürün sayısını hesapla
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Akkayasoft Ticaret</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Anasayfa</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Ürünler</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {/* YENİ: Sepet ikonu ve rozeti */}
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="bi bi-cart-fill me-1"></i>
                <Badge pill bg="primary">{totalItemsInCart}</Badge>
              </Nav.Link>
            </LinkContainer>

            {currentUser ? (
              <>
                {currentUser.isAdmin && (
                   <LinkContainer to="/dashboard">
                    <Nav.Link>Yönetim Paneli</Nav.Link>
                  </LinkContainer>
                )}
                 <Nav.Link as="span" className="d-none d-lg-block">Merhaba, {currentUser.email.split('@')[0]}</Nav.Link>
                 <Button variant="outline-danger" onClick={handleLogout} className="ms-2">Çıkış Yap</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                    <Button variant="outline-primary" className="me-2">Giriş Yap</Button>
                </Link>
                <Link to="/register">
                    <Button variant="primary">Kayıt Ol</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
