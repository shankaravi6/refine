import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../../components/layout/Navigation/NavBar";
import {
    NavText,
  SoBox,
  SoContainer,
  SoFlex,
  SoHeadLineText,
  SoSection,
  SoSubTitle,
  SoTitle,
  SoTypography,
} from "../../../components/styledcomponents/globalStyles";
import FooterBar from "../../../components/layout/Footer/FooterBar";
import { colorTokens } from "../../../context/theme/theme";
import { useThemeContext } from "../../../context/theme/ThemeContext";
import { FaPenNib } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

const ArticleDetails = () => {
  const location = useLocation();
  const articleData = location.state?.articleData;

  const {palette} = useThemeContext();

  const [article, setArticle] = useState(articleData);

  useEffect(() => {
    console.log(articleData);
  }, [articleData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SoContainer>
      <NavBar />
      <SoSection>
        <SoFlex dir="column" p="2.5rem 10rem 0rem 10rem" sp='2rem 2.5rem 0 2.5rem'>
          <SoBox
            p="0rem 5rem 0rem 5rem"
            sp="0rem"
            mp="0rem"
            w="100%"
            className="flex flex-col justify-center items-center"
          >
            <SoTypography
              fw="500"
              p="1rem 0"
              color={colorTokens.drops[500]}
              fs="clamp(0.5rem, 5vw, 0.75rem)"
            >
              Published {article?.date}
            </SoTypography>
            <SoTitle tt='uppercase' fs="clamp(2rem, 10vw, 7.5rem)">
              {article?.shortTitle}
            </SoTitle>
            <SoHeadLineText ta="justify" fs="clamp(1rem, 5vw, 1rem)">
              {article?.shortDesc}
            </SoHeadLineText>
          </SoBox>
          <SoBox p="2rem 5rem 0rem 5rem" sp="2rem 5rem 0rem 5rem" mp="2rem 5rem 0rem 5rem"
            w="100%"
            className="flex justify-between items-center">
            <SoBox bg={palette.tag.bg} p="0.25rem 1rem" sp="0.25rem 1rem" mp="0.25rem 1rem" br="0.2rem" className="flex items-center gap-2">
            <FaPenNib style={{color:`${palette.tag.text}`}} /> 
            <SoTypography  color={palette.tag.text} ls='0' fs="clamp(0.7rem, 5vw, 0.95rem)">{article?.author}</SoTypography>
            </SoBox>
            <SoBox bg={palette.tag.bg} p="0.25rem 1rem" sp="0.25rem 1rem" mp="0.25rem 1rem" br="0.2rem" className="flex items-center gap-2">
            <MdCategory style={{color:`${palette.tag.text}`}} /> 
            <SoTypography  color={palette.tag.text} ls='0' fs="clamp(0.7rem, 5vw, 0.95rem)">{article?.category}</SoTypography>
            </SoBox>
          </SoBox>
          <SoBox
            p="3rem 2.5rem 0rem 2.5rem"
            sp="3rem 2.5rem 0rem 2.5rem"
            mp="3rem 2.5rem 0rem 2.5rem"
            w="100%"
            className="flex justify-center items-center"
          >
          <SoSubTitle tt='uppercase' fs='clamp(1rem, 5vw, 2rem)'>{article?.title}</SoSubTitle>
          </SoBox>
          <SoBox
            p="2rem 5rem 2rem 5rem"
            sp="2rem 0rem 2rem 0rem"
            mp="2rem 0rem 2rem 0rem"
            w="100%"
            className="flex justify-center items-center"
          >
            {article?.LongDesc && (
              <div
                dangerouslySetInnerHTML={{ __html: article.LongDesc }}
                style={{
                  padding: "0px",
                  color: `${palette.text.mid}`,
                  textAlign: "justify",
                }}
              />
            )}
          </SoBox>
        </SoFlex>
      </SoSection>
      <FooterBar />
    </SoContainer>
  );
};

export default ArticleDetails;
