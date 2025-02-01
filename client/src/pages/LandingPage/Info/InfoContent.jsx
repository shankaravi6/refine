import React from "react";
import {
  SoBox,
  SoFlex,
  SoHeadLineText,
  SoSubTitle,
  SoTitle,
  SoTypography,
} from "../../../components/styledcomponents/globalStyles";
import { useThemeContext } from "../../../context/theme/ThemeContext";
import NavButtons from "../../../components/layout/Navigation/NavButtons";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SoPlainButton from "../../../components/common/SoPlainButton";


const InfoContent = () => {

    const {palette} = useThemeContext();

  return (
    <SoBox w="100%">
      <SoFlex w="100%" h='unset' jc="center" gap='20px' s_gap="0.5rem" dir='column'>
        <SoFlex dir='column' al='flex-end'>
          <SoSubTitle ta='left' fs="clamp(1.5rem,5vw,2.75rem)">WATCH UPCOMING EVENTS</SoSubTitle>
          <SoHeadLineText fs="clamp(1.25rem,5vw,3.5rem)">from</SoHeadLineText>
          <SoSubTitle fs="clamp(1.15rem,5vw,3.5rem)">NASA</SoSubTitle>
        </SoFlex>
        <SoBox>
            <SoTypography fs="clamp(.25rem, 5vw, 1.25rem)" ls='0px' color={palette.text.low}>
            NASE hosts events to improve astronomy education for teachers. These workshops enhance teaching skills and knowledge.
            </SoTypography>
        </SoBox>
        <SoFlex w='100%' jc='start'>
        <SoPlainButton><a target="_blank" href="https://www.nasa.gov/events/">Discover events</a></SoPlainButton>
        </SoFlex>
      </SoFlex>
    </SoBox>
  );
};

export default InfoContent;
