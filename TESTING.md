# Testing EnergyPlace
<a name="top"></a>

[Back to readme](README.md)

# Table of Contents

- [API Testing](#api-testing)
- [Validator](#validator)
  - [JSX](#jsx)
  - [CSS](#css)
  - [Accessibility Testing](#accessibility-testing)
  - [Lighthouse](#lighthouse)
- [Epics & User Stories](#epics--user-stories)
  

## API testing

Documentation for testing the API is available [here](https://github.com/Malinchristina/EnergyPlace-API/blob/main/README.md#testing).

## Validator

### JSX 

The JSX code was validated throughout the project using the ESLint extension in VS Code. All identified errors were corrected during development to ensure clean and maintainable code.

### CSS

The CSS code was tested using the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/#validate_by_input). The validation returned no errors but provided warnings related to the use of vendor-specific pseudo-elements such as `::-webkit-scrollbar`, `::-webkit-scrollbar-track`, and `::-webkit-scrollbar-thumb`. These warnings indicate that these elements are specific to WebKit-based browsers and are used to customize scrollbar appearance. They are commonly used for cross-browser compatibility and do not affect the functionality of the CSS.

### Accessibility Testing

The website has passed the accessibility checks with **no errors** and **no contrast errors** according to the [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/). This ensures that the site meets accessibility standards and provides a more inclusive user experience.

<details>
  <summary>Click to view the image</summary>
  
  ![Wave Accessibility Test](documentation/test_images/wave.png)
  
</details>

### Lighthouse

Lighthouse was used to analyze the performance, accessibility, and SEO of the web application.

<details>
  <summary>Sign up</summary>
  
  ![Sign up](documentation/test_images/signup.png)
  
</details>

<details>
  <summary>Sign in</summary>
  
  ![Sign in](documentation/test_images/signin.png)
  
</details>

<details>
  <summary>Home</summary>
  
  ![Home](documentation/test_images/home.png)
  
</details>

<details>
  <summary>About</summary>
  
  ![About](documentation/test_images/about.png)
  
</details>

<details>
  <summary>Add post</summary>
  
  ![Add post](documentation/test_images/create_post.png)
  
</details>

<details>
  <summary>Feed</summary>
  
  ![Feed](documentation/test_images/feed.png)
  
</details>

<details>
  <summary>Liked</summary>
  
  ![Liked](documentation/test_images/liked.png)
  
</details>

<details>
  <summary>Post</summary>
  
  ![Post](documentation/test_images/posts_id.png)
  
</details>

<details>
  <summary>Profile</summary>
  
  ![Profile](documentation/test_images/profile.png)
  
</details>

<details>
  <summary>Profiles</summary>
  
  ![Profiles](documentation/test_images/profiles.png)
  
</details>

<details>
  <summary>Profiles id</summary>
  
  ![Profiles id](documentation/test_images/profiles_id.png)
  
</details>



## Epics & User Stories

<details>
  <summary>User Authentication</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/1)


| TC ID   | US # | Title                                        | Pass as expected |
|---------|------|----------------------------------------------|------------------|
| EPIC #1 |      |                                              |                  |
| TC1     | 10   | Register an account                          | Yes              |
| TC2     | 11   | Log in to my account                         | Yes              |
| TC3     | 39   | Logged in status                             | Yes              |
| TC4     | 40   | Refreshing access tokens                     | Yes              |
| TC5     | 46   | Redirect User Based on Authentication Status | Yes              |


</details>

<details>
  <summary>Profile management</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/38)

| TC ID    | US # | Title                                        | Pass as expected |
|----------|------|----------------------------------------------|------------------|
| EPIC #38 |      |                                              |                  |
| TC6      | 12   | Redirect User Based on Authentication Status | Yes              |
| TC7      | 43   | View others profile                          | Yes              |

</details>

<details>
  <summary>Post Creation and Interaction</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/3)

| TC ID   | US # | Title                   | Pass as expected |
|---------|------|-------------------------|------------------|
| EPIC #3 |      |                         |                  |
| TC8     | 15   | Create a post           | Yes              |
| TC9     | 16   | Edit or delete post     | Yes              |
| TC10    | 17   | Like a post             | Yes              |
| TC11    | 32   | Add comment on a post   | Yes              |
| TC12    | 33   | Edit comment on a post  | Yes              |
| TC13    | 34   | Edit comment on a post  | Yes              |
| TC14    | 35   | Edit comment on a post  | Yes              |
| TC15    | 44   | Add categories on posts | Yes              |
| TC16    | 45   | Add location to post    | Yes              |

</details>

<details>
  <summary>Post Feed and Details Page</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/2)

| TC ID   | US # | Title                    | Pass as expected |
|---------|------|--------------------------|------------------|
| EPIC #2 |      |                          |                  |
| TC17    | 13   | View post feed           | Yes              |
| TC18    | 14   | View post details        | Yes              |
| TC19    | 36   | Infinite scroll          | Yes              |
| TC20    | 42   | Display Most Liked Posts | Yes              |


</details>

<details>
  <summary>Follow/Unfollow Functionality</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/4)

| TC ID   | US # | Title           | Pass as expected |
|---------|------|-----------------|------------------|
| EPIC #4 |      |                 |                  |
| TC21    | 18   | Follow a user   | Yes              |
| TC22    | 19   | Unfollow a user | Yes              |

</details>

<details>
  <summary>Search and Filtering Options</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/5)

| TC ID   | US # | Title                       | Pass as expected |
|---------|------|-----------------------------|------------------|
| EPIC #5 |      |                             |                  |
| TC23    | 21   | Search for posts by keyword | Yes              |
| TC24    | 22   | Filter posts by location    | Yes              |
| TC25    | 23   | Filter posts by category    | Yes              |

</details>

<details>
  <summary>Frontend Deployment</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/6)

</details>

<details>
  <summary>Integrate Frontend with API Data</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/7)

| TC ID   | US # | Title                                | Pass as expected |
|---------|------|--------------------------------------|------------------|
| EPIC #7 |      |                                      |                  |
| TC27    | 25   | Fetch and display posts from the API | Yes              |
| TC28    | 26   | Submit data to the API               | Yes              |

</details>

<details>
  <summary>Dynamic User Interactions</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/8)

| TC ID   | US # | Title                                 | Pass as expected |
|---------|------|---------------------------------------|------------------|
| EPIC #8 |      |                                       |                  |
| TC29    | 27   | Like or comment on posts in real-time | Yes              |
| TC30    | 28   | Follow/unfollow users dynamically     | Yes              |

</details>

<details>
  <summary>UI and UX Refinement</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/9)

| TC ID   | US # | Title                              | Pass as expected |
|---------|------|------------------------------------|------------------|
| EPIC #9 |      |                                    |                  |
| TC31    | 29   | Ensure mobile responsiveness       | Yes              |
| TC32    | 30   | Enhance navigation for ease of use | Yes              |
| TC33    | 37   | Routing                            | Yes              |
| TC34    | 47   | Display page not found             | Yes              |
| TC35    | 49   | About page                         | Yes              |


</details>

<details>
  <summary>Frontend Deployment</summary>

  [GitHub Issue Link](https://github.com/Malinchristina/energyplace-frontend/issues/6)

| TC ID   | US # | Title               | Pass as expected |
|---------|------|---------------------|------------------|
| EPIC #6 |      |                     |                  |
| TC36    | 24   | Frontend Deployment | yes              |

</details>

[Back to top](#top)

[Back to readme](README.md)

