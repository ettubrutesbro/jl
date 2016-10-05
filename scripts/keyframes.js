


var rangeEnd = 200
var ranges = [
	{
		rg: [0,35], //range should be able to be set
		//as a % of (maybe dynamic pixel value
		// that changes with resize?)

		/*
			eg, by the 50% through or the end of the about section, 
			the text and face icon should be in these positions / opacities
		*/
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-82.5%',
				'translateY': '400%'
			},
			{
				'target': 'helloiam',
				'translateX': '-55%',
				'translateY': '950%'
			},
			{
				'target': 'abtme',
				'translateY': '-30px'
			}
	
		],
		active: false
	},

	{
		rg: [0,80],
		objs: [
			{
				'target': 'facebg',
				// 'translateX': $('abtvid').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px'
				'translateX': '300px'
			},
			{
				'target': 'facefg',
				// 'translateX': $('abtvid').offsetWidth/2 - $('facefg').offsetWidth/2 + 'px'
				'translateX': '300px'
			},
		],
		active:false

	}


]