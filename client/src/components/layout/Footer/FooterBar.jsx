import React from 'react'
import { SoFlex, SoHeadLineText, SoSection, SoTypography } from '../../styledcomponents/globalStyles'
import { FooterSection } from '../../styledcomponents/Footer/FooterStyles'
import { useThemeContext } from '../../../context/theme/ThemeContext'

const FooterBar = () => {
  const {palette} = useThemeContext();
  return (
    <FooterSection>
       <SoSection mp='10px' sp='10px'>
        <SoFlex w='100%' jc='space-between'>
        <SoFlex sw='100%' w='500px'>
        <SoTypography fs='14px' ls='0px' color={palette.text.mid}>At REFINE, we're dedicated to providing informative articles that inspire curiosity and spark discovery. Join us on our journey of knowledge-sharing!</SoTypography>
        </SoFlex>
        <SoFlex dir='column' al='flex-start'>
            <SoTypography fs='14px'>UNISERSAL SUBJET</SoTypography>
            <SoHeadLineText fst='normal' fs='14px'>REFINE @2024</SoHeadLineText>
        </SoFlex>
        </SoFlex>
       </SoSection>
    </FooterSection>
 
  )
}

export default FooterBar