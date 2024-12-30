import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "../../test/test-utils";
import { useTask } from "../../hooks/useTask";
import { TaskProvider } from "../TaskContext";

const TestComponent = () => {
  const { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask } = useTask();
  return (
    <div>
      <div data-testid="loading-state">{loading ? "loading" : "not-loading"}</div>
      {error && <div data-testid="error-message">{error}</div>}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} data-testid="task-item">
            {task.title}
            <button onClick={() => updateTask(task._id, { completed: !task.completed })}>
              Toggle
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => fetchTasks()}>Fetch Tasks</button>
      <button onClick={() => addTask({ title: "New Task" })}>Add Task</button>
    </div>
  );
};

describe("TaskContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "fake-token"); // Ensure we have a token for API calls
  });

  const mockTasks = [
    { _id: "1", title: "Task 1", completed: false },
    { _id: "2", title: "Task 2", completed: true },
  ];

  it("shows loading state while fetching tasks", async () => {
    global.fetch = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Fetch Tasks").click();
    });

    expect(screen.getByTestId("loading-state")).toHaveTextContent("loading");
  });

  it("successfully fetches and displays tasks", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks),
      })
    );

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Fetch Tasks").click();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("task-item")).toHaveLength(2);
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });

  it("handles task addition successfully", async () => {
    const newTask = { _id: "3", title: "New Task", completed: false };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(newTask),
      })
    );

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Add Task").click();
    });

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  it("handles task update successfully", async () => {
    global.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTasks),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ...mockTasks[0], completed: true }),
        })
      );

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Fetch Tasks").click();
    });

    await waitFor(async () => {
      const toggleButtons = await screen.getAllByText("Toggle");
      toggleButtons[0].click();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tasks/1"),
      expect.objectContaining({
        method: "PUT",
      })
    );
  });

  it("handles errors appropriately", async () => {
    const errorMessage = "Failed to fetch tasks";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: errorMessage }),
      })
    );

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Fetch Tasks").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(errorMessage);
    });
  });

  it("handles task deletion successfully", async () => {
    global.fetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTasks),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      );

    render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      screen.getByText("Fetch Tasks").click();
    });

    await waitFor(async () => {
      const deleteButtons = await screen.getAllByText("Delete");
      deleteButtons[0].click();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/tasks/1"),
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
