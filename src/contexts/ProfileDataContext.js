import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularPosts: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularPosts: {
          ...prevState.popularPosts,
          results: prevState.popularPosts.results.map((post) =>
            followHelper(post, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile, null)
          ),
        },
        popularPosts: {
          ...prevState.popularPosts,
          results: prevState.popularPosts.results.map((post) =>
            unfollowHelper(post, clickedProfile, null)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;


    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/posts/?ordering=-likes_count&limit=5"
        );
        if (isMounted) {
          setProfileData((prevState) => ({
            ...prevState,
            popularPosts: data,
          }));
        }
      } catch (err) {
        if (isMounted) console.log(err);
      }
    };

    handleMount();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{
        setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
