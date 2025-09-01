import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Badge, Card, Form, Alert } from 'react-bootstrap';
import BackButton from '../components/BackButton';

const StarRating = ({ rating, onRating, readOnly = false }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i 
        key={i} 
        className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'}`}
        style={{ cursor: readOnly ? 'default' : 'pointer', color: '#ffc107' }}
        onClick={() => !readOnly && onRating(i)}
      ></i>
    );
  }
  return <div>{stars}</div>;
};

function ProductDetail({ products, currentUser, addComment, deleteComment, addRating, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  
  const [commentText, setCommentText] = useState('');

  if (!product) {
    return (
        <Container className="mt-5 text-center"><BackButton /><h2>Ürün bulunamadı!</h2></Container>
    );
  }

  const averageRating = product.ratings.length > 0 
    ? (product.ratings.reduce((acc, r) => acc + r.score, 0) / product.ratings.length)
    : 0;
  const userRating = currentUser ? product.ratings.find(r => r.user === currentUser.email)?.score || 0 : 0;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && currentUser) {
      addComment(product.id, currentUser.email, commentText);
      setCommentText('');
    }
  };

  return (
    <Container className="mt-5">
      <BackButton />
      <Row>
        <Col md={6} className="mb-3">
            <Image src={product.image} alt={product.name} fluid rounded style={{ width: '100%', height: '450px', objectFit: 'cover' }} />
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>
          <div className="d-flex align-items-center mb-2">
            <StarRating rating={averageRating} readOnly={true} />
            <span className="ms-2 text-muted">({product.ratings.length} inceleme)</span>
          </div>
          <p className="lead text-muted my-3">{product.description}</p>
          <h3 className="text-primary display-4 my-4">${product.price}</h3>
          
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={() => addToCart(product.id)} disabled={product.stock === 0}>
              <i className="bi bi-cart-plus me-2"></i> Sepete Ekle
            </Button>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      <Row>
        <Col md={7}>
          <h3 className="mb-4">Kullanıcı Yorumları ({product.comments.length})</h3>
          {product.comments.length > 0 ? (
            product.comments.slice().reverse().map((comment) => (
              <Card key={comment.date} className="mb-3 bg-light border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title as="h6">{comment.user.split('@')[0]}</Card.Title>
                    {currentUser && currentUser.email === comment.user && (
                      <Button variant="link" size="sm" className="p-0 text-danger" onClick={() => deleteComment(product.id, comment.date)}>
                        Sil
                      </Button>
                    )}
                  </div>
                  <Card.Subtitle className="mb-2 text-muted">{new Date(comment.date).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>{comment.text}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Bu ürün için henüz hiç yorum yapılmamış. İlk yorumu siz yapın!</p>
          )}
        </Col>

        <Col md={5}>
          <h3 className="mb-4">Ürünü Değerlendir</h3>
          {currentUser ? (
            <Card className="shadow-sm">
              <Card.Body>
                <h5>Puanınız:</h5>
                <div className="mb-3 fs-4">
                    <StarRating rating={userRating} onRating={(score) => addRating(product.id, currentUser.email, score)} />
                </div>
                <h5>Yorumunuzu Paylaşın:</h5>
                <Form onSubmit={handleCommentSubmit}>
                  <Form.Group className="mb-2">
                    <Form.Control as="textarea" rows={3} value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Ürün hakkındaki düşünceleriniz..." required />
                  </Form.Group>
                  <Button type="submit" variant="primary">Yorumu Gönder</Button>
                </Form>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="warning">
              Yorum yapmak veya puan vermek için <Link to="/login">giriş yapmanız</Link> gerekmektedir.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
