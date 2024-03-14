/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2023-03-12 22:42:37
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 16:10:39
 * @FilePath: \react_app\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useState, useEffect } from "react";
import AdminContext from "../context/AdminContext";
import logo from "./logo.svg";
import "./App.css";
import TodoBoard from "../components/TodoBoard";
import {
  COLUMN_KEY_TODO,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_DONE,
} from "../components/TodoBoard";

//日期库
const DATA_STORE_KEY = "todo-data-store";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "2023-04-01 08:08" },
    { title: "开发任务-2", status: "2023-03-02 08:08" },
    { title: "开发任务-3", status: "2023-04-03 08:08" },
    { title: "开发任务-4", status: "2023-04-04 08:08" },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [ongoingList, setOngoingList] = useState([
    { title: "测试任务-1", status: "2023-04-01 08:08" },
    { title: "测试任务-2", status: "2023-01-02 08:08" },
  ]);

  const [doneList, setDoneList] = useState([
    { title: "摸鱼任务-1", status: "2023-04-01 08:08" },
    { title: "摸鱼任务-2", status: "2024-01-02 08:08" },
  ]);

  //减少重复代码，索引对象，少用if
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  };

  useEffect(() => {
    const data = window.localStorage.getItem(DATA_STORE_KEY);
    setTimeout(() => {
      if (data) {
        const todoColumn = JSON.parse(data);
        setTodoList(todoColumn.todoList);
        setOngoingList(todoColumn.ongoingList);
        setDoneList(todoColumn.doneList);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAdd = (column, newCard) => {
    updaters[column]((origin) => [newCard, ...origin]);
  };

  const handleRemove = (column, cardToRemove) => {
    //删除源数据
    updaters[column]((origin) =>
      // origin?.filter((item) => !Object.is(item, cardToRemove))
      origin?.filter(item => item.title !== cardToRemove.title)
    );
  };

  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };

  const handleToggleAdmin = (e) => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板
          <button onClick={handleSaveAll}>
            保存所有卡片
          </button>
          <label>
              <input
                type="checkbox"
                value={isAdmin}
                onChange={handleToggleAdmin}
              />
              管理员模式
            </label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={isAdmin}>
        <TodoBoard
          isLoading={isLoading}
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        ></TodoBoard>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
