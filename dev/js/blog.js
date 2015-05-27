window.addEventListener("DOMContentLoaded", function() {

	var body = $('header');
	console.log("slice");
	//slide(0, '#4ECDC4');

});



function slide(index, image) {
	var firstLi = $('nav ul').children()[index];
	var liItem = $(firstLi).children();
	var position = $(liItem).position();

	$('.sliding').css(
		{
			'margin-top': position.top + 26,
			'background-color': image.color
		});
	$('#contentImage').css(
		{
			border: 'solid 4px ' + image.color,
			'background-image': 'url(' + image.src + ')' 
		});
	$('.sliding').animate(
		{
			'margin-left': position.left,
			'width': liItem.width()
		}, 'fast');


}