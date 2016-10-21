
//attempting to devise a universal function that can, 
//within a single range, set xForms, opacity, and clipPath for
//multiple objects

function setRangeObjProps(rp){
	//rangepct will tell if we're inside or outside+which side
	//if it's below 0 or above 1, set the properties

}


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