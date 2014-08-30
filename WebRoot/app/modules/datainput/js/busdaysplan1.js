/**
 * 
 * 
 * @author yy
 * @since 2014-5-20
 */
/**
 * 综合实例：数据维护
 * 
 * @author XiongChun
 * @since 2010-11-20
 */
Ext.onReady(function() {
	
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
	hiddenName : 'routeid',
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
						collapsible : false,
						border : true,
						labelWidth : 50, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:3 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 95,
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
								items : [routeCombo]
							}, {
								columnWidth : .33,
								layout : 'form',
								labelWidth : 60, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
							        xtype : 'datefield',
									fieldLabel : '日期', // 标签
									id:'date',
									name : 'date', // name:后台根据此name属性取值 
									format:'Y-m-d', //日期格式化
									//maxValue:'2014-12-31', //允许选择的最大日期
									//minValue:'2014-03-26', //允许选择的最小日期
									allowBlank : false,
									anchor : '100%' // 宽度百分比
								}]
							}]
				}],
						buttons : [{
									text : '查询',
									iconCls : 'previewIcon',
									handler : function() {
										loadCallBack();
										loadStation();
									}
								}, {
									text : '重置',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										qForm.getForm().reset();
										myForm.getForm().reset();
										Ext.getCmp('btnSave').disable();
									}
								}]
					});
					
					
function loadStation(){
	var params = qForm.getForm().getValues();
		stationStore.load({
					params : params
				});					
	
	}
					
var stationStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : 'datainput.do?reqCode=queryRouteStation'
				}),
		reader : new Ext.data.JsonReader({}, [{
							name : 'station_id'
						}, {
							name : 'station_name'
						}])
	});

var stationCombo = new Ext.form.ComboBox({
	hiddenName : 'station_id',
	fieldLabel : '断面站点',
	emptyText : '请选择站点...',
	triggerAction : 'all',
	store : stationStore,
	displayField : 'station_name',
	valueField : 'station_id',
	loadingText : '正在加载数据...',
	mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
	forceSelection : true,
	typeAhead : true,
	resizable : true,
	editable : false,
	allowBlank : false,
	anchor : '100%'
});
					
			var myForm = new Ext.form.FormPanel({
						region : 'north',
						margins : '3 3 3 3',
						title : '<span class="commoncss">工作日营运计划1<span>',
						collapsible : false,
						border : true,
						labelWidth : 90, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 308,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '主站', // 标签
															allowBlank : false,
															name : 'station_main', // name:后台根据此name属性取值
															anchor : '95%'// 宽度百分比

														}, {
															fieldLabel : '副站',
															name : 'station_secondary',
															allowBlank : false,
															anchor : '95%'
														}]
											}, {
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '主站首班时间', // 标签
															name : 'first_bus_main', // name:后台根据此name属性取值
															allowBlank : false,
															anchor : '95%'// 宽度百分比

														}, {
															fieldLabel : '副站首班时间',
															name : 'first_bus_sec',
															allowBlank : false,
															anchor : '95%'
														}]
											},{
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '主站末班时间', // 标签
															name : 'last_bus_main', // name:后台根据此name属性取值
															allowBlank : false,
															anchor : '95%'// 宽度百分比

														}, {
															fieldLabel : '副站末班时间',
															name : 'last_bus_sec',
															allowBlank : false,
															anchor : '95%'
														}]
											}]
											},{
									layout : 'column',
									border : false,
									items : [{
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '低峰周转时间',
															name : 'turnaround_lowpeak',
															anchor : '95%'
														}, {
															fieldLabel : '早低峰班次',
															name : 'runs_mor_lowpeak',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（18米）',
															name : 'bus_18',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（8米）',
															name : 'bus_8',
															anchor : '95%'
														}]
											}, {
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '平峰周转时间',
															name : 'turnaround_normalpeak',
															anchor : '95%'
														}, {
															fieldLabel : '晚低峰班次',
															name : 'runs_nig_lowpeak',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（12米）',
															name : 'bus_12',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（其他）',
															name : 'bus_else',
															anchor : '95%'
														}]
											},{
												columnWidth : .25,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '高峰周转时间',
															name : 'turnaround_highpeak',
															anchor : '95%'
														}, {
															fieldLabel : '晚低峰班次',
															name : 'runs_nig_lowpeak',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（9-10米）',
															name : 'bus_9_10',
															anchor : '95%'
														}, {
															fieldLabel : '营运配车（合计）',
															name : 'sum_bus',
															anchor : '95%'
														}]
											}]
								}, {
															fieldLabel : '早低峰发车',
															name : 'start_mor_lowpeak',
															maxLength : 20,
												xtype : 'textfield',
															anchor : '95%'
														} ,{
															fieldLabel : '晚低峰发车',
															name : 'start_nig_lowpeak',
															maxLength : 20,
												xtype : 'textfield',
															anchor : '95%'
														}, {
												fieldLabel : '线路长度',
												name : 'length',
												maxLength : 20,
												xtype : 'textfield',
												anchor : '20%'
												}],
						buttons : [{
									text : '保存',
									iconCls : 'acceptIcon',
									id : 'btnSave',
									disabled : true,
									handler : function() {
										submitTheForm();
									}
								}]
					});

			// 布局
			// 如果把form作为center区域的话,其Height属性将失效。
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [qForm, {
									region : 'center',
									layout : 'border',
									border : false,
									items : [myForm, {
												region : 'center'
											}]
								}]
					});

			// 表单加载数据的回调函数
			function loadCallBack() {
				var params = qForm.getForm().getValues();
				myForm.form.load({
							waitMsg : '正在处理数据,请稍候...',// 提示信息
							waitTitle : '提示',// 标题
							url : 'datainput.do?reqCode=insertBusDaysPlan',// 请求的url地址
							params : params,
							//method : 'GET',// 请求方式
							success : function(form, action) {// 加载成功的处理函数
								var msg = action.result.data.msg;
								if (msg == 'ok') {
									Ext.getCmp('btnSave').enable();
									return;
								}
								Ext.Msg.alert('提示', msg);
								Ext.getCmp('btnSave').enable();
							},
							failure : function(form, action) {// 加载失败的处理函数
								Ext.Msg.alert('提示', '数据查询失败,错误类型:' + action.failureType);
							}
						});
			}

			/**
			 * 表单提交(表单自带Ajax提交)
			 */
			function submitTheForm() {
				var params = myForm.getForm().getValues();
				var params2 = qForm.getForm().getValues();
				params.routeid = params2.routeid;
				params.date = params2.date;
				params.updown_name = params2.updown_name;
				params.companyName = params2.companyName;
				//alert(params);
				myForm.form.submit({
							url : 'datainput.do?reqCode=saveBusDaysPlan',
							waitTitle : '提示',
							method : 'POST',
							waitMsg : '正在处理数据,请稍候...',
							params : params,
							success : function(form, action) { // 回调函数有2个参数
								Ext.MessageBox.alert('提示', action.result.msg);
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', '数据保存失败,错误类型:' + action.failureType);
							}
						});
			}

		});