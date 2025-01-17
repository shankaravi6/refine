import React from 'react';
import { SoContainer, SoCover } from '../../styledcomponents/globalStyles';
import { useThemeContext } from '../../../context/theme/ThemeContext';
import { colorTokens } from '../../../context/theme/theme';
import SideLogo from './SideLogo';
import SideLinks from './SideLinks';

const SideBar = () => {

    const {palette} = useThemeContext()

    return (
    <SoCover w='100%' h='100vh' bg={colorTokens.drops[850]}>
        <SideLogo/>
        <SideLinks/>
    </SoCover>
  );
}

export default SideBar;
