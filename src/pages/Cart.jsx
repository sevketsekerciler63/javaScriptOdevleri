import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// currentUser prop'u, kimin giriş yaptığını bilmek için eklendi
function Cart({ currentUser }) {

  // Eğer kullanıcı giriş yapmamışsa, bir uyarı göster
  if (!currentUser) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">
          <h4>Sepetinizi Görüntüleyemiyorsunuz</h4>
          <p className="mb-0">
            Alışverişe devam etmek ve sepetinizdeki ürünleri görmek için lütfen <Link to="/login">giriş yapın</Link> veya <Link to="/register">kayıt olun</Link>.
          </p>
        </Alert>
      </Container>
    );
  }

  // Kullanıcı giriş yapmışsa (şimdilik boş bir sepet göster)
  return (
    <Container className="mt-5">
      <h1 className="mb-4">Alışveriş Sepetim</h1>
      {/* Sepet içeriği buraya gelecek */}
      <p>Sepetiniz şu an boş.</p>
    </Container>
  );
}

export default Cart;
