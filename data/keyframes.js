


var rangeEnd = 200
var milestones = []
var ranges = [
	{
		rg: [1,1.6], //range should be able to be set
		//as a % of (maybe dynamic pixel value
		// that changes with resize?)

		/*
			eg, by the 50% through or the end of the about section, 
			the text and face icon should be in these positions / opacities
		*/
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-3rem'
			},
			{
				'target': 'helloiam',
				'translateX': '-1.75rem',
				'opacity': -1

			},
			{
				'target': 'hellowrapper',
				'translateY': '14rem'
			},
			{
				'target': 'abtme',
				'translateY': '-3rem',
				'opacity': -.5
			},
			
		],
	},
	{
		rg: [1,1.35],
		objs: [
			{
				'target': 'dream',
				'translateY': ['0%','130%']
			},
			{
				'target': 'videocaption',
				'translateY': ['200%','0%']
			}
		]
	},
	{
		rg: [1,4],
		objs: [
			{
				'target': 'abt',
				'translateY': '285%'
			}
		]
	},
	{
		rg: [1.6,2.1],
		objs: [
			{
				'target': 'dream',
				'translateY': ['130%','200%'],
				'opacity': -0.5
			},
			{
				'target': 'videocaption',
				'translateY': ['0%','-90%'],
				'opacity': -0.5
			}
		]
	},
	{
		rg: [1, 1.25],
		objs: [
			{
				'target': 'facebg',
				'translateY': ['100%', '100%'],
				'ease': 'inOutQuad'
			},
			{
				'target': 'facefg',
				'translateY': ['100%', '100%'],
				'ease': 'inOutQuad'
			},
		]
	},
	{
		rg: [1.4,2],
		objs: [
			{
				'target': 'vidmaskleft',
				'translateX': '30%',
				'rotate': '-45deg',
				'easing': 'inOutQuad'
			},
			{
				'target': 'vidmaskright',
				'translateX': '-30%',
				'rotate': '-45deg',
				'easing': 'inOutQuad'
			}
		]
	},
	{
		rg: [1.4, 2.1],
		objs: [
			{
				'target': 'facebg',
				'translateX': $('abt').offsetWidth/2 - $('facebg').offsetWidth/2 + 'px',
				'translateY': ['100%', '45%'],
				'ease': 'inOutQuad'
			},
			{
				'target': 'facefg',
				'translateX':$('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px',
				'translateY': ['100%', '45%'],
				'ease': 'inOutQuad'
			},
			{
				'target': 'work',
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
		var addobj = {'target': projs[i].picvid.id, 'ease': 'inOutQuad'}
		addobj[canuse[attr][0]] = canuse[attr][1]
		var randRot = Math.random() > 0.5 ? 1: -1
		randRot = (Math.random() * randRot) * 45
		addobj.rotate = [randRot+'deg', '0deg']
		
		dontuse.push(canuse[attr])
		canuse.splice(attr,1)

		ranges[6].objs.push(addobj)
	}
}
