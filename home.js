const firebaseConfig = {
    apiKey: "AIzaSyAaWhPus6xkHvNClDEZm6VTy5e5XbkJACE",
    authDomain: "project-uplift-17744.firebaseapp.com",
    projectId: "project-uplift-17744",
    storageBucket: "project-uplift-17744.appspot.com",
    messagingSenderId: "984574119650",
    appId: "1:984574119650:web:f663590aa2c94c73f698bb"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();

function getShelters() {
    alert("get shelters")
    document.getElementById("cards").innerHTML = `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Nearby Shelters</h2>`
    db.collection("shelters")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var name = doc.data().name
            var phone_number = doc.data()["phone number"]
            var website_link = doc.data()["website link"]
            var address = doc.data().address
            var facilities = doc.data().facilities
            var img_address = doc.data().image
            print(phone_number)
            document.getElementById("cards").innerHTML +=
    `<div id = "card" class="content-card-basic" style="margin-top: 40px;">
                <div class="card__content_basic">
                    <div style="display: flex; justify-content: left; column-gap: 20px;">
                        <img src="${img_address}" alt="" style="width: 20%;"w>
                        <div>
                            <h5 class="font" style="font-weight: 800">${name}</h5>
                            <h5 class="font">Website Link: <a href="${website_link}">${name} link</a></h5>
                            <h5 class="font">Phone Number: <a href="tel:${phone_number}">${phone_number}</a></h5>
                            <!-- <h5 class="font">Offerings: ${facilities}</h5> -->
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <h5 class="font" style="margin-top: 10px;">Shelter Adress: ${address}</h5>
                        <button type="button" class="btn btn-light font" onclick="window.open('https://www.google.com/maps/place/${address}','_blank')';">View on Google Maps</button>
                    </div>
                </div>
            </div>`;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
};


//start with shelters
getShelters()


//shelters button pressed
// document.getElementById('shelters_button').onclick = function() {
//     alert("elts get shelters")
//     document.getElementById("cards").innerHTML = ""
//     //getShelters()
//  }​;​






