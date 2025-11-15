
const contactForm = document.getElementById("contact-form-real");
const formContainer = document.querySelector(".contact-form-container");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "friend";

    const successMessage = `
      <div class="form-success">
        <h2>Thank you, ${name}!</h2>
        <p>Your message has been sent. I'll get back to you shortly.</p>
      </div>
    `;

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json", 
        },
      });

      if (response.ok) {
        if (formContainer) {
          formContainer.innerHTML = successMessage;
        }
      } else {
        throw new Error("Formspree error: " + response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was a problem sending your message. Please try again later or email me directly."
      );
    }
  });
}