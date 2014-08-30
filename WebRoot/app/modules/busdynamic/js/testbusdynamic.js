$(function () {
	$(document).ready(function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});

		$('#container').highcharts({
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE
				//marginRight: 10,
				events: {
					load: function() {

						// set up the updating of the chart each second
						var series = this.series[0];
						//   alert(series.name);
						var chart = $('#container').highcharts();
						var isShift=false;
						chart.addSeries({id:'123123',name: '123123',data:[]});
							var series1=chart.get('123123');
							chart.addSeries({id:'182323',name: '182323',data:[]});
							var series2=chart.get('182323');
							setInterval(function() {
								var x = (new Date()).getTime(), // current time
								y1 = Math.random(),y = Math.random();
								var y2 = y+1;
								var isShift = chart.series[0].data.length >= 10;
								series.addPoint([x, y], true,isShift);//第一个布尔值表示是否可以重绘图像，第二个表示开始端是否可以移动消失，第三个表示动画效果，默认true
								series1.addPoint([x, y1], true,isShift);
								series2.addPoint([x, y2], true,isShift);
								var chartseries = chart.series;
								for(var i=0; i<chartseries.length; i++){
									if(chartseries[i].data.length<1){
										chartseries[i].remove();
									}
									}
							}, 1000);
						}
					}
				},
				title: {
					text: '线路运行情况',
					x: -20
				},
				subtitle: {
            text: 'xx 路 上行 运行情况',
            x: -20
        },
				xAxis: {
					type: 'datetime',
					tickPixelInterval: 150
				},
				yAxis: {
					title: {
						text: '平均速度'
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				tooltip: {
					formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
						Highcharts.numberFormat(this.y, 2);
					}
				},
				legend: {
					enabled:true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
				exporting: {
					enabled: true
				},
				series: [{
					name: '340192',
					data:[]
				}]
			});
		});

	});