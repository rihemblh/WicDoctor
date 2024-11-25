document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("forgotPasswordForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;

        try {
            const response = await fetch('http://localhost:3001/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            alert('Vous allez recevoir un mail');
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            // Assuming data.link contains the reset link
            alert('A reset link has been sent to your email: ' + data.link);
            console.log(data); // Log the response for debugging

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });
});
