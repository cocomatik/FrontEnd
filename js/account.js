let logout = document.getElementById("logout")
logout.addEventListener("click",function(){
    localStorage.clear();
    window.location.href = "../index.html";
})


const token = localStorage.getItem("authToken");
console.log("Token:", token);

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
  const profileDiv = document.getElementById("profileView");
  profileDiv.innerHTML = `
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Phone:</strong> ${profile.phone}</p>
    <p><strong>Age:</strong> ${profile.age}</p>
    <p><strong>Gender:</strong> ${profile.gender}</p>
  `;
})
.catch(error => {
  console.error("Error:", error);
  document.getElementById("profileView").innerText = "Failed to load profile.";
});
