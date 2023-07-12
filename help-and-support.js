window.onload = function() {
  const url = new URL(window.location.href);
  if (url.searchParams.has('successful')) {
    if (url.searchParams.get("successful") == "true") {
      popup("Your message has successfully been sent to us! Please wait 1-2 business hours for us to reply back.")
    } else {
      popup("Your message was not sent to us. Are you a robot? Please try again, making sure to input all the relevant information.", true)
    }
  }
}

function popup(message, successful) {
  const notification = document.getElementById("notification");
  notification.innerHTML = message;
  if (successful == false) {
    notification.style.backgroundColor = "darkred";
  }
  notification.style.animation = "up 1s";
  setTimeout(
    function() {
      notification.style.animation = "down 1s";
    }, 5000
  );
}