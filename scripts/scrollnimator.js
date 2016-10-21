var initialHt = window.innerHeight, //on resize, this should be reset
currentkey = 0,
sumPrevScrolls = 0

var propertyList = ['translateX', 'translateY', 'scale','rotate','opacity','clipPath'],
propertyDefaults = [0,0,1,0,1,[[0,0],[100,0],[100,100],[0,100]]], unitList = ['px','em','rem','%','deg']

window.addEventListener('scroll', throttle(updatePage, 10))
initializePage()
updatePage()

function initializePage(){
	//goes through ranges, finds the highest value (last 'keyframe point'),
	//and multiplies it by the window height to get the final body height

	var allEnds = []
	for(var i = 0; i<ranges.length; i++){
		allEnds.push(ranges[i].rg[1])
	}
	proportions.bodyOffsetH = document.body.style.height = Math.max(...allEnds) * window.innerHeight

}
function updatePage(){
	// during scroll, we look at what % we are through the total body height, 
	// then get what % we are through any applicable ranges, multiplying differences b/w
	// origins / destinations by that % and adding them 
	window.requestAnimationFrame(function(){

		//get % thru body 
		var prog = (window.pageYOffset + proportions.bodyClientH) / proportions.bodyClientH

		//for each range...
		for(var i = 0; i<ranges.length; i++){ 
			var r = ranges[i]
			var rangepct = (prog - ranges[i].rg[0]) / (ranges[i].rg[1] - ranges[i].rg[0])
			if(r.active){
				if(rangepct > 1){
					if(typeof r.callback === 'function') r.callback()
					r.active = false
				}
				else if(rangepct < 0){
					if(typeof r.callforward === 'function') r.callforward()
					r.active = false
				}
				setRangeObjProps(rangepct)
			}
			else if(!r.active && rangepct > 0 && rangepct < 1){
				r.active = true
				if(typeof r.callduring === 'function') r.callduring()
				setRangeObjProps(rangepct)
			}




			//dive into the range's objects and set properties according to % thru range
			// if(r.active)
			// setRangeObjProps((prog - ranges[i].rg[0]) / (ranges[i].rg[1] - ranges[i].rg[0])) 











			//CHECKING FOR EXCEED / PRECEDE

			/*
				
				1. for each range, are we outside or in the range?
					1a. if we're outside, set element values to end/start values
				2. if we're in, how far through it are we? 
				3. set element values to the orig - through% * change 

				if(prog > r.rg[1]) //exceed
					if(r.active) setRangeObjProps(true,1)
					else continue
				else if(prog < r.rg[0]) //precede
					if(r.active) setRangeObjProps(true,0)
					else continue
				else if(!r.active) //just entered
					if(typeof r.callduring ==='function') r.callduring()
					r.active = true

				//post-exceed/precede/entry checks:

				var rangepct
	
				setRangeObjProps(false,null,)

				for(var it = 0; it<r.objs.length; it++){ 

					var obj = r.objs[it]
					var computedXform = ''

			*/

			if(prog > r.rg[1]){ //progress exceeds range
				if(r.active){ 

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

			for(var it = 0; it<r.objs.length; it++){ //per element ops

				var obj = r.objs[it] //object with destination values for a DOM element's properties
				var computedXform = '' //string stores transform values, to be pushed after
				var tgt
				if(obj.target[0] === '#'){ //its an id
					tgt = $(obj.target.replace('#',''))
				}else if(obj.target[0] === '.'){ //its a class
					tgt = [].slice.call(document.getElementsByClassName(obj.target.replace('.','')))
				}



				for(var ite = 0; ite<propertyList.length; ite++){ //per property (transforms) ops
					var p = propertyList[ite]
					if(obj[p] || obj[p]===0){ //if this object contains a property from property list...

						var orig, d, unit = '' //these will eventually be pushed into xform

						if(p==='clipPath'){
							var oldCoords = obj[p].length===2? obj[p][0] : propertyDefaults[ite]
							var newCoords = obj[p].length===2? obj[p][1] : obj[p]
							//[[30,0],[100,0],[70,100],[0,100]]
							var currentCoords = 'polygon('
							for(var iter = 0; iter < newCoords.length; iter++){ //for every point in the shape
								var originX, destX, originY, destY
								originX = oldCoords[iter][0]
								destX = newCoords[iter][0]
								originY = oldCoords[iter][1]
								destY = newCoords[iter][1]

								currentCoords+=(originX + ((destX - originX)*rangepct)+'%')+' '+
								(originY + ((destY - originY)*rangepct)+'%')
								if(iter<newCoords.length-1) currentCoords+=','
							}
							currentCoords+=')'
							setClip(tgt, currentCoords)

						}
						else if(Array.isArray(obj[p])){ //if the keyframe property's value is an array
							//remove non-numeric characters and set the first value as ORIG
							if(typeof obj[p][0] === 'string') orig = Number(obj[p][0].replace(/[^\d.-]/g, ''))
							else orig = obj[p][0]
						}
						else orig = propertyDefaults[ite] //if it's not an array, use a default value

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
						
						if(p === 'opacity'){
							//TODO this needs to be prepped for arrays and stuff
							tgt.style.opacity = d
						}
						else computedXform +=' '+ p + '(' + d + ')'
					}
				}//end property computation
				console.log(tgt)
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