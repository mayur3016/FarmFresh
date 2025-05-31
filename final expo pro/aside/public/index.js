// index.js

// Sticky header effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Placeholder for Firebase user check (for later)
window.addEventListener('DOMContentLoaded', () => {
  // Example Firebase Auth check (to be activated later)
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log("User is logged in:", user.email);
  //   } else {
  //     console.log("User not logged in");
  //   }
  // });
});
