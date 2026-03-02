import "./styles.css";
import { TaskLists } from "./TaskLists";
import { useEffect, useState, useRef } from "react";

function useIncrement() {
  const [count, setCount] = useState(1);
  const anotherCount = useRef(1);
  function increment() {
    setCount((prev) => ++prev);
    anotherCount.current++;
  }

  useEffect(() => {
    console.log("Не таймаут", count, anotherCount.current);
    const idex = setTimeout(() => {
      console.log("Таймаут", count, anotherCount.current);
    }, 5000);
    return () => {
      clearTimeout(idex);
    };
  }, [count]);

  return [increment, count];
}

export default function App() {
  const [increment, count] = useIncrement();

  return (
    <div>
      <TaskLists />
      <button onClick={increment}>{count}</button>
    </div>
  );
}
