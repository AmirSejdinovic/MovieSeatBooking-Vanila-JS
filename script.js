//Selecting elements from DOM
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row.seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//Caling the fucntion
populateUI();

//the + sign in fornt of the variable will convert string into number

let ticketPrice = +movieSelect.value;
//Creating setMovieData, saving the movie index and value
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
//Creating the function updateSelectedCount
//update total and count
function updateSelectedCount() {
  //Grabing all selected seats with queryySelectorAll which will return the nodelist
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //With this method we'll count the nubmer of elements in the array or nodelist and it will be number of selected seats

  //Copy selected seats into array
  //Map through array
  //return new array of index
  //the ... is a spred operator and its copy the values  arry. This will convert the node list into array
  //After that i mapp the arry it is a loop metod it is similar to foreach only diferenci is that its return the array
  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  });
  console.log(seatsIndex);
  //Saving in the LocalStorage
  //Calling the localstorage metod setIteme and passing the key and value. Because the localstorage works on strings I use JSON.stringify method to convert array into string
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  //Update the text in the span tag where it will display the nubmer of seats
  count.innerText = selectedSeatsCount;
  //This will update text in the total and we get the total when we multiplay the count of seats and ticketPrice
  total.innerText = selectedSeatsCount * ticketPrice;
}
//Creating populateUI function geting data from localstorage and populate into ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event
movieSelect.addEventListener("change", e => {
  //Grabing te ticket value from active element
  ticketPrice = +e.target.value;
  //caling the function
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Adding click event on the seats
container.addEventListener("click", e => {
  //e.tagret will return the element on which we clicked on the this element where we added addEventLisenr
  //So here it will return the elements on which we clicked inisde the contianer
  //If the element on which we clicked contains the class seat and not contains the class occupied than do this code
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //If the condition is meet than on the element on which we clicked toogle class. Toggle means that if it not have that class JS will added it and if it have than it will remove it
    e.target.classList.toggle("selected");

    //caling fucniton
    updateSelectedCount();
  }
});

//Initial count and total set
updateSelectedCount();
