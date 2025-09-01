import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Yıldızları sadece göstermek için basit bir bileşen
const StarRatingDisplay = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="text-warning mb-2">
      {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="bi bi-star-fill"></i>)}
      {halfStar && <i className="bi bi-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="bi bi-star"></i>)}
      <span className="ms-2 text-muted" style={{fontSize: '0.9rem'}}>{rating.toFixed(1)}</span>
    </div>
  );
};

function Home({ products }) {
  const featuredProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <header className="bg-dark text-white text-center py-5">
        <Container>
          <h1 className="display-4">Akkayasoft Ticarete Hoş Geldiniz</h1>
          <p className="lead">Kaliteli ürünler, uygun fiyatlar.</p>
        </Container>
      </header>

      {/* Öne Çıkan Ürünler Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">En Yeni Ürünler</h2>
        <Row>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => {
              const averageRating = product.ratings.length > 0 
                ? (product.ratings.reduce((acc, r) => acc + r.score, 0) / product.ratings.length)
                : 0;

              return (
                <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'cover' }}/>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.name}</Card.Title>
                      <StarRatingDisplay rating={averageRating} />
                      <Card.Text as="h5" className="text-primary mt-auto">${product.price}</Card.Text>
                      <Link to={`/products/${product.id}`} className="mt-2">
                        <Button variant="primary" className="w-100">İncele</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p className="text-center text-muted">Gösterilecek ürün bulunmuyor.</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
