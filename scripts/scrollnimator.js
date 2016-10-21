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
				setRangeObjProps(r, constrain(rangepct,0,1))
			}
			else if(!r.active && rangepct > 0 && rangepct < 1){
				r.active = true
				if(typeof r.callduring === 'function') r.callduring()
				setRangeObjProps(r, rangepct)
			}
		}
	})
}


// easeInOutQuad(rangepct)


// t: current time, b: begInnIng value, c: change In value, d: duration

function setRangeObjProps(range, rp){
//rp will tell if we're inside or outside+which side
//if it's below 0 or above 1, set the properties
for(var i = 0; i<range.objs.length; i++){
	var obj = range.objs[i]
	var tgt
	if(obj.target[0] === '#'){ //its an id
		tgt = $(obj.target.replace('#',''))
	}
	else if(obj.target[0] === '.'){ //its a class
		tgt = [].slice.call(document.getElementsByClassName(obj.target.replace('.','')))
	}
	var computedXform = ''

	for(var it = 0; it<propertyList.length; it++){
		var p = propertyList[it]
		if(obj[p] || obj[p] === 0){
			var orig
			if(p==='clipPath'){
				orig = obj[p].length===2? obj[p][0] : propertyDefaults[it]
				var newCoords = obj[p].length===2? obj[p][1] : obj[p]
				var currentCoords = 'polygon('
				for(var iter = 0; iter < newCoords.length; iter++){ //for every point in the shape
					var originX, destX, originY, destY
					originX = orig[iter][0]; destX = newCoords[iter][0]
					originY = orig[iter][1]; destY = newCoords[iter][1]

					currentCoords+=(originX + ((destX - originX)*rp)+'%')+' '+
					(originY + ((destY - originY)*rp)+'%')
					if(iter<newCoords.length-1) currentCoords+=','
				}
				currentCoords+=')'
				console.log(currentCoords)
				setClip(tgt, currentCoords)
				continue
			}
			else if(p==='translateX'||p==='translateY'||p==='scale'||p==='rotate'||p==='opacity'){
				var unit = '', d
				if(Array.isArray(obj[p])){
					if(typeof obj[p][0] === 'string') orig = Number(obj[p][0].replace(/[^\d.-]/g, ''))
					else orig = obj[p][0]
				}else orig = propertyDefaults[it]

				if(typeof obj[p] === 'string' || typeof obj[p][1] === 'string'){
					if(Array.isArray(obj[p])) d = obj[p][1]
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

				if(obj.ease) d = easings[obj.ease](rp, orig, d-orig , 1) + unit
				else if(!obj.ease) d = orig - ((orig-d)*rp) + unit

				if(p === 'opacity'){
					if(Array.isArray(tgt)){
						for(var ite = 0; ite<tgt.length; ite++){ tgt[ite].style.opacity = d}
					}
					else tgt.style.opacity = d
				}
				else computedXform +=' '+ p + '(' + d + ')'
			}
		}
	}
	setXform(tgt, computedXform)
	}

}

function constrain(numb, min, max){
	if(numb > max) return max
	else if(numb < min) return min
	else return numb
}