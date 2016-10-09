
var $ = document.getElementById.bind(document),
	anim = Velocity.bind(document)
	

var	loadedvids = 0
	lastplayed = 3

var vidarray = document.getElementsByTagName('video')

var selectedProject = ''

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

	var element = document.createElement('div')
	element.className = 'project'; element.id = proj.id
	for(var i = 0; i<proj.classes.length; i++){
		element.classList.add(proj.classes[i])
	}

	element.addEventListener('click',function(e){
		console.log('you clicked '+ element.id)
		if(!selectedProject) this.expand()
		e.stopPropagation()
	})
	
	element.expand = function(){
		//set z-index
		console.log('project width is ' + this.offsetWidth/$('work').offsetWidth + 'of parent' )
		anim(this, {
			translateX: '-=' + this.style.left,
			translateY: '-=' + this.style.top,
			scaleX: 1 / (this.offsetWidth/$('work').offsetWidth), 
			scaleY: 1 / (this.offsetHeight / (document.body.clientHeight-$('abt').offsetHeight))
		})	
		selectedProject = this.id
		// this.style.width = $('work').clientWidth
		// this.style.height = $('work').clientHeight
	}

	element.collapse = function(){
		anim(this, {translateX: 0, translateY: 0, scaleX: 1, scaleY: 1})
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