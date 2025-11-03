//1. creating the const
const limitSelector = document.querySelector("#limit-select");
const userSelector = document.querySelector("#user-select");
const dataContainer = document.querySelector("#data-container");
const loader = document.querySelector("#loading-icon");

async function populateUserDropdown() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.username;
      userSelector.append(option);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//2. creating the feed building function
async function buildFeed(limit, userId) {
  loader.style.display = "block";
  dataContainer.innerHTML = "";
  try {
    const usersUrl = "https://jsonplaceholder.typicode.com/users";
    let postsUrl = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`;
    if (userId != 0) postsUrl += `&userId=${userId}`;
    const [postsResponse, usersResponse] = await Promise.all([
      fetch(postsUrl),
      fetch(usersUrl),
    ]);
    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error("Failed to load content");
    }
    const [posts, users] = await Promise.all([
      postsResponse.json(),
      usersResponse.json(),
    ]);
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.username;
    });

    for (const post of posts) {
      const postContainer = document.createElement("div");
      try {
        const [photoResponse, commentsResponse] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/photos/${post.id}`),
          fetch(
            `https://jsonplaceholder.typicode.com/comments?_limit=5&postId=${post.id}`
          ),
        ]);
        if (!photoResponse.ok || !commentsResponse.ok) {
          throw new Error("Failed to load content");
        }
        const [photo, comments] = await Promise.all([
          photoResponse.json(),
          commentsResponse.json(),
        ]);
        postContainer.innerHTML = `
        <article class="post">
            <figure class="photo-frame">
                <header>
                    <a href="profile.html?userId=${post.userId}">${
          userMap[post.userId]
        }</a>
                </header>
                <img src="${photo.url}" alt="${photo.title}">
                <figcaption class="photo-caption">
                    <p>"${post.title}."</p>
                </figcaption>
            </figure>
            <section class="comment-box">
                <h5>Comments</h5>
                <ul>
                  ${comments
                    .map((comment) => `<li>${comment.body}</li>`)
                    .join("")}
                </ul>
                <form class="comment-form">
                    <input type="text"/>
                    <button data-action="add-comment">+</button>
                </form>
            </section>
        </article>
        `;
      } catch (error) {
        console.error(`Failed to load post ${post.id}`, error);
        postContainer.innerHTML =
          "<p>Sorry, we couldn't load this post content.</p>";
      }
      dataContainer.append(postContainer);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    dataContainer.innerHTML = "<p>Sorry, we couldn't load the feed.</p>";
  } finally {
    loader.style.display = "none";
  }
}
async function initializeApp() {
  await populateUserDropdown();
  limitSelector.addEventListener("change", () => {
    const user = userSelector.value;
    const limit = limitSelector.value;
    buildFeed(limit, user);
  });
  userSelector.addEventListener("change", () => {
    const user = userSelector.value;
    const limit = limitSelector.value;
    buildFeed(limit, user);
  });
  dataContainer.addEventListener("click", handleNewComment);
  await buildFeed(20, 0);
}
function handleNewComment(e) {
  const clickedButton = e.target.closest('button[data-action="add-comment"]');
  if (clickedButton) {
    e.preventDefault();
    const form = clickedButton.closest("form");
    const commentInput = form.querySelector("input");
    const commentText = form.querySelector("input").value;
    if (commentText === "") {
      return; // Stop here if the comment is empty
    }
    const commentList = e.target.closest("section").querySelector("ul");
    const newCommentLi = document.createElement("li");
    newCommentLi.innerHTML = `<strong>You:</strong> ${commentText}`;
    commentList.append(newCommentLi);
    commentInput.value = "";
  }
}
initializeApp();
