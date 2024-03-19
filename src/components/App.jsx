import React, { useState, useEffect, useCallback } from 'react';
import AdminContext from '../context/AdminContext';
import logo from './logo.svg';
import './App.css';
import TodoBoard, {
  COLUMN_KEY_TODO,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_DONE,
} from './TodoBoard';

// 日期库
const DATA_STORE_KEY = 'todo-data-store';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2023-04-01 08:08' },
    { title: '开发任务-2', status: '2023-03-02 08:08' },
    { title: '开发任务-3', status: '2023-04-03 08:08' },
    { title: '开发任务-4', status: '2023-04-04 08:08' },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [ongoingList, setOngoingList] = useState([
    { title: '测试任务-1', status: '2023-04-01 08:08' },
    { title: '测试任务-2', status: '2023-01-02 08:08' },
  ]);

  const [doneList, setDoneList] = useState([
    { title: '摸鱼任务-1', status: '2023-04-01 08:08' },
    { title: '摸鱼任务-2', status: '2024-01-02 08:08' },
  ]);

  // 减少重复代码，索引对象，少用if
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
    // 删除源数据
    updaters[column]((origin) => origin?.filter((item) => item.title !== cardToRemove.title));
  };

  const handleSaveAll = () => {
    const data = JSON.stringify({
      todoList,
      ongoingList,
      doneList,
    });
    window.localStorage.setItem(DATA_STORE_KEY, data);
  };

  const handleToggleAdmin = useCallback(() => {
    setIsAdmin(!isAdmin);
  }, [isAdmin]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          我的看板
          <button onClick={handleSaveAll} type="button">保存所有卡片</button>
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              value={isAdmin}
              onChange={handleToggleAdmin}
              id="isAdmin"
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
        />
      </AdminContext.Provider>
    </div>
  );
}

export default App;
