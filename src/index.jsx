/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2024-03-13 23:46:25
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 09:28:38
 * @FilePath: \my_todoBoard\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

