import { ConnectionList } from "../../features/connections/components/ConnectionList";
import { SessionInspector } from "../../features/sessions/components/SessionInspector";
import { TerminalPreview } from "../../features/terminal/components/TerminalPreview";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <TopBar />
        <main className="workspace" aria-label="PrismTerm workspace">
          <section className="workspace__connections" aria-label="Connections">
            <ConnectionList />
          </section>
          <section className="workspace__terminal" aria-label="Terminal preview">
            <TerminalPreview />
          </section>
          <section className="workspace__inspector" aria-label="Session status">
            <SessionInspector />
          </section>
        </main>
      </div>
    </div>
  );
}
