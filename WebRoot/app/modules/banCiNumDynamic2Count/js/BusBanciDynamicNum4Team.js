/**
*
*
* @author cc
* @since 2014-8-28
*/

Ext.Ajax.request({
	url : 'busbanci.do?reqCode=getbanci_table_daterange',
	success : function(response) { // 回调函数有1个参数
		
		var resultArray = Ext.util.JSON.decode(response.responseText);
		var resultmsg = resultArray.msg;


		Ext.onReady(function() {
			
			Ext.Ajax.timeout = 1180000;

			
			var companyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'banCiNumDynamic2Count.do?reqCode=queryCompanyDatasByClass'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}]),
				baseParams : {
					deptlength : '6'
				}
			});
			
			
			// areaStore.load(); //如果mode : 'local',时候才需要手动load();

			var companyCombo = new Ext.form.ComboBox({
				hiddenName : 'companyName',
				fieldLabel : '分公司',
				emptyText : '请选择分公司...',
				triggerAction : 'all',
				store : companyStore,
				displayField : 'text',
				valueField : 'value',
				loadingText : '正在加载数据...',
				mode : 'remote', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection : true,
				typeAhead : true,
				resizable : true,
				editable : false,
				allowBlank : false,
				anchor : '100%'
			});

			companyCombo.on('select', function() {
				teamCombo.reset();

				var value = companyCombo.getValue();
				teamStore.load({
					params : {
						deptid : value
					}
				});
			});

			var teamStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'banCiNumDynamic2Count.do?reqCode=queryteamDatasByClass'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}])
			});

			var teamCombo = new Ext.form.ComboBox({
				hiddenName : 'team',
				fieldLabel : '路队',
				emptyText : '请选择路队...',
				triggerAction : 'all',
				store : teamStore,
				displayField : 'text',
				valueField : 'value',
				loadingText : '正在加载数据...',
				mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection : true,
				typeAhead : true,
				resizable : true,
				editable : false,
				allowBlank : false,
				anchor : '100%'
			});
			
			
			
			var qForm = new Ext.form.FormPanel({
				region : 'north',
				margins : '3 3 3 3',
				title : '<span class="commoncss">查询条件<span>',
				collapsible : true,
				border : true,
				labelWidth : 90, // 标签宽度
				// frame : true, //是否渲染表单面板背景色
				labelAlign : 'right', // 标签对齐方式
				bodyStyle : 'padding:3 5 0', // 表单元素和表单面板的边距
				buttonAlign : 'center',
				height : 125,
				items : [{
					layout : 'column',
					border : false,
					items : [{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [companyCombo]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [teamCombo]
					}]
				}],
				buttons : [{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						if (!qForm.form.isValid()) {
							return;
						}
						
						createGraph( teamCombo.getValue() );
						
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						qForm.getForm().reset();
					}
				}]
			});

			
			
			var tabs = new Ext.Panel({
				title: '班次数目实时查询',
				region:'center',
				items: [{
					html: '<div id="container" style="width: 100%;height: 100%; margin: 0 auto"></div>',
					afterRender: function () {
						createGraph( obj );
					}
				}]
			})

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ qForm,tabs]
			});
			
			
			//生成highchart
			function createGraph( obj ) {
				
				$(document).ready(function() {
					
					
					Highcharts.setOptions({
						global: {
							useUTC: false
						}
					});

					$('#container').highcharts({
						chart: {
							type: 'column',
							animation: Highcharts.svg, // don't animate in old IE
							//marginRight: 10,
							events: {
								load: function() {

									// set up the updating of the chart each second
									var series1 = this.series[0];
									//   alert(series.name);
									var chart = $('#container').highcharts();
									var isShift=false;
									
									chart.addSeries({id:'spline',name: '累计发车数目',type: 'spline',data:[]});
									var series2=chart.get('spline');
									
									
									if(obj != 0){
										setInterval(function() {
											
											//验证
											
											$.getJSON("banCiNumDynamic2Count.do?reqCode=queryBanciNumDynamic4Team",{
												teamId : obj
												
											},function(js){
												var obj =  eval(js);
												
												
												//解析传过来的字符串
												var num = parseInt(obj.num);
												var duringNum = parseInt(obj.duringNum);
												
												//动态柱子，直接查询动态表，返回num
												var x1 = (new Date()).getTime();//现在的时间
												var y1 = num;
												//曲线
												var x2 = (new Date()).getTime();
												var y2 = duringNum ;

												
												var isShift = chart.series[0].data.length >= 10;//当页面加载到10个柱子时，将会把前面的柱子消失掉
												
												series1.addPoint([x1, y1], true,isShift);
												series2.addPoint([x2, y2], true,isShift);//isShift 
												
												var chartseries = chart.series;
												
												for(var i=0; i<chartseries.length; i++){//删除数据为0的柱子，既可以将定义的原始柱状图删除掉
													if(chartseries[i].data.length<1){
														chartseries[i].remove();
													}
												}
												
											});
										}, 10000);
									}
									
								}
							}
						},
						title: {
							text: '班次运行情况',
							x: -20
						},
						subtitle: {
							text: '路队班次运行情况',
							x: -20
						},
						xAxis: {
							type: 'datetime',
							tickPixelInterval: 150
						},
						yAxis: {
							title: {
								text: '班次数目'
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
									'<label>班次总数：</label>'+ Highcharts.numberFormat(this.y, 2);
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
							series: [{//必须要加上这一条
								name: '实时发车数目',
								data:[]
							}]
						});
					}
				);

				
			}	
			

});

},
failure : function(response) {
	Ext.MessageBox.alert('提示', '数据加载失败请检查网络或联系开发者！');
},
params : {
}
});
