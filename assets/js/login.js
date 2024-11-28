const secretKey = "maCleSecrete";
// Fonction pour décrypter
function decryptData(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
const contactField = document.getElementById('email');
let itiInstance;

contactField.addEventListener('input', () => {
    const value = contactField.value.trim();
console.log("value: ",value)
    // Vérifie si l'entrée ressemble à un numéro de téléphone (+ ou chiffres uniquement)
    if (/^\+|\d/.test(value) && contactField.type === 'email') {
        // Convertir le champ en input type="tel"
        contactField.type = 'tel';

        // Initialiser l'instance intl-tel-input
        itiInstance = intlTelInput(contactField, {
            initialCountry: 'auto',
            geoIpLookup: (callback) => {
                fetch("https://ipinfo.io")
                .then((response) => response.json())
                    .then((data) => callback(data.country))
                    .catch(() => callback('us'));
            },
            utilsScript: "./utils.js", // Remplacez `path/to/` par le chemin correct vers votre fichier utils.js
            loadUtilsOnInit: true, // Nouvelle méthode pour charger les utilitaires
                    });
    }
});

// Optionnel : Réinitialiser le champ si l'utilisateur supprime tout
contactField.addEventListener('blur', () => {
    if (contactField.value.trim() === '' && itiInstance) {
        contactField.type = 'email';
        itiInstance.destroy(); // Supprime l'instance ITI
        itiInstance = null;
    }
});
// Ensure you include this script at the bottom of your HTML file
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const email = this.email.value;
    const password = this.password.value;

    // Validate form data
    if (!email || !password) {
        alert('Tous les champs sont requis.');
        return;
    }

    try {
        // Send POST request to the API
        const response = await fetch('https://wic-doctor.com:3004/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data)
            // Store the token in local storage or session storage
            const encryptedData = encryptData(data);
            console.log("Login : ", encryptedData);
            sessionStorage.setItem('auth', encryptedData);
            if (sessionStorage.getItem('rendezvous')) {
                console.log("**************************************Rendez-vous Medecin")

                console.log("sessionStorage.getItem('rendezvous'): ", sessionStorage.getItem('rendezvous'))
                const RendezVous = decryptData(sessionStorage.getItem("rendezvous"));
                console.log("RendezVous: ", JSON.stringify(RendezVous))

                const requestOptions = {
                    method: 'POST', // ou 'GET', 'PUT', 'DELETE' selon votre besoin
                    headers: {
                        'Authorization': `Bearer ${data.token}`, // Ajouter le token dans l'en-tête Authorization
                        'Content-Type': 'application/json' // Type de contenu si vous envoyez des données
                    },
                    body: JSON.stringify(RendezVous) // Convertir l'objet en chaîne JSON
                };
                // Appeler l'API
                fetch("https://wic-doctor.com:3004/ajouterrendezvous", requestOptions)
                    .then(response => {

                        if (!response.ok) {
                            throw new Error('Erreur lors de l\'envoi des données');
                        }
                        return response.json(); // Analyser la réponse JSON
                    })
                    .then(data => {
                        console.log('Réponse de l\'API :', data);

                        if (data.message == "Rendez-vous inséré avec succès") {
                            alert("🎉 Votre rendez-vous a été confirmé !\n\nVeuillez consulter votre email pour plus de détails.\n\nMerci de votre confiance !");
                            sessionStorage.removeItem("rendezvousClinic")
                            window.location.href = 'profil.html'; // Rediriger vers la page 2

                        }
                    })
                    .catch(error => {
                        console.error('Erreur :', error);
                    });

                //window.location.href = 'profil.html'; // Rediriger vers la page 2

            }
            else if (sessionStorage.getItem('rendezvousClinic')) {
                console.log("**************************************Rendez-vous Clinique")
                console.log("sessionStorage.getItem('rendezvousClinic'): ", sessionStorage.getItem('rendezvousClinic'))
                const rendezvousClinic = decryptData(sessionStorage.getItem("rendezvousClinic"));
                console.log("rendezvousClinic: ", JSON.stringify(rendezvousClinic))
                const requestOptions = {
                    method: 'POST', // ou 'GET', 'PUT', 'DELETE' selon votre besoin
                    headers: {
                        'Authorization': `Bearer ${data.token}`, // Ajouter le token dans l'en-tête Authorization
                        'Content-Type': 'application/json' // Type de contenu si vous envoyez des données
                    },
                    body: JSON.stringify(rendezvousClinic) // Convertir l'objet en chaîne JSON
                };
                // Appeler l'API
                fetch("https://wic-doctor.com:3004/ajouterrendezvousclinic", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erreur lors de l\'envoi des données');
                        }
                        return response.json(); // Analyser la réponse JSON
                    })
                    .then(data => {
                        console.log('Réponse de l\'API :', data);
                        if (data.message == "Rendez-vous inséré avec succès") {
                            alert("🎉 Votre rendez-vous a été confirmé !\n\nVeuillez consulter votre email pour plus de détails.\n\nMerci de votre confiance !");
                            sessionStorage.removeItem("rendezvousClinic")
                            window.location.href = 'profil.html'; // Rediriger vers la page 2

                        }
                    })
                    .catch(error => {
                        console.error('Erreur :', error);
                    });


            }
            else {
                alert('Connexion réussie!');
                window.location.href = 'profil.html'; // Rediriger vers la page 2
            }

        } else {
            alert(data.error || 'Une erreur est survenue. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});

// Function to clear the session storage item
function clearSessionStorageItem() {
    sessionStorage.removeItem('rendezvous');
    console.log('Session storage item cleared after 15 minutes.');
}

// Set a timeout to clear the session storage item after 15 minutes (900000 milliseconds)
//setTimeout(clearSessionStorageItem, 900000);
