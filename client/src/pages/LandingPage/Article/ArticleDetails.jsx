import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
  SoImg,
  SoCover,
} from "../../../components/styledcomponents/globalStyles";
import FooterBar from "../../../components/layout/Footer/FooterBar";
import { colorTokens } from "../../../context/theme/theme";
import { useThemeContext } from "../../../context/theme/ThemeContext";
import { FaPenNib } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import SoPlainButton from "../../../components/common/SoPlainButton";
import SoButton from "../../../components/common/SoButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseURL";

const ArticleDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const articleDataFromState = location.state?.articleData;

  const { palette } = useThemeContext();

  const [article, setArticle] = useState(articleDataFromState || null);
  const [loading, setLoading] = useState(!articleDataFromState);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      // If we have data from state, use it (better UX - instant display)
      if (articleDataFromState) {
        setArticle(articleDataFromState);
        setLoading(false);
        return;
      }

      // If no state but we have an ID, fetch from API
      if (id) {
        try {
          setLoading(true);
          setError(null);

          const response = await axios.post(`${BASE_URL}/getsinglearticle`, {
            primaryId: id,
          });

          if (response.data) {
            // Format the date if needed
            const articleData = response.data;
            if (articleData.date) {
              const date = new Date(articleData.date);
              const formattedDate = `${date.getDate()} ${getMonthName(
                date.getMonth()
              )}`;
              articleData.date = formattedDate;
            }

            // Map API response fields to component expected fields
            const formattedArticle = {
              ...articleData,
              shortTitle: articleData.shortTitle || articleData.title,
              imageName: articleData.imgPath || articleData.imgName,
            };

            setArticle(formattedArticle);
          }
        } catch (err) {
          console.error("Error fetching article:", err);
          setError("Failed to load article. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Article ID not found");
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, articleDataFromState]);

  const getMonthName = (monthIndex) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[monthIndex];
  };

  if (loading) {
    return (
      <SoContainer>
        <NavBar />
        <SoSection>
          <SoFlex
            dir="column"
            p="2rem 10rem 0rem 10rem"
            sp="2rem 2.5rem 0 2.5rem"
            style={{ minHeight: "50vh" }}
            jc="center"
            ai="center"
          >
            <SoTypography fs="18px" color={palette.text.mid}>
              Loading article...
            </SoTypography>
          </SoFlex>
        </SoSection>
        <FooterBar />
      </SoContainer>
    );
  }

  if (error || !article) {
    return (
      <SoContainer>
        <NavBar />
        <SoSection>
          <SoFlex
            dir="column"
            p="2rem 10rem 0rem 10rem"
            sp="2rem 2.5rem 0 2.5rem"
            style={{ minHeight: "50vh" }}
            jc="center"
            ai="center"
            gap="20px"
          >
            <SoTypography fs="18px" color={palette.text.mid}>
              {error || "Article not found"}
            </SoTypography>
            <Link to="/">
              <SoButton>Back to Home</SoButton>
            </Link>
          </SoFlex>
        </SoSection>
        <FooterBar />
      </SoContainer>
    );
  }

  return (
    <SoContainer>
      <style>{`
        @media screen and (max-width: 970px) {
          .hero-image-section {
            height: 40vh !important;
            min-height: 300px !important;
            margin-bottom: 2rem !important;
          }
          .hero-overlay-content {
            padding: 1.5rem 1rem !important;
          }
        }
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .article-content h1, .article-content h2, .article-content h3,
        .article-content h4, .article-content h5, .article-content h6 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: ${palette.text.main};
          font-weight: 600;
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2rem 0;
        }
        .article-content a {
          color: ${palette.text.main};
          text-decoration: underline;
        }
        .article-content ul, .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .article-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
      <NavBar />

      {/* Hero Image/Thumbnail Section */}
      {article?.imageName && (
        <SoCover
          w="100%"
          m="1.5rem 0 3rem 0"
          className="hero-image-section"
          style={{
            height: "55vh",
            minHeight: "400px",
            maxHeight: "650px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <SoImg
            w="100%"
            src={
              article.imageName.startsWith("http")
                ? article.imageName
                : `${BASE_URL}${article.imageName}`
            }
            alt={article.shortTitle || article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Back Button - Top Left */}
          <SoBox
            style={{
              position: "absolute",
              top: "2rem",
              left: "1.5rem",
              zIndex: 10,
            }}
          >
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                color: "#fff",
                textDecoration: "none",
                padding: "0.625rem 1.25rem",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "8px",
                width: "fit-content",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "15px",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                e.currentTarget.style.transform = "translateX(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <ArrowBackIcon style={{ fontSize: "18px" }} />
              <span>Back</span>
            </Link>
          </SoBox>

          {/* Title & Subtitle - Bottom Left */}
          <SoBox
            className="hero-overlay-content"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              padding: "2.5rem 2rem",
            }}
          >
            <SoFlex
              dir="column"
              jc="flex-start"
              al="flex-start"
              sjc="flex-start"
              sal="flex-start"
              gap="0"
              bg="unset"
            >
              <SoTitle
                bg="unset"
                tt="uppercase"
                fs="clamp(2rem, 6vw, 4rem)"
                m="0 0 1rem 0"
                s_ml="0 0 0rem 0.5rem"
                lh="1"
                s_lh="0"
                style={{
                  color: "#fff",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                  textAlign: "left",
                  letterSpacing: "0.02em",
                }}
              >
                {article?.shortTitle}
              </SoTitle>
              <SoHeadLineText
                ta="left"
                fs="clamp(1rem, 2.5vw, 1.25rem)"
                style={{
                  color: "#fff",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
                  opacity: 0.95,
                  lineHeight: "1.6",
                  maxWidth: "90%",
                }}
              >
                {article?.shortDesc}
              </SoHeadLineText>
            </SoFlex>
          </SoBox>
        </SoCover>
      )}

      <SoSection>
        <SoFlex
          bg="unset"
          dir="column"
          p={article?.imageName ? "0 10rem 0 10rem" : "2rem 10rem 0rem 10rem"}
          sp={article?.imageName ? "0 2.5rem 0 2.5rem" : "2rem 2.5rem 0 2.5rem"}
          mp={article?.imageName ? "0 1.5rem 0 1.5rem" : "2rem 1.5rem 0 1.5rem"}
        >
          {/* Header Section (if no image) */}
          {!article?.imageName && (
            <SoBox
              p="0rem 0 3rem 0"
              sp="0rem 0 2rem 0"
              mp="0rem 0 2rem 0"
              w="100%"
            >
              <SoFlex
                jc="space-between"
                w="100%"
                sm_dir="column"
                s_gap="1rem"
                p="0 0 2rem 0"
                bg="none"
              >
                <Link
                  to="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    color: palette.text.main,
                    textDecoration: "none",
                    padding: "0.625rem 1.25rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      palette.background.low || "rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateX(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <ArrowBackIcon style={{ fontSize: "20px" }} />
                  <span>Back</span>
                </Link>
              </SoFlex>
              <SoFlex
                p="0"
                bg="unset"
                jc="flex-start"
                al="flex-start"
                dir="column"
              >
                <SoTitle
                  bg="unset"
                  tt="uppercase"
                  fs="clamp(2.5rem, 8vw, 5.5rem)"
                  ta="left"
                  p="0 0 1.5rem 0"
                  style={{
                    lineHeight: "1.15",
                    letterSpacing: "0.02em",
                  }}
                >
                  {article?.shortTitle}
                </SoTitle>
                <SoHeadLineText
                  bg="unset"
                  fs="clamp(1.125rem, 2.5vw, 1.375rem)"
                  p="0 0 0 0"
                >
                  {article?.shortDesc}
                </SoHeadLineText>
              </SoFlex>
            </SoBox>
          )}
          {/* Meta Information Tags */}
          <SoFlex
            jc="space-between"
            w="100%"
            gap="1rem"
            p="2rem 0"
            sm_dir="column"
            s_gap="2rem"
            style={{
              borderBottom: `1px solid ${
                palette.background.low || "rgba(0,0,0,0.1)"
              }`,
            }}
          >
            <SoFlex gap="1rem">
              <SoBox
                bg={palette.tag.bg}
                p="0.5rem 1.25rem"
                sp="0.5rem 1rem"
                mp="0.5rem 1rem"
                br="25px"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FaPenNib
                  style={{ color: `${palette.tag.text}`, fontSize: "1rem" }}
                />
                <SoTypography
                  color={palette.tag.text}
                  ls="0"
                  fs="clamp(0.875rem, 2vw, 1rem)"
                  fw="500"
                >
                  {article?.author}
                </SoTypography>
              </SoBox>
              <SoBox
                bg={palette.tag.bg}
                p="0.5rem 1.25rem"
                sp="0.5rem 1rem"
                mp="0.5rem 1rem"
                br="25px"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <MdCategory
                  style={{ color: `${palette.tag.text}`, fontSize: "1.1rem" }}
                />
                <SoTypography
                  color={palette.tag.text}
                  ls="0"
                  fs="clamp(0.875rem, 2vw, 1rem)"
                  fw="500"
                >
                  {article?.category}
                </SoTypography>
              </SoBox>
            </SoFlex>
            <SoTypography
              fw="500"
              color={colorTokens.drops[500]}
              fs="clamp(0.875rem, 2vw, 1rem)"
            >
              Published {article?.date}
            </SoTypography>
          </SoFlex>

          {/* Main Title */}
          <SoBox w="100%" p="3rem 0 1.5rem 0" mp="2rem 0 1rem 0">
            <SoSubTitle
              tt="uppercase"
              fs="clamp(1.75rem, 4vw, 2.75rem)"
              ta="left"
              fw="600"
              style={{
                lineHeight: "1.3",
              }}
            >
              {article?.title}
            </SoSubTitle>
          </SoBox>

          {/* Article Content */}
          <SoBox
            w="100%"
            p="2rem 0 4rem 0"
            sp="1.5rem 0 3rem 0"
            mp="1.5rem 0 3rem 0"
            className="article-content"
            style={{
              maxWidth: "100%",
            }}
          >
            {article?.LongDesc && (
              <div
                dangerouslySetInnerHTML={{ __html: article.LongDesc }}
                style={{
                  padding: "0px",
                  color: `${palette.text.mid}`,
                  textAlign: "justify",
                  lineHeight: 1.8,
                  fontSize: "clamp(1rem, 2vw, 1.125rem)",
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
