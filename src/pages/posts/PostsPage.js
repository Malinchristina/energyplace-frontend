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
  const [posts, setPosts] = useState({ results: [] });
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
      const { data } = await axiosReq.get("/posts/?ordering=-likes_count&limit=5");
      const likedPosts = data.results.filter((post) => post.likes_count > 0);
      setTopLikedPosts(likedPosts);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Fetch posts with the applied filters
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const endpoint = `/posts/?${filter}search=${query}${
          categoryFilter ? `&category=${categoryFilter}` : ""
        }${locationFilter ? `&location=${locationFilter}`: ""}`;

        const { data } = await axiosReq.get(endpoint);
        if (isMounted) {
          setPosts(data);
        setHasLoaded(true);
        }
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
  }, [filter, query, categoryFilter, locationFilter, pathname, fetchTopLikedPosts, currentUser]);


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

        <FilterDropdown filterType="category" setFilter={setCategoryFilter} />
        <FilterDropdown filterType="location" setFilter={setLocationFilter} />
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