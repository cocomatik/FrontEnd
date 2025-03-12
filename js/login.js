document.getElementById('emailForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loginBtn= document.getElementById("loginBtn");
  
    loginBtn.style.backgroundColor="gray"

    const email = document.getElementById('email').value;
    localStorage.setItem("userEmail", email);
    const veryfy=document.getElementById("veryfy")
    const EmailLoginBox=document.getElementById("EmailLoginBox")
    const OtpLoginBox=document.getElementById("OtpLoginBox")
    const jsonData = { "email": email };



    try {
        const response = await fetch('https://cocomatik-b.vercel.app/accounts/send_otp_login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        console.log('Response: ' + JSON.stringify(result));
        veryfy.style.display="flex"
        setTimeout(() => {
            EmailLoginBox.style.display="none"
            OtpLoginBox.style.display="flex"
        }, 3000);
        

    } 
    
    catch (error) {
    alert('Error: ' + error.message);
    }

    let EmailIdGet=document.getElementById("EmailIdGet")
EmailIdGet.innerHTML=(email)





});


// otp
// let editEmail= document.getElementById("editEmail")

// editEmail.addEventListener("click",function(){
//     console.log("hiii")
//           EmailLoginBox.style.display="flex"
//             OtpLoginBox.style.display="none"
// })
