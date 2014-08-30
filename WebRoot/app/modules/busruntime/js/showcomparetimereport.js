

Ext.onReady(function(){ 
	Ext.Ajax.timeout = 180000; 
	var chart;
	function createReport()
    {
        //var chart;
        chart = new Highcharts.Chart({
        	
            
            chart: {    
            	renderTo: 'container',
                type: 'scatter',                                                                 
                zoomType: 'xy'                                                                   
            },                                                                                   
            title: {                                                                             
                text: '分线路周转时间比较'                        
            },                                                                                   
            subtitle: {                                                                          
                text: '济南公交智能指挥系统: bus  2014'                                                      
            },                                                                                   
            xAxis: {                                                                             
            	//type: 'datetime',
            	//tickPixelInterval: 0.5,
            	startOnTick: true,                                                               
                endOnTick: true,  
                title: {                                                                         
                    text: '时间区间'                                                          
                } ,
                labels: {
                   
                }                                                           
            },                                                                                   
            yAxis: {                                                                             
                title: {                                                                         
                    text: '周转时间 (分钟)'                                                          
                }                                                                                
            },                                                                                   
            legend: {                                                                            
                layout: 'vertical',                                                              
                align: 'left',                                                                   
                verticalAlign: 'top',                                                            
                x: 100,                                                                          
                y: 70,                                                                           
                floating: true,                                                                  
                backgroundColor: '#FFFFFF',                                                      
                borderWidth: 1                                                                   
            },  
            credits:{
                enabled:false // 禁用版权信息
           },
            plotOptions: {                                                                       
                scatter: {                                                                       
                    marker: {                                                                    
                        radius: 5,                                                               
                        states: {                                                                
                            hover: {                                                             
                                enabled: true,                                                   
                                lineColor: 'rgb(100,100,100)'                                    
                            }                                                                    
                        }                                                                        
                    },                                                                           
                    states: {                                                                    
                        hover: {                                                                 
                            marker: {                                                            
                                enabled: false                                                   
                            }                                                                    
                        }                                                                        
                    },                                                                           
                    tooltip: {                                                                   
                        headerFormat: '<b>{series.name}</b><br>',                                
                        pointFormat: ' {point.y} 分钟'                                
                    }                                                                            
                }                                                                                
            },                                                                                   
            series: [{                                                                           
                name: '实际周转时间',                                                                  
                color: 'rgba(223, 83, 83, .5)',                                                  
                data: []   
                                                                                                 
            },{
                type: 'spline',
                name: '平均周转时间',
                data: [],
                marker: {
                	lineWidth: 2,
                	lineColor: Highcharts.getOptions().colors[3],
                	fillColor: 'white'
                }
            } ]                                                                                   
        
        	
        });
	
	
    }
	
	
	
	
	var updownstore = new Ext.data.SimpleStore({
		fields : ['name', 'code'],
		data : [['下行', 'Down'], ['上行', 'Up']]
	});
	
	var updownCombo= new Ext.form.ComboBox({
		id : 'updown',
		hiddenName : 'updown_name',
		fieldLabel : '上行/下行',
		emptyText : '请选择',
		triggerAction : 'all',
		store : updownstore,
		displayField : 'name',
		valueField : 'code',
		mode : 'local',
		forceSelection : false, // 选中内容必须为下拉列表的子项
		editable : false,
		typeAhead : true,
		allowBlank : false,
		// value:'0002',
		resizable : true,
		anchor : '95%'
	});
	
	
	
	var companyStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'busruntime.do?reqCode=queryCompanyDatas'
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
	routeCombo.reset();
		
		var value = companyCombo.getValue();
		routeStore.load({
					params : {
						deptid : value
					}
				});
	});

var routeStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'busruntime.do?reqCode=queryrouteDatas'
				}),
		reader : new Ext.data.JsonReader({}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
	});

var routeCombo = new Ext.form.ComboBox({
	id:'idselectroute',
	hiddenName : 'selectroute',
	fieldLabel : '线路',
	emptyText : '请选择线路...',
	triggerAction : 'all',
	store : routeStore,
	displayField : 'text',
	valueField : 'text',
	loadingText : '正在加载数据...',
	mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
	forceSelection : true,
	typeAhead : true,
	resizable : true,
	editable : false,
	allowBlank : false,
	anchor : '100%'
});



		
	

var tbar = new Ext.Toolbar({
	items : [{
		text : '分公司'
	},companyCombo , {
		text : '分线路'
	},routeCombo,{
		text : '上下行'
	},updownCombo,{
        xtype : 'datefield',
		fieldLabel : '日期', // 标签
		id:'datetime',
		name : 'datetime', // name:后台根据此name属性取值 
		format:'Y-m-d', //日期格式化
		maxValue:'2014-12-31', //允许选择的最大日期
		//minValue:'2014-05-01', //允许选择的最小日期
		anchor : '100%' // 宽度百分比
	},{
				text : '查询',
				iconCls : 'page_findIcon',
				handler : function() {
				
				if(Ext.getCmp('idselectroute').value==undefined||Ext.getCmp('datetime').value==undefined||Ext.getCmp('updown').value==undefined){
					 Ext.MessageBox.alert('错误', '请选择查询条件！');
					return;
				}
				
					Ext.Ajax.request({
		                url: 'busruntime.do?reqCode=queryCompareBustimeReport',
		
		              
		                params: { selectroute: Ext.getCmp('idselectroute').value,
		                	datetime :Ext.getCmp('datetime').value,
		                	updown_name :Ext.getCmp('updown').value },
		
		                method: 'GET',
		
		                success: function (response, options) {
		                	var datastr= new Array(); 
		                	var str= new Array(); 
		                	
		                	str=response.responseText.split("|"); 
		                	
		                	for(var i=0;i<str.length;i++){
		                		var array = new Array();
		                		var tmp = new Array();
		                		array=str[i].split(",");
		                		tmp[0]=parseFloat(array[0]);
		                		tmp[1]=parseFloat(array[1]);
		                		datastr[i]=tmp;
		                	}
		                	
		                	
		                	chart.series[0].setData(datastr);  
		                	
		                  //  Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
		
		                },
		
		                failure: function (response, options) {
		
		                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
		
		                }
		
		            });
					
					Ext.Ajax.request({
		                url: 'busruntime.do?reqCode=queryTimeReport',
		
		              
		                params: { selectroute: Ext.getCmp('idselectroute').value,
		                	datetime :Ext.getCmp('datetime').value,
		                	updown_name :Ext.getCmp('updown').value  },
		
		                method: 'GET',
		
		                success: function (response, options) {
		                	var datastr= new Array(); 
		                	var str= new Array(); 
		                	
		                	str=response.responseText.split("|"); 
		                	
		                	for(var i=0;i<str.length;i++){
		                		var array = new Array();
		                		var tmp = new Array();
		                		array=str[i].split(",");
		                		tmp[0]=parseFloat(array[0]);
		                		tmp[1]=parseFloat(array[1]);
		                		datastr[i]=tmp;
		                	}
		                	
		                	
		                	chart.series[1].setData(datastr);  
		                	
		                   // Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
		
		                },
		
		                failure: function (response, options) {
		
		                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
		
		                }
		
		            });
					
					
					
					

				}
			}, '-']
});
	
	
	var tabs = new Ext.Panel({
		tbar : tbar, 
		renderTo:'liftFailureReportInfoTb',
		items: [{
			html: '<div id="container" style="width: auto;height: 487px; margin: 0 auto"></div>',
			afterRender: function () {
				 createReport();
			}
		}]
	});

})

