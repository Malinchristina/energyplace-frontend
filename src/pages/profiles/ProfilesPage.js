import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilesPage.module.css";
import Profile from "./Profile";
import Asset from "../../components/Asset";
import SearchBar from "../../components/SearchBar";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ProfilesPage() {
  const [profiles, setProfiles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/?search=${query}`);
        setProfiles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfiles();
  }, [query]);  
  return (
    <Row className="h-100 no-gutters">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search profiles" />
        <Container className={`${appStyles.Content}`}>
          {hasLoaded ? (
            profiles.results.length ? (
              <InfiniteScroll
                dataLength={profiles.results.length}
                loader={<Asset spinner />}
                hasMore={!!profiles.next}
                next={() => fetchMoreData(profiles, setProfiles)}
              >
                  {profiles.results.map((profile) => (
                    <Col md={12} key={profile.id} className="mb-4 ProfileCol">
                    {/* Wrap just the Profile content inside Link */}
                    <Card className={`${appStyles.Content} ${styles.ProfileCard}`}>
                      <Profile
                        profile={profile}
                        showFollowButton={false}
                      />
                    </Card>
                  </Col>
                  ))}
    
              </InfiniteScroll>
            ) : (
              <Asset message="No profiles found" />
            )
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
  
}

export default ProfilesPage;
