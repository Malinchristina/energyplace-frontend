import React, { useEffect, useState, useCallback } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Asset from "../../components/Asset";
import SearchBar from "../../components/SearchBar";
import FilterDropdown from "../../components/FilterDropdown";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularPosts from "./PopularPosts";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [], next: null });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();
 
  // Fetch the top liked posts from the API
  const fetchTopLikedPosts = useCallback(async () => {
    try {
      const { data } = await axiosReq.get(
        "/posts/?ordering=-likes_count&limit=5");
      const likedPosts = Array.isArray(data.results)
        ? data.results.filter((post) => post.likes_count > 0)
        : [];
      setTopLikedPosts(likedPosts);
    } catch (err) {
    }
  }, []);

  // Fetch posts with the applied filters
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const endpoint = `/posts/?${filter}search=${query}${
          categoryFilter ? `&category=${categoryFilter}` : ""
        }${locationFilter ? `&location=${locationFilter}` : ""}`;
    
        const { data } = await axiosReq.get(endpoint);
    
        // Check if `data.results` exists, or if `data` itself is the array
        if (Array.isArray(data.results)) {
          if (isMounted) {
            setPosts(data);
          }
        } else if (Array.isArray(data)) {
          if (isMounted) {
            setPosts({ results: data, next: null });
          }
        } else {  
        }
        setHasLoaded(true);
      } catch (err) {
        if (isMounted) console.log(err);
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
  }, [filter, query, categoryFilter, locationFilter,
      pathname, fetchTopLikedPosts, currentUser]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search posts"
        />
        {/* PopularPosts only for mobile view */}
        <div className="d-lg-none">
        {topLikedPosts.length === 0 && !hasLoaded ? (
          <Asset spinner /> // Show spinner while topLikedPosts is loading
        ) : (
          Array.isArray(topLikedPosts) &&
          topLikedPosts.length > 0 && (
            <PopularPosts topLikedPosts={topLikedPosts} />
          )
        )}
        </div>
        <FilterDropdown filterType="category" setFilter={setCategoryFilter} />
        <FilterDropdown filterType="location" setFilter={setLocationFilter} />
  
        {hasLoaded ? (
          <>
            {Array.isArray(posts.results) && posts.results.length > 0 ? (
              <InfiniteScroll
              children={posts.results.map((post) => {
                return (
                    <Post
                        key={post.id}
                        {...post}
                        setPosts={setPosts}
                        onLikeUnlike={fetchTopLikedPosts} // Pass function to refresh top liked posts
                    />
                );
              })}
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
        {topLikedPosts.length === 0 && !hasLoaded ? (
          <Asset spinner /> // Show spinner while topLikedPosts is loading
        ) : (
          Array.isArray(topLikedPosts) &&
          topLikedPosts.length > 0 ? (
            <PopularPosts topLikedPosts={topLikedPosts} />
          ) : (
            <p>No top liked posts to display.</p>
          )
        )}
      </Col>
    </Row>
  );
}


export default PostsPage;