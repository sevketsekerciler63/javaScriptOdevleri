import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Yıldızları sadece göstermek için basit bir bileşen
const StarRatingDisplay = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="text-warning">
      {[...Array(fullStars)].map((_, i) => <i key={`full-${i}`} className="bi bi-star-fill"></i>)}
      {halfStar && <i className="bi bi-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => <i key={`empty-${i}`} className="bi bi-star"></i>)}
    </div>
  );
};

function Products({ products, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  // Kategorileri ve filtrelenmiş ürünleri belirle
  const categories = ['Tümü', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'Tümü' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getStockBadge = (stock) => {
    if (stock === 0) return <Badge bg="danger">Tükendi</Badge>;
    if (stock < 10) return <Badge bg="warning">Son {stock} ürün!</Badge>;
    return <Badge bg="success">Stokta</Badge>;
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Sol Sütun: Kategori Filtresi */}
        <Col md={3}>
          <h4 className="mb-3">Kategoriler</h4>
          <ListGroup>
            {categories.map(category => (
              <ListGroup.Item 
                key={category}
                action 
                active={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: 'pointer' }}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Sağ Sütun: Ürün Listesi */}
        <Col md={9}>
          <h1 className="mb-4 text-center">{selectedCategory}</h1>
          <Row>
            {filteredProducts.map((product) => {
              const averageRating = product.ratings.length > 0 
                ? (product.ratings.reduce((acc, r) => acc + r.score, 0) / product.ratings.length)
                : 0;

              return (
                // Kartların genişliğini ayarla (lg: 4 ürün, md: 3 ürün, sm: 2 ürün)
                <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="h-100 shadow-sm product-card">
                    <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title as="h6" className="flex-grow-1">{product.name}</Card.Title>
                      
                      <div className="d-flex justify-content-between align-items-center my-2">
                        <StarRatingDisplay rating={averageRating} />
                        <Card.Text as="h5" className="text-primary m-0">${product.price}</Card.Text>
                      </div>

                      <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                              <Button variant="outline-primary" size="sm" as={Link} to={`/products/${product.id}`}>İncele</Button>
                              <Button variant="success" size="sm" onClick={() => addToCart(product.id)} disabled={product.stock === 0}>
                                  <i className="bi bi-cart-plus"></i>
                              </Button>
                          </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
