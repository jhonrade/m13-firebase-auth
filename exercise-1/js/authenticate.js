// JavaScript authentication file
$(function() {

    // Initialize Firebase
     var config = {
        apiKey: "AIzaSyB4FlK-5tkUxQMeeYkFlRnZXxn1rsLkoz4",
        authDomain: "module-13.firebaseapp.com",
        databaseURL: "https://module-13.firebaseio.com",
        storageBucket: "module-13.appspot.com",
        messagingSenderId: "623747762916"
    };
    firebase.initializeApp(config);



    // Sign Up: Function to create account on firebase, then redirect to index.html
    var signUp = function() {
        // Get email, password, and display name
        var email = $('#email').val();
        var password = $("#password").val();
        var displayName = $('#display-name').val();

        console.log (email, password, displayName);

        // Create user, then set the user's display name
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(user){     
        
                // Set display name
                user.updateProfile({         
                    displayName: displayName,         

                }).then(function() {
                        window.location = '/';
                 });
            }).catch(function(error) {
                alert(error.message);
            });

    };




    // SignIn: Function to authenticate on Firebase, then redirect to index.html
    var signIn = function() {
        // Get email and password
        var email = $('#email').val();
        var password = $('#password').val();

        console.log (email, password);


        // Authenticate using email and password, then redirect
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user){     
        
            // Set display name
            user.updateProfile({         
                displayName:'Display Name here',         

            }).then(function() {
                    window.location = '/';
                });
            }).catch(function(error) {
                alert(error.message);
            });
    };



    // Sign out: Function to log a user out of firebase
    var signOut = function() {
        // Sign out, then redirect
        firebase.auth().signOut().then(function() {
            window.location = 'sign-up.html';
        });

    };




    // Assign event lister to form submission
    $('form').on('submit', function(event) {
        event.preventDefault();
        console.log(this.id);
        if (this.id == 'sign-up')
            signUp()
        else {
            signIn()
        }
    })




    // Assign click event to logout button
    $('#log-out').on('click', function() {
        signOut();
    });



    // Authentication Change: see if a user is already signed in, and redirect
    var checked;
    firebase.auth().onAuthStateChanged(function(user) {
        if (checked !== true) {
            // Rediriect to index.html if there is a user and the pathname isn't '/'
            if (user && window.location.pathname != '/') {
                window.location = 'index.html';
            }

            // Redirect to sign-in if there is NOT a user and the pathname IS '/'
            if (!user && window.location.pathname == '/') {
                window.location = 'sign-in.html';
            }
            checked = true;
        }
    });
});
