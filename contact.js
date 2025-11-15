/**
 * Feature 1: REAL Contact Form Submission (using AJAX)
 * Sends data to Formspree without a page reload.
 */
const contactForm = document.getElementById("contact-form-real");
const formContainer = document.querySelector(".contact-form-container");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    // 1. Prevent the default redirect
    e.preventDefault();

    // 2. Get form data and the user's name
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "friend";

    // 3. Create the "Thank You" message HTML
    const successMessage = `
      <div class="form-success">
        <h2>Thank you, ${name}!</h2>
        <p>Your message has been sent. I'll get back to you shortly.</p>
      </div>
    `;

    // 4. Send the data to Formspree
    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json", // Formspree needs this for AJAX
        },
      });

      // 5. Check if Formspree accepted the submission
      if (response.ok) {
        // Show our success message
        if (formContainer) {
          formContainer.innerHTML = successMessage;
        }
      } else {
        // Handle server-side errors
        throw new Error("Formspree error: " + response.status);
      }
    } catch (error) {
      // Handle network errors (e.g., user is offline)
      console.error("Error submitting form:", error);
      alert(
        "There was a problem sending your message. Please try again later or email me directly."
      );
    }
  });
}