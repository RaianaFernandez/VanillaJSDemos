document.addEventListener("DOMContentLoaded", () => {
  function getUserIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userId");
    return userId;
  }

  const userIdDisplay = document.querySelector("#user-id-display");
  const profileCard = document.querySelector("#profile-card");
  const loader = document.querySelector("#loader");
  const errorMessage = document.querySelector("#error-message");
  const username = document.querySelector("#username");
  const fullName = document.querySelector("#full-name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const website = document.querySelector("#website");
  const street = document.querySelector("#street");
  const city = document.querySelector("#city");
  const suite = document.querySelector("#suite");
  const zipcode = document.querySelector("#zipcode");
  const geoLat = document.querySelector("#geo-lat");
  const geoLng = document.querySelector("#geo-lng");
  const companyName = document.querySelector("#company-name");
  const catchphrase = document.querySelector("#company-catchphrase");
  const companyBs = document.querySelector("#company-bs");
  const userId = getUserIdFromURL();
  if (!userId) {
    // You would display an error here if the ID is missing
    loader.style.display = "none";
    errorMessage.classList.remove("hidden");

    return;
  }
  async function fetchUserData(userId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const user = await response.json();

      userIdDisplay.textContent = user.id;
      fullName.textContent = user.name;
      username.textContent = user.username;
      email.textContent = user.email;
      phone.textContent = user.phone;
      website.textContent = user.website;
      // Address Info (Nested Objects)
      street.textContent = user.address.street;
      suite.textContent = user.address.suite;
      city.textContent = user.address.city;
      zipcode.textContent = user.address.zipcode;
      geoLat.textContent = user.address.geo.lat;
      geoLng.textContent = user.address.geo.lng;

      // Company Info (Nested Objects)
      companyName.textContent = user.company.name;
      catchphrase.textContent = user.company.catchPhrase;
      companyBs.textContent = user.company.bs;
      profileCard.classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching data:", error);
      errorMessage.classList.remove("hidden");
    } finally {
      loader.style.display = "none";
    }
  }
  fetchUserData(userId);
});
