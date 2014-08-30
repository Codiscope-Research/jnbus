/**
 * 综合实例：数据维护(四合一)
 * 
 * @author XiongChun
 * @since 2010-11-20
 */
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
	hiddenName : 'route_id',
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
									id:'date',
									name : 'date', // name:后台根据此name属性取值 
									format:'Y-m-d', //日期格式化
									maxValue:'2014-12-31', //允许选择的最大日期
									//minValue:'2014-05-01', //允许选择的最小日期
									anchor : '100%' // 宽度百分比
								}]
							}]
				}],
				buttons : [{
							text : '查询',
							iconCls : 'previewIcon',
							handler : function() {
								querySfxmDatas();
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
						header : '线路',
						dataIndex : 'routename',
						//hidden : true, // 隐藏列
						sortable : true,
						width : 50
						// 列宽
				}	, {
						header : '日期',
						dataIndex : 'date',
						sortable : true,
						width : 100
					}, {
						header : '车辆自编号',
						width : 100,
						dataIndex : 'productid',
						renderer:function(value){
							var tp= new String(value);
							
							return tp.substring(2,tp.length);
						}
						
						
					},{
						header : '计划开始时间',
						width : 100,
						dataIndex : 'jh_fcsk'
						
						
					},{
						header : '班次开始时间',
						width : 100,
						dataIndex : 'time'
						
						
					},{
						header : '班次开始站点',
						width : 100,
						//hidden : true, // 隐藏列
						dataIndex : 'phyposition'
					}, {
						header : '上下行',
						width : 100,
						dataIndex : 'upordown',
						renderer:function(value){
							if(value=='3')
								return '上行';
							else
								return '下行';
					        //alert(weekDay[myDate.getDay()]);
							
						}
					},{
						header : '计划班次间隔',
						width : 100,
						dataIndex : 'jh_jiange'
					},{
						header : '实际班次间隔',
						width : 100,
						dataIndex : 'jiange',
						renderer:function(value){
							var values = value.split("|");
							return values[0]+'分'+values[1]+'秒';
						}
					}]);
					
					

	/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
									url :'busbanci.do?reqCode=queryBanciJianGePlan'
								}),
						// 数据读取器
						reader : new Ext.data.JsonReader({
							totalProperty : 'TOTALCOUNT', // 记录总数
							root : 'ROOT' // Json中的列表数据根节点
						}, [ {
											name : 'routename'
										},{
											name : 'jh_jiange'
										}, {
											name : 'date'
										},{
											name : 'productid'
										},{
											name : 'time'
										}, {
											name : 'phyposition'
										}, {
											name : 'jiange'
										},{
											
											name : 'upordown'
										}, {
											
											name : 'js_fcsk'
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

	// 表格实例
	var grid = new Ext.grid.GridPanel({
				// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
				title : '<span class="commoncss">班次计划间隔</span>',
				height : 500,
				id : 'id_grid_sfxm',
				autoScroll : true,
				frame : true,
				region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
				margins : '3 3 3 3',
				store : store, // 数据存储
				stripeRows : true, // 斑马线
				cm : cm, // 列模型
				//tbar : tbar, // 表格工具栏
				bbar : bbar,// 分页工具栏
				viewConfig : {
	// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
				// forceFit : true
				},
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				}
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
});