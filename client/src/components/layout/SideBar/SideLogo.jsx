import React from 'react'
import { SoBox, SoFlex, SoImg, SoSubTitle } from '../../styledcomponents/globalStyles'
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import { colorTokens } from '../../../context/theme/theme';



const SideLogo = () => {
  return (
    <SoFlex h='80px' p='0px 20px 0px 0' bg='transparent' w='100%' gap='.5rem'>
        <SoBox>
        <ControlCameraOutlinedIcon style={{color:`${colorTokens.drops[200]}`, fontSize:"2.5rem"}} />
        </SoBox>
        <SoSubTitle tt='uppercase' color={colorTokens.drops[200]} fs='22px'>Black Cms</SoSubTitle>
    </SoFlex>
  )
}

export default SideLogo