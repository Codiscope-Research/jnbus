/**
*
*
* @author tudou
* @since 2010-11-20
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

			var updownstore = new Ext.data.SimpleStore({
				fields : ['name', 'code'],
				data : [['下行', '1'], ['上行', '3']]
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
				anchor : '100%'
			});
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
					url : 'busbanci.do?reqCode=queryrouteDatasByClass'
				}),
				reader : new Ext.data.JsonReader({}, [{
					name : 'value'
				}, {
					name : 'text'
				}])
			});

			var routeCombo = new Ext.form.ComboBox({
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
				labelWidth : 50, // 标签宽度
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
						items : [updownCombo,{
							xtype : 'datefield',
							fieldLabel : '日期', // 标签
							id:'datetime',
							name : 'datetime', // name:后台根据此name属性取值
							format:'Y-m-d', //日期格式化
							maxValue:maxdate, //允许选择的最大日期
							minValue:mindate, //允许选择的最小日期
							anchor : '100%' // 宽度百分比
						}]
					}]
				}],
				buttons : [{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						Ext.getCmp('tbi_edit').disable();
						Ext.getCmp('tbi_del').disable();
						querySfxmDatas();
						loadStation();
					}
				}, {
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
			var cm = new Ext.grid.ColumnModel([rownum,sm, {
				header : '',
				dataIndex : 'rowid',
				hidden : true, // 隐藏列
				sortable : true,
				width : 50
				// 列宽
			},{
				header : '线路',
				dataIndex : 'routeid',
				//hidden : true, // 隐藏列
				sortable : true,
				width : 50
				// 列宽
			}	, {
				header : '日期',
				dataIndex : 'date',
				sortable : true,
				width : 120
			}, {
				header : '车辆自编号',
				width : 150,
				dataIndex : 'productid',
				renderer:function(value){
					var tp= new String(value);

					return tp.substring(2,tp.length);
				}


			},{
				header : '班次开始时间',
				width : 150,
				dataIndex : 'time'


			},{
				header : '班次开始站点',
				width : 150,
				hidden : true, // 隐藏列
				dataIndex : 'startstation'
			},{
				header : '班次结束站点',
				width : 150,
				hidden : true, // 隐藏列
				dataIndex : 'stationnum'
			},{
				header : '班次开始站点',
				width : 150,
				dataIndex : 'starts'
			},{
				header : '班次结束站点',
				width : 150,
				dataIndex : 'ends'
			}, {
				header : '上下行',
				width : 150,
				dataIndex : 'upordown',
				renderer:function(value){
					if(value=='3')
					return '上行';
					else
						return '下行';
						//alert(weekDay[myDate.getDay()]);

					}
				},{
					header : '是否区间班次',
					width : 150,
					dataIndex : 'isqujian',
					renderer:function(value){
						if(value=='0')
						return '否';
						else
							return '是';
							//alert(weekDay[myDate.getDay()]);

						}
					}]);



					/**
					* 数据存储
					*/
					var store = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
							url :'busbanci.do?reqCode=queryBanciExecute'
						}),
						// 数据读取器
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT', // 记录总数
							root : 'ROOT' // Json中的列表数据根节点
						}, [ {
							name : 'rowid'
						},{
							name : 'routeid'
						}, {
							name : 'date'
						},{
							name : 'productid'
						},{
							name : 'time'
						}, {
							name : 'startstation'
						}, {
							name : 'starts'
						}, {
							name : 'endstation'
						}, {
							name : 'ends'
						},{

							name : 'upordown'
						}, {

							name : 'isqujian'
						}])
					});

					/**
					* 翻页排序时候的参数传递
					*/
					// 翻页排序时带上查询条件
					store.on('beforeload', function() {
						this.baseParams = qForm.getForm().getValues();
					});
					// 每页显示条数下拉选择框
					var pagesize_combo = new Ext.form.ComboBox({
						name : 'pagesize',
						triggerAction : 'all',
						mode : 'local',
						store : new Ext.data.ArrayStore({
							fields : ['value', 'text'],
							data : [[10, '10条/页'], [20, '20条/页'],
							[50, '50条/页'], [100, '100条/页'],
							[250, '250条/页'], [500, '500条/页']]
						}),
						valueField : 'value',
						displayField : 'text',
						value : '20',
						editable : false,
						width : 85
					});
					var number = parseInt(pagesize_combo.getValue());
					// 改变每页显示条数reload数据
					pagesize_combo.on("select", function(comboBox) {
						bbar.pageSize = parseInt(comboBox.getValue());
						number = parseInt(comboBox.getValue());
						store.reload({
							params : {
								start : 0,
								limit : bbar.pageSize
							}
						});
					});

					// 分页工具栏
					var bbar = new Ext.PagingToolbar({
						pageSize : number,
						store : store,
						displayInfo : true,
						displayMsg : '显示{0}条到{1}条,共{2}条',
						plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
						emptyMsg : "没有符合条件的记录",
						items : ['-', '&nbsp;&nbsp;', pagesize_combo]
					});

					// 表格工具栏
					var tbar = new Ext.Toolbar({
						items : [{
							text : '新增',
							iconCls : 'addIcon',
							id : 'id_tbi_add',
							handler : function() {
								addCatalogItem();
							}
						}, {
							text : '修改',
							id : 'tbi_edit',
							iconCls : 'edit1Icon',
							disabled : true,
							handler : function() {
								updateCatalogItem();
							}
						}, {
							text : '删除',
							id : 'tbi_del',
							iconCls : 'deleteIcon',
							disabled : true,
							handler : function() {
								deleteCatalogItem();
							}
						}, '->', {
							text : '刷新',
							iconCls : 'arrow_refreshIcon',
							handler : function() {
								store.reload();
							}
						}]
					});

					// 表格实例
					var grid = new Ext.grid.GridPanel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						title : '<span class="commoncss">班次执行情况</span>',
						height : 500,
						id : 'id_grid_sfxm',
						autoScroll : true,
						frame : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						margins : '3 3 3 3',
						store : store, // 数据存储
						stripeRows : true, // 斑马线
						cm : cm, // 列模型
						tbar : tbar, // 表格工具栏
						bbar : bbar,// 分页工具栏
						viewConfig : {
							// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});

					// 监听行选中事件
					grid.on('rowclick', function(pGrid, rowIndex, event) {
						Ext.getCmp('tbi_edit').enable();
						Ext.getCmp('tbi_del').enable();
					});

					grid.on('rowdblclick', function(grid, rowIndex, event) {
						updateCatalogItem();
					});



					var updownstore_add = new Ext.data.SimpleStore({
						fields : ['name', 'upordown'],
						data : [['下行', '1'], ['上行', '3']]
					});

					var updownCombo_add= new Ext.form.ComboBox({
						id : 'updown_add',
						hiddenName : 'updown_name',
						fieldLabel : '上行/下行',
						emptyText : '请选择',
						triggerAction : 'all',
						store : updownstore_add,
						displayField : 'name',
						valueField : 'upordown',
						mode : 'local',
						forceSelection : false, // 选中内容必须为下拉列表的子项
						editable : false,
						typeAhead : true,
						allowBlank : false,
						// value:'0002',
						resizable : true,
						anchor : '100%'
					});
					var companyStore_add = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryCompanyDatasByClass'
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

					var companyCombo_add = new Ext.form.ComboBox({
						hiddenName : 'companyName',
						fieldLabel : '分公司',
						emptyText : '请选择分公司...',
						triggerAction : 'all',
						store : companyStore_add,
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

					companyCombo_add.on('select', function() {
						routeCombo.reset();

						var value = companyCombo_add.getValue();
						routeStore_add.load({
							params : {
								deptid : value
							}
						});
					});

					var routeStore_add = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryrouteDatasByClass'
						}),
						reader : new Ext.data.JsonReader({}, [{
							name : 'value'
						}, {
							name : 'text'
						}])
					});

					var routeCombo_add = new Ext.form.ComboBox({
						hiddenName : 'selectroute',
						fieldLabel : '线路',
						emptyText : '请选择线路...',
						triggerAction : 'all',
						store : routeStore_add,
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

					var startstationStore_add = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryRouteStationUporDownStart'
						}),
						reader : new Ext.data.JsonReader({}, [{
							name : 'startstation'
						}, {
							name : 'station_name'
						}])
					});

					var startstationCombo_add = new Ext.form.ComboBox({
						hiddenName : 'startstation',
						fieldLabel : '班次起始站点',
						emptyText : '请选择站点...',
						triggerAction : 'all',
						store : startstationStore_add,
						displayField : 'station_name',
						valueField : 'startstation',
						loadingText : '正在加载数据...',
						mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection : true,
						typeAhead : true,
						resizable : true,
						editable : false,
						//allowBlank : false,
						anchor : '100%'
					});
					var endstationStore_add = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryRouteStationUporDownEnd'
						}),
						reader : new Ext.data.JsonReader({}, [{
							name : 'endstation'
						}, {
							name : 'station_name'
						}])
					});

					var endstationCombo_add = new Ext.form.ComboBox({
						hiddenName : 'endstation',
						fieldLabel : '班次结束站点',
						emptyText : '请选择站点...',
						triggerAction : 'all',
						store : endstationStore_add,
						displayField : 'station_name',
						valueField : 'endstation',
						loadingText : '正在加载数据...',
						mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection : true,
						typeAhead : true,
						resizable : true,
						editable : false,
						//allowBlank : false,
						anchor : '100%'
					});

					updownCombo_add.on('select', function(){
						endstationCombo_add.reset();
						startstationCombo_add.reset();

						var selectroute = routeCombo_add.getValue();
						var updown_name = updownCombo_add.getValue();
						startstationStore_add.load({
							params : {
								updown_name : updown_name,
								selectroute : selectroute
							}
						});

						endstationStore_add.load({
							params : {
								updown_name : updown_name,
								selectroute : selectroute
							}
						});
					});


					var isqujianstore_add = new Ext.data.SimpleStore({
						fields : ['name', 'isqujian'],
						data : [['是', '1'], ['否', '0']]
					});

					var isqujianCombo_add= new Ext.form.ComboBox({
						id : 'isqujian_add',
						hiddenName : 'isqujian',
						fieldLabel : '是否区间班次',
						emptyText : '请选择',
						triggerAction : 'all',
						store : isqujianstore_add,
						displayField : 'name',
						valueField : 'isqujian',
						mode : 'local',
						forceSelection : false, // 选中内容必须为下拉列表的子项
						editable : false,
						typeAhead : true,
						//allowBlank : false,
						// value:'0002',
						resizable : true,
						anchor : '100%'
					});

					var myForm = new Ext.form.FormPanel({
						collapsible : false,
						border : true,
						labelWidth : 60, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 250,
						items :[{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .40,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [companyCombo_add,updownCombo_add, startstationCombo_add,{
									fieldLabel : '车辆自编号',
									name : 'productid',
									maxLength : 20,
									anchor : '100%'
								},isqujianCombo_add]
							}, {
								columnWidth : .40,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [routeCombo_add,{
									xtype : 'datefield',
									fieldLabel : '日期', // 标签
									id:'date',
									name : 'date', // name:后台根据此name属性取值
									format:'Y-m-d', //日期格式化
									//maxValue:'2014-12-31', //允许选择的最大日期
									//minValue:'2014-05-01', //允许选择的最小日期
									anchor : '100%' // 宽度百分比
								},endstationCombo_add, {
									fieldLabel : '班次开始时间',
									name : 'time',
									xtype : 'textfield', // 设置为文字输入框类
									anchor : '100%'
								}]

							}]
						}]
					});

					var firstWindow = new Ext.Window({
						title : '<span class="commoncss">班次情况录入<span>', // 窗口标题
						layout : 'fit', // 设置窗口布局模式
						width : 600, // 窗口宽度
						height : 210, // 窗口高度
						closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						animateTarget : Ext.getBody(),
						pageY : 20, // 页面定位Y坐标
						pageX : document.body.clientWidth / 2 - 600 / 2, // 页面定位X坐标
						items : [myForm], // 嵌入的表单面板
						buttons : [{
							text : '保存',
							iconCls : 'acceptIcon',
							handler : function() {
								submitTheForm();
							}
						}, {
							text : '重置',
							iconCls : 'tbar_synchronizeIcon',
							handler : function() {
								myForm.getForm().reset();
							}
						}, {
							text : '关闭',
							iconCls : 'deleteIcon',
							handler : function() {
								firstWindow.hide();
							}
						}]
					});





					var updownstore1 = new Ext.data.SimpleStore({
						fields : ['name', 'upordown'],
						data : [['下行', '1'], ['上行', '3']]
					});

					var updownCombo1= new Ext.form.ComboBox({
						id : 'updown1',
						hiddenName : 'upordown',
						fieldLabel : '上下行',
						emptyText : '请选择',
						triggerAction : 'all',
						store : updownstore1,
						displayField : 'name',
						valueField : 'upordown',
						mode : 'local',
						forceSelection : false, // 选中内容必须为下拉列表的子项
						editable : false,
						typeAhead : true,
						//allowBlank : false,
						// value:'0002',
						resizable : true,
						anchor : '100%'
					});

					var isqujianstore1 = new Ext.data.SimpleStore({
						fields : ['name', 'isqujian'],
						data : [['是', '1'], ['否', '0']]
					});

					var isqujianCombo1= new Ext.form.ComboBox({
						id : 'isqujian1',
						hiddenName : 'isqujian',
						fieldLabel : '是否区间班次',
						emptyText : '请选择',
						triggerAction : 'all',
						store : isqujianstore1,
						displayField : 'name',
						valueField : 'isqujian',
						mode : 'local',
						forceSelection : false, // 选中内容必须为下拉列表的子项
						editable : false,
						typeAhead : true,
						//allowBlank : false,
						// value:'0002',
						resizable : true,
						anchor : '100%'
					});

					function loadStation(){
						var params = qForm.getForm().getValues();
						startstationStore.load({
							params : params
						});
						endstationStore.load({
							params : params
						});

					}

					var startstationStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryRouteStationUporDownStart'
						}),
						reader : new Ext.data.JsonReader({}, [{
							name : 'startstation'
						}, {
							name : 'station_name'
						}])
					});

					var startstationCombo = new Ext.form.ComboBox({
						hiddenName : 'startstation',
						fieldLabel : '班次起始站点',
						emptyText : '请选择站点...',
						triggerAction : 'all',
						store : startstationStore,
						displayField : 'station_name',
						valueField : 'startstation',
						loadingText : '正在加载数据...',
						mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection : true,
						typeAhead : true,
						resizable : true,
						editable : false,
						//allowBlank : false,
						anchor : '100%'
					});
					var endstationStore = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : 'datainput.do?reqCode=queryRouteStationUporDownEnd'
						}),
						reader : new Ext.data.JsonReader({}, [{
							name : 'endstation'
						}, {
							name : 'station_name'
						}])
					});

					var endstationCombo = new Ext.form.ComboBox({
						hiddenName : 'endstation',
						fieldLabel : '班次结束站点',
						emptyText : '请选择站点...',
						triggerAction : 'all',
						store : endstationStore,
						displayField : 'station_name',
						valueField : 'endstation',
						loadingText : '正在加载数据...',
						mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
						forceSelection : true,
						typeAhead : true,
						resizable : true,
						editable : false,
						//allowBlank : false,
						anchor : '100%'
					});

					var updateForm = new Ext.form.FormPanel({
						collapsible : false,
						border : true,
						labelWidth : 60, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 250,
						items : [{
							layout : 'column',
							border : false,
							items : [{
								columnWidth : .40,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									fieldLabel : '线路',
									name : 'routeid',
									readOnly : true,
									xtype : 'textfield', // 设置为数字输入框类型
									labelStyle : 'color:blue;',
									anchor : '100%'
								}, {
									fieldLabel : '车辆自编号',
									name : 'productid',
									maxLength : 20,
									anchor : '100%'
								},startstationCombo, updownCombo1,{
									fieldLabel : '内部编号',
									name : 'rowid',
									fieldClass : 'x-custom-field-disabled',
									maxLength : 20,
									//disabled : true, // 设置禁用属性
									readOnly : true,
									xtype : 'textfield',
									anchor : '100%'
								}]
							}, {
								columnWidth : .40,
								layout : 'form',
								labelWidth : 80, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
									fieldLabel : '日期', // 标签
									name : 'date', // name:后台根据此name属性取值
									maxLength : 20, // 可输入的最大文本长度,不区分中英文字符
									readOnly : true,
									labelStyle : 'color:blue;',
									anchor : '100%'// 宽度百分比
								}, {
									fieldLabel : '班次开始时间',
									name : 'time',
									xtype : 'textfield', // 设置为文字输入框类
									anchor : '100%'
								},endstationCombo,isqujianCombo1]

							}]
						}]
					});




					var updateWindow = new Ext.Window({
						title : '<span class="commoncss">修改班次<span>', // 窗口标题
						layout : 'fit', // 设置窗口布局模式
						width : 600, // 窗口宽度
						height : 200, // 窗口高度
						closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						animateTarget : Ext.getBody(),
						pageY : 20, // 页面定位Y坐标
						pageX : document.body.clientWidth / 2 - 600 / 2, // 页面定位X坐标
						items : [updateForm], // 嵌入的表单面板
						buttons : [{
							text : '保存',
							iconCls : 'acceptIcon',
							handler : function() {
								updateTheForm();
							}
						}, {
							text : '关闭',
							iconCls : 'deleteIcon',
							handler : function() {
								updateWindow.hide();
							}
						}]
					});

					// 布局
					// 如果把form作为center区域的话,其Height属性将失效。
					var viewport = new Ext.Viewport({
						layout : 'border',
						items : [qForm, grid]
					});

					/**
					* 查询项目列表
					*/
					function querySfxmDatas() {
						var params = qForm.getForm().getValues();
						params.start = 0;
						params.limit = bbar.pageSize;
						store.load({
							params : params
						});
					}

					/**
					* 表单提交(以Batch方式批量执行SQL语句)
					*/
					function submitTheFormBasedBatch() {
						if (!myForm.getForm().isValid())
						return;
						if (runMode == '0') {
							Ext.Msg.alert('提示', '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
							return;
						}
						myForm.form.submit({
							url : 'integrateDemo.do?reqCode=batchSql',
							waitTitle : '提示',
							method : 'POST',
							waitMsg : '正在处理数据,请稍候...',
							success : function(form, action) {
								Ext.MessageBox.alert('提示', action.result.msg);
							},
							failure : function(form, action) {
								Ext.Msg
								.alert('提示', '数据查询失败,错误类型:'
								+ action.failureType);
							}
						});
					}

					/**
					* 新增项目
					*/
					function addCatalogItem() {
						firstWindow.show(); // 显示窗口
					}

					/**
					* 表单提交(表单自带Ajax提交)
					*/
					function submitTheForm() {
						if (!myForm.getForm().isValid())
						return;
						myForm.form.submit({
							url : 'datainput.do?reqCode=addBusBanci',
							waitTitle : '提示',
							method : 'POST',
							waitMsg : '正在处理数据,请稍候...',
							success : function(form, action) { // 回调函数有2个参数
								// Ext.MessageBox.alert('提示',
								// action.result.msg);
								//var items = myForm.find('name', 'xmid');
								//items[0].setValue(action.result.xmid);
								Ext.Msg.confirm('请确认', '新增成功,您要继续添加班次吗?', function(
								btn, text) {
									if (btn == 'yes') {
										myForm.getForm().reset();
									} else {
										firstWindow.hide();
										store.reload();
										//querySfxmDatas();
									}
								});
							},
							failure : function(form, action) {
								Ext.MessageBox.alert('提示', '数据保存失败');
							}
						});
					}

					/**
					* 修改项目
					*/
					function updateCatalogItem() {
						var record = grid.getSelectionModel().getSelected();
						if (Ext.isEmpty(record)) {
							Ext.Msg.alert('提示:', '请先选中项目');
							return;
						}

						updateForm.getForm().loadRecord(record);
						updateWindow.show(); // 显示窗口
					}

					/**
					* 表单提交(表单自带Ajax提交)
					*/
					function updateTheForm() {
						if (!updateForm.getForm().isValid())
						return;
						updateForm.form.submit({
							url : 'datainput.do?reqCode=saveBusBanci',
							waitTitle : '提示',
							method : 'POST',
							waitMsg : '正在处理数据,请稍候...',
							success : function(form, action) { // 回调函数有2个参数
								Ext.MessageBox.alert('提示', action.result.msg);
								updateWindow.hide();
								store.reload();
							},
							failure : function(form, action) {
								Ext.Msg
								.alert('提示', '数据保存失败,错误类型:'
								+ action.failureType);
							}
						});
					}

					/**
					* 删除项目
					*/
					function deleteCatalogItem() {
						var record = grid.getSelectionModel().getSelected();
						if (Ext.isEmpty(record)) {
							Ext.Msg.alert('提示:', '请先选中项目');
							return;
						}
						Ext.MessageBox.confirm('请确认', '确认删除吗?', function(btn, text) {
						if (btn == 'yes') {
							if (runMode == '0') {
								Ext.Msg.alert('提示',
								'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
								return;
							}
							showWaitMsg();
							Ext.Ajax.request({
								url : 'datainput.do?reqCode=deleteBusBanci',
								success : function(response) { // 回调函数有1个参数
									var resultArray = Ext.util.JSON
									.decode(response.responseText);
									Ext.Msg.alert('提示', resultArray.msg);
									store.reload();
								},
								failure : function(response) {
									Ext.MessageBox.alert('提示', '数删除失败');
								},
								params : {
									rowid : record.data.rowid
								}
							});
						}
					})
				}

				/**
				* 打印一
				*/
				function printCatalog1() {
					showWaitMsg('正在准备报表数据,请稍等...');
					Ext.Ajax.request({
						url : 'integrateDemo.do?reqCode=buildReportDataObject',
						success : function(response) {
							hideWaitMsg();
							doPrint('hisCatalogReport4App');
						},
						failure : function(response) {
							hideWaitMsg();
							Ext.Msg.alert('提示', "准备报表数据对象发生错误,请检查!");
						}
					});
				}

				function callTuxedo(){
					Ext.Ajax.request({
						url : 'integrateDemo.do?reqCode=callTuxedo',
						success : function(response) { // 回调函数有1个参数
							var resultArray = Ext.util.JSON
							.decode(response.responseText);
							Ext.Msg.alert('提示', resultArray.msg);
						},
						failure : function(response) {
							Ext.MessageBox.alert('提示', '调用失败');
						},
						params : {
							par1 : '001'
						}
					});
				}

			});

		},
		failure : function(response) {
			Ext.MessageBox.alert('提示', '数据加载失败请检查网络或联系开发者！');
		},
		params : {
		}
	});
