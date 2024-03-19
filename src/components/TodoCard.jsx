import React, { useEffect, useState, useContext } from 'react';
import { css } from '@emotion/react';
import AdminContext from '../context/AdminContext';
import { todoCardStyles, todoCardTitleStyles } from '../constants/styles';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 60 * HOUR;
const UPDATE_INTERVAL = MINUTE;
function TodoCard({
  title, status, onDragStart, onRemove,
}) {
  const [displayTime, setDisplayTime] = useState(status);
  const isAdmin = useContext(AdminContext);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', title);
    onDragStart && onDragStart(e);
  };
  return (
    <li css={todoCardStyles} draggable onDragStart={handleDragStart}>
      <div css={todoCardTitleStyles}>{title}</div>
      <div
        css={css`
          text-align: right;
          font-size: 0.8rem;
          color: #333;
        `}
      >
        {displayTime}
        {isAdmin && onRemove && (
          <button
            onClick={() => {
              onRemove({ title });
            }}
            type="button"
          >
            X
          </button>
        )}
      </div>
    </li>
  );
}
export default TodoCard;
