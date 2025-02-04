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

// Function to show validation errors
function showError(inputId, message) {
  var errorElement = document.getElementById(inputId + "-error");
  if (errorElement) {
      errorElement.innerText = message;
      errorElement.style.display = "block";
  }
}

// Function to clear validation errors
function clearError(inputId) {
  var errorElement = document.getElementById(inputId + "-error");
  if (errorElement) {
      errorElement.innerText = "";
      errorElement.style.display = "none";
  }
}

// Save function with validation
function save() {
  var name = document.getElementById('name').value.trim();
  var sex = document.getElementById('sex').value;
  var bio = document.getElementById('bio').value.trim();
  var instagram = document.getElementById('instagram').value.trim().toLowerCase();
  var facebook = document.getElementById('facebook').value.trim();
  var icon = document.getElementById('iconSelect').value;

  var isValid = true;

  // Validation checks
  if (name === "") {
      showError("name", "Name is required.");
      isValid = false;
  } else {
      clearError("name");
  }

  if (sex === "") {
      showError("sex", "Please select your sex.");
      isValid = false;
  } else {
      clearError("sex");
  }

  if (instagram === "") {
      showError("instagram", "Instagram username is required.");
      isValid = false;
  } else {
      clearError("instagram");
  }

  if (!isValid) {
      return; // Stop function if any field is invalid
  }

  // Save user data
  var newUserRef = database.ref('users').push();
  newUserRef.set({
      name: name,
      sex: sex,
      bio: bio,
      instagram: instagram,
      facebook: facebook,
      icon: icon
  }).then(function() {
      // Show success message (instead of alert)
      document.getElementById("success-message").style.display = "block";

      // Redirect after a short delay
      setTimeout(function() {
          window.location.href = "users.html";
      }, 1500);
  }).catch(function(error) {
      console.error("Error saving user data: ", error);
  });
}
