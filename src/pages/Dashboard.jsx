import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Table, Badge } from 'react-bootstrap';

function Dashboard({ addProduct, deleteProduct, products }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(''); // Bu state artık Base64 verisini tutacak
  const [success, setSuccess] = useState('');

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Dosyayı okuyup Base64 formatında state'e kaydet
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !stock) {
        alert('Lütfen tüm zorunlu alanları doldurun.');
        return;
    }

    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: image || `https://via.placeholder.com/300x200.png?text=${name.replace(/\s/g, '+')}`,
    };

    addProduct(newProduct);

    // Formu temizle
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setImage('');
    e.target.reset(); // Dosya input'unu temizlemek için
    setSuccess('Ürün başarıyla eklendi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Container fluid className="p-4">
      <h1 className="h2 mb-4">Yönetici Paneli</h1>
      {success && <Alert variant="success">{success}</Alert>}
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header as="h5">Yeni Ürün Ekle</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* ... Diğer form alanları ... */}
                <Form.Group className="mb-3"><Form.Label>Ürün Adı</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Açıklama</Form.Label><Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Fiyat ($)</Form.Label><Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Stok Adedi</Form.Label><Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required /></Form.Group>
                {/* Resim URL'si input'u dosya seçme ile değiştirildi */}
                <Form.Group className="mb-3">
                  <Form.Label>Ürün Resmi</Form.Label>
                  <Form.Control type="file" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
                </Form.Group>
                <div className="d-grid"><Button variant="primary" type="submit">Ürünü Ekle</Button></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
            {/* Mevcut Ürünler Listesi (değişiklik yok) */}
            <Card className="shadow-sm">
            <Card.Header as="h5">Mevcut Ürünler</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ürün Adı</th>
                    <th>Fiyat</th>
                    <th>Stok</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td><Badge bg={product.stock > 0 ? 'success' : 'danger'}>{product.stock > 0 ? `${product.stock} Adet` : 'Tükendi'}</Badge></td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => deleteProduct(product.id)}>
                          <i className="bi bi-trash"></i> Sil
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
