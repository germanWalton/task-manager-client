import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../../test/test-utils";
import TaskItem from "../TaskItem";

describe("TaskItem", () => {
  const mockTask = {
    _id: "1",
    title: "Test Task",
    description: "Test Description",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders task details correctly", () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("calls onToggle when toggle button is clicked", () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);

    const toggleButton = screen.getByTitle(/mark as completed/i);
    fireEvent.click(toggleButton);

    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTask);
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);

    const editButton = screen.getByTitle(/edit task/i);
    fireEvent.click(editButton);

    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<TaskItem task={mockTask} {...mockHandlers} />);

    const deleteButton = screen.getByTitle(/delete task/i);
    fireEvent.click(deleteButton);

    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTask._id);
  });

  it("shows completed status correctly", () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} {...mockHandlers} />);

    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByTitle(/mark as pending/i)).toBeInTheDocument();
  });
});
