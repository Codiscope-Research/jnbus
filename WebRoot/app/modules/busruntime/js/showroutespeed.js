/**
 * 
 * 
 * @author lz
 * @since 2014-4-15
 */
Ext.onReady(function() {
	Ext.Ajax.timeout = 180000; 
	
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
								items : [companyCombo,routeCombo]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 60, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									fieldLabel : '',
									name : 'timebank1',
									xtype : 'numberfield', // 设置为数字输入框类型
									allowDecimals : false, // 是否允许输入小数
									allowNegative : false, // 是否允许输入负数
									hidden:true,
									maxValue : 120,
									anchor : '100%'
								},{
							        xtype : 'datefield',
									fieldLabel : '日期', // 标签
									id:'datetime',
									name : 'datetime', // name:后台根据此name属性取值 
									format:'Y-m-d', //日期格式化
									maxValue:'2014-12-31', //允许选择的最大日期
									
									anchor : '100%' // 宽度百分比
								}]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 60, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
											fieldLabel : '', // 标签
											name : 'timebank2', // name:后台根据此name属性取值
											maxLength : 20, // 可输入的最大文本长度,不区分中英文字符
											allowBlank : true,
											hidden:true,
											anchor : '100%'// 宽度百分比
										}]
							}]
				}],
		buttons : [{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						if (!qForm.form.isValid()) {
							return;
						}
						queryBalanceInfo(qForm.getForm());
					}
				}, {
					text : '统计报表',
					iconCls : 'previewIcon',
					handler : function() {
						

						
						if (!qForm.form.isValid()) {
							return;
						}
						
						
						tabs.show();

						
						window1.show();
						
						if(Ext.getCmp('idselectroute').value==undefined||Ext.getCmp('datetime').value==undefined){
							 Ext.MessageBox.alert('错误', '请选择查询条件！');
							return;
						}
						
							Ext.Ajax.request({
				                url: 'busspeed.do?reqCode=queryroutespeedreport',
				
				              
				                params: { selectroute: Ext.getCmp('idselectroute').value,
				                	datetime :Ext.getCmp('datetime').value
				                	 },
				
				                method: 'GET',
				
				                success: function (response, options) {
				                	var datastr1= new Array(); 
				                	var datastr2= new Array(); 
				                	var str1= new Array(); 
				                	var str2= new Array(); 
				                	
				                	var re= new Array(); 
				                	re=response.responseText.split("*"); 
				                	
				                	str1=re[0].split("|");
				                	
				                	
				                	for(var i=0;i<str1.length;i++){
				                		var array = new Array();
				                		var tmp = new Array();
				                		array=str1[i].split(",");
				                		tmp[0]=parseFloat(array[0]);
				                		tmp[1]=parseFloat(array[1]);
				                		datastr1[i]=tmp;
				                	}
				                	
				                	str2=re[1].split("|"); 
				                	
				                	for(var i=0;i<str2.length;i++){
				                		var array = new Array();
				                		var tmp = new Array();
				                		array=str2[i].split(",");
				                		tmp[0]=parseFloat(array[0]);
				                		tmp[1]=parseFloat(array[1]);
				                		datastr2[i]=tmp;
				                	}
				                	
				                	
				                	
				                	
				                	
				                	chart.series[0].setData(datastr1);  
				                	chart.series[1].setData(datastr2);  
				                	
				                	
				                  //  Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
				
				                },
				
				                failure: function (response, options) {
				
				                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
				
				                }
				
				            });
							
					

					}
				},{
					text : '重置',
					iconCls : 'tbar_synchronizeIcon',
					handler : function() {
						qForm.getForm().reset();
					}
				}]
	});
	
	
	
	
	
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header : 'NO',
						width : 28
					});

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm,   {
						header : '线路',
						dataIndex : 'routeid',
						//hidden : true, // 隐藏列
						sortable : true,
						width : 50
						// 列宽
				}	, {
						header : '日期',
						dataIndex : 'rundate',
						sortable : true,
						width :120
					}, {
						header : '时段',
						width : 150,
						dataIndex : 'timesection',
						renderer:function(value){
							value = value.replace("[","(");
							return value;
						}
					},  {
						header : '平均速度',
						width : 150,
						dataIndex : 'avspeed',
						renderer:function(value){
							//alert(Object.prototype.toString.apply(value));
							return value.toFixed(2);
						}
						
					},{
						header : '标准速度',
						width : 150,
						dataIndex : 'standspeed'
						
					},{
						header : '上行／下行',
						width : 150,
						dataIndex : 'upordown',
						renderer:function(value){
							if(value=="Up"){
								return "上行";
							}
							else if(value=="Down"){
								return "下行";
							}
							else {
								return "none";
								
							}
							
						}
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
									url :'busspeed.do?reqCode=queryroutespeed'
								}),
						// 数据读取器
						reader : new Ext.data.JsonReader({},[ {
											name : 'routeid'
										}, {
											name : 'rundate'
										}, {
											name : 'timesection'
										},  {
											name : 'avspeed'
										},{
											
											name : 'standspeed'
										}, {
											
											name : 'upordown'
										}])
					});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
				this.baseParams = qForm.getForm().getValues();
					});

			
			
			// 表格右键菜单
			var contextmenu = new Ext.menu.Menu({
						id : 'theContextMenu',
						items : [{
							text : '查看详情',
							iconCls : 'previewIcon',
							handler : function() {
								// 获取当前选择行对象
								var record = grid.getSelectionModel()
										.getSelected();
								var xmmc = record.get('xmmc');
								Ext.MessageBox.alert('提示', xmmc);
							}
						}, {
							text : '导出列表',
							iconCls : 'page_excelIcon',
							handler : function() {
								// 获取当前选择行对象
								var record = grid.getSelectionModel()
										.getSelected();
								var xmmc = record.get('xmmc');
								Ext.MessageBox.alert('提示', xmmc);
							}
						}]
					});

			// 表格实例
			var grid = new Ext.grid.GridPanel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						
						margins : '3 3 3 3',
						height : 500,
						frame : true,
						autoScroll : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						stripeRows : true, // 斑马线
						cm : cm, // 列模型
						sm : sm, // 复选框
			//			tbar : tbar, // 表格工具栏
			//			bbar : bbar,// 分页工具栏
						viewConfig : {
			// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});


			// 页面初始自动查询数据
			// store.load({params : {start : 0,limit : bbar.pageSize}});

			// 小画笔点击事件
			grid.on("cellclick", function(pGrid, rowIndex, columnIndex, e) {
						var store = pGrid.getStore();
						var record = store.getAt(rowIndex);
						var fieldName = pGrid.getColumnModel()
								.getDataIndex(columnIndex);
						// columnIndex为小画笔所在列的索引,缩阴从0开始
						// 这里要非常注意!!!!!
						if (fieldName == 'edit' && columnIndex == 2) {
							var xmmc = record.get("xmmc");
							// 到此你就可以继续做其他任何事情了
							Ext.MessageBox.alert('提示', xmmc);
						}
					});

			// 监听单元格双击事件
			grid.on("celldblclick", function(pGrid, rowIndex, columnIndex, e) {
				var record = pGrid.getStore().getAt(rowIndex);
				var fieldName = pGrid.getColumnModel()
						.getDataIndex(columnIndex);
				var cellData = record.get(fieldName);
					// Ext.MessageBox.alert('提示', cellData);
				});

			// 监听行双击事件
			grid.on('rowdblclick', function(pGrid, rowIndex, event) {
						// 获取行数据集
						var record = pGrid.getStore().getAt(rowIndex);
						// 获取单元格数据集
						var data = record.get("xmmc");
						Ext.MessageBox.alert('提示', "双击行的索引为:" + rowIndex);
					});

			// 给表格绑定右键菜单
			grid.on("rowcontextmenu", function(grid, rowIndex, e) {
						e.preventDefault(); // 拦截默认右键事件
						grid.getSelectionModel().selectRow(rowIndex); // 选中当前行
						contextmenu.showAt(e.getXY());
					});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [qForm, grid]
					});

			// 查询表格数据
			function queryCatalogItem() {
				store.load({
							params : {
								selectroute : Ext.getCmp('selectroute').getValue()
							}
						});
			}
			
			// 查询表格数据
			function queryBalanceInfo(pForm) {
				var params = pForm.getValues();
				//params.start = 0;
				//params.limit = bbar.pageSize;
				store.load({
							params : params
						});
			}

			// 获取选择行
			function getCheckboxValues() {
				// 返回一个行集合JS数组
				var rows = grid.getSelectionModel().getSelections();
				if (Ext.isEmpty(rows)) {
					Ext.MessageBox.alert('提示', '您没有选中任何数据!');
					return;
				}
				// 将JS数组中的行级主键，生成以,分隔的字符串
				var strChecked = jsArray2JsString(rows, 'xmid');
				Ext.MessageBox.alert('提示', strChecked);
				// 获得选中数据后则可以传入后台继续处理
			}



			
			
			
			
			
			
			
			
			
			
			
			
			
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
		                text: '线路速度'                        
		            },                                                                                   
		            subtitle: {                                                                          
		                text: '济南公交智能指挥系统: bus  2014'                                                      
		            },                                                                                   
		            xAxis: {                                                                             
		            	//type: 'datetime',
		            	//tickPixelInterval: 10,
		            	 
		                title: {                                                                         
		                    text: '时间区间'                                                          
		                } ,
		                
		                labels : {  

		                    formatter : function() {//设置纵坐标值的样式  

		                     return this.value ;  

		                    }  

		                   }                                                       
		            },                                                                                   
		            yAxis: {                                                                             
		                title: {                                                                         
		                    text: '速度 '                                                          
		                }                                                                                
		            },                                                                                   
		            legend: {                                                                            
		                layout: 'vertical',                                                              
		                align: 'left',                                                                   
		                verticalAlign: 'top',                                                            
		                x: 100,                                                                          
		                y: 80,                                                                           
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
		                        pointFormat: '{point.x}  , {point.y}ss '                                
		                    }                                                                            
		                }                                                                                
		            },                                                                                   
		            series: [{
		                type: 'spline',
		                name: '线路平均速度',
		                data: [],
		                marker: {
		                	lineWidth: 2,
		                	lineColor: Highcharts.getOptions().colors[1],
		                	fillColor: 'red'
		                }
		            } ,{
		                type: 'spline',
		                name: '线路标准速度',
		                data: [],
		                marker: {
		                	lineWidth: 2,
		                	lineColor: Highcharts.getOptions().colors[3],
		                	fillColor: 'white'
		                }
		            }]                                                                                   
		        
		        	
		        });
			
			
		    }
			
			
			
			
			
			
			var tabs = new Ext.Panel({
				
				renderTo:'liftFailureReportInfoTb',
				items: [{
					html: '<div id="container" style="width: auto;height: 487px; margin: 0 auto"></div>',
					afterRender: function () {
							createReport();

				
					}
				}]
			});
			tabs.hide() ;
			
			
		     
				var window1 = new Ext.Window({
					layout : 'fit',
					width : 570,
					height : 390,
					resizable : false,
					draggable : true,
					closable : true, // 是否可关闭
					closeAction : 'hide', // 关闭策略
					title : '<span class="commoncss">线路速度</span>',
					collapsible : true,
					titleCollapse : false,
					//下拉层的动画效果必须关闭,否则将出现Flash图标下拉动画过场异常的现象
					animCollapse : false,
					maximizable : true,
					border : false,
					items:[tabs],
					animateTarget : Ext.getBody(),
					constrain : true
				});
				
				window1.hide();

			
			

		});