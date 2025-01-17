import React from 'react';
import { NavText, SoFlex } from '../../styledcomponents/globalStyles';
import { Link } from "react-router-dom";
import { navLinks } from '../../../datas/NavDatas';

const NavLinks = () => {
  return (
    <SoFlex gap='clamp(0.5rem,5vw,1.5rem)'>
      {navLinks.map((data, index) => {
        return <Link key={index} to={data.to} className='nav-link'><NavText>{data.name}</NavText></Link>
      })}
    </SoFlex>
  );
}

export default NavLinks;
