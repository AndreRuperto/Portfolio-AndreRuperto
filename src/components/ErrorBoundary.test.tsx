import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function ThrowingComponent(): JSX.Element {
  throw new Error("Test error");
}

function GoodComponent() {
  return <div>Everything is fine</div>;
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Everything is fine")).toBeInTheDocument();
  });

  it("renders error UI when child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Algo deu errado. Tente recarregar a página.")).toBeInTheDocument();
    expect(screen.getByText("Recarregar")).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
