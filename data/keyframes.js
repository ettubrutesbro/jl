


var rangeEnd = 200
var milestones = []
var ranges = [
	{
		name: '',
		rg: [1.25,1.5],
		objs: [
			{
				// 'target': '.abtvid',
				// 'clipPath': [[0,0],[100,0],[100,100],[0,65]]
			}
			
		],
	},
	



]

projectPicVidFrames()

function projectPicVidFrames(){
	//unique-randomizes offsets of picvid and pushes into ranges[1]
	var canuse = [
		['translateY',['-133%','0%']],
		['translateX',['133%','0%']],
		['translateY',['133%','0%']],
		['translateX',['-133%','0%']],
	]
	var dontuse = []
	for(var i = 0; i<projs.length; i++){
		if(i % 4 === 0 && i>0) { console.log('resetting arrays'); canuse = dontuse; dontuse = [] }
		var attr = canuse.length > 1? Math.floor(Math.random()*(canuse.length)): 0
		var addobj = {'target': '#'+projs[i].picvid.id, 'ease': 'inOutQuad'}
		addobj[canuse[attr][0]] = canuse[attr][1]
		var randRot = Math.random() > 0.5 ? 1: -1
		randRot = (Math.random() * randRot) * 45
		addobj.rotate = [randRot+'deg', '0deg']
		
		dontuse.push(canuse[attr])
		canuse.splice(attr,1)

		// ranges[1].objs.push(addobj)
	}
}
