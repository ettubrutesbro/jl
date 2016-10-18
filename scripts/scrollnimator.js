var initialHt = window.innerHeight, //on resize, this should be reset
currentkey = 0,
sumPrevScrolls = 0

var propertyList = ['translateX', 'translateY', 'scale','rotate','opacity','clipPath'],
propertyDefaults = [0,0,1,0,1,'polygon(0% 0%, 0% 100%, 100% 100%, 0% 100%)'], unitList = ['px','em','rem','%','deg']

window.addEventListener('scroll', throttle(updatePage, 10))
initializePage()
updatePage()

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
	var allEnds = []
	for(var i = 0; i<ranges.length; i++){
		allEnds.push(ranges[i].rg[1])
	}
	console.log('highest range ending was '+ Math.max(...allEnds))
	proportions.bodyOffsetH = document.body.style.height = Math.max(...allEnds) * window.innerHeight

	// document.body.style.height = $('abt').offsetHeight + $('work').offsetHeight * 2
}
function updatePage(){
	// during any keyframe , we look at what % scrollProgress is of the keyframe's 'scrollTarget', 
	// and that % multiplies by the supplied property value of that keyframe for the targeted element
	window.requestAnimationFrame(function(){

		var prog = (window.pageYOffset + proportions.bodyClientH) / proportions.bodyClientH
		// console.log(document.scrollY)
		console.log(prog)

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
								if(p=== 'opacity') tgt.style.opacity = v
								else computedXform+= ' '+p+'('+v+')'
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
								if(p=== 'opacity') tgt.style.opacity = v
								else computedXform+= ' '+p+'('+v+')'
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
			// var rangepct = (window.scrollY - r.rg[0]) / (r.rg[1] - r.rg[0])
			var rangepct = (prog - r.rg[0]) / (r.rg[1] - r.rg[0]) 
			console.log(rangepct)

			for(var it = 0; it<r.objs.length; it++){ //per element ops

				var obj = r.objs[it] //object with destination values for a DOM element's properties
				var computedXform = '' //string stores transform values, to be pushed after
				var tgt = $(obj.target)



				for(var ite = 0; ite<propertyList.length; ite++){ //per property (transforms) ops
					var p = propertyList[ite]
					if(obj[p] || obj[p]===0){ //if this object contains a property from property list...

						var orig, d, unit = '' //these will eventually be pushed into xform

						// polygon(30% 0%, 100% 0%, 70% 100%, 0% 100%) how to feed this value through d??
	

						if(Array.isArray(obj[p])){
							if(typeof obj[p][0] === 'string') orig = Number(obj[p][0].replace(/[^\d.-]/g, ''))
							else orig = obj[p][0]
						}
						else orig = propertyDefaults[ite]

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

						if(obj.ease) d = easings[obj.ease](rangepct, orig, d-orig , 1) + unit
						else if(!obj.ease) d = orig - ((orig-d)*rangepct) + unit
						
						if(p === 'opacity') tgt.style.opacity = d
						else computedXform +=' '+ p + '(' + d + ')'
					}
				}//end property computation
				setXform(tgt, computedXform)	
			}//end element ops
		}
	})
}


// easeInOutQuad(rangepct)


// t: current time, b: begInnIng value, c: change In value, d: duration

	function easeInOutQuad(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	}