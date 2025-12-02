import React, { useMemo, useEffect } from "react";
import {
  SoCenterContainer,
  SoContainer,
  SoCover,
  SoSection,
  SoTitle,
} from "../../components/styledcomponents/globalStyles";
import SoButton from "../../components/common/SoButton";
import NavBar from "../../components/layout/Navigation/NavBar";
import BannerSection from "./Banner/BannerSection";
import InfoSection from "./Info/InfoSection";
import ArticleSection from "./Article/ArticleSection";
import FooterBar from "../../components/layout/Footer/FooterBar";
import { useDispatch } from "react-redux";
import { setMode } from "../../store";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // useMemo(() => {
  //   dispatch(setMode("light"));
  // },[]);

  useEffect(() => {
    // Restore scroll position when navigating back from article details
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition && location.pathname === "/") {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({
            top: parseInt(savedScrollPosition, 10),
            behavior: "instant",
          });
          // Clear the saved position after restoring
          sessionStorage.removeItem("scrollPosition");
        }, 150);
      });
    }
  }, [location.pathname]);

  return (
    <SoContainer>
      <NavBar />
      {/* <BannerSection /> */}
      <ArticleSection />
      <InfoSection />
      <FooterBar />
    </SoContainer>
  );
};

export default LandingPage;
