import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "../../test/test-utils";
import { useAuth } from "../../hooks/useAuth";
import { AuthProvider } from "../AuthContext";

const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "authenticated" : "not-authenticated"}</div>
      {user && <div data-testid="user-email">{user.email}</div>}
      <button onClick={() => login("test@example.com", "password")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("initializes with unauthenticated state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent("not-authenticated");
  });

  it("updates state on successful login", async () => {
    const mockUser = { email: "test@example.com" };
    const mockToken = "fake-token";

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, token: mockToken }),
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText("Login").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("authenticated");
      expect(screen.getByTestId("user-email")).toHaveTextContent(mockUser.email);
      expect(localStorage.getItem("token")).toBe(mockToken);
    });
  });

  it("handles login failure correctly", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText("Login").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("not-authenticated");
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  it("handles logout correctly", async () => {
    localStorage.setItem("token", "fake-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText("Logout").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("not-authenticated");
      expect(localStorage.getItem("token")).toBeNull();
    });
  });

  it("verifies token on mount", async () => {
    const mockUser = { email: "test@example.com" };
    const mockToken = "fake-token";
    localStorage.setItem("token", mockToken);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status")).toHaveTextContent("authenticated");
      expect(screen.getByTestId("user-email")).toHaveTextContent(mockUser.email);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/verify"),
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      })
    );
  });
});
