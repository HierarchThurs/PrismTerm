const terminalLines = [
  "$ prism connect gateway-prod",
  "Resolving host gateway.prism.local",
  "Using profile Production / Gateway Prod",
  "Host fingerprint verification pending",
  "",
  "PrismTerm is ready for the next SSH milestone.",
];

export function TerminalPreview() {
  return (
    <div className="panel terminal-preview">
      <div className="terminal-preview__toolbar">
        <div>
          <p className="panel__eyebrow">Preview</p>
          <h2>Terminal Workspace</h2>
        </div>
        <div className="terminal-preview__tabs">
          <span className="terminal-preview__tab terminal-preview__tab--active">gateway-prod</span>
          <span className="terminal-preview__tab">runner-03</span>
        </div>
      </div>

      <div className="terminal-window" aria-label="Static terminal preview">
        <div className="terminal-window__chrome">
          <span />
          <span />
          <span />
        </div>
        <pre className="terminal-window__body">
          {terminalLines.map((line) => (
            <span key={line || "blank"}>{line}</span>
          ))}
        </pre>
      </div>
    </div>
  );
}
