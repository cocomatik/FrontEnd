document.addEventListener("DOMContentLoaded", () => {
    const userId = 2; // Replace with dynamic user ID if needed
    const addressMsg = document.getElementById("addressMsg");
  
    // Function to populate form fields with API data
    function populateForm(data) {
      document.getElementById("FirstName").value = data.name.split(" ")[0] || "";  // First name
      document.getElementById("LastName").value = data.name.split(" ")[1] || "";   // Last name
      document.getElementById("Phone").value = data.contact_no || "";  // Phone number
      document.getElementById("State").value = data.state || "";      // State
      document.getElementById("City").value = data.city || "";      // State
      document.getElementById("Pincode").value = data.pincode || "";  // Pincode
      document.getElementById("District").value = data.district || ""; // District
      document.getElementById("Locality").value = data.locality || ""; // Locality
      document.getElementById("Street").value = data.street || "";   // Street
      document.getElementById("HouseNo").value = data.house_no || ""; // House number
    }
  
    // Fetch existing address data from API
    async function getAddressData() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        if (addressMsg) {
          addressMsg.innerText = "Authentication failed. Please log in again.";
          addressMsg.style.color = "red";
        }
        return;
      }
  
      try {
        const response = await fetch(`https://engine.cocomatik.com/api/addresses/${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `token ${token}`
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          populateForm(data);  // Populate the form with data from the API
        } else {
          throw data;
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
        if (addressMsg) {
          addressMsg.innerText = "Failed to load address data.";
          addressMsg.style.color = "red";
        }
      }
    }
  
    // Call the function to load existing data
    getAddressData();
  
    // Handle form submission to update address
    const addressButton = document.getElementById("addressChange");
    if (addressButton) {
      addressButton.addEventListener("click", async (e) => {
        e.preventDefault();
  
        // Collect the updated data from the form
        const userAddress = {
          name: `${document.getElementById("FirstName").value} ${document.getElementById("LastName").value}`.trim(),
          contact_no: document.getElementById("Phone").value,
          state: document.getElementById("State").value.trim(),
          pincode: document.getElementById("Pincode").value,
          city: document.getElementById("City").value,
          district: document.getElementById("District").value,
          locality: document.getElementById("Locality").value,
          street: document.getElementById("Street").value,
          house_no: document.getElementById("HouseNo").value
        };
  
        console.log("Updated user address:", userAddress);
  
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found in localStorage.");
          if (addressMsg) {
            addressMsg.innerText = "Authentication failed. Please log in again.";
            addressMsg.style.color = "red";
          }
          return;
        }
  
        try {
          const response = await fetch(`https://engine.cocomatik.com/api/addresses/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `token ${token}`
            },
            body: JSON.stringify(userAddress)
          });
  
          const data = await response.json();
          if (!response.ok) {
            throw data;
          }
  
          if (addressMsg) {
            addressMsg.innerText = "Address updated successfully!";
            addressMsg.style.color = "green";
          }
          console.log("Address update successful:", data);
          setTimeout(() => location.reload(), 1500);
  
        } catch (error) {
          console.error("Error updating address:", error);
          if (addressMsg) {
            addressMsg.innerText = "Failed to update address. Please check your input.";
            addressMsg.style.color = "red";
          }
        }
      });
    }
  });
  