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
						height : 128,
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
									format:'Y-m', //日期格式化
									//maxValue:'2014-12-31', //允许选择的最大日期
									//minValue:'2014-03-26', //允许选择的最小日期
									allowBlank : false,
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
	//allowBlank : false,
	anchor : '100%'
}); 
					
			var myForm = new Ext.form.FormPanel({
						region : 'north',
						margins : '3 3 3 3',
						title : '<span class="commoncss">工作日营运计划2<span>',
						collapsible : false,
						border : true,
						labelWidth : 90, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
						buttonAlign : 'center',
						height : 300,
						items : [{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '早高峰起始时间', // 标签
															//allowBlank : false,
															name : 'mpstarttime', // name:后台根据此name属性取值
															anchor : '100%'// 宽度百分比

														}, {
															fieldLabel : '早高峰结束时间',
															name : 'mpendtime',
															//allowBlank : false,
															anchor : '100%'
														}, {
															fieldLabel : '早高峰计划班次', // 标签
															name : 'mpruns', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														},{
															fieldLabel : '早高峰平均间隔', // 标签
															name : 'mpspaceavg', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														}]
											}, {
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '晚高峰起始时间', // 标签
															name : 'epstarttime', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}, {
															fieldLabel : '晚高峰结束时间',
															name : 'ependtime',
															//allowBlank : false,
															anchor : '100%'
														}, {
															fieldLabel : '晚高峰计划班次', // 标签
															name : 'epruns', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														},{
															fieldLabel : '晚高峰平均间隔', // 标签
															name : 'epspaceavg', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [
															stationCombo]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '早高峰断面起始时间', // 标签
															name : 'mpdstarttime', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}, {
															fieldLabel : '早高峰结断面束时间',
															name : 'mpdendtime',
															//allowBlank : false,
															anchor : '100%'
														}, {
															fieldLabel : '早高峰断面计划班次', // 标签
															name : 'mpdruns', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														},{
															fieldLabel : '早高峰断面平均间隔', // 标签
															name : 'mpdspaceavg', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '晚高峰断面起始时间', // 标签
															name : 'epdstarttime', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}, {
															fieldLabel : '晚高峰结断面束时间',
															name : 'epdendtime',
															//allowBlank : false,
															anchor : '100%'
														}, {
															fieldLabel : '晚高峰断面计划班次', // 标签
															name : 'epdruns', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														},{
															fieldLabel : '晚高峰断面平均间隔', // 标签
															name : 'epdspaceavg', // name:后台根据此name属性取值
															anchor : '100%' // 宽度百分比
														}]
											}]
								},{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '日班次', // 标签
															//allowBlank : false,
															name : 'runs_day', // name:后台根据此name属性取值
															anchor : '100%'// 宽度百分比

														}]
											}, {
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '平峰最大间隔', // 标签
															name : 'maxspaceavg', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '正点率', // 标签
															name : 'p_rate', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比
															}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '营运配车', // 标签
															name : 'num_yypeiche', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '挂车数量', // 标签
															name : 'num_guache', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											}]
								},{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '早低峰串车标准值', // 标签
															//allowBlank : false,
															name : 'chuanche_zaodifeng', // name:后台根据此name属性取值
															anchor : '100%'// 宽度百分比

														}]
											}, {
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '早高峰串车标准值', // 标签
															name : 'chuanche_zaogaofeng', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '平峰串车标准值', // 标签
															name : 'chuanche_pingfeng', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比
															}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '晚高峰串车标准值', // 标签
															name : 'chuanche_wangaofeng', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '晚低峰串车标准值', // 标签
															name : 'chuanche_wandifeng', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											}]
								}
								,{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日时间1', // 标签
															//allowBlank : false,
															name : 'weekendtime1', // name:后台根据此name属性取值
															anchor : '100%'// 宽度百分比

														}]
											}, {
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日时间2_2', // 标签
															name : 'weekendtime2_2', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日时间3_1', // 标签
															name : 'weekendtime3_1', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比
															}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日时间3_2', // 标签
															name : 'weekendtime3_2', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
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
								},{
									layout : 'column',
									border : false,
									items : [{
												
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日计划值1', // 标签
															//allowBlank : false,
															name : 'weekendtime1_p', // name:后台根据此name属性取值
															anchor : '100%'// 宽度百分比

														}]
											}, {
												columnWidth : .20,
												layout : 'form',
												labelWidth : 100, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日计划值2', // 标签
															name : 'weekendtime2_p', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比

														}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
												defaultType : 'textfield',
												border : false,
												items : [{
															fieldLabel : '双休日计划值3', // 标签
															name : 'weekendtime3_p', // name:后台根据此name属性取值
															//allowBlank : false,
															anchor : '100%'// 宽度百分比
															}]
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
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
											},{
												columnWidth : .20,
												layout : 'form',
												labelWidth : 120, // 标签宽度
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
								}
								
								
								
								
								
								],
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
								var station = action.result.data.section_id;
								stationCombo.setValue(station);//动态指定
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