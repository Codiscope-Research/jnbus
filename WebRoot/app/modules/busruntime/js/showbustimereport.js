/**
 * FlashReport报表综合实例(动态数据源|动态报表类型)
 */
Ext.onReady(function() {
	Ext.Ajax.timeout = 180000; 
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
	//allowBlank : false,
	anchor : '100%'
});
	
	
			var rownum = new Ext.grid.RowNumberer({
						header : 'NO',
						width : 28
					});

			var cm = new Ext.grid.ColumnModel([rownum, {
						header : '时段',
						dataIndex : 'timeinterval',
						width : 140,
						renderer:function(value){
							value = value.replace("[","(");
							return value;
						},
						sortable : false
					}, {
						header : '周转时间预测均值',
						dataIndex : 'avtime',
						renderer:function(value){
							return value.toFixed(2);
						},
						sortable : true
					}]);

			var store = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : 'busruntime.do?reqCode=queryTimebyRoute'
								}),
						reader : new Ext.data.JsonReader({},[ {
									name : 'routename'
								}, {
									name : 'rundate'
								}, {
									name : 'week'
								}, {
									name : 'weather'
								}, {
									name : 'timeinterval'
								},  {
									name : 'avtime'
								},{
									
									name : 'totaltime'
								}, {
									
									name : 'upordown'
								}])
					});

			var bbar = new Ext.PagingToolbar({
						pageSize : 100,
						store : store,
						displayInfo : true,
						displayMsg : '显示{0}条到{1}条,共{2}条',
						plugins : new Ext.ux.ProgressBarPager(),
						emptyMsg : "没有符合条件的记录",
						items : ['-', '&nbsp;&nbsp;']
					});

			var tbar = new Ext.Toolbar({
						items : ['<span class="commoncss">分公司:</span>',
						         companyCombo]
					});

			
			var toolbbar = new Ext.Toolbar({
				
				items : ['<span class="commoncss">线路:</span>',
				         routeCombo]
				
			});
			

			var updownbbar = new Ext.Toolbar({
				
				items : ['<span class="commoncss">上下行:</span>',
				         updownCombo]
				
			});
			
			var datebbar = new Ext.Toolbar({
				
				items : ['<span class="commoncss">日期:</span>',
				         {
			        xtype : 'datefield',
					fieldLabel : '日期', // 标签
					id:'seldatetime',
					name : 'datetime', // name:后台根据此name属性取值 
					format:'Y-m-d', //日期格式化
					maxValue:'2014-12-31', //允许选择的最大日期
					minValue:'2014-05-01', //允许选择的最小日期
					anchor : '100%' // 宽度百分比
				}]
				
			});
			Ext.getCmp('idselectroute').on('select', function(obj) {
				
				this.displayField= Ext.getCmp('idselectroute').value;
						store.load({
									params : {
										selectroute : obj.value,
										datetime : Ext.getCmp('seldatetime').value,
										updown_name:Ext.getCmp('updown').value,
										start : 0,
										limit : bbar.pageSize
									}
								});
						updateChart();
					});

			var grid = new Ext.grid.GridPanel({
						title : '<span style="font-weight:normal">周转时间预测</span>',
						frame : true,
						width : 280,
						maxSize : 300,
						autoScroll : true,
						region : 'west',
						margins : '3 3 3 3',
						split : true,
						collapsible : true,
						store : store,
						stripeRows : true,
						cm : cm,
						tbar : datebbar,
						listeners : {   
					           'render' : function(){   
					        	   updownbbar.render(this.tbar);
					        	   datebbar.render(this.tbar);
					        	tbar.render(this.tbar); //add one tbar   
					        	toolbbar.render(this.tbar); //add two tbar   
					            }},  
						
			//			bbar : bbar,
						viewConfig : {
			// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});

			
			
			
			store.on('beforeload', function() {
						this.baseParams = {
							// : Ext.getCmp('idproduct').getValue()
						};
					});

			store.load({
						params : {
						//	product : Ext.getCmp('idproduct').getValue(),
							start : 0,
							limit : bbar.pageSize
						},
						
						
						callback : function(records, options, success) {
							   if (success) {
							   
								   //alert("xxss");
								   // Ext.getCmp('comboxID').setValue('00001');
							   }}
					});

			var panel = new Ext.Panel({
						title : '<span style="font-weight:normal"></span>',
						contentEl : 'my2DcChart_div',
						margins : '3 3 3 3',
						region : 'center'
					});

			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid, panel]
					});

			function updateChart() {
				
				Ext.Ajax.request({
							url : 'busruntime.do?reqCode=queryReportXmlDatas',
							success : function(response, opts) {
								var resultArray = Ext.util.JSON
										.decode(response.responseText);
								 Ext.Msg.alert('提示', response.responseText);
								var xmlstring = resultArray.xmlstring;
								updateChartXML('my2DcChart', xmlstring);
							},
							failure : function(response, opts) {
								Ext.MessageBox.alert('提示', '获取报表数据失败');
							},
							params : {
								selectroute : Ext.getCmp('idselectroute').value,
								updown_name:Ext.getCmp('updown').value,
								datetime : Ext.getCmp('seldatetime').value
							}
						});
			}

		});