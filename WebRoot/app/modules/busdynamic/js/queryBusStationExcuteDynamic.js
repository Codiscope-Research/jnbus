/**
*
*
* @author nagsh
* @since 2014-5-20
*/

Ext.Ajax.request({
	url : 'busbanci.do?reqCode=getbanci_table_daterange',
	success : function(response) { // 回调函数有1个参数
		var resultArray = Ext.util.JSON
		.decode(response.responseText);
		var resultmsg = resultArray.msg;
		var msgs = resultmsg.split('~');
		var mindate = msgs[0];
		var maxdate =msgs[1];
		//alert(msgs+"+"+mindate+"+"+maxdate);


		Ext.onReady(function() {
			Ext.Ajax.timeout = 1180000;

			var companyStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'busbanci.do?reqCode=queryCompanyDatasByClass'
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
					url : 'busbanci.do?reqCode=queryteamDatasByClass'
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

			teamCombo.on('select', function() {
				routeCombo.reset();
				var value = teamCombo.getValue();
				routeStore.load({
					params : {
						deptid : value
					}
				});
			});
			
			
			var routeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'busbanci.do?reqCode=queryrouteDatasByClass'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}])
			});
			
			
			var routeCombo = new Ext.form.ComboBox({
				hiddenName : 'route',
				fieldLabel : '班次',
				emptyText : '请选择班次...',
				triggerAction : 'all',
				store : routeStore ,
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

			routeCombo.on('select', function() {
				stationCombo.reset();
				var value = routeCombo.getValue();
				stationStore.load({
					params : {
						routeId : value
					}
				});
			});
			
			var stationStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : 'busdynamic2.do?reqCode=queryBusSectionRuns2'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}])
			});
			
			var stationCombo = new Ext.form.ComboBox({
				hiddenName : 'station_name',
				fieldLabel : '站点',
				emptyText : '请选择站点...',
				triggerAction : 'all',
				store : stationStore ,
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
						items : [companyCombo,stationCombo]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [teamCombo]
					},{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60, // 标签宽度
						defaultType : 'textfield',
						border : false,
						items : [routeCombo]
					}]
				}],
				buttons : [{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						if (!qForm.form.isValid()) {
							return;
						}
						createGraph(routeCombo.getValue(),stationCombo.getValue() );
					}
				}, {
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						qForm.getForm().reset();
					}
				}]
			});

			
			
		   //var theHtml= '<div id="container" ></div>';  //style="height:300px;weight:100px;"
			
			var tabs = new Ext.Panel({
				title: '站点通过车次实时监测',
				region:'center',
				items: [{
					html: '<div id="container" style="width: auto;height: 250px; margin: 0 auto">aaa</div>',
					afterRender: function () {
						createGraph(-1,-1);
					}
				}]
			})

			// 布局模型
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ qForm,tabs]
			});

           function createGraph(routeValue,stationValue) {
			   
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
        							if(routeValue=="-1"&&stationValue=="-1"){

        							}else{
        							
	    								$.getJSON("busdynamic2.do?reqCode=queryStationRuns",{
        									routeValue : routeValue,
        									stationValue:stationValue
										},function(js){
											if(js.plan=="不在考核时间内"){
												var lastStart=js.shiji;   //下次开始时间
												var time=lastStart.split(":");  //将：隔开的数据存到数组里
												var hours=parseInt(time[0]);
												var minutes=parseInt(time[1]);
												var seconds=parseInt(time[2]);
												if(hours=="-1"){
													alert("今天的考核时间已过或该站点不需要考核");
												}else{
													alert("未到考核时间,下次考核时间为："+lastStart);
													schedule(hours,minutes,"0",routeValue,stationValue);  //定时器
												}			
												
											}else{
												var kaoheEnd=js.kaoheEnd;   //本次考核结束时间
												var time=kaoheEnd.split(":");  //将：隔开的数据存到数组里
												var hours=parseInt(time[0]);
												var minutes=parseInt(time[1]);
												getData(routeValue,stationValue)
												schedule(hours,minutes,"1",routeValue,stationValue);  //定时器
												//window.clearInterval(int)
											}
	    								
										});
	
        							}//else
        							}
        						}
        					},
        					title: {
        						text: '站点通过车次监测'
        					},
        					subtitle: {
        						text: 'xxx站点监测情况'
        	                },
        					xAxis: {
        						type: 'datetime',
        						tickPixelInterval: 150
        					},
        					yAxis: {
        						title: {
        							text: '通过车次'
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
        					series: []
        				});
        			});


				
			}	
           var init;
           function getData(routeValue,stationValue){
        	    var chart = $('#container').highcharts();
				var isShift=false;
				chart.addSeries({id:'plan',name: '计划通过量',data:[]});
				var series1=chart.get('plan');
				chart.addSeries({id:'shiji',name: '实际通过量',data:[]});
				var series2=chart.get('shiji');
        	    init=setInterval(function() {
					$.getJSON("busdynamic2.do?reqCode=queryStationRuns",{
						routeValue : routeValue,
						stationValue:stationValue
					},function(js){
						if(js.plan=="不在考核时间内"){
						}else{
							var plan=parseInt(js.plan);
							var shiji=parseInt(js.shiji);
							var x = (new Date()).getTime(), // current time
							y1 = plan,y2 = shiji;
							var isShift = chart.series[0].data.length >= 10;
							//第一个布尔值表示是否可以重绘图像，第二个表示开始端是否可以移动消失，第三个表示动画效果，默认true
							series1.addPoint([x, y1], true,isShift);
							series2.addPoint([x, y2], true,isShift);
							var chartseries = chart.series;
							for(var i=0; i<chartseries.length; i++){
								if(chartseries[i].data.length<1){
									chartseries[i].remove();
								}
							 }
						}//else
						
					})	//$
					}, 3000);//setInterval
           }
		
           //下面方法实现定时器

           var tMinutes=0;
           var tHours=0;
           var tItem;
           var tRouteValue;
           var tstationValue;
           var timer=null;
           var go;
           function schedule(hours,minutes,item,routeValue,stationValue){
              tHours = hours;
              tMinutes = minutes;
              tItem = item;
              tRouteValue = routeValue;
              tstationValue = stationValue;
              go=setInterval(run,3000);
           }
           function run(){
                   var date=new Date();
                   if((date.getMinutes()-tMinutes==0)
                           &&(date.getHours()-tHours==0)){
                	   if(tItem=="0"){
                		   clearInterval(go);                		   
                		   getData(tRouteValue,tstationValue);
                	   }else{
                		   window.clearInterval(init);
                		   clearInterval(go);  
                	   }
                   }
           }


			// 演示render的用法
			function colorRender(value, cellMetaData, record) {
				// alert(record.data.xmid); 可以获取到Record对象哦
				if (value == '盒') {
				return "<span style='color:red; font-weight:bold'>" + value
				+ "</span>";
			}
			if (value == '瓶') {
			return "<span style='color:green; font-weight:bold'>"
			+ value + "</span>";
		}
		return value;
	}

	// 生成一个图标列
	function iconColumnRender(value) {
		return "<a href='javascript:void(0);'><img src='" + webContext
		+ "/resource/image/ext/edit1.png'/></a>";;
	}

});

},
failure : function(response) {
	Ext.MessageBox.alert('提示', '数据加载失败请检查网络或联系开发者！');
},
params : {
}
});
