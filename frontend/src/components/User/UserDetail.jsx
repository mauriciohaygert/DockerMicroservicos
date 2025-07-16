import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getEnrichmentUser } from '../../api/index.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [enrichment, setEnrichment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrichmentLoading, setEnrichmentLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUser(id)
      .then(data => {
        setUser(data);
        setLoading(false);
        setEnrichmentLoading(true);
        return getEnrichmentUser(data.uuid);
      })
      .then(data => {
        setEnrichment(data);
        setEnrichmentLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setEnrichmentLoading(false);
      });
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Alert severity="warning">Usuário não encontrado.</Alert>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>Detalhes do Usuário</Typography>
      <Typography variant="body1"><b>Nome:</b> {user.name}</Typography>
      <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
      {enrichmentLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}><CircularProgress size={20} /></Box>
      ) : enrichment && enrichment.linkedin ? (
        <Box>
          <Typography variant="body1"><b>LinkedIn:</b> {enrichment.linkedin}</Typography>
          <Typography variant="body1"><b>GitHub:</b> {enrichment.github}</Typography>
        </Box>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>Dados em processamento ou não disponíveis.</Alert>
      )}
    </Box>
  );
} 