import React from "react";
import { SoFlex, SoTypography } from "../styledcomponents/globalStyles";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";

const StyledButton = styled.span`
  cursor: pointer;
`;

const SoPlainButton = ({ children, back = false }) => {
  return (
    <StyledButton>
      <SoTypography className="underline" fs="16px">
        <SoFlex al="center" gap="10px">
          {back && <ArrowBackIcon />}
          {children}
          {back ? "" : <ArrowOutwardIcon />}
        </SoFlex>
      </SoTypography>
    </StyledButton>
  );
};

export default SoPlainButton;
