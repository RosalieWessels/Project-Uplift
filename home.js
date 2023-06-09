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
var latitude = 0
var longitude = 0
var county = ""
var tomorrowsTemp = 0

function getDistance(lat1, long1, lat2, long2) { 
    var key = "prj_live_pk_82306ea0589ace08c48df8cce747436e7328f0fe"; 
    var url = "https://api.radar.io/v1/route/distance?origin=" + lat1 + "," + long1 + "&destination=" + lat2 + "," + long2 + "&modes=car&units=imperial"
    var results = httpGet2(url,key);
    console.log(httpGet2(url,key));
    var obj = JSON.parse(results);
    d_feet = obj["routes"]["geodesic"]["distance"]["value"]
    d_miles = d_feet / 5280
    return d_miles
};


function httpGet2(url,key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Authorization", key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}



function getShelters() {
    document.getElementById("cards").innerHTML = ""
    document.getElementById("cards").innerHTML += `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Nearby Shelters</h2>`
    db.collection("shelters")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            var name = doc.data().name
            var phone_number = doc.data()["phone number"]
            var website_link = doc.data()["website link"]
            var address = doc.data().address
            var facilities = doc.data().facilities
            var img_address = doc.data().image
            var lat = doc.data().lat
            var long = doc.data().long
            
            var d = distance(lat, long, latitude, longitude, "K").toFixed(2)

            if (d < 20) {
                document.getElementById("cards").innerHTML +=
                `<div id = "card" class="content-card-basic" style="margin-top: 40px;">
                            <div class="card__content_basic">
                                <div style="display: flex; justify-content: left; column-gap: 20px;">
                                    <img src="${img_address}" alt="" style="width: 20%;"w>
                                    <div>
                                        <h5 class="font" style="font-weight: 800">${name}</h5>
                                        <h5 class="font">Website Link: <a href="${website_link}">${name} link</a></h5>
                                        <h5 class="font">Phone Number: <a href="tel:${phone_number}">${phone_number}</a></h5>
                                        <h5 class="font">Distance (miles): ${d}</h5>
                                        <!-- <h5 class="font">Offerings: ${facilities}</h5> -->
                                    </div>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                                    <h5 class="font" style="margin-top: 10px;">Shelter Address: ${address}</h5>
                                    <a href="https://www.google.com/maps/place/${address}"><button type="button" class="btn btn-light font">View on Google Maps</button></a>
                                </div>
                            </div>
                        </div>`;
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
};

function getBanks() {
    document.getElementById("cards").innerHTML = ""
    document.getElementById("cards").innerHTML += `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Nearby Food Banks</h2>`
    db.collection("banks")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var name = doc.data().name
            var phone_number = doc.data()["phone number"]
            var website_link = doc.data().website
            var address = doc.data().address
            var img_address = doc.data().image
            var lat = doc.data().lat
            var long = doc.data().long
            
            var d = distance(lat, long, latitude, longitude, "K").toFixed(2)

            if (d < 20) {
                document.getElementById("cards").innerHTML +=
                `<div id = "card" class="content-card-basic" style="margin-top: 40px;">
                            <div class="card__content_basic">
                                <div style="display: flex; justify-content: left; column-gap: 20px;">
                                    <img src="${img_address}" alt="" style="width: 20%;"w>
                                    <div>
                                        <h5 class="font" style="font-weight: 800">${name}</h5>
                                        <h5 class="font">Website Link: <a href="${website_link}">${name} link</a></h5>
                                        <h5 class="font">Phone Number: <a href="tel:${phone_number}">${phone_number}</a></h5>
                                        <h5 class="font">Distance (miles): ${d}</h5>
                                    </div>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                                    <h5 class="font" style="margin-top: 10px;">Food Bank Address: ${address}</h5>
                                    <a href="https://www.google.com/maps/place/${address}"><button type="button" class="btn btn-light font">View on Google Maps</button></a>
                                </div>
                            </div>
                        </div>`;
            }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function getJobs() {
    document.getElementById("cards").innerHTML = ""
    document.getElementById("cards").innerHTML += `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Job Resources</h2>`
    db.collection("jobs")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var description = doc.data().Description
            var name = doc.data().Name
            var image = doc.data().Image
            var website = doc.data().Website
            console.log("name", name)
            document.getElementById("cards").innerHTML +=
    `<div id = "card" class="content-card-basic" style="margin-top: 40px;">
                <div class="card__content_basic">
                    <div style="display: flex; justify-content: left; column-gap: 20px;">
                        <img src="${image}" alt="" style="width: 20%;"w>
                        <div>
                            <h5 class="font" style="font-weight: 800">${name}</h5>
                            <h5 class="font">Website Link: <a href="${website}">${name} link</a></h5>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <h5 class="font" style="margin-top: 10px;">${description}</h5>
                    </div>
                </div>
            </div>`;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}


function getEducation() {
    document.getElementById("cards").innerHTML = ""
    document.getElementById("cards").innerHTML += `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Education Resources</h2>`
    db.collection("Education Resources")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var description = doc.data().Description
            var name = doc.data().Name
            var image = doc.data().Image
            var website = doc.data().Website
            console.log("name", name)
            document.getElementById("cards").innerHTML +=
    `<div id = "card" class="content-card-basic" style="margin-top: 40px;">
                <div class="card__content_basic">
                    <div style="display: flex; justify-content: left; column-gap: 20px;">
                        <img src="${image}" alt="" style="width: 20%;"w>
                        <div>
                            <h5 class="font" style="font-weight: 800">${name}</h5>
                            <h5 class="font">Website Link: <a href="${website}">${name} link</a></h5>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <h5 class="font" style="margin-top: 10px;">${description}</h5>
                    </div>
                </div>
            </div>`;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function getAlerts() {
    document.getElementById("cards").innerHTML = ""
    document.getElementById("cards").innerHTML += `<h2 class="font" style="padding-bottom: 20px; font-weight: 600;">Opt in to Cold Weather Alerts</h2>
    <h5 class="font" id="temp" style="margin-bottom: 20px">Tomorrow Night's Temperature: </h5>
    <div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Phone #</span>
    </div>
    <input type="text" id="phone" class="form-control" placeholder="phone" aria-label="phone" aria-describedby="basic-addon1">
    </div>
    <button type="button" class="btn btn-light font" style="margin-top: 20px" onclick="submitPhone()">Get Alerts</button>
    <h5 class="font" id="succeeded" style="margin-top: 20px"></h5>`
    getWeather()
}

//start with shelters
getShelters() 

console.log("STORED ADDRESS", window.localStorage.getItem('address'));
var user_address = window.localStorage.getItem('address')

function getLatitudeAndLongitude() { 
    var key = "prj_live_pk_82306ea0589ace08c48df8cce747436e7328f0fe"; 
    var url = "https://api.radar.io/v1/geocode/forward?query=" + user_address + "&country=US";
    var results = httpGet(url,key);
    console.log(httpGet(url,key));
    var obj = JSON.parse(results);
    latitude = obj["addresses"][0]["latitude"]
    longitude = obj["addresses"][0]["longitude"]
    county = obj["addresses"][0]["county"] + " " + obj["addresses"][0]["countryFlag"]
    console.log(latitude, longitude, county)
    document.getElementById("locationText").textContent = county
    getWeather()
};


function httpGet(url,key) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("Authorization", key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getWeather() {
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=700491a30254f608056cb1d5485fba70&units=imperial"
    var results = httpGet3(url);
    console.log(httpGet3(url));
    var obj = JSON.parse(results);
    console.log("WEATHER", obj)
    temperature = obj["list"][12]["main"]["temp"]
    console.log("Temperature in 24 hours is", temperature)
    tomorrowsTemp = temperature
    document.getElementById("temp").textContent = "Tomorrow Night's Temperature " +  tomorrowsTemp + " degrees Fahrenheit"
}

function submitPhone() {
    var phoneN = document.getElementById('phone').value;
    console.log("PHONE NUMBER TO SEND TO", phoneN);
    document.getElementById("succeeded").textContent = "You have successfully opted in, look out for a text message if the forecast weather drops below 50 degrees"
    if (tomorrowsTemp < 45) {
        console.log("sending message bc cold")

        sendMessage(phoneN) //TODO: ENABLE
    }
}

function httpGet3(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

getLatitudeAndLongitude()

function sendMessage(phone) {
    var url = "https://api.twilio.com/2010-04-01/Accounts/AC42271f450ff4023bbbe22b410f62b51e/Messages.json"
    var docRef = db.collection("twillio").doc("token");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            authToken = doc.data().auth
            console.log("authToken", authToken)
            result = httpPost(url, authToken, phone);
            console.log("RESULT", result)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function httpPost(url, authToken, phone) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, true );
    var userColonPassword = "AC42271f450ff4023bbbe22b410f62b51e:" + authToken 
    console.log("user colon password", userColonPassword)
    xmlHttp.setRequestHeader('Authorization','Basic ' + btoa(userColonPassword));
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send("To=+1" + phone + "&From=+18449510710&Body=Hello! Seems like it will be very cold soon (" + tomorrowsTemp + " degrees Fahrenheit) in " + county + ", so be sure to find a shelter. Check on Project Uplift for your closest one.");
    return xmlHttp.responseText;
}
//sendMessage()










