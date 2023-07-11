import "./App.css";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todoLists, setTodoLists] = useState([
    { id: nanoid(), content: "자바스크립트 공부하기", likes: 0 },
    { id: nanoid(), content: "리액트 공부하기", likes: 0 },
  ]);

  // 다크/라이트모드 객체
  const lightTheme = {
    color: "#000000",
    backgroundColor: "#ffffff",
  };
  const darkTheme = {
    backgroundColor: "#2b2b2b",
    color: "#ffffff",
  };
  // 초기값 : 라이트모드(체크박스해제)로 설정
  const [isCheked, setIsChecked] = useState(false);

  return (
    <body>
      {/* 다크/라이트 모드 체크되면 스타일 변경 */}
      <TodoContainer style={isCheked === false ? lightTheme : darkTheme}>
        <label>
          {isCheked === false ? "다크모드" : "라이트모드"}
          {/* 인풋이 온체인지되면 TodoContainer에 DarkTheme가 추가되게 하기!! */}
          <input
            type="checkbox"
            onChange={() => {
              setIsChecked(!isCheked);
              console.log(isCheked);
            }}
          />
        </label>
        <div className="addTodo">
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
            할 일 추가
          </button>
        </div>
        {/* map의 인자 : map(item, index) */}
        {todoLists.map((todos) => {
          return (
            <TodoLists key={todos.id}>
              <span> {todos.content} </span>
              <div className="button">
                {/* 좋아요 기능 */}
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
                {/* 삭제하기 */}
                <button
                  onClick={() => {
                    const filterTodos = todoLists.filter((todo) => {
                      return todo.id !== todos.id;
                    });
                    setTodoLists(filterTodos);
                  }}
                >
                  삭제
                </button>
              </div>
            </TodoLists>
          );
        })}
      </TodoContainer>
    </body>
  );
}

const TodoContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TodoLists = styled.div`
  display: flex;
`;

export default App;
