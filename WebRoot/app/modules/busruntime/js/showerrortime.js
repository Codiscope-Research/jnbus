/**
 * 异常统计表
 * 
 * @author lz
 * @since 2014-4-15
 */
Ext.onReady(function() {
			// 复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			// 定义自动当前页行号
			var rownum = new Ext.grid.RowNumberer({
						header : 'NO',
						width : 28
					});

			// 定义列模型
			var cm = new Ext.grid.ColumnModel([rownum, sm, {
						header : '操作', // 列标题
						dataIndex : 'edit',
						width : 35,
						renderer : iconColumnRender
					},  {
						header : '线路',
						dataIndex : 'routename',
						//hidden : true, // 隐藏列
						sortable : true,
						width : 50
						// 列宽
				}	, {
						header : '日期',
						dataIndex : 'rundate',
						sortable : true,
						width : 60
					}, {
						header : '星期',
						dataIndex : 'week',
						width : 30,
						renderer:function(value){
						}
					},{
						header : '时段',
						dataIndex : 'timestep',
						width : 30,
						renderer:function(value){
							
							
						}
					}, {
						header : '天气',
						width : 80,
						dataIndex : 'weather'
					}, {
						header : '下行实际值',
						width : 150,
						dataIndex : 'downreal'
					}, {
						header : '下行均值',
						width : 150,
						dataIndex : 'downaver'
					}, {
						header : '下行均值差',
						width : 150,
						dataIndex : 'downaversub'
					}, {
						header : '下行波动值',
						width : 150,
						dataIndex : 'downpuls'
					},{
						header : '下行波动值差',
						width : 150,
						dataIndex : 'downpulssub'
					}, {
						header : '上行实际值',
						width : 150,
						dataIndex : 'upreal'
					}, {
						header : '上行均值',
						width : 150,
						dataIndex : 'upaver'
					}, {
						header : '上行均值差',
						width : 150,
						dataIndex : 'upaversub'
					}, {
						header : '上行波动值',
						width : 150,
						dataIndex : 'uppuls'
					},{
						header : '上行波动值差',
						width : 150,
						dataIndex : 'uppulssub'
					}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
									url :'busruntime.do?reqCode=queryTimebyRoute'
								}),
						// 数据读取器
						reader : new Ext.data.JsonReader({},[ {
											name : 'routename'
										}, {
											name : 'rundate'
										}, {
											name : 'week'
										}, {
											name : 'timestep'
										}, {
											name : 'weather'
										}, {
											name : 'downreal'
										}, {
											name : 'downaver'
										}, {
											name : 'downaversub'
										}, {
											name : 'downpuls'
										}, {
											name : 'downpulssub'
										}, {
											name : 'upreal'
										}, {
											name : 'upaver'
										}, {
											name : 'upaversub'
										}, {
											name : 'uppuls'
										}, {
											name : 'uppulssub'
										}])
					});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
						this.baseParams = {
							xmmc : Ext.getCmp('xmmc').getValue()
						};
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
			
			// 表格工具栏
			var tbar = new Ext.Toolbar({
						items : [{
							text : '分公司'
							
						},{
									xtype : 'textfield',
									id : 'xmmc',
									name : 'xmmc',
									emptyText : '请输入项目名称',
									width : 150,
									enableKeyEvents : true,
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryCatalogItem();
											}
										}
									}
								}, {
									text : '选择线路',
									iconCls : 'page_findIcon'
									
								},new Ext.form.ComboBox({
									id:'selectroute',
									hiddenName : 'selectroute',
									fieldLabel : '线路',
									emptyText : '请选择',
									triggerAction : 'all',
									store : new Ext.data.SimpleStore({
												fields : ['name',
														'code'],
												data : [['1路', '1'],
														['167路', '167'],
														['56路', '56'],
														['85路', '85']]
											}),
									displayField : 'name',
									valueField : 'code',
									mode : 'local',
									forceSelection : false, // 选中内容必须为下拉列表的子项
									editable : false,
									typeAhead : true,
									// value:'0002',
									resizable : true,
									anchor : '100%'
								}), {
									text : '查询',
									iconCls : 'page_findIcon',
									handler : function() {
										queryCatalogItem();
									}
								}, {
									text : '刷新',
									iconCls : 'page_refreshIcon',
									handler : function() {
										store.reload();
									}
								}, '-', {
									text : '获取选择行',
									handler : function() {
										getCheckboxValues();
									}
								},'-', {
									text : '导出',
									tooltip : '以仿Ajax方式导出,界面无刷新',
									iconCls : 'page_excelIcon',
									handler : function() {
										exportExcel('excelReportDemo.do?reqCode=exportExcel2');
									}
								}]
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
						title : '<span class="commoncss">表格综合演示一</span>',
						margins : '3 3 3 3',
						height : 500,
						frame : true,
						autoScroll : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						stripeRows : true, // 斑马线
						cm : cm, // 列模型
						sm : sm, // 复选框
						tbar : tbar, // 表格工具栏
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
						items : [grid]
					});

			// 查询表格数据
			function queryCatalogItem() {
				store.load({
							params : {
								selectroute : Ext.getCmp('selectroute').getValue()
							}
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