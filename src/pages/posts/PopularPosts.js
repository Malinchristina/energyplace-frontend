import React from "react";
//import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
//import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularPosts.module.css";
//import Asset from "../../components/Asset";


const PopularPosts = ({ topLikedPosts }) => {
  if (!topLikedPosts.length) return null;

  return (
    <Container className={`${appStyles.Content} ${styles.TopLikedPostsContainer}`}>
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
}

// const PopularPosts = () => {
//   const [topLikedPosts, setTopLikedPosts] = useState([]);
//   const [hasLoaded, setHasLoaded] = useState(false);

//   useEffect(() => {
//     const fetchTopLikedPosts = async () => {
//       try {
//         const { data } = await axiosReq.get(
//           "/posts/?ordering=-likes_count&limit=5");
//         const likedPosts = data.results.filter((post) => post.likes_count > 0); // Only posts with likes
//         setTopLikedPosts(likedPosts);
//         setHasLoaded(true);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchTopLikedPosts();
//   }, []);

//   if (!hasLoaded) {
//     return <Asset spinner />;
//   }

//   // Don't render the component if there are no liked posts
//   if (!topLikedPosts.length) return null;

//   return (
//     <Container className={`${appStyles.Content} ${styles.TopLikedPostsContainer}`}>
//       <p>Top 5 Most Liked Posts</p>
//       {topLikedPosts.map((post) => (
//         <p key={post.id}>
//           <i className={`fa-regular fa-image ${styles.popularIcon}`} />{" "}
//           <Link to={`/posts/${post.id}`} className={styles.PostLink}>
//             {post.title}
//           </Link>
//           {/* Link each title to the post's details page */}
//         </p>
//       ))}
//     </Container>
//   );
// };

export default PopularPosts;
