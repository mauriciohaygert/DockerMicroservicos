import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import UserList from './components/User/UserList';
import UserForm from './components/User/UserForm';
import UserDetail from './components/User/UserDetail';
import Login from './components/Login/Login';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Teste Técnico para Especialista Full Stack
        </Typography>
        <Button color="default" component={Link} to="/">Lista de Usuários</Button>
        <Button color="default" component={Link} to="/new-user">Novo Usuário</Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <MyAppBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><UserList /></RequireAuth>} />
          <Route path="/new-user" element={<RequireAuth><UserForm /></RequireAuth>} />
          <Route path="/user/:id" element={<RequireAuth><UserDetail /></RequireAuth>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
