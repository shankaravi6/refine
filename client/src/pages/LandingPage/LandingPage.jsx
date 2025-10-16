import React, { useMemo } from "react";
import {
  SoCenterContainer,
  SoContainer,
  SoCover,
  SoSection,
  SoTitle,
} from "../../components/styledcomponents/globalStyles";
import SoButton from "../../components/common/SoButton";
import NavBar from "../../components/layout/Navigation/NavBar";
// import BannerSection from "./Banner/BannerSection";
// import InfoSection from "./Info/InfoSection";
import ArticleSection from "./Article/ArticleSection";
import FooterBar from "../../components/layout/Footer/FooterBar";
import { useDispatch } from "react-redux";
import { setMode } from "../../store";

const LandingPage = () => {
  const dispatch = useDispatch();

  // useMemo(() => {
  //   dispatch(setMode("light"));
  // },[]);

  return (
    <SoContainer>
      <NavBar />
      {/* <BannerSection /> */}
      {/* <InfoSection /> */}
      <ArticleSection />
      <FooterBar />
    </SoContainer>
  );
};

export default LandingPage;