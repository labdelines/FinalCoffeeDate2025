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
function fetchUsers() {
  var userList = document.getElementById("user_list");
  userList.innerHTML = ""; // Clear previous entries

  database.ref("users").once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var user = childSnapshot.val();
      var userCard = document.createElement("div");
      userCard.classList.add("user-card");

      userCard.innerHTML = `
        <div class="icon">${user.icon || "👤"}</div>
        <h3>${user.name || "Unknown"}</h3>
        <p><strong>Gender:</strong> ${user.sex || "Not specified"}</p>
        <p class="bio">${user.bio || "No bio available."}</p>
        <p><strong>IG:</strong> 
          ${user.instagram ? `<a href="javascript:void(0);" onclick="window.open('https://www.instagram.com/explore/search/people/?q=${user.instagram}', '_blank', 'width=800, height=600')">@${user.instagram}</a>` : "N/A"}
        </p>
        <p><strong>FB:</strong> 
          ${user.facebook ? `<a href="javascript:void(0);" onclick="window.open('https://www.google.com/search?q=${user.facebook}+facebook', '_blank', 'width=800, height=600')">${user.facebook}</a>` : "N/A"}
        </p>
      `;

      userList.appendChild(userCard);
    });
  });
}

// Load users when the page is ready
window.onload = fetchUsers;
