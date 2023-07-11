import "./App.css";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

function App() {
  // 라이트모드 알아보기 쉽게 따로 분리
  const lightTheme = {
    color: "#000000",
    backgroundColor: "#ffffff",
  };
  // 다크모드 알아보기 쉽게 따로 분리
  const darkTheme = {
    backgroundColor: "#2b2b2b",
    color: "#ffffff",
  };

  // 라이트/다크 모드바뀌니까 useState 만들기(초기값 : 체크박스해제)
  const [isCheked, setIsChecked] = useState(false);

  // ---------------------------------------------

  // 투두리스트에 관한 항목과 내용을 한번에 여기 안에 객체로 넣으면 관리하기 편함.
  const [todoLists, setTodoLists] = useState([
    { id: nanoid(), content: "자바스크립트 공부하기", likes: 0 },
    { id: nanoid(), content: "리액트 공부하기", likes: 0 },
  ]);
  // 추가되는 투두리스트 초기값은 비워놓음
  const [newTodo, setNewTodo] = useState("");

  // ---------------------------------------------

  // option의 value가 변경되니까 state 만들어주기
  const [selected, setSelected] = useState("");

  // 선택지 변경 시 이벤트가 일어난 값 setSelected 해주기
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <body>
      {/* 다크/라이트 모드 체크 여부에 따라 스타일 변경 */}
      <Container style={isCheked ? darkTheme : lightTheme}>
        <label>
          {isCheked === false ? "다크모드" : "라이트모드"}
          {/* input이 onClick/onChange 되면 Container 스타일을 lightTheme or DarkTheme로 바꾸기 */}
          <input
            type="checkbox"
            onChange={() => {
              // 체크되면 현재상태의 반대로(! => not)
              setIsChecked(!isCheked);
              console.log(isCheked);
            }}
          />
        </label>
        <div style={{ padding: "10px" }}>
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
        {todoLists.map((todos, index) => {
          return (
            <TodoLists key={todos.id}>
              <span>No. {index + 1} :&nbsp;</span>
              <span> {todos.content} </span>
              <div className="button">
                {/* 좋아요 기능 */}
                <button
                  // onClick={} 안에는 함수 넣어야함
                  onClick={() => {
                    const updatedTodoLists = todoLists.map((todo) => {
                      // 클락한 곳을 찾아서 좋아요를 +1씩 한다.
                      if (todo.id === todos.id) {
                        // 기존 투두리스트 펼쳐서 가져오고 좋아요수만 +1 하여 덮어쓰기
                        return { ...todo, likes: todo.likes + 1 };
                        // return으로 막아줘서 어차피 else까지 안내려옴 = else 안써도 됨(반복문의 break와 비슷)
                      }
                      // 좋아요 안누른건 기존내용을 그대로 가져오기
                      return todo;
                    });
                    // 새로 바꾼 배열을 다시 setTodoLists하기
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
        <div>
          <p>----------------------------------------</p>
          <select name="selectList" onChange={handleSelect}>
            <option value="">선택하세요</option>
            <option value="공부하기">공부하기</option>
            <option value="복습하기">복습하기</option>
            <option value="운동하기">운동하기</option>
          </select>
          <div>{selected}</div>
        </div>
      </Container>
    </body>
  );
}

const Container = styled.div`
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
  padding: 10px;
`;

export default App;
