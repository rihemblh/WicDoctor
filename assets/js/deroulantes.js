// Fetch all specialties


// Function to search for doctors based on selected criteria
function RechercheDoctor() {

    // If there are any parameters, search with them
    apiurl = `https://wic-doctor.com:3004/getannuaire`;


    console.log("API URL: ", apiurl);

    // Fetch the data using the constructed URL
    fetch(apiurl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données des médecins');
            }
            return response.json();
        })
        .then(data => {
            console.log('Données récupérées:', JSON.stringify(data));
            displayDoctorsInCards(data);
        })
        .catch(error => {
            console.error('Erreur:', error);
            const container = document.getElementById('doctorList');
            container.innerHTML = '<center><h2> Pas de médecin trouvé avec ces critères</h2></center>';
        });
}

// Function to display doctors in cards
// Function to display doctors in cards
function displayDoctorsInCards(doctors) {
    const container = document.getElementById('doctorList');
    container.innerHTML = ''; // Clear previous results

    console.log('Doctors to display:', doctors); // Log the data of doctors

    if (!doctors || doctors.length === 0) {
        container.innerHTML = '<p>Aucun médecin trouvé.</p>';
    } else {
        doctors.forEach((item) => {
            // Extraire les données dynamiquement
            const nomPrenom = item["Nom et prénom"] || "Nom inconnu";
            const specialite = item["Spécialité"] || "Spécialité inconnue";
            const adresse = item["Adresse"] || "Adresse inconnue";
            const gouvernorat = item["Gouvernorat"] || "Gouvernorat inconnu";
            const pays = item["Pays"] || "Pays inconnu";
            
            // Utiliser une image de profil par défaut si aucun champ de photo n'est fourni
            const photo = item["photo"]  || "doctor.png";; 
        
            // Construire dynamiquement la carte pour chaque docteur
            const cardHTML = `
            <div class="scrollable-container" style="max-height:350px; overflow-y: auto; padding:10px; height:100%">
                <div class="card-container" style="display:flex; flex-direction:column;">
                    <div class="card overflow-hidden">
                        <div class="d-md-flex">
                            <div class="item-card9-img" style="width: 122px;height: 106px;border-radius: 50%;object-fit: cover;">
                                <div class="item-card9-imgs">			
                                    <img alt="img" class="cover-image" src="assets/images/media/doctors/${photo}">
                                    
                                </div>
                            </div>
                            <div class="card border-0 mb-0">
                                <div class="card-body">
                                    <div class="item-card9">    
                                       
                                            <h4 class="font-weight-bold mt-1 mb-1">${nomPrenom}</h4>
                                        </a>
                                        <div class="mt-2 mb-0">
                                            <ul class="item-card-features mb-0">
                                                <li><span><i class="fa fa-map-marker me-1 text-muted"></i>${adresse}</span></li>
                                                <li><span><i class="fe fe-briefcase me-1 text-muted d-inline-block"></i>${specialite}</span></li>
                                                <li><span><i class="fa fa-flag me-1 text-muted"></i>${gouvernorat}, ${pays}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
            `;
        
            // Ajouter la carte au conteneur
            container.innerHTML += cardHTML;
        });
        
     }
    }

RechercheDoctor()
