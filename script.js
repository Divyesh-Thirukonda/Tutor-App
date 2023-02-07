// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import Cookies from '/js.cookie.mjs';

// Start Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAIVEjTlTCpNUS-DGnlQ-qnacqUYRtLYgw",
authDomain: "tutor-app-a2f31.firebaseapp.com",
projectId: "tutor-app-a2f31",
storageBucket: "tutor-app-a2f31.appspot.com",
messagingSenderId: "36568491330",
appId: "1:36568491330:web:31e1b7c83f8765cd0394db",
measurementId: "G-FMTKP2LTQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import{getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const db = getDatabase();
const auth = getAuth();

// End Firebase configuration


// Register the user to Firebase database
function registerUser() {
    createUserWithEmailAndPassword(auth, userRegisterEmailText.value, userRegisterPasswordText.value)
    .then((userCredential) => {
        // Signed up 
        alert("Registered Successfully");
        const user = userCredential.user;
        userEmail =  userRegisterEmailText.value;
        Cookies.set('userEmail', userEmail, { expires: 100 });

        popupRegister.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
    })
    .catch((error) => {
        alert(error.message);
    });
}

// Login user
function loginUser() {
    signInWithEmailAndPassword(auth, userLoginEmailText.value, userLoginPasswordText.value)
    .then((userCredential) => {
        // Logged in 
        const user = userCredential.user;
        userEmail = userLoginEmailText.value;
        popupLogin.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
        alert("Signed In Successfully");
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

userEmail = Cookies.get("userEmail");

function PostQuestion() {

    // Get date of post
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;

    // Post to database
    set(ref(db, "People/"+ userEmail.replace(".", "").replace(".", "").replace(".", "").replace("]", "").replace("[", "").replace("$", "").replace("#", "")),{
        Date: formattedToday,
        Title: userTitlePostText.value,
        Subject: userSubjectPostText.value,
        Question: userQuestionPostText.value
    })
    .then(()=>{
        console.log("Data added successfully");
        console.log(userEmail);
        popupPost.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
        FindData();
    })
    .catch((error)=>{
        alert(error.message);
    });
}

// Retreieve posts
function FindData() {
    const dbref = ref(db);
    var arr = []; // all users


    get(child(dbref, "People"))
    .then((snapshot)=>{
        if(snapshot.exists()){

            let people = snapshot.val();
            for (var user in snapshot.val()) { // for each user in People
                arr.push( [ Object.values(snapshot.child(user).val()) ] );
                // Object.values(snapshot.child(user).val())[0] = DATE
                // Object.values(snapshot.child(user).val())[1] = QUESTION
                // Object.values(snapshot.child(user).val())[2] = SUBJECT
                // Object.values(snapshot.child(user).val())[3] = TITLE
            }

            let list = document.getElementById("Posts");
            var child = list.lastElementChild; 
            while (child) {
                list.removeChild(child);
                child = list.lastElementChild;
            }
            
            // Add the html to the website
            arr.slice().reverse().forEach((item) => { 
                let dateText = document.createElement("h5"); // date
                let question = document.createElement("p"); //question
                let subject = document.createElement("div"); // subject
                let title = document.createElement("h2"); // title
                
                dateText.setAttribute("class", "Date");
                question.setAttribute("class", "Question");
                subject.setAttribute("class", "Subject");
                title.setAttribute("class", "Title");

                dateText.innerText = item[0][0].toString();
                question.innerText = item[0][1].toString();
                subject.innerText = item[0][2].toString();
                title.innerText = "[" + item[0][2].toString() + "] " + item[0][3].toString();
                

                let btnReply = document.createElement("button");
                btnReply.setAttribute("class", "Reply");
                btnReply.setAttribute("id", "Reply");
                btnReply.innerText = "Reply";

                let actualPost = document.createElement("div");
                actualPost.setAttribute("class", "StudentPost");
                list.appendChild(actualPost);
                
                actualPost.appendChild(title);
                actualPost.appendChild(dateText);
                actualPost.appendChild(question);
                actualPost.appendChild(btnReply);
            });

        } else {
            alert("No data found");
        }
    })
    .catch((error)=>{
        alert(error)
    })

}


// Functions for the 3 buttons at the top
function SeeReg() {
    if (popupRegister.style.display === "none") {
        popupRegister.style.visibility = "visible";
        overlay.style.visibility = "visible";
    } else {
        popupRegister.style.visibility = "visible";
        overlay.style.visibility = "visible";
    }
}
function SeeLog() {
    if (popupLogin.style.display === "none") {
        popupLogin.style.visibility = "visible";
        overlay.style.visibility = "visible";
    } else {
        popupLogin.style.visibility = "visible";
        overlay.style.visibility = "visible";
    }
}
function SeePost() {
    if (popupPost.style.display === "none") {
        popupPost.style.visibility = "visible";
        overlay.style.visibility = "visible";
    } else {
        popupPost.style.visibility = "visible";
        overlay.style.visibility = "visible";
    }
}


// Defining html variables
var registerBtn = document.querySelector("#register");
var loginBtn = document.querySelector("#login");
var postBtn = document.querySelector("#post");

var popupRegister = document.querySelector("#SignUpPopup");
var popupLogin = document.querySelector("#LoginPopup");
var popupPost = document.querySelector("#PostPopup");

var overlay = document.querySelector("#overlay");

var seeRegisterBtn = document.querySelector("#SeeSignUpPopup");
var seeLoginBtn = document.querySelector("#SeeLoginPopup");
var seePostBtn = document.querySelector("#SeePostPopup");

var backRegisterBtn = document.querySelector("#backRegister");
var backLoginBtn = document.querySelector("#backLogin");
var backPostBtn = document.querySelector("#backPost");

var userRegisterEmailText = document.querySelector("#userRegisterEmail");
var userRegisterPasswordText = document.querySelector("#userRegisterPassword");


var userLoginEmailText = document.querySelector("#userLoginEmail");
var userLoginPasswordText = document.querySelector("#userLoginPassword");

var userEmail = "";

var userTitlePostText = document.querySelector("#titleQuestion");
var userSubjectPostText = document.querySelector("#subjectQuestion");
var userQuestionPostText = document.querySelector("#questionQuestion");



popupRegister.style.visibility = "hidden";
popupLogin.style.visibility = "hidden";
popupPost.style.visibility = "hidden";
overlay.style.visibility = "hidden";


// Calling events to clicking buttons
backRegisterBtn.addEventListener("click", function() {
        popupRegister.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
    
});
backLoginBtn.addEventListener("click", function() {
        popupLogin.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
    
});
backPostBtn.addEventListener("click", function() {
        popupPost.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
    
});


seeRegisterBtn.addEventListener('click', SeeReg);
seeLoginBtn.addEventListener("click", SeeLog);
seePostBtn.addEventListener("click", SeePost);

registerBtn.addEventListener('click', registerUser);
loginBtn.addEventListener('click', loginUser);
postBtn.addEventListener('click', PostQuestion);


FindData();