(function($) {
    "use strict";
	$('#container').showmore({
		closedHeight: 130,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	$( '#villes').showmore({
		closedHeight: 130,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	$( '#time-slots-container').showmore({
		closedHeight: 130,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	
	$('.list-container').showmore({
		closedHeight: 380,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	$('#container1').showmore({
		closedHeight: 350,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	$('#container2').showmore({
		closedHeight: 280,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button',
		animationSpeed: 0.5
	});
	$('.hide-details').showmore({
		closedHeight: 115,
		buttonTextMore: 'Voir plus',
		buttonTextLess: 'Fermer',
		buttonCssClass: 'showmore-button1',
		animationSpeed: 0.5
	});
	if (document.documentElement.clientWidth < 900) {
		$('#container1').showmore({
			closedHeight: 450,
			buttonTextMore: 'Voir plus',
			buttonTextLess: 'Fermer',
			buttonCssClass: 'showmore-button',
			animationSpeed: 0.5
		});
	}
	
	$( "#mySlider" ).slider({
		range: true,
		min: 10,
		max: 999,
		values: [ 200, 500 ],
		slide: function( event, ui ) {
			$( "#price" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
	});

	$( "#price" ).val( "$" + $( "#mySlider" ).slider( "values", 0 ) +
			   " - $" + $( "#mySlider" ).slider( "values", 1 ) );
})(jQuery);