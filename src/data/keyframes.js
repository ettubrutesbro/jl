


var rangeEnd = 200
var milestones = []
var ranges = [
	{
		rg: [1.15,1.7],
		objs: [
			{
				'target': '#helloiam',
				'translateX': '-18%',
				'opacity': -.5
			}
		]

	},
	{
		name: '',
		rg: [1.35,1.8],
		objs: [
			// {
			// 	'target': '.abtvid',
			// 	'clipPath': [[0,0],[100,0],[100,100],[0,65]]
			// }
			
			{
				'target': '#jackleng',
				'translateX': '-30%',
				'opacity': -.65
			},
			{
				'target': '#abtme',
				'translateX': '30%',
				'clipPath': [[0,0],[50,0],[50,100],[0,100]],
				'opacity': -.85
			},
			{
				'target': '#dream',
				'translateY': ['-100%','0%'],
				'opacity': [0,1],
				'ease': 'inOutQuad'
			},
			{
				'target': '.videocaption',
				'translateX': ['-15%','0%'],
				// 'translateY': ['100%','0%'],
				'opacity': [-1,1],
				'ease': 'outQuad'
			}
			
		],
	},
	{
		rg: [1.3, 2.2],
		objs: [
			{
				'target': '#abt',
				'translateY': '-60%',
				// 'clipPath': [[15,20],[100,20],[85,100],[0,100]]
			}
		]
	}
	



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
