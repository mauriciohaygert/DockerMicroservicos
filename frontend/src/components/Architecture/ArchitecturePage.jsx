import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

export default function ArchitecturePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Diagrama de Arquitetura do Ambiente de Produção
      </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <img 
            src="/architecture.svg" 
            alt="Arquitetura do Projeto"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '1200px',
              objectFit: 'contain'
            }}
          />
        </Box>
    </Container>
  );
}