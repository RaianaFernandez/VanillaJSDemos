let itemCounter = 1;

const wishList = document.querySelector("#item-list");
const itemInput = document.querySelector("#item-input");
const addItemBtn = document.querySelector("#add-item-btn");

addItemBtn.addEventListener("click", () => {
  let nameText = itemInput.value;
  const item = document.createElement("li");
  const itemName = document.createElement("strong");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  if (nameText == "") {
    alert("Please, fill in the Item field.");
  } else {
    //add content attributes
    editBtn.textContent = "✎";
    deleteBtn.textContent = "🗑";
    itemName.textContent = ` ${nameText}`;
    item.append(itemName, editBtn, deleteBtn);
    wishList.append(item);

    //clear inputs and increase itemCounter
    itemInput.value = "";
    itemCounter++;

    //deleteBtn action
    editBtn.addEventListener("click", (e) => {
      const itemToEdit = e.target.closest("li").querySelector("strong");
      const defaultValue = itemToEdit.textContent;
      newText = prompt("Item Name:", defaultValue);
      if (newText !== null && newText.trim() !== "") {
        // Only update the text if the user did NOT click cancel
        itemToEdit.textContent = newText;
      }
    });

    //deleteBtn action
    deleteBtn.addEventListener("click", (e) => {
      const itemToDelete = e.target.closest("li");
      itemToDelete.remove();
    });
  }
});
