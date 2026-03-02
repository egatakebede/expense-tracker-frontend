document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Signup form handler
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        name: signupForm.name.value,
        email: signupForm.email.value,
        password: signupForm.password.value,
      };

      try {
        const res = await post("/auth/signup", data);
        document.getElementById("message").innerText = res.message || res.error;
      } catch (err) {
        document.getElementById("message").innerText = "Signup failed!";
      }
    });
  }

  // Login form handler
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };

      try {
        const res = await post("/auth/login", data);
        if (res.token) {
          localStorage.setItem("token", res.token);
          window.location.href = "dashboard.html";
        } else {
          document.getElementById("message").innerText = res.error;
        }
      } catch (err) {
        document.getElementById("message").innerText = "Login failed!";
      }
    });
  }
});