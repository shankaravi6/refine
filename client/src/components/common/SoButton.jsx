import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useThemeContext } from "../../context/theme/ThemeContext.jsx";
import { colorTokens } from "../../context/theme/theme.js";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';



const mapStateToProps = (state) => ({
    mode: state.shopping.mode,
  });
  
  const SiloComponent = (StyledComponent) => {
    const ConnectedStyledComponent = connect(mapStateToProps)(
      ({ dispatch, ...rest }) => {
        const { palette } = useThemeContext();
        return <StyledComponent {...rest} palette={palette} />;
      }
    );
  
    return ConnectedStyledComponent;
  };

const StyledButton = SiloComponent(styled.button`
  font-size:100%;
  position: relative;
  text-align: center;
  letter-spacing: 5px;
  background-color: transparent;
  border: 1.5px solid ${(props) => props.palette.background.low};
  box-shadow: ${(props) => props.palette.shadow.main} 0px;
  color: ${(props) => props.palette.text.main};
  transition: all 0.3s ease;
  font-weight: 400;
  padding: 8px 15px;
  width: ${(props) => props.width ? props.width : 'auto'};
  border-radius: 0px;
  background-size: 200% 100%;
  background-position: right bottom;
  display: block;
  background: ${(props) => `linear-gradient(to right, black 50%, ${props.palette.background.high} 50%)`};
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all .3s ease-out;

  &:hover{
    color: ${colorTokens.drops[100]};
    background-position: left bottom;
  }

  &:hover span{
    color: ${colorTokens.drops[100]};
  }
`);


const StyledText = SiloComponent(styled.span`
  text-align: center;
  font-size: 16px;
  line-height: 30px; 
  color: ${(props) => props.palette.text.main};
  transition: all .3s ease-out;
  display: block;
`)

const StyledOutlineButton = SiloComponent(styled.button`
  font-size: 100%;
  text-align: center;
  letter-spacing: 5px;
  color: ${(props) => props.palette.text.main};
  background-color: transparent;
  box-shadow: ${(props) => props.palette.shadow.main} 0px 2px 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  padding: 10px 20px;
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 5px;
  border: ${(props) => `1px solid ${colorTokens.drops[200]}`};

  &:hover {
    box-shadow: ${(props) => props.palette.shadow.main} 0px 5px 15px;
    background-color: ${(props) => props.palette.background.high};
    color: ${(props) => (props.mode === "dark" ? colorTokens.drops[200] : colorTokens.drops[800])};
  }
`);



const 
SoButton = ({ height, width, onChange, onSubmit, onClick, onBlur, type, children, style, variant }) => {
  return (
    <>
    {variant == "outline" ?
      <StyledOutlineButton
        height={height}
        width={width}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
        onBlur={onBlur}
        type={type}
        style={style}
      >
      {children}
      </StyledOutlineButton>
      :
      <StyledButton
      height={height}
      width={width}
      onChange={onChange}
      onSubmit={onSubmit}
      onClick={onClick}
      onBlur={onBlur}
      type={type}
      style={style}
    >
    <StyledText>{children} <ArrowOutwardIcon/></StyledText>
    </StyledButton>
    }
    </>
  );
};

export default SoButton;
