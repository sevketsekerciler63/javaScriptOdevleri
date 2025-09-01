import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = handleLogin({ email, password });

    if (result.user) {
      // Giriş başarılı, admin mi diye kontrol et ve yönlendir
      if (result.user.isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } else {
      // Giriş başarısız, hata mesajı göster
      setError(result.error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '400px' }} className="shadow-lg">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Giriş Yap</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-posta Adresi</Form.Label>
              <Form.Control type="email" placeholder="E-posta girin" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <div className="d-grid">
                <Button variant="primary" type="submit">Giriş Yap</Button>
            </div>
          </Form>
          <div className="mt-3 text-center">
            Hesabın yok mu? <Link to="/register">Hesap Oluştur</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
