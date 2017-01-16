$(document).ready(function() {
	if(!window.DefaultOption){
		DefaultOption = {
			color: [
				'#66CCFF', '#9999CC', '#66CC33', '#FFCC33', '#FF6666', '#339999', '#6699FF', '#CC99FF',
				'#99CC99', '#CCCC66', '#CC9999', '#99CCCC', '#96DCFF', '#B9B9DC', '#85D65D', '#FFD866',
				'#FF9696', '#40BFBF', '#96B9FF', '#E2C5FF', '#B9DCB9', '#D8D88C', '#DCB9B9', '#B9DCDC',
			]
		};
	}
});
function loadViewChart(type) {
		myChart = echarts.init(document.getElementById('tcpViewBox'));
		switch(type){
			case 'wordCloud': loadWordCloudChart(myChart); break;
		}
		

}

function loadWordCloudChart(myChart){
	option = {
			title: {
				text: "2016年度热词",
				textAlign: 'center', 
				left: 'center',
				textStyle: {
					fontWeight: 'normal',
					fontSize: 22
				}
			},
			series: [{
				type: 'wordCloud',
				gridSize: 50,
				sizeRange: [12, 50],
				rotationRange: [0, 0],
				shape: 'rect',
				textStyle: {
					normal: {
						color: function(params) {
							 return DefaultOption.color[params.dataIndex%24];
						}
					},
					emphasis: {
						shadowBlur: 10,
						shadowColor: 'rgba(13, 19, 24, 0.2)'
					}
				},
				data: []
			}]
		};
		$.getJSON("data/hotwordsof2016.json", function(data){
			for(var i = 0; i <　data.length; i++){
				var d = {
					name:　data[i][0], 
					value: data[i][1]
				};
				option.series[0].data.push(d);
			}
			myChart.setOption(option);
		});
}
