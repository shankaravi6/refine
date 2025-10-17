import React from "react";
import {
  SoContainer,
  SoCover,
  SoFlex,
  SoSection,
} from "../../../components/styledcomponents/globalStyles";
import BannerImage from "./BannerImage";
import BannerContent from "./BannerContent";
import InfoSection from "../Info/InfoSection";

const BannerSection = () => {
  return (
    <SoSection mp="10px" sp="10px" p="10px">
      <SoFlex m="2rem 0 0 0" p="0 1rem" gap="2.5rem" s_gap="2rem">
        <BannerContent />
        <BannerImage />
      </SoFlex>
    </SoSection>
  );
};

export default BannerSection;
