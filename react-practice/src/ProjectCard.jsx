function ProjectCard({ name, issues, status }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{issues} issues</p>
      <p>{status}</p>
    </div>
  );
}

export default ProjectCard;
