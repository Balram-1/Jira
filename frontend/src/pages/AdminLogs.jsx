import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  
  // Note: Backend endpoint /audit-logs needs to be created in adminController for this to fully work.
  // This is a placeholder for the UI logic.
  
  return (
    <div className="content">
      <h1>Security Audit Logs</h1>
      <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
        View system-wide actions and events. Only accessible by ADMIN.
      </p>
      
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--bg-color)' }}>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Timestamp</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Action</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>User Role</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-light)' }}>
                No logs loaded. (API endpoint pending).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogs;
