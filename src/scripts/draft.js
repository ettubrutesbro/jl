
//attempting to devise a universal function that can, 
//within a single range, set xForms, opacity, and clipPath for
//multiple objects

function setRangeObjProps(range, rp){
	//rp will tell if we're inside or outside+which side
	//if it's below 0 or above 1, set the properties
	for(var i = 0; i<range.objs.length; i++){
		var obj = range.obj[i]
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

						currentCoords+=(originX + ((destX - originX)*rangepct)+'%')+' '+
						(originY + ((destY - originY)*rp)+'%')
						if(iter<newCoords.length-1) currentCoords+=','
					}
					currentCoords+=')'
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
