


var rangeEnd = 200
var milestones = []
var ranges = [
	{
		rg: [0,$('abt').offsetHeight/3], //range should be able to be set
		//as a % of (maybe dynamic pixel value
		// that changes with resize?)

		/*
			eg, by the 50% through or the end of the about section, 
			the text and face icon should be in these positions / opacities
		*/
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-3rem',
				'opacity': 0,
				'ease': false
			},
			{
				'target': 'helloiam',
				'translateX': '-1.75rem',
				'opacity': -1,
				'ease': false

			},
			{
				'target': 'hellowrapper',
				'translateY': '14rem'
			},
			{
				'target': 'abtme',
				'translateY': '-3.5rem'
			}
	
		],
		active: false
	},

	{
		rg: [200, $('abt').offsetHeight/1.2],
		objs: [
			{
				'target': 'facebg',
				'translateX': $('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px',
				'ease': 'inOutQuad'
				// 'translateX': '300px'
			},
			{
				'target': 'facefg',
				'translateX': $('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px',
				'ease': 'inOutQuad'
				// 'translateX': '300px'
			},
			{
				'target': 'work',
				'translateY': ['40rem', '0rem'],
				'ease': 'inOutQuad',
				'opacity': [0,3]
			}

		],
		active:false,
	
		callforward: function(){
			$('work').style.display = 'none'
		},
		callduring: function(){
			$('work').style.display = 'block'
			workEnabled = false
		},
		callback: function(){
			workEnabled = 'inOutQuad'
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

		ranges[1].objs.push(addobj)
	}
}
