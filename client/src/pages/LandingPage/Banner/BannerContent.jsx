import React from "react";
import {
  SoBox,
  SoFlex,
  SoHeadLineText,
  SoTitle,
  SoTypography,
} from "../../../components/styledcomponents/globalStyles";
import SoButton from "../../../components/common/SoButton";

const BannerContent = () => {
  return (
    <SoBox>
      <SoFlex al="flex-start" dir="column">
        <SoTitle ls='clamp(1rem, 5vw, .5rem)' fs='clamp(1.5rem, 10vw, 6.5rem)'>PALE BLUE DOT*</SoTitle>
        <SoFlex m="5px 0 0 0" sm_dir="row" jc="space-between" w="100%">
          <SoTypography>13</SoTypography>
          <SoTypography>NOV</SoTypography>
          <SoTypography>1994</SoTypography>
        </SoFlex>
        <SoHeadLineText fs="clamp(.25rem, 5vw, 1.25rem)">
          In Pale Blue Dot, Carl Sagan explores humanity’s place in the vast
          universe through reflections on the iconic photograph of Earth taken
          by the Voyager 1 spacecraft from over 3.7 billion miles away. The book
          emphasizes the fragility of our planet and the need for humans to take
          responsibility for preserving it. Sagan also discusses the future of
          space exploration and our potential role in the cosmos.
        </SoHeadLineText>
        <SoBox p="25px 0 0 0">
          <SoButton><a href="https://www.amazon.in/Pale-Blue-Dot-Vision-Future/dp/0345376595?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=AJEZFO8381MOH" target="_blank">Read More</a></SoButton>
        </SoBox>
      </SoFlex>
    </SoBox>
  );
};

export default BannerContent;
