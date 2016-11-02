


var rangeEnd = 200
var ranges = [
	{
		rg: [0,50], //range should be able to be set
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
			},
			{
				'target': 'helloiam',
				'translateX': '-1.75rem',
			},
			{
				'target': 'hellowrapper',
				'translateY': '300%'
			},
			{
				'target': 'abtme',
				'translateY': '-3rem'
			}
	
		],
		active: false
	},

	{
		rg: [0,80],
		objs: [
			{
				'target': 'facebg',
				'translateX': $('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px'
				// 'translateX': '300px'
			},
			{
				'target': 'facefg',
				'translateX': $('abt').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px'
				// 'translateX': '300px'
			},
		],
		active:false

	}


]