import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProjectIssues = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, issuesRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get(`/issues?projectId=${id}`)
        ]);
        setProject(projRes.data.data);
        setIssues(issuesRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const createIssue = async () => {
    const title = prompt("Issue Title:");
    if (!title) return;
    try {
      await api.post('/issues', {
        title,
        description: "New issue description",
        project: id,
        status: 'TODO',
        priority: 'MEDIUM'
      });
      const res = await api.get(`/issues?projectId=${id}`);
      setIssues(res.data.data);
    } catch (e) {
      alert("Failed to create issue");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="content">
      <div className="header">
        <div>
          <Link to="/" className="link">← Back to Projects</Link>
          <h1 style={{ marginTop: '1rem' }}>{project.name} Issues</h1>
        </div>
        {user.role !== 'VIEWER' && (
          <button onClick={createIssue} className="primary-btn">Create Issue</button>
        )}
      </div>

      <div className="project-grid">
        {['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'].map(status => (
          <div key={status} className="kanban-col" style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3>{status.replace('_', ' ')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {issues.filter(i => i.status === status).map(issue => (
                <div key={issue._id} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-color)' }}>
                  <h4>{issue.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', margin: '0.5rem 0' }}>Priority: {issue.priority}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectIssues;
