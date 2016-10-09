
var $ = document.getElementById.bind(document),
	anim = Velocity.bind(document)
	

var	loadedvids = 0
	lastplayed = 3

var vidarray = document.getElementsByTagName('video')

var selectedProject = ''

var proportions = { //table of values for transforms etc, recalc on resize
}

//TODO: wait until all videos are loaded before initializing any
//also need to create an initialization animation


vidarray[0].style.visibility = 'visible'
vidarray[0].play()

for(var i = 0; i<4; i++){
	vidarray[i].addEventListener('ended', nextvid)
}


for(var i = 0; i<projects.length; i++){
	var project = new Project(projects[i])
	$('work').appendChild(project)
}

distribute()
calcProportions()

window.addEventListener('click',function(){
	console.log("u clicked somewhere")
	if(selectedProject) $(selectedProject).collapse()
})



//TODO: nextvid needs to count 2 back, so it doesn't play the same one or the previous one again

function nextvid(){
	var newvid = Math.floor(Math.random()*4)
	if(newvid === lastplayed){ console.log('rerolling'); nextvid(); return}

	vidarray[newvid].play()
	vidarray[lastplayed].style.visibility = 'hidden'
	vidarray[newvid].style.visibility = 'visible'
	
	lastplayed = newvid

}


function Project(proj){ //pseudo class designed to take data and turn it into a DOM object

	var element = document.createElement('article')
	element.className = 'project'; element.id = proj.id
	for(var i = 0; i<proj.classes.length; i++){
		element.classList.add(proj.classes[i])
	}
	element.picvid = document.createElement('div')
	element.picvid.className = 'picvid'
	element.appendChild(element.picvid)

	element.info = document.createElement('div')
	element.info.className = 'info'
	// element.info.textContent = proj.info
		for(var i = 0; i<proj.info.length; i++){
			var paragraph = document.createElement('p')
			paragraph.textContent = proj.info[i]
			element.info.appendChild(paragraph)
		}
	element.appendChild(element.info)

	element.addEventListener('click',function(e){
		console.log('you clicked '+ element.id)
		if(!selectedProject) this.expand()
		e.stopPropagation()
	})
	
	element.expand = function(){
		//set z-index
		this.style.zIndex = 2

		anim([this.picvid,this.info], { //needs to retain square scale
			scaleX: proportions.xFill > proportions.yFill? 1/proportions.fillRatio : 1,
			scaleY: proportions.yFill > proportions.xFill? 1/proportions.fillRatio : 1
		})
		anim(this, {
			translateX: '-=' + this.style.left,
			translateY: '-=' + this.style.top,
			scaleX: proportions.xFill, 
			scaleY: proportions.yFill
		})	
		selectedProject = this.id

	}

	element.collapse = function(){
		anim(this, {translateX: 0, translateY: 0, scaleX: 1, scaleY: 1},
			{complete: function(){element.style.zIndex = 1}})
		anim(this.picvid, {scaleX: 1, scaleY: 1})
		selectedProject = ''	
	}

	return element
}

function distribute(animated, proj){
	var bodyWidth = document.body.offsetWidth,
	projs = document.getElementsByClassName('project'),
	projectWidth = projs[0].offsetWidth

	var projsPerRow = Math.floor(bodyWidth / projectWidth)
	if(projsPerRow > 4) projsPerRow = 4

	var margin = (bodyWidth - (projectWidth * projsPerRow)) / (projsPerRow-1)

	var rowcount = 0, numOfRows = 0

	for(var i = 0; i<projs.length; i++){
		if(rowcount >= projsPerRow){ numOfRows++; rowcount = 0 }
		projs[i].style.top = numOfRows * (projectWidth + margin)
		projs[i].style.left = rowcount*(projectWidth) + rowcount*(margin)
		projs[i].dataset.rowpos = rowcount
		projs[i].dataset.row = numOfRows
		rowcount++

		// console.log( i*(projectWidth+margin) + projectWidth )
	}


	// if(wid >== projectWidth *4){
	// 	var margin = 
	// 	for(var i = 0; i<projs.length; i++){
	// 		projs[i]
	// 	}
	// }

	// var widb = wid, rowcount = 0

	// for(var i = 0; i<projs.length; i++){
	// 	console.log(wid / projectWidth)
	// 	if(widb >= projectWidth)
	// 	widb -= projectWidth
	// 	rowcount++
		// projs[i].style.width = document.body.clientWidth
		// projs[i].style.height = document.body.clientHeight

	// }

}

function calcProportions(){
	var proto = document.getElementsByClassName('project')[0]
	var ps = {
		bodyOffsetW: document.body.offsetWidth,
		bodyClientH: document.body.clientHeight,
		project: proto.offsetWidth
		
	}

	ps.xFill = 1 / (proto.offsetWidth / ps.bodyOffsetW),
	ps.yFill = .75 / (ps.project / ps.bodyClientH)

	if(ps.xFill > ps.yFill){ //screen is wider than tall
		ps.fillRatio = 1 / (ps.xFill / ps.yFill)
		ps.projectExpand = ps.project * ps.yFill
	}else if(ps.yFill > ps.xFill){ // screen is taller than wide
		ps.fillRatio = 1 / (ps.yFill / ps.xFill)
		ps.projectExpand = ps.project * ps.xFill
	}
	ps.fillRatio = ps.xFill>ps.yFill? ps.xFill / ps.yFill : ps.yFill/ps.xFill
	ps.projectExpand = ps.project

	proportions = ps

}
