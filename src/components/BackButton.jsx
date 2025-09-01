import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="outline-secondary" 
      onClick={() => navigate(-1)} // Bir önceki sayfaya gider
      className="mb-4"
    >
      <i className="bi bi-arrow-left"></i> Geri Dön
    </Button>
  );
};

export default BackButton;
