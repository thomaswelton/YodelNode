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

window.yodelPositions = [{"x":206,"y":1},{"x":218,"y":3},{"x":230,"y":5},{"x":242,"y":9},{"x":254,"y":13},{"x":265,"y":15},{"x":276,"y":15},{"x":287,"y":16},{"x":298,"y":21},{"x":307,"y":27},{"x":317,"y":30},{"x":328,"y":34},{"x":339,"y":33},{"x":351,"y":35},{"x":361,"y":38},{"x":374,"y":38},{"x":387,"y":42},{"x":400,"y":46},{"x":412,"y":49},{"x":421,"y":54},{"x":434,"y":58},{"x":446,"y":60},{"x":459,"y":63},{"x":470,"y":65},{"x":481,"y":69},{"x":492,"y":69},{"x":504,"y":74},{"x":513,"y":80},{"x":524,"y":83},{"x":534,"y":85},{"x":545,"y":84},{"x":557,"y":86},{"x":569,"y":88},{"x":583,"y":89},{"x":594,"y":92},{"x":607,"y":94},{"x":618,"y":97},{"x":629,"y":103},{"x":642,"y":105},{"x":654,"y":107},{"x":666,"y":110},{"x":677,"y":111},{"x":689,"y":114},{"x":701,"y":113},{"x":711,"y":117},{"x":720,"y":122},{"x":731,"y":126},{"x":742,"y":128},{"x":753,"y":126},{"x":764,"y":126},{"x":778,"y":128},{"x":770,"y":139},{"x":759,"y":143},{"x":749,"y":147},{"x":739,"y":153},{"x":728,"y":155},{"x":716,"y":156},{"x":706,"y":155},{"x":694,"y":156},{"x":683,"y":161},{"x":672,"y":163},{"x":661,"y":166},{"x":650,"y":168},{"x":636,"y":171},{"x":623,"y":174},{"x":613,"y":175},{"x":599,"y":176},{"x":587,"y":178},{"x":576,"y":180},{"x":563,"y":185},{"x":552,"y":189},{"x":542,"y":194},{"x":531,"y":198},{"x":519,"y":202},{"x":509,"y":202},{"x":498,"y":202},{"x":486,"y":203},{"x":476,"y":208},{"x":465,"y":208},{"x":453,"y":213},{"x":441,"y":215},{"x":427,"y":217},{"x":417,"y":220},{"x":404,"y":220},{"x":393,"y":222},{"x":380,"y":225},{"x":367,"y":227},{"x":378,"y":237},{"x":390,"y":242},{"x":400,"y":246},{"x":411,"y":250},{"x":421,"y":256},{"x":434,"y":261},{"x":445,"y":265},{"x":457,"y":269},{"x":470,"y":272},{"x":481,"y":278},{"x":493,"y":278},{"x":502,"y":288},{"x":514,"y":293},{"x":525,"y":297},{"x":542,"y":298},{"x":553,"y":300},{"x":563,"y":301},{"x":578,"y":309},{"x":592,"y":312},{"x":604,"y":318},{"x":612,"y":322},{"x":624,"y":327},{"x":637,"y":332},{"x":648,"y":336},{"x":659,"y":341},{"x":670,"y":344},{"x":680,"y":348},{"x":692,"y":350},{"x":700,"y":355},{"x":711,"y":361},{"x":726,"y":367},{"x":735,"y":369},{"x":754,"y":372},{"x":766,"y":374},{"x":779,"y":377},{"x":792,"y":383},{"x":803,"y":388},{"x":814,"y":391},{"x":823,"y":399},{"x":837,"y":402},{"x":848,"y":405},{"x":859,"y":410},{"x":852,"y":421},{"x":843,"y":430},{"x":836,"y":440},{"x":828,"y":449},{"x":820,"y":455},{"x":811,"y":460},{"x":802,"y":464},{"x":792,"y":474},{"x":785,"y":481},{"x":775,"y":488},{"x":767,"y":495},{"x":758,"y":502},{"x":748,"y":513},{"x":737,"y":514},{"x":727,"y":514},{"x":713,"y":512},{"x":702,"y":511},{"x":690,"y":509},{"x":676,"y":507}];

/*
window.newYodelPositions = new Array();
window.addEvent('domready',function(){
	$('yodelWrapper').addEvent('mouseenter',function(e){
		createMouseTracker();
		trackMouse(e);
	});
	
	$('yodelWrapper').addEvent('mouseleave',function(e){
		if($$('.mousemarker').length > 0){
			$$('.mousemarker').dispose();
		}
	});
	
	$('yodelWrapper').addEvent('mousemove',function(e){		
		trackMouse(e);	
	});
	
	$('yodelWrapper').addEvent('click',function(e){
		if($$('.mousemarker').length > 0){
			var container = $('yodelWrapper').getCoordinates();
			var point = new Object();
			point.x = Math.abs(container.left - e.client.x);
			point.y = Math.abs(container.bottom - e.client.y);
			window.newYodelPositions.push(point);
			
			$$('.mousemarker').addClass('newmarker');
			$$('.mousemarker').removeClass('mousemarker');
		}
	});
	
});

function createMouseTracker(){
	if($('markerContainer') === null){
		var markerContainer = new Element('ul',{'id':'markerContainer'});
		markerContainer.inject($('yodelWrapper'));
	}
	var newMarker = new Element('li',{class:'marker'});
	newMarker.addClass('mousemarker');
	newMarker.inject($('markerContainer'));
}

function trackMouse(e){
	if($$('.mousemarker').length == 0){
		createMouseTracker();
	}
	var bodyPos	   	= e.client;
	var x = bodyPos.x - $('yodelWrapper').getCoordinates().left;
	var y = -1 * (bodyPos.y - $('yodelWrapper').getCoordinates().height);
	
	$$('.mousemarker').setStyle('bottom',y+'px');
	$$('.mousemarker').setStyle('left',x+'px');		
}
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