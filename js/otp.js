let resetOtpBtn=document.getElementById("resetOtpBtn")
let timeLeft = 30;
const timerElement = document.getElementById("resetOTpTime");
timerElement.innerText = timeLeft;

const countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    
    if (timeLeft <= 0) {
        resetOtpBtn.style.display="flex"
        clearInterval(countdown);

       
    }
}, 1000);

document.getElementById('verifyButton').addEventListener('click', async () => {
    verifyButton.style.backgroundColor="gray"
    // Get email from localStorage
    let email = localStorage.getItem("userEmail");
    console.log(email)

    if (!email) {
        document.getElementById('OTPmsg').textContent = 'Email not found. Please enter your email again.';
        return;
    }

    // Get OTP from input fields
    const otpInputs = document.querySelectorAll('.otp-inputs input');
    let otp = '';

    otpInputs.forEach(input => otp += input.value);

    // Validate OTP input
    if (otp.length !== otpInputs.length) {
        document.getElementById('OTPmsg').textContent = 'Please enter the complete OTP';
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
            console.log('Token:', data.token);
        } else {
            document.getElementById('OTPmsg').textContent = data.message || 'Invalid OTP';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('OTPmsg').textContent = 'Network error, please try again';
    }
});
