const sessionFacts = [
  { label: "Session", value: "Preview only" },
  { label: "Auth", value: "Not connected" },
  { label: "PTY", value: "120 x 34" },
  { label: "Encoding", value: "UTF-8" },
];

const activityItems = [
  "Workspace shell initialized",
  "3 connection profiles loaded",
  "SSH engine not attached",
];

export function SessionInspector() {
  return (
    <aside className="panel session-inspector">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Status</p>
          <h2>Session Inspector</h2>
        </div>
      </div>

      <dl className="session-inspector__facts">
        {sessionFacts.map((fact) => (
          <div className="session-inspector__fact" key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="session-inspector__section">
        <h3>Activity</h3>
        <ul>
          {activityItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="session-inspector__security">
        <span className="status-dot status-dot--locked" />
        <div>
          <h3>Credential vault</h3>
          <p>Static placeholder. No secrets are stored or requested in this phase.</p>
        </div>
      </div>
    </aside>
  );
}
