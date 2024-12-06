// JavaScript for handling form submission
const form = document.getElementById("userForm");
const confirmation = document.getElementById("confirmation");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    age: form.age.value,
  };

  try {
    // Send form data to the backend
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      confirmation.style.display = "block"; // Show confirmation message
      form.reset(); // Clear the form
    } else {
      alert("Error submitting form. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to submit. Check your network connection.");
  }
});
