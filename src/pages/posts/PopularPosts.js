import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";


const PopularPosts = ({ topLikedPosts }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!Array.isArray(topLikedPosts) || topLikedPosts.length === 0) return null;

  return (
    <Container
      className={`${appStyles.Content} ${styles.TopLikedPostsContainer}`}
    >
      {/* Apply collapsible behavior only for mobile */}
      {isMobile ? (
        <div
          className={styles.CollapsibleHeader}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Top 5 Most Liked Posts</span>
          <i
            className={`fa fa-chevron-${isExpanded ? "up" : "down"} ${styles.ArrowIcon}`}
          ></i>
        </div>
      ) : (
        <div>
          Top 5 Most Liked Posts
        </div>
      )}
      {(isExpanded || !isMobile) && (
        <div>
          {topLikedPosts.map((post) => (
            <p key={post.id}>
              <i className={`fa-regular fa-image ${styles.popularIcon}`} />{" "}
              <a href={`/posts/${post.id}`} className={styles.PostLink}>
                {post.title}
              </a>
            </p>
          ))}
        </div>
      )}
    </Container>
  );
};

export default PopularPosts;
