/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2024-03-13 16:20:30
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 15:20:55
 * @FilePath: \react_todoBoard\src\TodoColumn.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useState } from "react";
import { css } from "@emotion/react";
import TodoCard from "./TodoCard";
import NewCard from "./NewCard";
import { COLUMN_KEY_DONE } from "./TodoBoard";
function todoColumnStyles(bgColor) {
  return css`
    flex: 1 1;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 1rem;
    background-color: ${bgColor};
    & > h2 {
      margin: 0.6rem 1rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid gray;
      & > button {
        float: right;
        margin-top: 0.2rem;
        padding: 0.2rem 0.5rem;
        border: 0;
        border-radius: 1rem;
        height: 1.8rem;
        line-height: 1rem;
        font-size: 1rem;
      }
    }
    & > ul {
      flex: 1;
      flex-basis: 0;
      margin: 1rem;
      padding: 0;
      overflow: auto;
    }
  `;
}

export default function TodoColumn({
  cardList = [], //列表数据
  bgColor,
  title,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  onDrop,
  setDragItem,
  canAddNew = false, //是否可添加新卡片
  onAdd,
  onRemove,
}) {
  const [showAdd, setShowAdd] = useState(true);
  const handleAdd = async () => {
    setShowAdd(true); //窗口可见异步，渲染完后成current才有值
  };
  const handleSubmit = (newCard) => { 
    onAdd && onAdd(newCard);
    setShowAdd(false);
  };
  return (
    <section
      onDragStart={(e) => {
        setIsDragSource(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop && onDrop();
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
      css={todoColumnStyles(bgColor)}
    >
      <h2>
        {title}
        {canAddNew && (
          <button onClick={handleAdd} disabled={showAdd}>
            &#8853; 添加新卡片
          </button>
        )}
      </h2>
      <ul>
        {canAddNew && showAdd && <NewCard onSubmit={handleSubmit}></NewCard>}
        {cardList?.map((props) => (
          <TodoCard
            key={props.title}
            {...props}
            onDragStart={() => {
              setDragItem(props);
            }}
            onRemove={onRemove}
          ></TodoCard>
        ))}
      </ul>
    </section>
  );
}
