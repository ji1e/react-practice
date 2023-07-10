import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [like, setLike] = useState(0);
  const [todoLists, setTodoLists] = useState([
    { id: nanoid(), content: "자바스크립트 공부하기", likes: 0 },
    { id: nanoid(), content: "리액트 공부하기", likes: 0 },
  ]);

  return (
    <>
      <input
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const todoCopy = [...todoLists, { id: nanoid(), content: newTodo, likes: 0 }];
          setTodoLists(todoCopy);
          setNewTodo("");
        }}
      >
        입력값 추가
      </button>
      {/* map의 인자 : map(item, index) */}
      {todoLists.map((todos) => {
        return (
          <div className="todolists" key={todos.id}>
            <button
              // 삭제하기
              onClick={() => {
                const filterTodos = todoLists.filter((todo) => {
                  return todo.id !== todos.id;
                });
                setTodoLists(filterTodos);
              }}
            >
              삭제
            </button>
            <span> {todos.content} </span>
            {/* 좋아요 기능 */}
            <div className="like">
              <button
                onClick={() => {
                  const updatedTodoLists = todoLists.map((todo) => {
                    if (todo.id === todos.id) {
                      return { ...todo, likes: todo.likes + 1 };
                    }
                    return todo;
                  });
                  setTodoLists(updatedTodoLists);
                }}
              >
                ♥︎ {todos.likes}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
