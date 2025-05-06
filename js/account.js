document.getElementById("age").addEventListener("input", function () {
  if (this.value < 3) this.value = 3;
});
  document.getElementById("ProfileChange").addEventListener("click", function () {
    let msg = document.getElementById("msg")
    const token = localStorage.getItem("authToken"); // only the token is needed

    if (!token) {
      console.error("Auth token not found.");
      alert("You're not logged in.");
      return;
    }

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const userData = {
      name: `${firstName} ${lastName}`,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value
    };

    // Send updated profile data directly
    fetch("https://engine.cocomatik.com/api/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Profile updated successfully:", data);
      msg.innerHTML="Profile updated successfully!"
      msg.style.color="green"
      setTimeout(() => {
        location.reload();
      }, 1500);
    })
    .catch(error => {
      console.error("Error:", error);
      msg.innerHTML="Failed to update profile."
      msg.style.color="red"

      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  });








  




let logout = document.getElementById("logout")
logout.addEventListener("click",function(){
    localStorage.clear();
    window.location.href = "../index.html";
})
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  console.log("Token:", token);

  // Get the email from localStorage and set it in the email input field
  const storedEmail = localStorage.getItem("userEmail");
  if (storedEmail) {
    document.getElementById("email").value = storedEmail;
    document.getElementById("email").readOnly = true;
  }

  // Fetch Profile Data and Auto-fill Form Inputs
  fetch("https://engine.cocomatik.com/api/profile/", {
    headers: {
      "Authorization": `token ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(profile => {
      console.log("Fetched profile:", profile);

      const [firstName = "", lastName = ""] = profile.name?.split(" ") ?? [];

      document.getElementById("firstName").value = firstName;
      document.getElementById("lastName").value = lastName;
      document.getElementById("phone").value = profile.phone || "";
      document.getElementById("age").value = profile.age || "";
      document.getElementById("gender").value = profile.gender || "";

      document.getElementById("userName").innerHTML=firstName;
      const profileDiv = document.getElementById("profileView");
      if (profileDiv) {
        profileDiv.innerHTML = `
          <p><strong>Name:</strong> ${profile.name}</p>
          <p><strong>Email:</strong> ${storedEmail || "N/A"}</p>
          <p><strong>Phone:</strong> ${profile.phone}</p>
          <p><strong>Age:</strong> ${profile.age}</p>
          <p><strong>Gender:</strong> ${profile.gender}</p>
        `;
      }
    })
    .catch(error => {
      console.error("Error loading profile:", error);
      const profileDiv = document.getElementById("profileView");
      if (profileDiv) {
        profileDiv.innerText = "Failed to load profile.";
      }
    });

  // Save Profile Data (excluding email) to API
  document.getElementById("ProfileChange").addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const profileData = {
      name: `${firstName} ${lastName}`.trim(),
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
      body: JSON.stringify(profileData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Profile updated successfully:", data);
     
    })
    .catch(error => {
      console.error("Error updating profile:", error);
    });
  });
});
