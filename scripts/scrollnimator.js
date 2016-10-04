var initialHt = window.innerHeight, //on resize, this should be reset
currentkey = 0,
sumPrevScrolls = 0

var propertyList = ['translateX', 'translateY', 'scale', 'rotate'],
propertyDefaults = [0,0,1,0], unitList = ['px','em','rem','%']

window.addEventListener('scroll', throttle(updatePage, 15))
initializePage()

function initializePage(){
	var totalScroll = 0
	for(var i=0; i<keyframes.length; i++){
		totalScroll += Number(keyframes[i].scrollTarget)/100 * window.innerHeight
	}
	document.body.style.height = totalScroll	
}
function setupValues(){
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
}
function updatePage(){
	// during any keyframe , we look at what % scrollProgress is of the keyframe's 'scrollTarget', 
	// and that % multiplies by the supplied property value of that keyframe for the targeted element
	window.requestAnimationFrame(function(){
		var op = keyframes[currentkey],
		pct = scrollProgress() / op.scrollTarget

		keyframes[currentkey].operations.forEach(function(ele,i,arr){
			var tgt = $(ele.target),
			computedXform

			for(var i = 0; i<propertyList.length; i++){
				var p = propertyList[i]
				if(ele[p]){
					if(computedXform) computedXform += ' '
					else computedXform = ''
					//TODO: orig variable needs to match the element.style.property as first priority
					var orig = ele[p].isArray? ele[p][1] : propertyDefaults[i] //value before keyframe

					var d, unit = ''
					if(typeof ele[p] === 'string'){
						for(var it = 0; it<unitList.length; it++){
							if(ele[p].indexOf(unitList[it]) > -1){
								d = ele[p].replace(/[^\d.-]/g, '')
								unit = unitList[it]
							} 
						}
					}
					d = orig - ((orig-d)*pct) + unit
					computedXform += propertyList[i] + '(' + d + ')'
					
				}
			}

			setXform(tgt, computedXform)

		})		
	})
}
// function setKeyframe(){
// 	if(window.scrollY > keyframes[currentkey].scrollTarget + sumPrevScrolls) {
// 		sumPrevScrolls += keyframes[currentkey].scrollTarget
// 		currentkey++

// 	}else if(window.scrollY < sumPrevScrolls){
// 		currentkey--
// 		sumPrevScrolls -= keyframes[currentkey].scrollTarget
// 	}
// }

function setXform(element, value){
	console.log(value)
	element.style.webkitTransform = element.style.mozTransform = element.style.transform =
	element.style.msTransform = element.style.oTransform = value
}
function scrollProgress() {
 	return (((document.body.scrollTop/(document.body.scrollHeight - document.body.clientHeight)) * (document.body.offsetHeight / initialHt)) * 100).toFixed(1)/1
}




