import { useState } from "react";
import { Task } from "./Task";

export function List({
  list,
  onAddTask,
  listIndex,
  saveTask,
  removeTask,
  changeTaskStatus,
}) {
  const [taskInput, setTaskInput] = useState("");
  function changeInput(event) {
    setTaskInput(event.target.value);
  }
  function addTask() {
    onAddTask(listIndex, taskInput);
    setTaskInput("");
  }
  return (
    <div>
      <h1>Список дел: {list.name}</h1>
      <div>
        <input value={taskInput} onChange={changeInput} />
        <button onClick={addTask}>создать задачу</button>
      </div>
      <ul>
        {list.tasks.map((task, taskIndex) => {
          return (
            <Task
              task={task}
              listIndex={listIndex}
              taskIndex={taskIndex}
              onSaveTask={saveTask}
              onRemoveTask={removeTask}
              onChangeTaskStatus={changeTaskStatus}
            />
          );
        })}
      </ul>
    </div>
  );
}
