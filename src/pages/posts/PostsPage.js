import React, { useEffect, useState, useCallback } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";
import SearchBar from "../../components/SearchBar";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularPosts from "./PopularPosts";


function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
 
  // Fetch the top liked posts from the API
  const fetchTopLikedPosts = useCallback(async () => {
    try {
      const { data } = await axiosReq.get("/posts/?ordering=-likes_count&limit=5");
      const likedPosts = data.results.filter((post) => post.likes_count > 0);
      setTopLikedPosts(likedPosts);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${
          filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);  
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
      fetchTopLikedPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, fetchTopLikedPosts]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* PopularPosts only for mobile view */}
        <div className="d-lg-none">
          <PopularPosts topLikedPosts={topLikedPosts} /> {/* Pass topLikedPosts */}
        </div>
        {/* <i className={`fas fa-search ${styles.SearchIcon}`} /> */}
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search posts"
        />
        {/* <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form> */}
        
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
              children={posts.results.map((post) => (
                <Post
                  key={post.id}
                  {...post}
                  setPosts={setPosts}
                  onLikeUnlike={fetchTopLikedPosts} // Pass function to refresh top liked posts
                />
              ))}
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            />
          ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularPosts topLikedPosts={topLikedPosts} />
      </Col>
    </Row>
  );
}

export default PostsPage;