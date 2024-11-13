var form = document.getElementById("my-form");
      
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  // Clear previous status message and hide it
  status.classList.remove("show", "success", "error");
  status.innerHTML = '';
  
  // Submit the form data using Fetch API
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      status.classList.add("success", "show");
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          status.classList.add("error", "show");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form.";
          status.classList.add("error", "show");
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form.";
    status.classList.add("error", "show");
  });
}

form.addEventListener("submit", handleSubmit);
