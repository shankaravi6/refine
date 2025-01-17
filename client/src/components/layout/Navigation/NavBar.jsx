import React, { useState } from 'react';
import { SoCover, SoFlex, SoSection } from '../../styledcomponents/globalStyles';
import { NavSection, FullScreenMenu, CloseIconWrapper, MenuIconWrapper } from '../../styledcomponents/Navigation/NavStyles';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import { useThemeContext } from '../../../context/theme/ThemeContext';
import { FiMenu, FiX } from 'react-icons/fi';
import NavButtons from './NavButtons';

const NavBar = () => {
  const { palette } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <SoCover>
      <NavSection h="70px" bg={palette.background.high}>
        <SoSection p='10px'>
          <SoFlex p="15px 0px" jc="space-between" ai="center">
            <NavLogo />
            <SoFlex gap="25px" className="nav-links">
              <NavLinks />
              <NavButtons/>
            </SoFlex>
            <SoFlex className="menu-icon" onClick={toggleMenu}>
              <MenuIconWrapper>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </MenuIconWrapper>
            </SoFlex>
          </SoFlex>
        </SoSection>
      </NavSection>

      {isMenuOpen && (
        <FullScreenMenu>
          <CloseIconWrapper onClick={toggleMenu}>
            <FiX size={24} />
          </CloseIconWrapper>
          <SoFlex gap="25px" className="menu-links">
            <NavLinks />
            <NavButtons/>
          </SoFlex>
        </FullScreenMenu>
      )}
    </SoCover>
  );
};

export default NavBar;
