type ConnectionStatus = "online" | "idle" | "locked";

type ConnectionItem = {
  id: string;
  name: string;
  host: string;
  group: string;
  latency: string;
  status: ConnectionStatus;
};

const connections: ConnectionItem[] = [
  {
    id: "gateway-prod",
    name: "Gateway Prod",
    host: "ops@gateway.prism.local",
    group: "Production",
    latency: "24 ms",
    status: "online",
  },
  {
    id: "build-runner",
    name: "Build Runner",
    host: "ci@runner-03.internal",
    group: "Infrastructure",
    latency: "42 ms",
    status: "idle",
  },
  {
    id: "audit-node",
    name: "Audit Node",
    host: "audit@10.12.8.21",
    group: "Security",
    latency: "locked",
    status: "locked",
  },
];

const statusLabel: Record<ConnectionStatus, string> = {
  online: "Online",
  idle: "Idle",
  locked: "Key required",
};

export function ConnectionList() {
  return (
    <div className="panel connection-list">
      <div className="panel__header">
        <div>
          <p className="panel__eyebrow">Fleet</p>
          <h2>Connections</h2>
        </div>
        <span className="panel__count">{connections.length}</span>
      </div>

      <div className="connection-list__items">
        {connections.map((connection) => (
          <article className="connection-card" key={connection.id}>
            <div className="connection-card__main">
              <span className={`status-dot status-dot--${connection.status}`} />
              <div>
                <h3>{connection.name}</h3>
                <p>{connection.host}</p>
              </div>
            </div>
            <div className="connection-card__meta">
              <span>{connection.group}</span>
              <span>{connection.latency}</span>
            </div>
            <div className="connection-card__status">{statusLabel[connection.status]}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
