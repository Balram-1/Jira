import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data.data)).catch(console.error);
  }, []);

  const createProject = async () => {
    try {
      const name = prompt("Project Name:");
      if (!name) return;
      const key = name.substring(0, 3).toUpperCase();
      await api.post('/projects', { name, key, description: "New project" });
      const res = await api.get('/projects');
      setProjects(res.data.data);
    } catch (e) {
      alert("Failed to create project (check permissions)");
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="brand">Jira Clone</div>
        <div className="user-info">
          <span>{user.name} ({user.role})</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </nav>
      
      <main className="content">
        <div className="header">
          <h1>Projects</h1>
          {(user.role === 'ADMIN' || user.role === 'MANAGER') && (
            <button onClick={createProject} className="primary-btn">Create Project</button>
          )}
        </div>
        
        <div className="project-grid">
          {projects.length === 0 ? <p>No projects found.</p> : null}
          {projects.map(p => (
            <Link to={`/projects/${p._id}`} key={p._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project-card">
                <h3>{p.name} <span className="tag">{p.key}</span></h3>
                <p>{p.description}</p>
                <div className="meta">Owner: {p.owner?.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
