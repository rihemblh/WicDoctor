let apiUrl= 'https://wic-doctor.com:3004/blogs'

async function fetchblogs() {
try {
	const response = await fetch(apiUrl);
	const data = await response.json();
	console.log("List blog: ",data)
    const blogs = data.blogs
    blogs.forEach(item => {
    document.getElementById('list-blog').innerHTML=document.getElementById('list-blog').innerHTML+
    `<div class="col-xl-4 col-lg-6 col-md-12">
								<div class="card">
									<div class="item7-card-img">
										<a href="javascript:void(0);"></a> <img alt="img" class="cover-image" src="assets/images/media/blogs/${item.image}">
										<div class="item7-card-text">
											<span class="badge bg-secondary">Hospital</span>
										</div>
									</div>
									<div class="card-body">
										<div class="item7-card-desc d-flex mb-2">
											<a href="javascript:void(0);"><i class="fa fa-calendar-o text-muted me-2"></i>${item.date}</a>
											
										</div><a class="text-dark" href="javascript:void(0);">
										<h4 class="font-weight-semibold mb-3">${item.titre}</h4></a>
										<p>${item.contenu}</p><a class="btn btn-primary btn-sm" href="javascript:void(0);">Read More</a>
									</div>
								</div>
							</div>`
    })
  } catch (error) {
	console.error("Erreur lors de la récupération des données :", error);
	//document.getElementById('carouselSpecialities').innerHTML = '<p>Erreur lors du chargement des images.</p>';
  }
}
fetchblogs()