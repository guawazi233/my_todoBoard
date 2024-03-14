import { css } from "@emotion/react";
const todoCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;
`;

const todoCardTitleStyles = css`
  min-height: 3rem;
`;

export {
    todoCardStyles,
    todoCardTitleStyles,
}
