


var rangeEnd = 200
var ranges = [
	{
		rg: [0,40], //range should be able to be set
		//as a % of (maybe dynamic pixel value
		// that changes with resize?)
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-75%',
				'translateY': '1rem'
			},
			{
				'target': 'helloiam',
				'translateX': '-30%',
				'translateY': '1rem'
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