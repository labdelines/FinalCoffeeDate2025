// Firebase Configuration (Replace with your actual Firebase config)
var firebaseConfig = {
    apiKey: "AIzaSyDEjd2KfgzGKyIHfstywMpzY3mVdhA_nzA",
    authDomain: "finalcoffeedate.firebaseapp.com",
    databaseURL: "https://finalcoffeedate-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalcoffeedate",
    storageBucket: "finalcoffeedate.firebasestorage.app",
    messagingSenderId: "219107419254",
    appId: "1:219107419254:web:53730a0c50a0a6ddb76b57"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to Firebase database
var database = firebase.database();

// Function to fetch and display user profiles
function fetchUsers() {
  var userListDiv = document.getElementById('user_list');
  database.ref('users/').on('value', function(snapshot) {
    var users = snapshot.val();
    userListDiv.innerHTML = ''; // Clear the previous list
    for (var username in users) {
      var user = users[username];
      
      // Create user profile elements
      var userDiv = document.createElement('div');
      userDiv.classList.add('user-profile');
      
      var icon = user.icon ? user.icon : '😀'; // Default emoji if no icon selected
      userDiv.innerHTML = `
        <div class="user-icon">${icon}</div>
        <h3>${user.name}</h3>
        <p><strong>Sex:</strong> ${user.sex}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Instagram:</strong> <a href="https://instagram.com/${user.instagram}" target="_blank">${user.instagram}</a></p>
        <p><strong>Facebook:</strong> ${user.facebook}</a></p>
      `;
      
      // Append the user profile to the user list
      userListDiv.appendChild(userDiv);
    }
  });
}

// Call the function to fetch users on page load
fetchUsers();