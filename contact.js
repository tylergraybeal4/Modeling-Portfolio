// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the form elements
  var form = document.getElementById("my-form");
  var status = document.getElementById("my-form-status");
  
  // Handle the submit event
  form.addEventListener("submit", handleSubmit);
  
  async function handleSubmit(event) {
      event.preventDefault();
      var data = new FormData(event.target);
      
      try {
          const response = await fetch(event.target.action, {
              method: form.method,
              body: data,
              headers: {
                  'Accept': 'application/json'
              }
          });
          
          if (response.ok) {
              status.innerHTML = "Thanks for your submission!";
              status.className = "form-status success";
              form.reset();
          } else {
              const data = await response.json();
              if (Object.hasOwn(data, 'errors')) {
                  status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
              } else {
                  status.innerHTML = "Oops! There was a problem submitting your form";
              }
              status.className = "form-status error";
          }
      } catch (error) {
          status.innerHTML = "Oops! There was a problem submitting your form";
          status.className = "form-status error";
      }
  }
});
