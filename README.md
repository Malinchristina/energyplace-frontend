## Introduction

EnergyPlace is a social platform designed to connect people through shared experiences and a passion for discovering inspiring places.  It provides a space to share your favorite energy-boosting locations, whether it's a tranquil nature spot, an exciting sporting venue, a vibrant music scene, a comforting café, or any place that recharges your spirit. 

**Table of Contents:**

- **[User Experience (UX)](#user-experience-ux)**
    - **[Design Thinking](#design-thinking)**
        - **[Mobile First](#mobile-first)** 
        - **[Design](#design)** 
        - **[Colors](#colors)** 
        - **[Typography](#typography)**
- **[Features](#features)**
  - **[Future Features](#future-features)** 
- **[Project Planning](#project-planning)** 
  - **[Wireframes](#wireframes)**
    - **[Mobile](#mobile)**
    - **[Tablet](#tablet)**
- **[Agile Methodologies](#agile-methodologies)** 
  - **[Kanban Board](#kanban-board)**
  - **[Epics](#epics)**
  - **[User Stories](#user-stories)**
  - **[MoSCoW Prioritization](#moscow-prioritization)**
- **[Technologies Used](#technologies-used)**
  - **[Languages](#languages)** 
  - **[Frameworks](#frameworks)**
  - **[Libraries](#libraries)**
- **[Testing](#testing)**
- **[Deployment](#deployment)** 
  - **[GitHub](#github)**
  - **[Heroku](#heroku)**
- **[Credits](#credits)** 
  - **[Code](#code)**
  - **[Media](#media)**

## Features

* **Home/Feed:** The `/` route displays posts (PostsPage). Users can search and filter posts by category and location using the SearchBar and FilterDropdown components.
* **Post Detail:** Viewing individual posts PostPage offers details, comments Comment components, and liking/unliking functionality.
* **Profile Pages:** Users have profile pages ProfilePage to display their information and posts. Following and unfollowing functionality is handled using backend API interactions.
* **Profile Editing:** Users can edit their profile details ProfileEditForm, passwords UserPasswordForm, and usernames UsernameForm.
* **Post Creation:** The posts/create route allows users to create new posts PostCreateForm.
* **Post Editing:** Users can edit their own posts PostEditForm.
* **Commenting:** Users can add comments to posts CommentCreateForm and edit their own comments CommentEditForm.
* **Liking:** Users can like and unlike posts.
* **Authentication:** The app includes full user authentication—sign-up SignUpForm, sign-in SignInForm, and sign-out (NavBar).
* **About:** An informational page explaining EnergyPlace About.js.
* **404 (Not Found):** A custom 404 page is implemented to handle invalid routes NotFound.js.