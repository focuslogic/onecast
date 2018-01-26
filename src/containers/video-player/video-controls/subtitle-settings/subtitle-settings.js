import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Flex } from 'shared/components';

import SubtitleOffset from './subtitle-offset/subtitle-offset';

const containerWidth = 300;
const containerHeight = 300;
const boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
const padding = 20;

const ContainerRectangle = styled.div`
  left: 50%;
  top: 50%;
  margin-left: -${containerWidth + 35}px;
  margin-top: -${(containerHeight - 50) / 2}px;
  width: ${containerWidth * 2 + 70}px;
  height: ${containerHeight - 50}px;
  padding: ${padding}px ${padding * 2}px;
  background: ${({ theme }) => theme.bgColor};
  box-shadow: ${boxShadow};
  z-index: 101;
  box-sizing: border-box;
  color: rgb(255,255,255);
  position: absolute;
`;

const ContainerSquare = Flex.extend`
  right: 50%;
  top: 50%;
  margin-right: -10px;
  margin-top: -${containerHeight / 2}px;
  width: ${containerWidth}px;
  height: ${containerHeight}px;
  padding: ${padding}px;
  align-items: center;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  box-shadow: ${boxShadow};
  z-index: 102;
  position: absolute;
`;

const Preference = styled.ul`
  width: ${containerWidth - padding * 2}px;
  list-style: none;
  float: right;
`;

const Option = styled.li`
  display: flex;
  width: 100%;
  margin: 40px 0;
`;

const StyledDiv = styled.div`
  width: 290px;
  overflow: hidden;
  word-wrap: break-word;
  text-align: center;
`;

const StyledSpan = styled.span`
  font-size: 15px;
  line-height: 20px;
  color: rgb(110, 110, 110);
  transition: color 0.25s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.orange};
    cursor: pointer;
  }
`;

const Buttons = Flex.extend`
  height: 42px;
  float: right;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

const ButtonWrapper = Flex.extend`
  font-size: 24px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.orange};
    background: rgba(219, 219, 219, 0.2);
  }
`;

class SubSettings extends Component {
  render() {
    const { toggleFileBrowserDialog, toggleSubSettings } = this.props;
    const addSub = (<FontAwesomeIcon icon={['fas', 'ellipsis-h']} size='2x'/>);

    return (
      <Fragment>
        <ContainerSquare align='center' justify='center'>
          <StyledDiv>
            <h2>Language</h2>
            <br/>
            <StyledSpan onClick={toggleFileBrowserDialog}>{addSub}</StyledSpan>
          </StyledDiv>
        </ContainerSquare>
        <ContainerRectangle>
          <Preference>
            <Option>
              <span>Encoding: Auto</span>
            </Option>
            <Option>
              <SubtitleOffset />
            </Option>
          </Preference>
          <Buttons onClick={toggleSubSettings}>
            <ButtonWrapper align='center' justify='center'>
              <FontAwesomeIcon icon={['fas', 'times']}/>
            </ButtonWrapper>
            <ButtonWrapper align='center' justify='center'>
              <FontAwesomeIcon icon={['fas', 'check']}/>
            </ButtonWrapper>
          </Buttons>
        </ContainerRectangle>
      </Fragment>
    );
  }
}

export default SubSettings;