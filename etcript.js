
var $ = document.getElementById.bind(document),
anim = Velocity.bind(document)

var	loadedvids = 0
	lastplayed = 3

vidarray = document.getElementsByTagName('video')

for(var i = 0; i<4; i++){
	vidarray[i].addEventListener('loadeddata', contentready )
	vidarray[i].addEventListener('ended', nextvid)
}

function contentready(){
	loadedvids++
	if(loadedvids===4){
		console.log('all are done')
		vidarray[0].style.visibility = 'visible'
		vidarray[0].play()
	}
}

function nextvid(){

	var newvid = Math.floor(Math.random()*4)
	if(newvid === lastplayed){ console.log('rerolling'); nextvid(); return}

	vidarray[newvid].play()
	vidarray[lastplayed].style.visibility = 'hidden'
	vidarray[newvid].style.visibility = 'visible'
	
	lastplayed = newvid

	// if(queue[1]<3){ queue[0] = queue[1]; queue[1]++ }
	// else queue = [3,0]

}


