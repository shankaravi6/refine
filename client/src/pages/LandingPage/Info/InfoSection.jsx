import React from "react";
import {
  SoCover,
  SoFlex,
  SoSection,
} from "../../../components/styledcomponents/globalStyles";
import InfoImage from "./InfoImage";
import InfoContent from "./InfoContent";

const InfoSection = () => {
  return (
    <SoSection mp="10px" sp="10px">
      <SoCover m="100px 0 0 0" sm_m="70px 0 0 0">
        <SoFlex gap="0 5rem" p="0 1rem" s_gap="1rem">
          <InfoImage />
          <InfoContent />
        </SoFlex>
      </SoCover>
    </SoSection>
  );
};

export default InfoSection;
