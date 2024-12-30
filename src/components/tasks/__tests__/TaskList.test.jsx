import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../../test/test-utils";
import { useTask } from "../../../hooks/useTask";
import TaskList from "../TaskList";

vi.mock("../../../hooks/useTask", () => ({
  useTask: vi.fn(),
}));

describe("TaskList", () => {
  const mockTasks = [
    {
      _id: "1",
      title: "Task 1",
      description: "Description 1",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Task 2",
      description: "Description 2",
      completed: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const mockTaskHook = {
    tasks: mockTasks,
    loading: false,
    error: null,
    fetchTasks: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn(),
  };

  beforeEach(() => {
    useTask.mockReturnValue(mockTaskHook);
  });

  it("renders loading state correctly", () => {
    useTask.mockReturnValue({ ...mockTaskHook, loading: true });
    render(<TaskList />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders error state correctly", () => {
    const errorMessage = "Failed to fetch tasks";
    useTask.mockReturnValue({ ...mockTaskHook, error: errorMessage });
    render(<TaskList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders task list correctly", () => {
    render(<TaskList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("filters tasks correctly", async () => {
    render(<TaskList />);

    // Click completed filter
    const completedFilter = screen.getByRole("button", { name: /completed/i });
    fireEvent.click(completedFilter);

    await waitFor(() => {
      expect(mockTaskHook.fetchTasks).toHaveBeenCalledWith("?completed=true");
    });
  });

  it("shows task statistics correctly", () => {
    render(<TaskList />);

    expect(screen.getByText("2")).toBeInTheDocument(); // Total
    expect(screen.getByText("1")).toBeInTheDocument(); // Completed
    expect(screen.getByText("1")).toBeInTheDocument(); // Pending
  });

  it("handles task deletion", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<TaskList />);

    const deleteButton = screen.getAllByTitle(/delete task/i)[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockTaskHook.deleteTask).toHaveBeenCalledWith("1");
    });
  });

  it("handles task completion toggle", async () => {
    render(<TaskList />);

    const toggleButton = screen.getAllByTitle(/mark as completed/i)[0];
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(mockTaskHook.updateTask).toHaveBeenCalledWith("1", { completed: true });
    });
  });

  it("shows no tasks message when list is empty", () => {
    useTask.mockReturnValue({ ...mockTaskHook, tasks: [] });
    render(<TaskList />);

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });
});
