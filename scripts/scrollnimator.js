var initialHt = window.innerHeight, //on resize, this should be reset
currentkey = 0,
sumPrevScrolls = 0

var propertyList = ['translateX', 'translateY', 'scale', 'rotate'],
propertyDefaults = [0,0,1,0], unitList = ['px','em','rem','%']

window.addEventListener('scroll', throttle(updatePage, 15))
initializePage()

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
		// during range from scroll% X-Y, set property to % of destination value
			if(prog < ranges[i].rg[0] || prog > ranges[i].rg[1]) continue //current pct is outside this range

			//TODO: if the scroll wheel / etc. doesnt catch the 100 rangepct value, things will potentially
			//be out of position. if prog falls outside of the range we should set value to destinations

			var r = ranges[i],
			rangepct = (scrollProgress() - r.rg[0]) / (r.rg[1] - r.rg[0])

			for(var it = 0; it<r.objs.length; it++){ //per element ops

				var obj = r.objs[it], //object with destination values for a DOM element's properties
				computedXform, //string stores transform values, to be pushed after
				tgt = $(obj.target)

				for(var ite = 0; ite<propertyList.length; ite++){ //per property (transforms) ops
					var p = propertyList[ite]
					
					if(obj[p]){ //if this object contains a property from property list...
						if(computedXform) computedXform += ' '
						else computedXform =''

						var orig = obj[p].isArray? obj[p][1].replace(/[^\d.-]/g, '') : propertyDefaults[ite],//value before this range begins 
						//unfortunately the above solution means we rely on forcefed arrays (repeat info..)
						d, unit = '' //these will eventually be pushed into xform
						if(typeof obj[p] === 'string'){ //accounts for units ('px' etc)
							for(var iter = 0; iter < unitList.length; iter++){
								if(obj[p].indexOf(unitList[iter])>-1){
									d = obj[p].replace(/[^\d.-]/g, '')
									unit = unitList[iter]
								}
							}
						}else d = obj[p]
						d = orig - ((orig-d)*rangepct) + unit
						computedXform += p + '(' + d + ')'




					}
				}//end property computation

				console.log(obj.target, computedXform)
				setXform(tgt, computedXform)
			}//end element ops



		/*
		keyframes[currentkey].operations.forEach(function(ele,i,arr){
			var tgt = $(ele.target),
			computedXform

			for(var i = 0; i<propertyList.length; i++){
				var p = propertyList[i]
				if(ele[p]){
					if(computedXform) computedXform += ' '
					else computedXform = ''

					var orig //value before keyframe
					if(currentkey > 0){
						orig = keyframes[currentkey-1].operations
					}
					else orig = ele[p].isArray? ele[p][1] : propertyDefaults[i]

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
					computedXform += p + '(' + d + ')'
					
				}
			}

			setXform(tgt, computedXform)

		})	
		*/	
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




