let commentCounter = 1;

const addButton = document.querySelector("#submit-btn");
const commentList = document.querySelector("#comment-list");
const usernameInput = document.querySelector("#username-input");
const commentInput = document.querySelector("#comment-input");

addButton.addEventListener("click", () => {
  const newComment = document.createElement("li");
  const newCommentTitle = document.createElement("strong");
  const newCommentText = document.createElement("p");
  const excludeButton = document.createElement("button");
  let alertMessage = [];
  let userName = usernameInput.value;
  let commentText = commentInput.value;
  if (userName == "") {
    alertMessage.push("\n-Name Field Required;");
  }
  if (commentText == "") {
    alertMessage.push("\n-Comment Field Required;");
  }
  if (alertMessage.length > 0) {
    alert(alertMessage);
  } else {
    newComment.id = "comment" + commentCounter;
    excludeButton.id = `${commentCounter}`;
    excludeButton.innerText = `Apagar`;
    newCommentTitle.textContent = `${commentCounter} - ${userName}`;
    newCommentText.textContent = `${commentText}`;

    //create the excludeButton function
    excludeButton.addEventListener("click", (event) => {
      const id = event.target.id;
      const commentToRemove = document.querySelector("#comment" + id);
      commentToRemove.remove();
    });

    newComment.append(newCommentTitle, newCommentText, excludeButton);
    commentList.append(newComment);
    commentCounter++;
    usernameInput.value = "";
    commentInput.value = "";
  }
});
