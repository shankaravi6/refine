import React from 'react';
import { SoCover, SoFlex, SoTypography } from '../../styledcomponents/globalStyles';
import SoButton from '../../common/SoButton';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SoPlainButton from '../../common/SoPlainButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../../store';
import { colorTokens } from '../../../context/theme/theme';
import { Link } from "react-router-dom";


const NavButtons = () => {

  const mode = useSelector((state) => state.shopping.mode);
  const dispatch = useDispatch();

  return (
    <SoFlex gap='20px'>
        <SoPlainButton>Become an author</SoPlainButton>
        {mode == 'light' ? <SoCover className='cursor-pointer' onClick={() => {dispatch(setMode("dark"))}}><DarkModeIcon/></SoCover> : <SoCover className='cursor-pointer' onClick={() => {dispatch(setMode("light"))}}><LightModeIcon style={{color:`${colorTokens.drops[200]}`}} /></SoCover>}
    </SoFlex>
  );
}

export default NavButtons;
