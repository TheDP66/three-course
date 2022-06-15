import React from 'react';
import styled from 'styled-components';

import backIcon from '../../assets/icons/back-icon.svg';

const ToHome = styled.div`
  width: 5vw;
  height: auto;
  padding: 10px;
  display: flex;
  background-image: linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,1))
`;

const AText = styled.a`
  text-decoration: none;
  color: white;
  font-size: x-large;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: Verdana, sans-serif;
`;

const AImg = styled.img`
  width: 30px;
  height: auto;
  margin-left: 10px;
`;

const Back = () => {
    return (
        <ToHome>
            <AText href='/'>
                <AImg src={backIcon} alt='back-icon' title='Back to home'/>
            </AText>
        </ToHome>
    )
}

export default Back;
