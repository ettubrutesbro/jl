
var $ = document.getElementById.bind(document)

var	loadedvids = 0
	lastplayed = 3

var vidarray = document.getElementsByTagName('video')

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
		// this.expand()
		e.stopPropagation()
	})
	
	// element.expand = function(){
	// 	this.style.width = $('work').clientWidth
	// 	this.style.height = $('work').clientHeight

	// }

	return element

}

function distribute(animated, proj){
	var wid = document.body.offsetWidth,
	allprojects = document.getElementsByClassName('project'),
	projectwidth = allprojects[0].offsetWidth

	if(wid >== projectwidth *4){
		var margin = 
		for(var i = 0; i<allprojects.length; i++){
			allprojects[i]
		}
	}

	var widb = wid, rowcount = 0

	for(var i = 0; i<allprojects.length; i++){
		console.log(wid / projectwidth)
		if(widb >= projectwidth)
		widb -= projectwidth
		rowcount++
		// allprojects[i].style.width = document.body.clientWidth
		// allprojects[i].style.height = document.body.clientHeight

	}

}