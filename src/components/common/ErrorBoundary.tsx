import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Catches render-time failures (e.g. a malformed trumpet data entry) so the
 * presentation never freezes on a black screen — per the brief's error
 * handling requirement. Offers the presenter a way back to the journey map.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Seven Trumpets — recovered from render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            background: "#08090c",
            color: "#efe6d3",
            textAlign: "center",
            padding: 24,
            gap: 16,
          }}
        >
          <p style={{ fontFamily: "Cinzel, serif", fontSize: 18 }}>
            Something interrupted the presentation.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              padding: "12px 24px",
              borderRadius: 10,
              border: "1px solid #c9a15a",
              color: "#f0d9a3",
            }}
          >
            Restart
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
