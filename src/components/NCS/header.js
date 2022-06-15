import React from "react";
import styled from "styled-components";

const OrderButton = styled.button`
  color: #fff;
  font-weight: 600;
  background: #23232a;
  padding: 16px 30px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

export default function Header() {
  return (
    <header style={{ zIndex: 15 }}>
      <div className="header-inner">
        <div className="logo">CH4IR.</div>
        <nav>
          <ul>
            <li>
              <a href="/">discover</a>
            </li>
            <li>
              <a href="/">products</a>
            </li>
            <li>
              <a href="/">solutions</a>
            </li>
            <li>
              <a href="/">reach</a>
            </li>
            <li>
              <a href="/">
                <OrderButton>order</OrderButton>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
