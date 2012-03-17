function startGallery() {
    var gallery_parameters = {};
    if (typeof timed        != 'undefined') gallery_parameters.timed        = timed;
    if (typeof delay        != 'undefined') gallery_parameters.delay        = delay;
    if (typeof showInfopane != 'undefined') gallery_parameters.showInfopane = showInfopane;
    if (typeof showCarousel != 'undefined') gallery_parameters.showCarousel = showCarousel;
    if (typeof showArrows   != 'undefined') gallery_parameters.showArrows   = showArrows;

	var myGallery = new gallery($('myGallery'), gallery_parameters);
}

function renderer(data)
{
    var picture_size = prefs.getString('size');
	for (var i = 0; i < data.feed.entry.length; i++) {
		addDiv(data.feed.entry[i], picture_size);
	}
	//window.addEvent('domready', startGallery);
	//window.onDomReady(startGallery);
	startGallery();
}

function addDiv (item, picture_size) {
	var title = item.title.$t;// the filename
	var imgId = item.gphoto$id.$t;// the file id
	
	var targetURL     = item.content.src; //useful for downloading image
	var pictureURL    = item.content.src + '?imgmax=' + picture_size;
	var pictureURL2   = item.content.src + '?imgmax=72';
	var commentCount  = item.gphoto$commentCount.$t;
	var description   = item.media$group.media$description.$t;// Picasa Web photo caption
	var keywords      = item.media$group.media$keywords.$t;// Picasa Web photo caption
	var description2  = "";

	try {
		var camera    = item.exif$tags.exif$make.$t + " " + item.exif$tags.exif$model.$t;
	} catch (err) {
		var camera    = "";
	}

	// comment this is line for remove tags data
	if (keywords && keywords.length && keywords.length > 0)
		description2 = description2 + "Tags: <a href='http://picasaweb.google.com/lh/searchbrowse?q=" + keywords + "'>" + keywords + "</a>;  ";
	
	// comment this is line for remove comments counter
		description2 = description2 + "Comments: " + commentCount + ";  ";

	// comment this is line for remove information about camera
	if (camera && camera.length && camera.length > 0)
		description2 = description2 + "Taken with: " + camera + "; ";
		
	// title
	title = "<a href='http://picasaweb.google.com/" + user + "/" + album + "/photo#" + imgId + "'>" + title + "</a>";
	
	if (description.length > 0)
		title = title + " - " + description;

	HTML =	"<h3>" + title + "</h3>" + 
			"<p>" + description2 + "</p>" +
			"<a href='" + targetURL + "' title='open image' class='open'></a>" +
			"<img src='" + pictureURL + "' class='full' />" +
			"<img src='" + pictureURL2 + "' class='thumbnail' />";

	newDiv = document.createElement("DIV");
	newDiv.className = "imageElement";
	newDiv.innerHTML = HTML;
	$('myGallery').appendChild(newDiv);
}

function loadJS(href) { with (document) {
	var scr = createElement('script');
	body.insertBefore(scr, body.lastChild);
	setTimeout(function() {
		scr.language = 'JavaScript';
		if (scr.setAttribute) scr.setAttribute('src', href); else scr.src = href;
	}, 250);
}}
