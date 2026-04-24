export function TopBar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">Workspace</p>
        <h1>PrismTerm Control Center</h1>
      </div>

      <div className="topbar__actions" aria-label="Workspace status">
        <div className="topbar__search">Search hosts, sessions, commands</div>
        <button className="button button--secondary" type="button">
          Import
        </button>
        <button className="button button--primary" type="button">
          New Connection
        </button>
      </div>
    </header>
  );
}
