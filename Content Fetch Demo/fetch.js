const limitSelector = document.querySelector("#limit-select");
const userSelector = document.querySelector("#users");
const dataContainer = document.querySelector("#data-container");
const loader = document.querySelector("#loading-icon");

function fetchTasks(limit, userId) {
  loader.style.display = "block";
  let url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;
  if (userId != 0) url += `&userId=${userId}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      loader.style.display = "none";
      dataContainer.innerHTML = "";
      json.forEach((task) => {
        const strong = document.createElement("strong");
        const newParagraph = document.createElement("p");
        const taskId = task.id;
        const title = task.title;
        const userId = task.userId;
        strong.append(`${taskId} (user: ${userId})`);
        newParagraph.append(strong, " - ", title);
        dataContainer.append(newParagraph);
      });
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Error fetching data:", error);
      dataContainer.innerHTML = "<p>Sorry, we couldn't load the tasks.</p>";
    });
}

fetchTasks(20, 0);
// 2. Add the click listener
limitSelector.addEventListener("change", () => {
  let user = userSelector.value;
  let limit = limitSelector.value;
  fetchTasks(limit, user);
});
userSelector.addEventListener("change", () => {
  let user = userSelector.value;
  let limit = limitSelector.value;
  fetchTasks(limit, user);
});
