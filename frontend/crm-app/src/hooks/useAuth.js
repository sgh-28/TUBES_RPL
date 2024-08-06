// useAuth.js
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    localStorage.clear();
    navigate('/login');
  };

  return {
    logout
  };
};

export default useAuth;
