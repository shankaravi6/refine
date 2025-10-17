import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  SoBox,
  SoCover,
  SoFlex,
  SoImg,
  SoSubTitle,
  SoTitle,
} from "../../../components/styledcomponents/globalStyles";
import { useThemeContext } from "../../../context/theme/ThemeContext";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const MasonryLayout = ({ articleData }) => {
  const { palette } = useThemeContext();

  const navigate = useNavigate();

  const handleArticleDet = (articleData) => {
    navigate("/articledetails", { state: { articleData } });
  };

  return (
    <SoCover m="20px 0">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 500: 2, 700: 3, 900: 4, 1200: 5 }}
      >
        <Masonry columnsCount={3} gutter="16px">
          {articleData.map((data, index) => {
            return (
              <SoFlex key={index} gap="0px" s_gap="0" dir="column">
                <Fade style={{ width: "100%" }}>
                  <SoBox
                    onClick={() => handleArticleDet(data)}
                    className="relative cursor-pointer"
                  >
                    <SoImg width="100%" src={`${data.imageName}`} />
                    <SoSubTitle
                      tt="uppercase"
                      className="absolute bottom-0 right-0"
                      style={{
                        // background:
                        //   "linear-gradient(360deg, black, transparent)",
                        padding: "0px 4px",
                        fontSize: "15px",
                      }}
                      color={palette.text.title}
                    >
                      {data.shortTitle}
                    </SoSubTitle>
                  </SoBox>
                  <SoBox w="100%">
                    <SoFlex
                      sjc="space-between"
                      jc="space-between"
                      sw="100%"
                      sm_dir="row"
                      w="100%"
                    >
                      <SoTitle
                        tt="uppercase"
                        s_ml="0px"
                        ls="0px"
                        fs="clamp(.5rem, 5vw, .75rem)"
                      >
                        {data.author}
                      </SoTitle>
                      <SoTitle
                        tt="uppercase"
                        s_ml="0px"
                        ls="0px"
                        fs="clamp(.5rem, 5vw, .75rem)"
                      >
                        {data.date}
                      </SoTitle>
                    </SoFlex>
                  </SoBox>
                </Fade>
              </SoFlex>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </SoCover>
  );
};

export default MasonryLayout;
