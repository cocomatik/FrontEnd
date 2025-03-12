let resetOtpBtn=document.getElementById("resetOtpBtn")
const inputs = document.querySelectorAll('.otp-inputs input');
const backButton = document.getElementById('backButton');
let OtpVerfy=document.getElementById("OtpVerfy")




// Input navigation
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Back button behavior
backButton.addEventListener('click', () => {
    inputs.forEach(input => (input.value = ''));
    inputs[0].focus();
});




document.getElementById('verifyButton').addEventListener('click', async () => {
    const verifyButton = document.getElementById('verifyButton');
    const otpMsg = document.getElementById('OTPmsg');

    // Disable button & change color
    verifyButton.style.backgroundColor = "gray";
    verifyButton.disabled = true;

    // Get email from localStorage
    let email = localStorage.getItem("userEmail");
    console.log(email);

    if (!email) {
        otpMsg.textContent = 'Email not found. Please enter your email again.';
        verifyButton.style.backgroundColor = "gray"; // Reset button color
        verifyButton.disabled = false;
        return;
    }

    // Get OTP from input fields
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    let otp = Array.from(otpInputs).map(input => input.value).join('');

    // Validate OTP input
    if (otp.length !== otpInputs.length) {
        otpMsg.textContent = 'Please enter the complete OTP';
        verifyButton.disabled = false;
        return;
    }

    // API Request
    try {
        const response = await fetch('https://cocomatik-b.vercel.app/accounts/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok) {
            console.log ('Token:', data.token);
            localStorage.setItem('authToken', data.token); // Save token to localStorage
            OtpVerfy.style.display="flex"
           
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
            

            
        } else {
            otpMsg.textContent = data.message || 'Invalid OTP';
            verifyButton.disabled = false;

        }
    } catch (error) {
        console.error('Error:', error);
        otpMsg.textContent = 'Network error, please try again';
        verifyButton.style.backgroundColor = ""; // Reset button color
        verifyButton.disabled = false;
    }
});


