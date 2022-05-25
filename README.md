# CoderComm

Backend URL: https://codercomm-api-dot-cs-platform-306304.et.r.appspot.com/api

## User stories

### Authentication

- [x] User have to log in with email and password

  - POST `/auth/login`
  - Body: { email, password}
  - Success:

  ```javascipt
  data: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0NWUwMjNkOGRhNmZhZjJiN2E2MzciLCJpYXQiOjE2NDk5OTIzMzIsImV4cCI6MTY1MDA3ODczMn0.lSH326_bbMoCJlIth4uB7CK_tHwK82MsRKAeYvVjqZM",
    user: {
      aboutMe: "A curious learner.",
      avatarUrl:
        "http://res.cloudinary.com/ddawlo98i/image/upload/v1649697021/coder_comm/qd0h6slrvqvovdpmlnox.png",
      city: "Ho Chi Minh City",
      company: "CoderSchool",
      country: "Vietnam",
      coverUrl: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78",
      createdAt: "2022-04-11T16:57:38.641Z",
      email: "minhdh@coderschool.vn",
      facebookLink: "https://www.facebook.com/hai.m.do",
      friendCount: 14,
      instagramLink: "",
      jobTitle: "Software Engineer",
      linkedinLink: "https://www.linkedin.com/in/haiminhdo",
      name: "Minh Hai Do",
      postCount: 1,
      twitterLink: "https://twitter.com/MinhDo87737628",
      updatedAt: "2022-04-13T05:50:51.733Z",
      __v: 0,
      _id: "62545e023d8da6faf2b7a637",
    },
    message: "Login successful",
    success: true,
  }
  ```

  - Error example:

  ```javascript
  data: {
    errors: {
      message: "Wrong password";
    }
    message: "Login Error";
  }
  ```

- [x] New User can register for a new account with name, email, password.

  - POST `/users/`
  - Body: { name, email, password }
  - Response: { user, accessToken }

- [x] User stay logged in with refreshing page.

  - accessToken should be saved in localStorage
  - Every time user refresh the browser:
    - GET `/users/me`
    - Response: { user }

- [ ] On the left side of the homepage, User can see his/her profile info including scorecards of number of friends and posts.

  - Advance: after creating a new post the number of post on the homepage is automatically updated.

- [ ] On the profile cover, User can switch tabs between Profile, Friends, Requests, Add Friend

### Posts and Comments

- [ ] User can create a new post with a content and an image. The image is optional. User can see the new post after successfully created.

  - POST `/posts`
  - Body: { content: String, image: String }
  - Advance: User can upload an image from his/her computer.

- [ ] After logged in, User can see a homepage with his/her posts and his/her friends post. New post should be on the top. User can click Load more to see more post. If there is no more post, Load More button should be disabled.

  - GET `/posts/user/:id?page=1&limit=5`
  - Response: { posts, totalPages, count }
  - Posts is ordered by createdAt (new post is on top)

- [ ] User can comment on a post. User can see the comment after successfully created.

  - POST `/comments`
  - Body: { content, postId }
  - Response: { comment }

- [ ] User can see comments of each post. New comment should be at the bottom. User can see a pagination if the total comments is more than 3 comments
  - GET `/posts/:id/comments?page=1&limit=3` (id: postID)
  - Response: { comments, totalPages, count }
  - Comments is ordered by createdAt (new comment is on top)

### Reaction

- [ ] User can like/dislike a post or a comment
  - POST `/reactions`
  - Body: { targetId, targetType, emoji}
    - targetType: "Post" || "Comment"
    - emoji: "like" || "dislike"

### Add Friends

- [ ] User can see a table of all users in the system

  - GET `/users?page=1&limit=10`
  - Response: { users, totalPages, count}
  - Inside each user there is a `friendship` describing the relationship of that user with the current User:

  ```javascript
  user: {
    ...
    friendship: {
      createdAt: "2022-04-13T05:56:10.697Z",
      from: "62545e023d8da6faf2b7a637",
      status: "pending", // "accepted", "declined"
      to: "625663ff59f17873835eb1b2",
      updatedAt: "2022-04-13T05:56:10.697Z",
    }
  }
  ```

- [ ] User can find users by name

  - GET `/users?name="minh"`
  - Response: { users, totalPages, count}

- [ ] User can see the friendship status with all users and take actions:

  - [ ] User can send request to other users

    - POST `/friends/requests`
    - Body: { to } (`to` is the target User ID)

  - [ ] User can cancel a sent request

    - DELETE `/friends/requests/:userId` (userId is the target User ID)

  - [ ] User can accept/decline a friend request

    - PUT `/friends/requests/:userId` (userId is the target User ID)
    - Body: { status: "accepted" || "declined" }

  - [ ] User can unfriend a target user
    - DELETE `/friends/:userId` (userId is the target User ID)

### Friend Lists

- [ ] User can see a list of friends. User can find friends by name

  - GET `/friends?page=1&limit=10&name=abc`
  - Response: { users, totalPages, count }
  - Each user has the friendship object describing the friendship with current User

- [ ] User can unfriend

### Friend Requests Lists

- [ ] User can see a list of friend requests. User can find friend requests by name

  - GET `/friends/requests/incoming?page=1&limit=10&name=abc`
  - Response: { users, totalPages, count }
  - Each user has the friendship object describing the friendship with current User

- [ ] User can accept/decline friend requests.

### Target User Profile

- [ ] User can see the profile of other users.
  - GET `/users/:id` (id is the target User ID)
  - Response: { user } (with friendship)

### Update Profile

- [ ] User can update profile info
  - PUT `/users/:id` (id is the current user id)
  - Body: allowed fields:
  ```json
  {
    "name",
    "avatarUrl",
    "coverUrl",
    "aboutMe",
    "city",
    "country",
    "company",
    "jobTitle",
    "facebookLink",
    "instagramLink",
    "linkedinLink",
    "twitterLink",
  }
  ```
