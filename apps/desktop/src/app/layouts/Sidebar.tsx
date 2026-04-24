import brandIcon from "../../assets/brand/icon.png";
import brandLogo from "../../assets/brand/Logo.png";

const navigationItems = [
  { label: "Connections", shortcut: "C", active: true },
  { label: "Sessions", shortcut: "S", active: false },
  { label: "Terminal", shortcut: "T", active: false },
  { label: "Plugins", shortcut: "P", active: false },
  { label: "Settings", shortcut: "G", active: false },
];

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <img className="sidebar__icon" src={brandIcon} alt="" />
        <img className="sidebar__logo" src={brandLogo} alt="PrismTerm" />
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <button
            className={`sidebar__nav-item${item.active ? " sidebar__nav-item--active" : ""}`}
            key={item.label}
            type="button"
          >
            <span className="sidebar__nav-shortcut" aria-hidden="true">
              {item.shortcut}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="status-dot status-dot--online" />
        <span>Local agent ready</span>
      </div>
    </aside>
  );
}
