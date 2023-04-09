// const clearInput = () => {
//     const input = document.getElementsByTagName("input")[0];
//     input.value = "";
//   }
  
//   const clearBtn = document.getElementById("clear-btn");
//   clearBtn.addEventListener("click", clearInput);

function move() {
  var inputAddress = document.getElementById('userInput').value
  console.log(inputAddress)
  window.localStorage.setItem('address', inputAddress)
  window.location.href = "home.html";
}




  