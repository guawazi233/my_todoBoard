/*
 * @Author: xianxian 1453706865@qq.com
 * @Date: 2023-04-02 21:30:20
 * @LastEditors: xianxian 1453706865@qq.com
 * @LastEditTime: 2024-03-14 10:38:55
 * @FilePath: \react_app\src\components\NewCard.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { css } from "@emotion/react";
import { todoCardStyles, todoCardTitleStyles } from "../constants/styles";
const NewCard = ({ onSubmit }, ref) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
    },
  }));
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newCard = { title: inputRef?.current?.value, status: new Date().toString() };
      onSubmit(newCard);
    }
  };

  return (
    <li css={todoCardStyles}>
      <h3>添加新卡片</h3>
      <div
        css={css`
          ${todoCardTitleStyles}
          & > input[type="text"] {
            width: 80%;
          }
        `}
      >
        <input type="text" ref={inputRef} onKeyDown={handleKeyDown}></input>
      </div>
    </li>
  );
};
export default React.forwardRef(NewCard);
