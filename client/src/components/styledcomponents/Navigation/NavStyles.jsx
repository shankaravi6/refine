import styled, { keyframes } from 'styled-components';
import { colorTokens } from '../../../context/theme/theme';
import { connect } from 'react-redux';
import { useThemeContext } from '../../../context/theme/ThemeContext';

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NavSection = SiloComponent(styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => (props.h ? props.h : 'unset')};
  background: ${(props) => props.bg || `${props.palette.background.high}`};
  padding: ${(props) => props.p || 'unset'};

  .menu-icon {
    display: none;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
  }

  @media (max-width: 1024px) {
    .menu-icon {
      display: block;
    }
    .nav-links {
      display: none;
    }
  }
`);

export const FullScreenMenu = SiloComponent(styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.bg || `${props.palette.background.high}`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: ${fadeIn} 0.5s forwards;

  .menu-links {
    text-align: center;
    font-size: 1.5em;
  }
`);

export const CloseIconWrapper = SiloComponent(styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: ${(props) => `${props.palette.background.low}`};
`);

export const MenuIconWrapper = SiloComponent(styled.div`
  cursor: pointer;
  color: ${(props) => `${props.palette.background.low}`};
`);
