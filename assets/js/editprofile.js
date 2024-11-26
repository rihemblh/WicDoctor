const secretKey = "maCleSecrete"; // Define your secret key here

function decryptData(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

// Decrypt and retrieve user data from session storage
const authData = sessionStorage.getItem("auth");
if (authData) {
    const login = decryptData(authData);
    console.log("Initial login data: ", login);

    // Assuming the user's first name is in the result array
    const user = login.result[0]; // Get the first user object from the result array

    // Update the user name in the <h4> element
    const userNameElement = document.getElementById("user-name");
    userNameElement.textContent = `${user.first_name} ${user.last_name || ''}`; // Show first name and last name if available

    // Populate form fields with user data
    document.getElementById("first_name").value = user.first_name || '';
    document.getElementById("last_name").value = user.last_name || '';
    document.getElementById("email").value = login.email || ''; // Use email for email field
    document.getElementById("phone_number").value = user.phone_number || '';
    document.getElementById("age").value = user.age || '';
    document.getElementById("gender").value = user.gender || '';
    document.getElementById("weight").value = user.weight || '';
    document.getElementById("height").value = user.height || '';
}

document.getElementById("updateProfileButton").addEventListener("click", async () => {
    const authData = sessionStorage.getItem("auth");
    const login = decryptData(authData);
    const patientId = login.result[0].id;

    // Initialize the updatedProfile object
    const updatedProfile = {};

    // Dynamically add fields to updatedProfile if they are not empty
    const firstName = document.getElementById("first_name").value;
    if (firstName) updatedProfile.first_name = firstName;

    const lastName = document.getElementById("last_name").value;
    if (lastName) updatedProfile.last_name = lastName;

    const email = document.getElementById("email").value;
    if (email) updatedProfile.email = email;

    const phoneNumber = document.getElementById("phone_number").value;
    if (phoneNumber) updatedProfile.phone_number = phoneNumber;

    const age = document.getElementById("age").value;
    if (age) updatedProfile.age = parseInt(age);

    const gender = document.getElementById("gender").value;
    if (gender) updatedProfile.gender = gender;

    const weight = document.getElementById("weight").value;
    if (weight) updatedProfile.weight = parseFloat(weight);

    const height = document.getElementById("height").value;
    if (height) updatedProfile.height = parseFloat(height);

    try {
        const response = await fetch(`https://wic-doctor.com:3004/update/patient/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile), // Send only updated fields
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);

            // Update session storage with new profile data
            login.result[0] = {
                ...login.result[0],
                ...updatedProfile
            };

            // Re-encrypt and store the updated data in sessionStorage
            const updatedAuthData = encryptData(login);
            sessionStorage.setItem("auth", updatedAuthData);

            console.log("Session storage updated with: ", login);
            location.reload();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
    }
});
