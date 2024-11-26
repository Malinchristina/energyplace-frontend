import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";


const PopularPosts = ({ topLikedPosts }) => {
  if (!Array.isArray(topLikedPosts) || topLikedPosts.length === 0) return null;

  return (
    <Container
      className={`${appStyles.Content} ${styles.TopLikedPostsContainer}`}
    >
      <p>Top 5 Most Liked Posts</p>
      {topLikedPosts.map((post) => (
        <p key={post.id}>
          <i className={`fa-regular fa-image ${styles.popularIcon}`} />{" "}
          <Link to={`/posts/${post.id}`} className={styles.PostLink}>
            {post.title}
          </Link>
        </p>
      ))}
    </Container>
  );
};

export default PopularPosts;
