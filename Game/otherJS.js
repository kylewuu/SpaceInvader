//Other functions

//popup window
// Get the modal
var modal = document.getElementById("myModal");



window.addEventListener("keypress", keyPress, false);
function keyPress(key) {
		modal.style.display = "none";
		exitBox=true;

}

// When the user clicks anywhere outside of the modal, close it

	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
