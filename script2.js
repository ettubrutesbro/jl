
var $ = document.getElementById.bind(document),
anim = Velocity.bind(document)

var	loadedvids = 0
	lastplayed = 3

vidarray = document.getElementsByTagName('video')

for(var i = 0; i<4; i++){
	vidarray[i].addEventListener('loadeddata', contentready )
	vidarray[i].addEventListener('ended', nextvid)
}

function contentready(){
	loadedvids++
	if(loadedvids===4){
		console.log('all are done')
		vidarray[0].style.visibility = 'visible'
		vidarray[0].play()
	}
}

function nextvid(){

	var newvid = Math.floor(Math.random()*4)
	if(newvid === lastplayed){ console.log('rerolling'); nextvid(); return}

	vidarray[newvid].play()
	vidarray[lastplayed].style.visibility = 'hidden'
	vidarray[newvid].style.visibility = 'visible'
	
	lastplayed = newvid

	// if(queue[1]<3){ queue[0] = queue[1]; queue[1]++ }
	// else queue = [3,0]

}
var keyframes = [
	{
		'scrollTarget': 150, //at this vertical % of the document, these selectors will show
		//these values for these properties (beginning from 0 or 1)
		'operations': [
			{
				'target': 'jackleng',
				'translateX': -100,
				'opacity': 0.5
			},
			{
				'target': 'helloiam',
				'translateX': -50,
				'opacity': 0
			}
		]
	}
]


var windowWidth = windowHeight = 
currentkey = sumPrevScrolls = 0

var initialHt = window.innerHeight //on resize, this should probably be reset

initializePage()
// setInterval(updatePage,10)

function setupValues(){
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
}
function updatePage(){

	
	// during any keyframe , we look at what % scrollProgress is of the keyframe's 'scrollTarget', 
	// and that % multiplies by the supplied property value of that keyframe for the targeted element

	window.requestAnimationFrame(function(){

		var op = keyframes[currentkey]
		keyframes[currentkey].operations.forEach(function(ele,i,arr){
			//get percentage
			console.log(scrollProgress() / op.scrollTarget + '% towards target for keyframe ' + currentkey)

			// var tgt = $(ele.target) 
		})		

		// for(var i = 0; i<animation.length; i++){
		// 	// setXform($(animation[i].selector), 'translateX('+animation[i].translateX+'px)')
		// }

		// setKeyframe()
	})
}
function setKeyframe(){
	if(window.scrollY > keyframes[currentkey].scrollTarget + sumPrevScrolls) {
		sumPrevScrolls += keyframes[currentkey].scrollTarget
		currentkey++

	}else if(window.scrollY < sumPrevScrolls){
		currentkey--
		sumPrevScrolls -= keyframes[currentkey].scrollTarget
	}
}
function initializePage(){
	var totalScroll = 0
	for(var i=0; i<keyframes.length; i++){
		totalScroll += Number(keyframes[i].scrollTarget)/100 * window.innerHeight
	}
	
	document.body.style.height = totalScroll
	

}



function setXform(element, value){
	element.style.webkitTransform = element.style.mozTransform = element.style.transform =
	element.style.msTransform = element.style.oTransform = value
}
function scrollProgress() {

 	return (((document.body.scrollTop/(document.body.scrollHeight - document.body.clientHeight)) * (document.body.offsetHeight / initialHt)) * 100).toFixed(1)/1

}

// function scrollFunction(){
// 	// console.log('scroll')
// }

window.addEventListener('scroll', throttle(updatePage, 100))


