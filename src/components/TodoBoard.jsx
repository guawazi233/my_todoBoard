/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2024-03-13 16:10:56
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 15:19:31
 * @FilePath: \react_todoBoard\src\TodoBoard.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {useState} from 'react'
import { css } from "@emotion/react";
import TodoColumn from './TodoColumn'
//颜色
const COLUMN_BG_COLOR = {
  todo: "#C9AF97",
  ongoing: "#FFE799",
  done: "#C0E8BA",
  loading: "#E3E3E3",
};
//看板列
export const COLUMN_KEY_TODO = "todo";
export const COLUMN_KEY_ONGOING = "ongoing";
export const COLUMN_KEY_DONE = "done";
const todoBoardStyles = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;
export default function TodoBoard({
  isLoading=true,
  todoList,
  ongoingList,
  doneList,
  onAdd,
  onRemove,
}) {
  //拖拽
  const [dragItem, setDragItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (e) => {
    if (!dragItem || !dragTarget || !dragSource || dragSource === dragTarget) {
      return;
    }
    //删除并添加
    onRemove(dragSource, dragItem);
    onAdd(dragTarget, dragItem);
  }
  
  return (
    <main css={todoBoardStyles}>
      {isLoading ? (
        <TodoColumn
          key="loading"
          bgColor={COLUMN_BG_COLOR.loading}
          title={<>读取中...</>}
        ></TodoColumn>
      ) : (
        <>
          <TodoColumn //children是一个特殊参数 一般不需要显示地传值 在闭合标签内加入子元素 子元素会自动作为children传给React组件
            key="添加新卡片"
            cardList={todoList}
            bgColor={COLUMN_BG_COLOR.todo}
            title={"待处理"}
            setIsDragSource={(isSrc) => {
              setDragSource(isSrc ? COLUMN_KEY_TODO : null);
            }}
            setIsDragTarget={(isTgt) => {
              setDragTarget(isTgt ? COLUMN_KEY_TODO : null);
            }}
            onDrop={handleDrop}
            setDragItem={setDragItem}
            canAddNew={true} //是否可以添加新卡片
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
          ></TodoColumn>
          <TodoColumn
            key="进行中"
            cardList={ongoingList}
            bgColor={COLUMN_BG_COLOR.ongoing}
            title={<>进行中</>}
            setIsDragSource={(isSrc) => {
              setDragSource(isSrc ? COLUMN_KEY_ONGOING : null);
            }}
            setIsDragTarget={(isTgt) => {
              setDragTarget(isTgt ? COLUMN_KEY_ONGOING : null);
            }}
            onDrop={handleDrop}
            setDragItem={setDragItem}
          ></TodoColumn>
          <TodoColumn
            key="已完成"
            cardList={doneList}
            bgColor={COLUMN_BG_COLOR.done}
            title={<>已完成</>}
            setIsDragSource={(isSrc) => {
              setDragSource(isSrc ? COLUMN_KEY_DONE : null);
            }}
            setIsDragTarget={(isTgt) => {
              setDragTarget(isTgt ? COLUMN_KEY_DONE : null);
            }}
            onDrop={handleDrop}
            onRemove={onRemove?.bind(null, COLUMN_KEY_DONE)}
            setDragItem={setDragItem}
          ></TodoColumn>
        </>
      )}
    </main>
  );
}
