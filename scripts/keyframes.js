var keyframes = [
	{
		'scrollTarget': 110, //at this vertical % of the document, these selectors will show
		//these values for these properties (beginning from 0 or 1)
		'operations': [
			{
				'target': 'jackleng',
				'translateX': '-120px',
				'opacity': 0.5,
				'translateY': '15px'
			},
			{
				'target': 'helloiam',
				'translateX': '-70px',
				'opacity': 0,
				'translateY': '15px'
			},
			{
				'target': 'facebg',
				'translateX': '30px'
			},
			{
				'target': 'facefg',
				'translateX': '30px'
			},
			{
				'target': 'abtme',
				'translateY': '-30px'
				// 'scale': 0.5
			}

		]
	}
]


var rangeEnd = 200
var ranges = [
	{
		rg: [0,110],
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-120px',
				'opacity': 0.5,
				'translateY': '15px'
			},
			{
				'target': 'helloiam',
				'translateX': '-70px',
				'opacity': 0,
				'translateY': '15px'
			},
			{
				'target': 'abtme',
				'translateY': '-30px'
				// 'scale': 0.5
			}

		]
	},
	{
		rg: [70,200],
		objs: [
			{
				'target': 'facebg',
				'translateX': '30px'
			},
			{
				'target': 'facefg',
				'translateX': '30px'
			},
		]
	}


]