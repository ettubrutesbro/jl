var initialHt = window.innerHeight, //on resize, this should be reset
currentkey = 0,
sumPrevScrolls = 0

var propertyList = ['translateX', 'translateY', 'scale', 'rotate'],
propertyDefaults = [0,0,1,0], unitList = ['px','em','rem','%']

window.addEventListener('scroll', throttle(updatePage, 10))
initializePage()

/*
	BUILDING THE PAGE:

	we should already know the heights of the 3 sections
	those sections' offsetHeights (px) should be seeded into var ranges,
	[[or is it bounding box bottom coordinates..?]]
	so we can have ranges that respond to percentages of sections
		(currently, the shitty logic is based on a % multiple of the window.clientHeight)

	when resizing (DEBOUNCED!!! from _.js), regrab those heights, reseed the ranges, 
	use 'prog' to retain user's position on page 

*/
function initializePage(){
	// var totalScroll = 0
	// for(var i=0; i<keyframes.length; i++){
	// 	totalScroll += Number(keyframes[i].scrollTarget)/100 * window.innerHeight
	// }

	document.body.style.height = window.innerHeight * (rangeEnd/100)	
}
function setupValues(){
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
}
function updatePage(){
	// during any keyframe , we look at what % scrollProgress is of the keyframe's 'scrollTarget', 
	// and that % multiplies by the supplied property value of that keyframe for the targeted element
	window.requestAnimationFrame(function(){

		var prog = scrollProgress()

		for(var i = 0; i<ranges.length; i++){ //per range ops
			var r = ranges[i]
			//CHECKING FOR EXCEED / PRECEDE
			if(prog > r.rg[1]){ //progress exceeds range
				if(r.active){ //this boolean should ensure call_ functions only get executed once until
					//range has been re-entered
					if(typeof r.callback === 'function') r.callback()
					r.active = false
					//set all properties to ending values
					for(var it = 0; it<r.objs.length; it++){
						var obj = r.objs[it]
						var computedXform = ''
						var tgt = $(obj.target)
						for(var ite = 0; ite<propertyList.length; ite++){
							p = propertyList[ite]
							if(obj[p]){
								var v = Array.isArray(obj[p])? obj[p][1] : obj[p]
								computedXform+= ' '+p+'('+v+')'
							}
						}
						setXform(tgt,computedXform)
					}
					continue
				}
				else continue
			}else if(prog < r.rg[0]){ //progress precedes range
				if(r.active){
					if(typeof r.callforward === 'function') r.callforward()
					r.active = false
					//set all properties to beginning values, or failing that, defaults
					for(var it = 0; it<r.objs.length; it++){
						var obj = r.objs[it]
						var computedXform = ''
						var tgt = $(obj.target)
						for(var ite = 0; ite<propertyList.length; ite++){
							p = propertyList[ite]
							if(obj[p]){
								var v = Array.isArray(obj[p])? obj[p][0] : propertyDefaults[ite]
								computedXform+= ' '+p+'('+v+')'
							}
						}
						setXform(tgt,computedXform)
					}
					continue
				}
				else continue
			}else{
				if(!r.active){ //entering range for the 1st time
					if(typeof r.callduring === 'function') r.callduring()
					r.active = true
				}
			}
			//PROGRESSING THRU RANGE: CALCULATING PROPERTY VALUES BASED ON "RANGEPCT"
			var rangepct = (scrollProgress() - r.rg[0]) / (r.rg[1] - r.rg[0])

			for(var it = 0; it<r.objs.length; it++){ //per element ops

				var obj = r.objs[it] //object with destination values for a DOM element's properties
				var computedXform = '' //string stores transform values, to be pushed after
				var tgt = $(obj.target)

				for(var ite = 0; ite<propertyList.length; ite++){ //per property (transforms) ops
					var p = propertyList[ite]

					if(obj[p]){ //if this object contains a property from property list...
						computedXform += ' '

						var orig = Array.isArray(obj[p])? Number(obj[p][0].replace(/[^\d.-]/g, '')) : propertyDefaults[ite], 
						d, unit = '' //these will eventually be pushed into xform

						if(typeof obj[p] === 'string' || typeof obj[p][1] === 'string'){ //accounts for units ('px' etc)
							if(Array.isArray(obj[p])) d = obj[p][1]//use obj[p][0] instead of obj[p]
							else d = obj[p]
							for(var iter = 0; iter < unitList.length; iter++){
								if(d.indexOf(unitList[iter])>-1){
									d = d.replace(/[^\d.-]/g, '')
									unit = unitList[iter]
								}
							}
						}
						else if(Array.isArray(obj[p])) d = obj[p][1]
						else d = obj[p]
						d = orig - ((orig-d)*rangepct) + unit
						computedXform += p + '(' + d + ')'




					}
				}//end property computation
				setXform(tgt, computedXform)
			}//end element ops
		}
	})
}

function setXform(element, value){
	element.style.webkitTransform = element.style.mozTransform = element.style.transform =
	element.style.msTransform = element.style.oTransform = value
}
function scrollProgress() {
	//returns what percentage of window inner height the user has scrolled to (100s)
 	return (((document.body.scrollTop/(document.body.scrollHeight - document.body.clientHeight)) * (document.body.offsetHeight / initialHt)) * 100).toFixed(1)/1
}




