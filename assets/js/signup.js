// Ensure you include this script at the bottom of your HTML file
document.getElementById('Register').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = this.name.value;
    const lastname = this.lastname.value;

    const phone = this.tel.value;
    const email = this.mail.value;

console.log("JSON.stringify({ name,lastname, email, phone }: ",JSON.stringify({ name,lastname, email, phone }))
    try {
        // Send POST request to the API
        const response = await fetch('https://wic-doctor.com:3004/api/logup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,lastname, email, phone }),
        });

        const data = response;
        console.log("reponse:",data);
        if (response.ok) {
            alert(data.message || 'Inscription réussie! Vérifiez votre email pour confirmer.');
            window.location.href = 'index.html'; // Redirect to index.html
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});


document.getElementById('Register').addEventListener('submit', function(event) {
    // Récupérer les champs de saisie
    const name = document.querySelector('input[name="name"]');
    const lastname = document.querySelector('input[name="lastname"]');

    const tel = document.querySelector('input[name="tel"]');
    const mail = document.querySelector('input[name="mail"]');

    // Validation du nom
    if (name.value.trim() === "" || name.value.length < 2 || name.value.length > 50) {
        event.preventDefault();  // Empêche la soumission du formulaire
        showPopupnom();
        showPopupnom();
        return;
    }
    
     // Validation du nom
     if (lastname.value.trim() === "" || lastname.value.length < 2 || lastname.value.length > 50) {
        event.preventDefault();  // Empêche la soumission du formulaire
        showPopupnom();
        showPopupnom();
        return;
    }
    
    

 

    // Validation de l'email
    const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!mailPattern.test(mail.value)) {
       
       
        event.preventDefault();
        showPopupmail();
        showPopupmail();
        return;
    }



function showPopupnom() {
    document.getElementById('popupnom').style.display = 'flex';
}

function closePopupnom() {
    document.getElementById('popupnom').style.display = 'none';
}


function showPopupmail() {
    document.getElementById('popupmail').style.display = 'flex';
}

function closePopupmail() {
    document.getElementById('popupmail').style.display = 'none';
}

function showPopupphone() {
    document.getElementById('popupphone').style.display = 'flex';
}

function closePopupphone() {
    document.getElementById('popupphone').style.display = 'none';
}