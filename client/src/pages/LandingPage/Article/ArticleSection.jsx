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

const ArticleSection = () => {
  // const [articleData, setArticleData] = useState(articleDataList.slice(0, 5));
  const [articleData, setArticleData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const hasFetchedRef = useRef(false);

  const fetchMoreArticles = () => {
    setTimeout(() => {
      const currentLength = articleData.length;
      const moreArticles = articleData.slice(currentLength, currentLength + 5);

      if (moreArticles.length > 0) {
        setArticleData((prevArticles) => [...prevArticles, ...moreArticles]);
      } else {
        setHasMore(false);
      }
    }, 1500);
  };

  useEffect(() => {
    // Check if we have cached data in sessionStorage
    const cachedData = sessionStorage.getItem("cachedArticleData");
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        setArticleData(parsedData);
        hasFetchedRef.current = true;
        return;
      } catch (error) {
        console.error("Error parsing cached article data:", error);
      }
    }

    // Only fetch if we haven't fetched before
    if (hasFetchedRef.current) {
      return;
    }

    const getArticleData = async () => {
      try {
        hasFetchedRef.current = true;
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
        // Cache the data in sessionStorage
        sessionStorage.setItem(
          "cachedArticleData",
          JSON.stringify(formattedArticleData)
        );
      } catch (error) {
        console.error("Error fetching article data:", error);
        hasFetchedRef.current = false; // Reset on error so it can retry
      }
    };
    getArticleData();
  }, []);

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
      <SoCover m="100px 0 0 0" sm_m="70px 0 0 0" p="0 1rem">
        <SoFlex>
          <SoFlex>
            <SoSubTitle tt="uppercase">Weekly Articles</SoSubTitle>
          </SoFlex>
        </SoFlex>
        <SoBox sdisplay="block" display="block">
          <InfiniteScroll
            dataLength={articleData?.length}
            next={fetchMoreArticles}
            hasMore={hasMore}
            loader={
              <SoFlex w="100%" style={{ textAlign: "center", padding: "20px" }}>
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
        </SoBox>
        {/* <SoFlex w="100%" p="20px 0 50px 0">
          <SoButton>Load More</SoButton>
        </SoFlex> */}
      </SoCover>
    </SoSection>
  );
};

export default ArticleSection;
