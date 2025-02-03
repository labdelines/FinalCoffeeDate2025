// Your web app's Firebase configuration
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

// Set database variable
var database = firebase.database();

function save() {
    var name = document.getElementById('name').value;
    var sex = document.getElementById('sex').value;
    var bio = document.getElementById('bio').value;
    var instagram = document.getElementById('instagram').value.toLowerCase(); // Convert Instagram username to lowercase
    var facebook = document.getElementById('facebook').value;
    var icon = document.getElementById('iconSelect').value;
    
    // Use the 'push' method to create a unique ID for each new user
    var newUserRef = firebase.database().ref('users').push();
  
    // Save user data with the generated unique ID
    newUserRef.set({
      name: name,
      sex: sex,
      bio: bio,
      instagram: instagram,
      facebook: facebook,
      icon: icon
    }).then(function() {
      // Navigate to the users page after saving the user data
      window.location.href = "users.html";  // Redirects to users page

      // Reload the page (if you want to reload before navigating to users)
      // location.reload();  // Uncomment if you want to reload before redirecting
    }).catch(function(error) {
      console.error("Error saving user data: ", error);
    });
}
