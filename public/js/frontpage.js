var socket = io.connect('http://localhost');

socket.on('tweet', function (tweet) {
	window.addEvent('domready',function(){
		//$('tweets').innerHTML += tweet.text+"<br />";
	});
});
socket.on('tweetCount', function (count) {
	window.addEvent('domready',function(){
		updateTweetCount(count);
	});
});
socket.on('prizeCount', function (count) {
	window.addEvent('domready',function(){
		$$('.prizeCount').set('html',count);
	});
});

window.yodelPositions = [{"x":189,"y":4},{"x":201,"y":8},{"x":213,"y":12},{"x":222,"y":18},{"x":235,"y":19},{"x":247,"y":24},{"x":258,"y":28},{"x":269,"y":29},{"x":281,"y":34},{"x":293,"y":33},{"x":304,"y":39},{"x":313,"y":45},{"x":323,"y":48},{"x":333,"y":51},{"x":345,"y":51},{"x":356,"y":53},{"x":367,"y":55},{"x":381,"y":56},{"x":394,"y":59},{"x":405,"y":63},{"x":417,"y":67},{"x":427,"y":72},{"x":439,"y":75},{"x":452,"y":78},{"x":464,"y":81},{"x":475,"y":82},{"x":487,"y":87},{"x":498,"y":87},{"x":509,"y":91},{"x":518,"y":97},{"x":529,"y":101},{"x":539,"y":104},{"x":550,"y":103},{"x":562,"y":104},{"x":574,"y":105},{"x":588,"y":107},{"x":600,"y":110},{"x":612,"y":114},{"x":623,"y":116},{"x":633,"y":121},{"x":645,"y":126},{"x":659,"y":126},{"x":670,"y":129},{"x":682,"y":129},{"x":694,"y":132},{"x":706,"y":132},{"x":717,"y":137},{"x":726,"y":142},{"x":737,"y":143},{"x":747,"y":146},{"x":758,"y":144},{"x":770,"y":144},{"x":782,"y":145},{"x":775,"y":156},{"x":765,"y":159},{"x":753,"y":164},{"x":743,"y":170},{"x":732,"y":172},{"x":722,"y":176},{"x":710,"y":174},{"x":699,"y":174},{"x":688,"y":180},{"x":678,"y":180},{"x":665,"y":184},{"x":653,"y":187},{"x":641,"y":190},{"x":630,"y":193},{"x":618,"y":192},{"x":606,"y":194},{"x":595,"y":196},{"x":580,"y":198},{"x":568,"y":203},{"x":556,"y":209},{"x":545,"y":213},{"x":535,"y":218},{"x":525,"y":220},{"x":514,"y":222},{"x":503,"y":220},{"x":492,"y":220},{"x":481,"y":227},{"x":471,"y":226},{"x":458,"y":231},{"x":446,"y":234},{"x":433,"y":237},{"x":421,"y":240},{"x":409,"y":240},{"x":397,"y":241},{"x":385,"y":244},{"x":371,"y":247},{"x":383,"y":255},{"x":394,"y":261},{"x":404,"y":264},{"x":415,"y":269},{"x":427,"y":275},{"x":439,"y":279},{"x":451,"y":283},{"x":463,"y":287},{"x":472,"y":293},{"x":485,"y":296},{"x":497,"y":296},{"x":506,"y":301},{"x":516,"y":309},{"x":525,"y":313},{"x":536,"y":316},{"x":547,"y":316},{"x":559,"y":318},{"x":571,"y":322},{"x":583,"y":326},{"x":597,"y":331},{"x":607,"y":336},{"x":618,"y":340},{"x":628,"y":346},{"x":640,"y":351},{"x":652,"y":355},{"x":664,"y":359},{"x":675,"y":361},{"x":686,"y":365},{"x":698,"y":368},{"x":707,"y":373},{"x":717,"y":381},{"x":724,"y":386},{"x":737,"y":388},{"x":748,"y":387},{"x":760,"y":391},{"x":772,"y":392},{"x":785,"y":395},{"x":796,"y":401},{"x":808,"y":405},{"x":820,"y":410},{"x":829,"y":417},{"x":841,"y":420},{"x":853,"y":424},{"x":866,"y":428},{"x":858,"y":440},{"x":848,"y":448},{"x":841,"y":460},{"x":836,"y":466},{"x":826,"y":473},{"x":818,"y":480},{"x":807,"y":485},{"x":798,"y":490},{"x":791,"y":500},{"x":780,"y":505},{"x":771,"y":514},{"x":762,"y":524},{"x":754,"y":532},{"x":742,"y":530},{"x":730,"y":529},{"x":720,"y":528},{"x":707,"y":527},{"x":697,"y":525},{"x":682,"y":523}];

/*
window.newYodelPositions = new Array();

window.addEvent('domready',function(){
	var container = $('yodelWrapper').getCoordinates();
	$('yodelWrapper').addEvent('click',function(e){
		var point = new Object();
		point.x = Math.abs(container.left - e.client.x);
		point.y = Math.abs(container.bottom - e.client.y);
		
		window.newYodelPositions.push(point);
		
	});
});
*/


function getX(index){
	if(index < window.yodelPositions.length){
		return window.yodelPositions[index].x;
	}else{
		return window.yodelPositions[window.yodelPositions.length - 1].x;	
	}
}
function getY(index){
	if(index < window.yodelPositions.length){
		return window.yodelPositions[index].y;
	}else{
		return window.yodelPositions[window.yodelPositions.length - 1].y;	
	}
}
function plotMarkers(){
	if($('markerContainer') !== null){
		$('markerContainer').dispose();
	}
	
	var markerContainer = new Element('ul',{'id':'markerContainer'});
	markerContainer.inject($('yodelWrapper'));
	
	window.yodelPositions.each(function(el,i){
	  var newMarker = new Element('li.marker');
	  newMarker.setStyle('bottom',getY(i));
	  newMarker.setStyle('left',getX(i));	
	  newMarker.inject($('markerContainer'));
	});
}

function moveInView(el,container){
	if(el.getPosition(container).y.toInt() < 60){
		el.removeClass('top');
		el.addClass('bottom');		
	}else if( (el.getPosition(container).y.toInt() - (el.getSize().y + $('hiker').getAttribute('height').toInt() + 100)) > 0){
		el.removeClass('bottom');	
		el.addClass('top');	
	}
	
	if( (el.getCoordinates().right + 30) > container.getCoordinates().right){
		console.log('move to the left');
		el.removeClass('right');	
		el.addClass('left');	
	}else if( (el.getCoordinates().right + el.getSize().x + $('hiker').getStyle('width').toInt() + 30) < container.getCoordinates().right){
		console.log('move to the right');
		el.removeClass('left');	
		el.addClass('right');	
	}
}

function updateTweetCount(count){
	if($('dev') !== null && $('devtoggle').checked === true){
		count = $('devslider').value.toInt();
	}
	
	$$('.tweetCount').set('html',count);
	
	count = Math.floor(Math.min((count / 150),( window.yodelPositions.length - 1)));
	//check which way the hiker is facing
	if(getX(count) >= getX(count +1)){
		$('hikerContainer').addClass('left');
	}else{
		$('hikerContainer').removeClass('left');	
	}
	
	//Change the height of the hiker so it scales up the mountain
	var maxHeight = 60;
	var minHeight = 30;
	
	var rangeY = window.yodelPositions[window.yodelPositions.length - 1].y - window.yodelPositions[0].y;
	var currentY = getY(count);
	var height = maxHeight - Math.round(( (currentY / rangeY) * (maxHeight - minHeight)  ));
	
	$('hiker').setAttribute('height',height);
	
	
	$$('.marker.active').removeClass('active');
	$$('.marker')[count].addClass('active');
	
	$('hikerContainer').setStyle('left',getX(count) - 19);
	$('hikerContainer').setStyle('bottom',getY(count) + 10);
	
	moveInView($('tweetContainer'),$('yodelWrapper'));
}

function getImage(url) {        
    var image = document.createElement('img'); // new Image(1, 1); 
	var regexp = '/\{([^}]+)\}/';
    image.src = url;
    image.onload = function() {
	};
}

window.addEvent('domready',function(){
	//Make sure the bg image loads before plotting dots and moving the hiker
	var preloadUrl = $('yodelWrapper').getStyle('background-image').slice(4,-1);
	getImage(preloadUrl);
	
	plotMarkers();
	var count = $$('.tweetCount')[0].innerHTML.toInt();
	updateTweetCount(count);
	
	if($('dev') !== null){
		$('devslider').setAttribute('max',(window.yodelPositions.length + 1) * 150);
		$('devslider').addEvent('change',function(){
			$('devtoggle').checked = true;
			updateTweetCount();
		});
	}
});