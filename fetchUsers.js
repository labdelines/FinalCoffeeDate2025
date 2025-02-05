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

// Function to get gender icon
function getGenderIcon(sex) {
  if (sex === "Male") {
      return '<i class="fas fa-mars" style="color:rgb(197, 232, 255);"></i>'; // Blue Male Icon
  } else if (sex === "Female") {
      return '<i class="fas fa-venus" style="color:rgb(209, 180, 51);"></i>'; // Pink Female Icon
  } else if (sex === "LGBTQ+") {
      return '<i class="fas fa-rainbow" style="color: #ff9800;"></i>'; // Rainbow for LGBTQ+
  } else {
      return '<i class="fas fa-genderless" style="color:rgb(63, 63, 63);"></i>'; // Neutral Gray Icon
  }
}

// Array of six vibrant colors for user cards
const colors = ["#2fba7f", "#e8004c", "#f45a3e", "#17e4ds", "#f6bc6a", "#8165ea"];

        // Function to fetch and display users with sex filter
        function fetchUsers() {
          var userList = document.getElementById("user_list");
          var sexFilter = document.getElementById("sexFilter").value; // Get selected sex filter
          userList.innerHTML = ""; // Clear previous entries

          database.ref("users").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var user = childSnapshot.val();
              // If a filter is applied, skip users that don't match the selected sex
              if (sexFilter !== "all" && user.sex !== sexFilter) {
                return; // Skip this user
              }

              var userCard = document.createElement("div");
              userCard.classList.add("user-card");

              // Random pastel background
              let randomColor = colors[Math.floor(Math.random() * colors.length)];
              userCard.style.backgroundColor = randomColor;
              userCard.style.borderRadius = "15px";
              userCard.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.05)";

              var instagramUsername = user.instagram ? user.instagram.split("/").pop() : null;

              userCard.innerHTML = `
                <div class="iconn">${user.icon || "👤"}</div>
                <h3>${user.name || "Unknown"}</h3>
                <p class="gender">${getGenderIcon(user.sex)} ${user.sex || "Not specified"}</p>
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

        // Save function to submit data and reset form
        function save() {
          // Get form data
          var name = document.getElementById("name").value;
          var sex = document.getElementById("sex").value;
          var bio = document.getElementById("bio").value;
          var instagram = document.getElementById("instagram").value;
          var facebook = document.getElementById("facebook").value;
          var icon = document.getElementById("iconSelect").value;

          // Create new user object
          var newUser = {
            name: name,
            sex: sex,
            bio: bio,
            instagram: instagram,
            facebook: facebook,
            icon: icon
          };

          // Push to Firebase
          database.ref("users").push(newUser, function(error) {
            if (error) {
              console.log("Error saving data:", error);
            } else {
              // Clear the form after submitting
              document.getElementById("userForm").reset();
              alert("Profile saved successfully!");
              fetchUsers(); // Refresh user list after adding a new profile
            }
          });
        }
        // Function to fetch all users and pick one randomly
        function getRandomUser() {
          database.ref("users").once("value", function (snapshot) {
              let users = [];
      
              snapshot.forEach(function (childSnapshot) {
                  let user = childSnapshot.val();
                  user.id = childSnapshot.key; // Store Firebase user ID
                  users.push(user);
              });
      
              if (users.length === 0) {
                  alert("No users found!");
                  return;
              }
      
              // Select a random user
              let randomUser = users[Math.floor(Math.random() * users.length)];
      
              // Show loading effect
              document.body.innerHTML = `
                  <div class="loading-screen ">
                      <h2> Loading, who is it... 💖</h2>
                      <h2 style="font-family: Noto Sans Lao, sans-serif"> ກໍາລັງຊອກ... ຫາຫົວໃຈຂອງເຈົ້າ 👀</h2>
                      <div class="spinner"></div>
                  </div>
              `;
      
              // Delay before redirecting (e.g., 3 seconds)
              setTimeout(() => {
                  window.location.href = `profile.html?id=${randomUser.id}`;
              }, 3000);
          });
      }
      

// Attach event listener to the button
document.getElementById("randomLoveBtn").addEventListener("click", getRandomUser);


        // Add event listener for filter change
        document.getElementById("sexFilter").addEventListener("change", fetchUsers);

        // Load users when the page is ready
        window.onload = fetchUsers;

