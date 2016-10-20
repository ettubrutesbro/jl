


var rangeEnd = 200
var milestones = []
var ranges = [
	{
		name: ''
		rg: [1,1.6],
		objs: [
			{
				'target': '#jackleng',
				'translateX': '-3rem'
			},
			{
				'target': '#helloiam',
				'translateX': '-1.75rem',
				'opacity': -1

			},
			{
				'target': '#hellowrapper',
				'translateY': '14rem'
			},
			{
				'target': '#abtme',
				'translateY': '-3rem',
				'opacity': -.5
			},
			
		],
	},
	{
		name: ''
		rg: [1,1.13],
		objs: [
			{
				'target': '#dream',
				'translateY': ['0%','130%']
			},
			{
				'target': '#videocaption',
				'translateY': ['200%','0%']
			}
		]
	},
	{
		name: ''
		rg: [1,4],
		objs: [
			{
				'target': '#abt',
				'translateY': '285%'
			}
		]
	},
	{
		name: ''
		rg: [1.4,1.65],
		objs: [
			{
				'target': '#dream',
				'translateY': ['130%','200%'],
				'opacity': -0.5
			},
			{
				'target': '#videocaption',
				'translateY': ['0%','-90%'],
				'opacity': -0.5
			}
		]
	},
	{
		name: ''
		rg: [1, 1.25],
		objs: [
			{
				'target': '#facebg',
				'translateY': ['100%', '100%'],
				'ease': 'inOutQuad'
			},
			{
				'target': '#facefg',
				'translateY': ['100%', '100%'],
				'ease': 'inOutQuad'
			},
		]
	},
	{
		name: ''
		rg: [1.4, 2.1],
		objs: [
			{
				'target': '.abtvid', //scrollimo needs to be able to handle classes as well as id
				'clipPath': [[50,0],[100,0],[50,100],[0,100]]
			},
			{
				'target': '#facebg',
				'translateX': $('abt').offsetWidth/2 - $('facebg').offsetWidth/2 + 'px',
				'translateY': ['100%', '45%'],
				'ease': 'inOutQuad'
			},
			{
				'target': '#facefg',
				'translateX':$('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px',
				'translateY': ['100%', '45%'],
				'ease': 'inOutQuad'
			},
			{
				'target': '#work',
				'translateY': ['110%', '20%'],
				'ease': 'outQuad',
				'opacity': [0,1.5]
			},

		],
		callforward: function(){
			$('work').style.visibility = 'hidden'
		},
		callduring: function(){
			$('work').style.visibility = 'visible'
			workEnabled = false
		},
		callback: function(){
			workEnabled = true
		}
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

		ranges[5].objs.push(addobj)
	}
}
