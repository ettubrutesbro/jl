
var $ = document.getElementById.bind(document),
	anim = Velocity.bind(document)
	

var	loadedvids = 0
	lastplayed = 3

var vidarray = document.getElementsByTagName('video')


var selectedProject = '',
workEnabled = false //can user click project yet

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
var projs = document.getElementsByClassName('project')

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
	document.getElementsByClassName('videocaption')[lastplayed].style.visibility = 'hidden'
	document.getElementsByClassName('videocaption')[newvid].style.visibility = 'visible'
	
	lastplayed = newvid

}


function Project(proj){ //pseudo class designed to take data and turn it into a DOM object

	var element = document.createElement('article')
	element.className = 'project'; element.id = proj.id
	for(var i = 0; i<proj.classes.length; i++){
		element.classList.add(proj.classes[i])
	}
	element.picvid = document.createElement('div')
	element.picvid.className = 'picvid'; element.picvid.id = proj.id+'_picvid'
	element.appendChild(element.picvid)

	element.info = document.createElement('div')
	element.info.className = 'info'; element.info.id = proj.id + '_info'
	element.info.classList.add('preto')
	// element.info.textContent = proj.info
		for(var i = 0; i<proj.info.length; i++){
			var paragraph = document.createElement('p')
			paragraph.innerHTML = proj.info[i]
			element.info.appendChild(paragraph)
		}
	element.appendChild(element.info)

	element.addEventListener('click',function(e){
		console.log('you clicked '+ element.id)
		if(!selectedProject) this.expand()
		e.stopPropagation()
	})
	
	element.expand = function(){
		if(!workEnabled) return
		//set z-index
		this.style.zIndex = 2
		this.style.backgroundColor = 'white'
		this.info.style.visibility = 'visible'

		anim(this.picvid, { //needs to retain square scale
			scaleX: proportions.xFill > proportions.yFill? proportions.fillRatio : 1,
			scaleY: proportions.yFill > proportions.xFill? proportions.fillRatio : 1
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

		anim(this, {translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, backgroundColorAlpha: 0},
			{complete: function(){element.style.zIndex = 1; element.style.backgroundColor = ''}})
		anim(this.picvid, {scaleX: 1, scaleY: 1}, 
			{complete: function(){element.info.style.visibility = 'hidden'}})
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
			// if(projsPerRow === 1){ projs[i].style.left }
		projs[i].dataset.rowpos = rowcount
		projs[i].dataset.row = numOfRows
		rowcount++

		// console.log( i*(projectWidth+margin) + projectWidth )
	}

}

function calcProportions(){
	var ps = {
		bodyOffsetW: document.body.offsetWidth,
		bodyClientH: document.body.clientHeight,
		project: projs[0].offsetWidth
		
	}

	ps.xFill = 1 / (projs[0].offsetWidth / ps.bodyOffsetW),
	ps.yFill = .75 / (ps.project / ps.bodyClientH)

	if(ps.xFill > ps.yFill){ //screen is wider than tall
		ps.fillRatio = 1 / (ps.xFill / ps.yFill)
		ps.projectExpand = ps.project * ps.xFill
	}else if(ps.yFill > ps.xFill){ // screen is taller than wide
		ps.fillRatio = 1 / (ps.yFill / ps.xFill)
		ps.projectExpand = ps.project * ps.yFill
	}
	ps.projectPicSize = Math.min(ps.project*ps.xFill, ps.project*ps.yFill)
	ps.abtH = $('abt').offsetHeight + document.getElementsByTagName('video')[0].offsetHeight
	ps.workH = Number(projs[projs.length-1].style.top.replace(/[^\d.-]/g, '')) + ps.project 
		
	

	$('abt').style.height = ps.abtH
	$('work').style.height = ps.workH

	var infos = document.getElementsByClassName('info')
	for(var i = 0; i<infos.length; i++){
		if(ps.xFill > ps.yFill){ //if it's horizontal (adjacent to square), use remaining width
			infos[i].style.width = ((ps.bodyOffsetW - ps.projectPicSize) * (1/ ps.xFill)) / ps.fillRatio
			infos[i].style.height = ps.projectPicSize * (1/ps.xFill) / ps.fillRatio
			infos[i].style.left = (ps.projectPicSize / ps.xFill)
			setXform(infos[i], 'scaleX('+ps.fillRatio+')') 
		}
		else if(ps.yFill > ps.xFill){ //if it's vertical (below square), take up entire width
			infos[i].style.width = ps.projectPicSize * (1/ps.yFill) / ps.fillRatio
			infos[i].style.height = (ps.projectExpand - ps.projectPicSize) * (1/ps.yFill) / ps.fillRatio
			infos[i].style.top = (ps.projectPicSize / ps.yFill)
			setXform(infos[i], 'scaleY('+ps.fillRatio+')')
		}
		
		

	}

proportions = ps //set global variable

}

function setXform(element, value){
	element.style.webkitTransform = element.style.mozTransform = element.style.transform =
	element.style.msTransform = element.style.oTransform = value
}