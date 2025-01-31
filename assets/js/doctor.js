const apiUrl = 'https://wic-doctor.com:3004/specialties';
const secretKey = "maCleSecrete";
 // Fonction pour crypter
 function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

// Fonction pour décrypter
function decryptData(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
var currentPath = "https://wic-doctor.com/";
console.log("currentPath: ",currentPath)
let url = currentPath
const indexPosition = url.indexOf("index");

if (indexPosition !== -1) {
	// Extrait la partie de l'URL à partir de "index"
	const extractedPart = url.substring(0, indexPosition);
	console.log(extractedPart);
	url= extractedPart;
} else {
	console.log("Le mot 'index' n'est pas trouvé dans l'URL.");
	
}
const encryptedData = encryptData(url);
sessionStorage.setItem('origin',encryptedData)
async function fetchCarouselDataSpecialities() {
  try {
	const response = await fetch(apiUrl);
	const data = await response.json();
	//console.log("List Spécialité: ",data)
	createCarousel(data);
  } catch (error) {
	console.error("Erreur lors de la récupération des données :", error);
	document.getElementById('carouselSpecialities').innerHTML = '<p>Erreur lors du chargement des images.</p>';
  }
}
// Fonction pour créer les éléments du carrousel dynamiquement
function createCarousel(data) {
  const carousel =   $('#carouselSpecialities');
  carousel.empty(); // Vider le conteneur avant d'ajouter de nouveaux éléments
  data.forEach(item => {
	//console.log ("icon specialité: ",item.icon)

	const carouselItem = ` <div class="item">
						  <div class="card">
							  <div class="card-body">
								  <div class="cat-item text-center">
									  <a  onclick="SearchSpecialities(${item.id},'${JSON.parse(item.name).fr}')"></a>
									  <div class="cat-imgs">
										  <img alt="img" src="assets/images/icons/${item.icon}"
											  class="svg-img">
									  </div>
									  <div class="cat-desc">
										  <h5 class="mb-1">${JSON.parse(item.name).fr}</h5>
										  <small class="badge bg-pill bg-primary me-2">${item.doctor_count}</small><span
											  class="text-muted">médecins disponibles</span>
									  </div>
								  </div>
							  </div>
						  </div>
					  </div>
	`;
	carousel.append(carouselItem);
	$('#carouselSpecialities').trigger('refresh.owl.carousel');
  });
  initializeOwlCarousel();

}


// Fonction pour initialiser Owl Carousel
function initializeOwlCarousel() {
	  $('#carouselSpecialities').owlCarousel('destroy'); // Destroy the carousel
  $('#carouselSpecialities').owlCarousel({
	  loop: true,
	  rewind: false,
	  margin: 25,
	  animateIn: 'fadeInDowm',
	  animateOut: 'fadeOutDown',
	  autoplay: false,
	  autoplayTimeout: 5000, // set value to change speed
	  autoplayHoverPause: true,
	  dots: false,
	  nav: true,
	  autoplay: true,
	  responsiveClass: true,
	  responsive: {
		  0: {
			  items: 1,
			  nav: true
		  },
		  600: {
			  items: 2,
			  nav: true
		  },
		  1300: {
			  items: 4,
			  nav: true
		  }
	  }
  })
}

// Initialiser le carrousel en récupérant les données
$(document).ready(function() {
	fetchCarouselDataSpecialities();
});

const apiUrl2 = 'https://wic-doctor.com:3004/affalldoctors';


async function fetchCarouselData2() {
  try {
	const response = await fetch(apiUrl2);
	const data = await response.json();
	//console.log("DoctorList: ",data)
	createCarouselDoctors(data);
  } catch (error) {
	console.error("Erreur lors de la récupération des données :", error);
	document.getElementById('carouselDoctors').innerHTML = '<p>Erreur lors du chargement des images.</p>';
  }
}
// Fonction pour créer les éléments du carrousel dynamiquement
 function createCarouselDoctors(data) {
  const carousel =   $('#carouselDoctors');
  carousel.empty(); // Vider le conteneur avant d'ajouter de nouveaux éléments
  data.forEach(item => {
	console.log("item: ",item)
	//console.log("item.doctor_photo.data: ",item.doctor_photo.data)
	
	//console.log("blob: ",blob)
	
	      // Chiffrement de l'objet doctor
		  const encryptedData = encryptData(item);
		  console.log("Données chiffrées : ", encryptedData);
   
		  const photos = item.doctor_photo || "assets/images/media/doctors/doctor.png";
		  console.log("********************************************************photots doc: ",photos)
	const carouselItem = ` 	<div class="card mb-0">
							<div class="card-body padding-body">
								<div class="team-section text-center">
									<div class="team-img">
										<img src="${photos}" class="img-thumbnail rounded-circle image alt=" alt="">
									</div>
									<div class="item-card2">
								<small class="text-muted">${JSON.parse(item.specialities[0].name).fr || ""}</small>
								<a  class="text-dark"  onclick="GetDetailsDoctor('${encryptedData}',0,${item.aleatoire})">
									<h4 class="font-weight-semibold mt-1 mb-1">Dr ${JSON.parse(item.name).fr}
										<i class="ion-checkmark-circled  text-success fs-14 ms-1"></i>
									</h4>
								</a>
								
								<div class="mb-0 mt-0">
									<ul class="item-card-features mb-0">
										<li class="mb-0" style="width: 100% !important"><span class="text-muted"><i class="fa fa-map-marker me-1"></i>${JSON.parse(item.gouvernorat).fr} , ${JSON.parse(item.ville).fr}</span></li>
										<!-- <li><span class="text-muted "><i class="fa fa-briefcase me-1"></i>${item.title} expérience</span></li> -->
									</ul>
								</div>
							</div>
						</div>
						<div class="card-footer p-0 btn-appointment border-footer">
							<div class="btn-group w-100">
								<a class="w-50 btn btn-outline-light p-2 border-top-0 border-bottom-0 border-start-0 border-end-0"onclick="GetDetailsDoctor('${encryptedData}',0,${item.id_aleatoire})"><i class="fe fe-eye me-1" ></i> Rendez vous</a>
								<a class="w-50 btn btn-outline-light p-2 border-top-0 border-bottom-0 border-end-0" onclick="GetDetailsDoctor('${encryptedData}',1,${item.aleatoire})"  ><i class="fe fe-phone me-1"></i> Téléconsultation</a>
							</div>
						</div>
								</div>
							</div>
						</div>
	`;
	carousel.append(carouselItem);
	$('#carouselDoctors').trigger('refresh.owl.carousel');
  });
  initializeOwlCarouselDoctors();

}

// Fonction pour initialiser Owl Carousel
function initializeOwlCarouselDoctors() {
	  $('#carouselDoctors').owlCarousel('destroy'); // Destroy the carousel
  $('#carouselDoctors').owlCarousel({
	  loop: true,
	  rewind: false,
	  margin: 25,
	  animateIn: 'fadeInDowm',
	  animateOut: 'fadeOutDown',
	  autoplay: false,
	  autoplayTimeout: 5000, // set value to change speed
	  autoplayHoverPause: true,
	  dots: false,
	  nav: true,
	  autoplay: true,
	  responsiveClass: true,
	  responsive: {
		  0: {
			  items: 1,
			  nav: true
		  },
		  600: {
			  items: 2,
			  nav: true
		  },
		  1300: {
			  items: 4,
			  nav: true
		  }
	  }
  })
} 

// Initialiser le carrousel en récupérant les données
$(document).ready(function() {
  fetchCarouselData2();
});
function GetDetailsDoctor(doctorecrypted,typeRDV,aleatoire){
    sessionStorage.setItem("dataDetails",doctorecrypted)
	console.log("decryptData: ",decryptData(doctorecrypted))
	doc=decryptData(doctorecrypted)
	sessionStorage.setItem("status", "add")
	sessionStorage.setItem("rdv", typeRDV)
	console.log("url: ",`https://wic-doctor.com/medecin/tunisie/${JSON.parse(doc.gouvernorat).fr.replace(/\s+/g, '-').toLowerCase()}/${JSON.parse(doc.specialities[0].name).fr.replace(/\s+/g, '-').toLowerCase()}/dr-${JSON.parse(doc.name).fr.replace(/\s+/g, '-').toLowerCase()}-${doc.aleatoire}.html`)
	window.location.href = `https://wic-doctor.com/medecin/tunisie/${JSON.parse(doc.gouvernorat).fr.replace(/\s+/g, '-').toLowerCase()}/${JSON.parse(doc.specialities[0].name).fr.replace(/\s+/g, '-').toLowerCase()}/dr-${JSON.parse(doc.name).fr.replace(/\s+/g, '-').toLowerCase()}-${doc.aleatoire}.html`; // Rediriger vers la page 2
   // window.location.href = 'prise-de-rendez-vous.html'; // Rediriger vers la page 2
}
