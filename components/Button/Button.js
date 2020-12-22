import React from "react";
import styled from "styled-components";

const Root = styled.button`
  padding: 8px 24px;
  margin-bottom: 16px;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;

  @media screen and (min-width: 600px) {
    :hover {
      background-color: #000;
      color: #fff;
    }
  }
`;

const Button = ({ children, onClick }) => (
  <Root onClick={onClick}>{children}</Root>
);

export default Button;
