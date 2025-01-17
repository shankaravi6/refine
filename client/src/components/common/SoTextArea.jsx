import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useThemeContext } from "../../context/theme/ThemeContext";

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

const StyledInput = SiloComponent(styled.textarea`
  position: relative;
  padding: 7.5px 20px;
  width: ${(props) => (props.width ? props.width : "100%")};
  height:${(props) => (props.height ? props.height : "auto")} ;
  border-radius: 0px;
  background-color: ${(props) => props.bg ? props.bg : props.palette.background.high};
  color: ${(props) => props.color ? props.color : props.palette.text.main};
  border: 1.5px solid ${(props) => (props.err ? props.palette.error.main : props.palette.text.mid)};
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  transition: all 0.3s ease;

  &::placeholder {
  color: ${(props) => props.placecolor ? props.placecolor : props.palette.placeholder.main};
  }

  &:hover {
    border: 1.85px solid ${(props) => (props.err ? props.palette.error.main : props.palette.text.low)};
    transition: all 0.25s ease;
  }

  &:active,
  &:focus {
    border: 1.85px solid ${(props) => (props.err ? props.palette.error.main : props.palette.text.mid)};
    transition: all 0.25s ease;
    box-shadow: ${(props) => props.palette.shadow.main} 0px 5px 15px;
  }

  &:focus-visible {
    outline: unset;
  }
`);

const HelperText = styled.span`
  color: ${(props) => (props.err ? "#FF5733" : "#FF5733")};
`;

const SoTextArea = ({ placeholder, width, height, onChange, name, value, err, helperText, type, style, bg, color, placecolor }) => {
  return (
    <span style={{width:"100%"}}>
      <StyledInput
        placeholder={placeholder}
        width={width}
        height={height}
        onChange={onChange}
        name={name}
        value={value}
        err={err}
        type={type}
        style={style}
        bg={bg}
        color={color}
        placecolor={placecolor}
      />
      {err && helperText && <HelperText err={err}>{helperText}</HelperText>}
    </span>
  );
};

export default SoTextArea;
