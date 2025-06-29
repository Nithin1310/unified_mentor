// Project details toggle logic
function showDetails(id) {
    const allDetails = document.querySelectorAll('.project-details');
    allDetails.forEach(detail => {
      if (detail.id === id) {
        detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
      } else {
        detail.style.display = 'none';
      }
    });
  }
  
  // Contact form submission
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
    this.reset(); // Optional: clear form after submission
  });
  