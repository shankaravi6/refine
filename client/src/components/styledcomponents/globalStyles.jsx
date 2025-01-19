import styled from "styled-components";
import { connect } from "react-redux";

import React, { memo } from "react";
import { useThemeContext } from "../../context/theme/ThemeContext.jsx";

const mapStateToProps = (state) => ({
  mode: state.shopping.mode,
});

const SiloComponent = (StyledComponent) => {
  //HOC
  const ConnectedStyledComponent = connect(mapStateToProps)(
    ({ dispatch, ...rest }) => {
      const { palette } = useThemeContext();
      return <StyledComponent {...rest} palette={palette} />;
    }
  );

  return ConnectedStyledComponent;
};

export const SoContainer = SiloComponent(styled.div`
  width: 100%;
  background: ${(props) =>
    props.bg ? props.bg : `${props.palette.background.high}`};
  @media screen and (max-width: 768px) {
    max-width: 1300px;
  }
`);

export const SoCenterContainer = SiloComponent(styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.bg ? props.bg : `${props.palette.background.high}`};
  @media screen and (max-width: 768px) {
    max-width: 1300px;
  }
`);

export const SoSection = SiloComponent(styled.section`
  width: 100%;
  height: ${(props) => (props.h ? props.h : "unset")};
  max-width: ${(props) => (props.mw ? props.mw : "1300px")};
  margin:0 auto 0 auto;
  background: ${(props) =>
    props.bg ? props.bg : `${props.palette.background.high}`};
  padding: ${(props) => (props.p ? props.p : "unset")};
  @media screen and (max-width: 970px) {
    padding: ${(props) => (props.sp ? props.sp : "unset")};
    height: ${(props) => (props.sh ? props.sh : "unset")};
  }
  @media screen and (max-width: 1125px) {
    width: ${(props) => (props.mw ? props.mw : "none")};
    padding: ${(props) => (props.mp ? props.mp : "unset")};
  }
`);

export const SoCover = SiloComponent(styled.div`
  width: ${(props) => (props.w ? props.w : "unset")};
  height: ${(props) => (props.h ? props.h : "unset")};
  box-shadow: ${(props) => (props.bs ? props.bs : "unset")};
  transform: ${(props) => (props.tr ? props.tr : "unset")};
  background: ${(props) =>
    props.bg ? props.bg : `${props.palette.background.high}`};
  padding: ${(props) => (props.p ? props.p : "unset")};
  margin: ${(props) => (props.m ? props.m : "unset")};
  border-radius: ${(props) => (props.br ? props.br : "unset")};
  border: ${(props) => (props.border ? props.border : "unset")};
  @media screen and (max-width: 970px) {
    padding: ${(props) => (props.sp ? props.sp : "none")};
    height: ${(props) => (props.sh ? props.sh : "none")};
  }
`);

export const SoFlex = SiloComponent(styled.div`
  display: flex;
  align-items: ${(props) => (props.al ? props.al : "center")};
  justify-content: ${(props) => (props.jc ? props.jc : "center")};
  flex-direction: ${(props) => (props.dir ? props.dir : "row")};
  width: ${(props) => (props.w ? props.w : "unset")};
  height: ${(props) => (props.h ? props.h : "unset")};
  padding: ${(props) => (props.p ? props.p : "unset")};
  margin: ${(props) => (props.m ? props.m : "unset")};
  gap: ${({ gap }) => (gap ? gap : "unset")};
  box-shadow: ${(props) => (props.bs ? props.bs : "unset")};
  background-color: ${(props) =>
    props.bg ? props.bg : props.palette.background.high};
  border-radius: ${(props) => (props.br ? props.br : "unset")};

  @media screen and (max-width: 970px) {
    flex-direction: ${(props) => (props.sm_dir ? props.sm_dir : "column")};
    padding: ${(props) => (props.sp ? props.sp : "none")};
    align-items: ${(props) => (props.sal ? props.sal : "center")};
    justify-content: ${(props) => (props.sjc ? props.sjc : "center")};
    width: ${(props) => (props.sw ? props.sw : "unset")};
    height: ${(props) => (props.sh ? props.sh : "unset")};
    gap: ${({ s_gap }) => (s_gap ? s_gap : "unset")};
  }
`);

export const SoBox = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  width: ${(props) => (props.w ? props.w : "auto")};
  height: ${(props) => (props.h ? props.h : "auto")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  padding: ${(props) => (props.p ? props.p : "unset")};
  margin: ${(props) => (props.m ? props.m : "unset")};
  box-shadow: ${(props) => (props.bs ? props.bs : "unset")};
  border: ${(props) => (props.border ? props.border : "unset")};
  border-radius: ${(props) => (props.br ? props.br : "unset")};

  @media screen and (max-width: 970px) {
    width: ${(props) => (props.sw ? props.sw : "auto")};
    height: ${(props) => (props.sh ? props.sh : "auto")};
    transform: translateX(0) !important;
    display: ${(props) => (props.sdisplay ? props.sdisplay : "flex")};
    padding: ${(props) => (props.sp ? props.sp : "auto")};

  }
  @media screen and (max-width: 1125px) {
    width: ${(props) => (props.mw ? props.mw : "none")};
    padding: ${(props) => (props.mp ? props.mp : "auto")};
  }
`;

export const SoCard = SiloComponent(styled.div`
  width: ${(props) => (props.w ? props.w : "350px")};
  height: ${(props) => (props.h ? props.h : "350px")};
  padding: ${(props) => (props.p ? props.p : "auto")};
  margin: ${(props) => (props.m ? props.m : "auto")};
  border-radius: ${(props) => (props.br ? props.br : "15px")};
  background: ${(props) =>
    props.bg ? props.bg : `${props.palette.background.high}`};
  box-shadow: ${(props) =>
    props.bs ? props.bs : `${props.palette.shadow.sub} 0px 25px 50px -12px`};
  @media screen and (max-width: 960px) {
    width: ${(props) => (props.sw ? props.sw : "300px")};
    height: ${(props) => (props.sh ? props.sh : "300px")};
  }
`);

export const SoImg = styled.img`
  width: ${(props) => (props.w ? props.w : "100%")};
  border-radius: ${(props) => (props.br ? props.br : "unset")};
  @media screen and (max-width: 970px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    width: ${(props) => (props.sw ? props.sw : "unset")};
  }
`;

export const SoBackImg = styled.div`
  width: ${(props) => (props.w ? props.w : "100%")};
  height: ${(props) => (props.h ? props.h : "100%")};
  background: ${(props) => (props.url ? `url(${props.url})` : "none")};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 970px) {
    width: ${(props) => (props.sw ? props.sw : "unset")};
  }
`;

export const SoForm = styled.form`
  width: ${(props) => (props.w ? props.w : "100%")};
  height: ${(props) => (props.h ? props.h : "auto")};
`;

export const SoTitle = SiloComponent(styled.h1`
  font-family: FrontPage;
  font-size: ${(props) => (props.fs ? props.fs : "clamp(2rem, 10vw, 15rem)")};
  text-align: center;
  letter-spacing: ${(props) => (props.ls ? props.ls : "clamp(1rem, 5vw, 2rem)")};
  color: ${(props) => props.color ? props.color : props.palette.text.main};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
  margin: unset;

  @media screen and (max-width: 960px) {
    /* letter-spacing: 30px; */
    text-align: center;
    margin-left: ${(props) => props.s_ml ? props.s_ml : "30px"};
  }

  /* &::before {
    content: "";
    display: inline-block;
    height: 8px;
    width: 100px;
    background-color: ${(props) => props.palette.text.main};
  }
  
  &::after {
    content: "";
    display: inline-block;
    height: 8px;
    width: 100px;
    background-color: ${(props) => props.palette.text.main};
  } */
`);

export const SoHeadLineText = SiloComponent(styled.p`
  font-family: News Cycle, sans-serif;
  font-size: ${(props) => (props.fs ? props.fs : "clamp(1rem, 5vw, 2rem)")};
  text-align: justify;
  letter-spacing: ${(props) => (props.ls ? props.ls : "0px")};
  color: ${(props) => (props.color ? props.color : props.palette.text.low)};
  opacity: 0.85;
  text-shadow: ${(props) => (props.ts ? props.ts : "unset")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  font-weight: ${(props) => (props.fw ? props.fw : "unset")};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
  font-style: ${(props) => (props.fst ? props.fst : "italic")};

`);

export const SoSubTitle = SiloComponent(styled.h1`
  font-family: Ezrademo;
  font-size: ${(props) => (props.fs ? props.fs : "clamp(1rem, 5vw, 2.5rem)")};
  text-align: ${(props) => props.ta ? props.ta :"center"};
  letter-spacing: ${(props) => (props.ls ? props.ls : "0px")};
  color: ${(props) => (props.color ? props.color : props.palette.text.main)};
  text-shadow: ${(props) => (props.ts ? props.ts : "unset")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  font-weight: ${(props) => (props.fw ? props.fw : "unset")};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
  margin: unset;
`);

export const NavText = SiloComponent(styled.p`
  font-family: Plus Jakarta Sans, sans-serif;
  font-size: ${(props) => (props.fs ? props.fs : "clamp(1rem, 5vw, 1rem)")};
  text-align: center;
  color: ${(props) => (props.color ? props.color : props.palette.text.main)};
  transition: all 0.5s ease;
  text-shadow: ${(props) => (props.ts ? props.ts : "unset")};
  background: ${(props) => (props.bg ? props.bg : "unset")};
  font-weight: ${(props) => (props.fw ? props.fw : "unset")};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
  margin: unset;

  &::after {
    content: "";
    display: block;
    width: 0%;
    opacity: 0;
    border-bottom: ${(props) => `1.5px solid ${props.palette.text.main}`};
  }

  &:hover::after {
    opacity: 1;
    width: 100%;
    transition: all 0.5s ease;
  }
`);

export const SoTypography = SiloComponent(styled.p`
  font-size: ${(props) => (props.fs ? props.fs : "clamp(1rem, 5vw, 1.5rem)")};
  font-weight: ${(props) => (props.fw ? props.fw : "normal")};
  letter-spacing: ${(props) => props.ls ? props.ls : '1px'};
  font-family: ${(props) => (props.fm ? props.fm : "Kulim Parkm, sans-serif")};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  color: ${(props) => (props.color ? props.color : props.palette.text.main)};
  text-align: ${(props) => (props.ta ? props.ta : "justify")};
  text-shadow: ${(props) => (props.ts ? props.ts : "unset")};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
`);

export const SoSpan = SiloComponent(styled.span`
  font-size: ${(props) => (props.fs ? props.fs : "clamp(1rem, 5vw, 1.5rem)")};
  font-weight: ${(props) => (props.fw ? props.fw : "normal")};
  letter-spacing: 1px;
  font-family: ${(props) => (props.fm ? props.fm : `Kulim Parkm, sans-serif`)};
  padding: ${(props) => props.p};
  margin: ${(props) => props.m};
  color: ${(props) => (props.color ? props.color : props.palette.text.main)};
  text-align: ${(props) => (props.ta ? props.ta : "justify")};
  text-shadow: ${(props) => (props.ts ? props.ts : "unset")};
  font-style: ${(props) => (props.fst ? props.fst : "normal")};
  text-transform: ${(props) => props.tt ? props.tt : "unset"};
`);
