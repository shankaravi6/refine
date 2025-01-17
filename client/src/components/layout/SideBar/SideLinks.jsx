import React from 'react'
import { NavText, SoFlex } from '../../styledcomponents/globalStyles'
import { Link } from 'react-router-dom'
import { navLinks } from '../../../datas/NavDatas'
import { sideBarLinks } from '../../../datas/SideBarData'

const SideLinks = () => {
  return (
    <SoFlex bg='transparent'>
    <SoFlex dir='column' w='75%' p='15px 0' al='flex-start' gap='2em' bg='transparent'>
        {sideBarLinks.map((data, index) => {
        return <Link key={index} to={data.to} className='nav-link'><NavText>{data.name}</NavText></Link>
      })}
    </SoFlex>
    </SoFlex>
  )
}

export default SideLinks