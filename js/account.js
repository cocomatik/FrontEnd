
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const msg = document.getElementById("msg");

  if (!token) {
    alert("You're not logged in.");
    window.location.href = "../index.html";
    return;
  }

  // Set email (read-only) from localStorage
  const storedEmail = localStorage.getItem("userEmail");
  if (storedEmail) {
    const emailInput = document.getElementById("email");
    emailInput.value = storedEmail;
    emailInput.readOnly = true;
  }

  // Prevent negative age input
  document.getElementById("age").addEventListener("input", function () {
    if (this.value < 0) this.value = 1;
  });

  // Logout
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../index.html";
  });

  // Fetch and display profile data
  fetch("https://engine.cocomatik.com/api/profile/", {
    headers: { "Authorization": `token ${token}` }
  })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(profile => {
      const [firstName = "", lastName = ""] = profile.name?.split(" ") ?? [];
      const fullName = `${firstName} ${lastName}`.trim();

      // Fill form inputs
      document.getElementById("firstName").value = firstName;
      document.getElementById("lastName").value = lastName;
      document.getElementById("phone").value = profile.phone || "";
      document.getElementById("age").value = profile.age || "";
      document.getElementById("gender").value = profile.gender || "";

      // Display user data in separate fields
      document.getElementById("userNAME").innerText = firstName;
      document.getElementById("userName").innerText = fullName;
      document.getElementById("userEmail").innerText = storedEmail || "N/A";
      document.getElementById("userPhone").innerText = profile.phone || "";
      document.getElementById("userAge").innerText = profile.age || "";
      document.getElementById("userGender").innerText = profile.gender || "";
    })
    .catch(error => {
      console.error("Error loading profile:", error);
      document.getElementById("userName").innerText = "Failed to load profile.";
    });

  // Handle profile update
  document.getElementById("ProfileChange").addEventListener("click", () => {
    const userData = {
      name: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`.trim(),
      phone: document.getElementById("phone").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value
    };

    fetch("https://engine.cocomatik.com/api/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => {
        console.log("Profile updated successfully:", data);
        msg.innerText = "Profile updated successfully!";
        msg.style.color = "green";
        setTimeout(() => location.reload(), 1500);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        msg.innerText = "Failed to update profile.";
        msg.style.color = "red";
        setTimeout(() => location.reload(), 1500);
      });
  });
});

