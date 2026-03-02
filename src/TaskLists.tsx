import { useState } from "react";
import { List } from "./List";

export function TaskLists() {
  //Стейт массива из туду листов
  const [todoLists, setTodoLists] = useState([
    {
      name: "Поход в магазин",
      tasks: [
        {
          name: "купить хлеб",
          status: "new",
          description: "обязательно купить черный хлеб",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "купить морковь",
          status: "new",
          description: "обязательно купить морковь",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  function addTask(listIndex, taskInput) {
    setTodoLists((prev) =>
      prev.map((list, index) =>
        index === listIndex
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  name: taskInput,
                  status: "new",
                  description: "",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              updatedAt: new Date(),
            }
          : list
      )
    );
  }

  function removeTask(listIndex, taskIndex) {
    setTodoLists((prev) =>
      prev.map((list, lIndex) =>
        lIndex === listIndex
          ? {
              ...list,
              tasks: list.tasks.filter((task, tIndex) => tIndex !== taskIndex),
              updatedAt: new Date(),
            }
          : list
      )
    );
  }

  function saveTask(listIndex, taskIndex, input) {
    setTodoLists((prev) =>
      prev.map((list, lIndex) =>
        lIndex === listIndex
          ? {
              ...list,
              tasks: list.tasks.map((task, tIndex) =>
                tIndex === taskIndex
                  ? {
                      ...task,
                      name: input,
                      updatedAt: new Date(),
                    }
                  : task
              ),
              updatedAt: new Date(),
            }
          : list
      )
    );
  }

  function changeTaskStatus(listIndex, taskIndex) {
    setTodoLists((prev) =>
      prev.map((list, lIndex) =>
        lIndex === listIndex
          ? {
              ...list,
              tasks: list.tasks.map((task, tIndex) =>
                tIndex === taskIndex
                  ? {
                      ...task,
                      status: task.status === "new" ? "completed" : "new",
                      updatedAt: new Date(),
                    }
                  : task
              ),
            }
          : list
      )
    );
  }
  const [listInput, setListInput] = useState("");

  function addTodoList() {
    setTodoLists((prev) => [
      ...prev,
      {
        name: listInput,
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    setListInput("");
  }

  //обработка ввода
  function changeListInput(event) {
    setListInput(event.target.value);
  }
  return (
    <div>
      <div>
        <input value={listInput} onChange={changeListInput} />
        <button onClick={addTodoList}>Создать новый список</button>
      </div>
      {todoLists.map((list, listIndex) => (
        <List
          key={listIndex}
          list={list}
          onAddTask={addTask}
          listIndex={listIndex}
          saveTask={saveTask}
          removeTask={removeTask}
          changeTaskStatus={changeTaskStatus}
        />
      ))}
    </div>
  );
}
