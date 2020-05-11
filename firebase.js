(function (){

    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyC8MaOv3krMsmskpcwuTdg82G4mk9SGPEw",
      authDomain: "bookstore-4c9ed.firebaseapp.com",
      databaseURL: "https://bookstore-4c9ed.firebaseio.com",
      projectId: "bookstore-4c9ed",
      storageBucket: "bookstore-4c9ed.appspot.com",
      messagingSenderId: "37823484439",
      appId: "1:37823484439:web:7be145775921e8677fc252",
      measurementId: "G-ED1BH51NX6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //get elements
    const store = document.querySelector('#htmlStore');

    //create references
    const dBRef = firebase.database().ref().child('myLibrary');

    //sych object changes
    dBRef.on('value', snap => console.log(snap.val()));

})()

    