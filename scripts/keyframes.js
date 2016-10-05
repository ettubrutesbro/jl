


var rangeEnd = 200
var ranges = [
	{
		rg: [5,40],
		objs: [
			{
				'target': 'jackleng',
				'translateX': '-120px',
				'translateY': '15px'
			},
			{
				'target': 'helloiam',
				'translateX': '-70px',
				'translateY': '21px'
			},
			{
				'target': 'abtme',
				'translateY': '-30px'
			}
	
		],
		callduring: function(){ //runs upon first entering range
			console.log('call during')
		},
		callback: function(){ //runs upon exceeding range
			console.log('call back / exceed')
		},
		callforward: function(){ //runs upon going below range
			console.log('call forward / under')
		},
		active: false
	},

	{
		rg: [5,80],
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

	}


]