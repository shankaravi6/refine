import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  SoBox,
  SoContainer,
  SoCover,
  SoFlex,
  SoSection,
  SoSpan,
  SoSubTitle,
  SoTypography,
} from "../../../components/styledcomponents/globalStyles";
import MasonryLayout from "./MasonryLayout";
import SoButton from "../../../components/common/SoButton";
import axios from "axios";
import { articleDataList } from "../../../datas/ArticleData";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_URL } from "../../../utils/baseURL";
import { useThemeContext } from "../../../context/theme/ThemeContext";

const ArticleSection = () => {
  // const [articleData, setArticleData] = useState(articleDataList.slice(0, 5));
  const [articleData, setArticleData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);
  const { palette } = useThemeContext();

  // Array of space facts
  const spaceFacts = [
    "A day on Venus is longer than its year. Venus rotates so slowly that it takes 243 Earth days to complete one rotation, but only 225 Earth days to orbit the Sun.",
    "There are more stars in the universe than grains of sand on all the beaches on Earth. Scientists estimate there are 100 billion galaxies, each with billions of stars.",
    "Neutron stars can spin 600 times per second. These incredibly dense stellar remnants are formed when massive stars collapse.",
    "One million Earths could fit inside the Sun. The Sun contains 99.86% of the Solar System's mass.",
    "There is a planet made of diamonds twice the size of Earth. Called '55 Cancri e', it's worth more than Earth's entire economy.",
    "The footprints on the Moon will be there for 100 million years. There's no wind or water to erode them.",
    "A year on Mercury is just 88 Earth days. It's the closest planet to the Sun and orbits it very quickly.",
    "Mars has the largest volcano in the solar system. Olympus Mons is three times taller than Mount Everest.",
    "Jupiter has at least 95 moons. The four largest are Io, Europa, Ganymede, and Callisto.",
    "Saturn's moon Titan has lakes and rivers made of liquid methane. It's the only moon in our solar system with a thick atmosphere.",
    "A day on Pluto lasts 153.6 hours. That's about 6.4 Earth days.",
    "The International Space Station travels at 17,500 mph. It orbits Earth every 90 minutes.",
    "Black holes can have the mass of billions of suns. The largest known black hole is 66 billion times more massive than our Sun.",
    "The Milky Way galaxy is 100,000 light-years across. It would take 100,000 years traveling at light speed to cross it.",
    "Astronauts grow taller in space. Without gravity compressing their spines, they can grow up to 2 inches taller.",
    "There's a planet where it rains glass sideways. HD 189733b has winds of up to 5,400 mph.",
    "The Moon is slowly drifting away from Earth. It moves about 3.8 cm farther away each year.",
    "A teaspoon of neutron star material would weigh 6 billion tons on Earth. That's as heavy as Mount Everest.",
    "The Sun loses 4 million tons of mass every second. It converts mass into energy through nuclear fusion.",
    "There are more possible games of chess than atoms in the observable universe. Space is vast, but so is complexity.",
  ];

  // Get a random space fact
  const getRandomSpaceFact = () => {
    return spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  };

  const [randomSpaceFact, setRandomSpaceFact] = useState(getRandomSpaceFact());

  const fetchMoreArticles = () => {
    // All articles are already loaded and displayed, so no need to fetch more
    // This function should not be called, but if it is, ensure hasMore is false
    setHasMore(false);
  };

  useEffect(() => {
    // Check if we have cached data in sessionStorage
    const cachedData = sessionStorage.getItem("cachedArticleData");
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        setArticleData(parsedData);
        setLoading(false);
        // Since all articles are loaded and displayed at once, set hasMore to false
        setHasMore(false);
        hasFetchedRef.current = true;
        return;
      } catch (error) {
        console.error("Error parsing cached article data:", error);
      }
    }

    // Only fetch if we haven't fetched before
    if (hasFetchedRef.current) {
      setLoading(false);
      return;
    }

    const getArticleData = async () => {
      try {
        hasFetchedRef.current = true;
        setLoading(true);
        const articleDataResponse = await axios.get(
          `${BASE_URL}/api/data/${"refine_article"}`
        );
        console.log("articleDataResponse", articleDataResponse.data.data);

        const formattedArticleData = articleDataResponse.data.data
          .filter((article) => article.active || article.active === "true")
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
          .map((article) => {
            const date = new Date(article.createdDate);
            const formattedDate = `${date.getDate()} ${getMonthName(
              date.getMonth()
            )}`;
            return { ...article, date: formattedDate };
          });

        setArticleData(formattedArticleData);
        setLoading(false);
        // Since all articles are loaded and displayed at once, set hasMore to false
        setHasMore(false);
        // Cache the data in sessionStorage
        sessionStorage.setItem(
          "cachedArticleData",
          JSON.stringify(formattedArticleData)
        );
      } catch (error) {
        console.error("Error fetching article data:", error);
        setLoading(false);
        hasFetchedRef.current = false; // Reset on error so it can retry
      }
    };
    getArticleData();
  }, []);

  // Update random space fact every 5 seconds while loading
  useEffect(() => {
    if (loading && articleData.length === 0) {
      const interval = setInterval(() => {
        setRandomSpaceFact(getRandomSpaceFact());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, articleData.length]);

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

  return (
    <SoSection mp="10px" sp="10px">
      <SoCover m="40px 0 0 0" sm_m="25px 0 0 0" p="0 1rem">
        <SoFlex>
          <SoFlex>
            <SoSubTitle tt="uppercase">Weekly Articles</SoSubTitle>
          </SoFlex>
        </SoFlex>
        <SoBox sdisplay="block" display="block">
          {loading && articleData.length === 0 ? (
            <SoFlex
              w="100%"
              dir="column"
              jc="center"
              al="center"
              p="60px 20px"
              style={{ minHeight: "400px" }}
            >
              <SoSubTitle
                fs="clamp(1.5rem, 4vw, 2.5rem)"
                ta="center"
                m="0 0 30px 0"
                color={palette.text.main}
              >
                Loading Articles...
              </SoSubTitle>
              <SoBox
                p="25px"
                m="20px 0"
                style={{
                  maxWidth: "600px",
                  borderRadius: "12px",
                  background: palette.background.low || "rgba(0,0,0,0.05)",
                  border: `1px solid ${palette.text.low || "rgba(0,0,0,0.1)"}`,
                }}
              >
                <SoFlex dir="column" gap="15px" p="1rem">
                  <SoSubTitle
                    fs="clamp(1rem, 3vw, 1.5rem)"
                    ta="center"
                    color={palette.text.main}
                    style={{ marginBottom: "10px" }}
                  >
                    🌌 Space Fact
                  </SoSubTitle>
                  <SoTypography
                    fs="clamp(0.9rem, 2.5vw, 1.1rem)"
                    ta="center"
                    color={palette.text.low || palette.text.main}
                    p="0"
                    m="0"
                    style={{ lineHeight: "1.6", opacity: 0.9 }}
                  >
                    {randomSpaceFact}
                  </SoTypography>
                </SoFlex>
              </SoBox>
              <SoFlex w="100%" style={{ textAlign: "center", padding: "20px" }}>
                <SoSpan className="spinner"></SoSpan>
              </SoFlex>
            </SoFlex>
          ) : (
            <InfiniteScroll
              dataLength={articleData?.length}
              next={fetchMoreArticles}
              hasMore={hasMore}
              loader={
                <SoFlex
                  w="100%"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <SoSpan className="spinner"></SoSpan>
                </SoFlex>
              }
              endMessage={
                <SoSubTitle fs="15px" style={{ textAlign: "center" }}>
                  No more articles
                </SoSubTitle>
              }
            >
              <MasonryLayout articleData={articleData && articleData} />
            </InfiniteScroll>
          )}
        </SoBox>
        {/* <SoFlex w="100%" p="20px 0 50px 0">
          <SoButton>Load More</SoButton>
        </SoFlex> */}
      </SoCover>
    </SoSection>
  );
};

export default ArticleSection;
