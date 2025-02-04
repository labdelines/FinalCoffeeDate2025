// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDEjd2KfgzGKyIHfstywMpzY3mVdhA_nzA",
  authDomain: "finalcoffeedate.firebaseapp.com",
  databaseURL: "https://finalcoffeedate-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalcoffeedate",
  storageBucket: "finalcoffeedate.firebasestorage.app",
  messagingSenderId: "219107419254",
  appId: "1:219107419254:web:53730a0c50a0a6ddb76b57"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Fetch and display users
// Function to get gender icon
function getGenderIcon(sex) {
  if (sex === "Male") {
      return '<i class="fas fa-mars" style="color: #3498db;"></i>'; // Blue Male Icon
  } else if (sex === "Female") {
      return '<i class="fas fa-venus" style="color: #e91e63;"></i>'; // Pink Female Icon
  } else if (sex === "LGBTQ+") {
      return '<i class="fas fa-rainbow" style="color: #ff9800;"></i>'; // Rainbow for LGBTQ+
  } else {
      return '<i class="fas fa-genderless" style="color: #9e9e9e;"></i>'; // Neutral Gray Icon
  }
}

// Fetch and display users
function fetchUsers() {
  var userList = document.getElementById("user_list");
  userList.innerHTML = ""; // Clear previous entries

  database.ref("users").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
          var user = childSnapshot.val();
          var userCard = document.createElement("div");
          userCard.classList.add("user-card");

          // Extract Instagram username from URL if provided
          var instagramUsername = user.instagram ? user.instagram.split("/").pop() : null;

          userCard.innerHTML = `
              <div class="icon">${user.icon || "👤"}</div>
              <h3>${user.name || "Unknown"}</h3>
              <p class="gender">${getGenderIcon(user.sex)} <strong>${user.sex || "Not specified"}</strong></p>
              <p class="bio">${user.bio || "No bio available."}</p>

              <div class="social-links">
                  ${user.instagram ? `<a href="https://www.instagram.com/${instagramUsername}" target="_blank"><i class="fab fa-instagram"></i></a>` : ""}
                  ${user.facebook ? `<a href="https://www.facebook.com/search/top?q=${encodeURIComponent(user.facebook)}" target="_blank"><i class="fab fa-facebook"></i></a>` : ""}
              </div>
          `;

          userList.appendChild(userCard);
      });
  });
}

// Load users when the page is ready
window.onload = fetchUsers;

