import { useState } from "react";

export function Task({
  task,
  onChangeTaskStatus,
  onRemoveTask,
  onSaveTask,
  listIndex,
  taskIndex,
}) {
  const [isEditTask, setIsEditTask] = useState(false);
  const [input, setInput] = useState("");
  function saveTask() {
    onSaveTask(listIndex, taskIndex, input);
    setIsEditTask(false);
  }
  function removeTask() {
    onRemoveTask(listIndex, taskIndex);
  }
  function changeTaskStatus() {
    onChangeTaskStatus(listIndex, taskIndex);
  }
  function startEdit() {
    setIsEditTask(true);

    setInput("");
  }
  function cancelEdit() {
    setIsEditTask(false);
  }

  function changeTaskInput(event) {
    setInput(event.target.value);
  }

  const isCompleted = task.status === "completed";
  return (
    <li>
      {isEditTask ? (
        <>
          <input value={input} onChange={changeTaskInput} />
          <button onClick={saveTask}>Сохранить</button>
          <button onClick={cancelEdit}>Отмена</button>
        </>
      ) : (
        <>
          <span className={isCompleted ? "isDone" : ""}>
            {task.name} {task.updatedAt.toISOString()}
          </span>
          {task.status}
          <button onClick={removeTask}>x</button>
          <button onClick={startEdit}>Редактировать</button>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={changeTaskStatus}
          />
        </>
      )}
    </li>
  );
}
