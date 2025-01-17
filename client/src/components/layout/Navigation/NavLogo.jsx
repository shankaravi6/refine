import React from 'react';
import { SoBox, SoFlex, SoImg, SoSpan, SoSubTitle } from '../../styledcomponents/globalStyles';
import MainLogo from '../../../../public/assets/images/logo/main.png';

const NavLogo = () => {
  return (
   <SoFlex gap='20px' s_gap='0' sm_dir='row'>
        <SoBox w='30px' h='30px' sw='50px' sh='unset' mw='50px' mh='unset'>
        <SoImg src={MainLogo} sw='50%' width='100%'></SoImg>
        </SoBox>
        <SoBox>
            <SoSubTitle fs='clamp(1rem,5vw,1.35rem)'>RE<SoSpan fst='italic' fs='clamp(1rem,5vw,1.35rem)'>FINE</SoSpan></SoSubTitle>
        </SoBox>
   </SoFlex>
  );
}

export default NavLogo;
