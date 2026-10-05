import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login to Jira' : 'Create an Account'}</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required={!isLogin}
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required 
          />
          <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
