<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
	<title>一单一评统计分析</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="stylesheet" href="<%=request.getContextPath()%>/new/css/lxcss.css" />
	<link type="text/css" rel="stylesheet" href="<%=ln.Cfg.basePath%>/new/ext3.4/resources/css/ext-all.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/new/css/chart.css" />
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/jquery.PrintArea.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/jquery.json.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/pagination.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/dictionary.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/privilege.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/jquery.form.js"></script>
	<script src="<%=request.getContextPath()%>/wzdp/FusionCharts/Charts/FusionCharts.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/new/js/chart.js"></script>
	<script type="text/javascript">
		var basePath = '<%=request.getContextPath()%>';
		var cols1 = [
			{name:'lx',type:'string',cnname:'评价类型',show:'1'},
			{name:'wd',type:'string',cnname:'维度',show:'1'},
			{name:'0601',type:'string',cnname:'本部',show:'1'},
			{name:'0628',type:'string',cnname:'国网山东物资公司',show:'1'},
			{name:'0625',type:'string',cnname:'信息通信公司',show:'1'},
			{name:'0626',type:'string',cnname:'培训中心',show:'1'},
			{name:'0627',type:'string',cnname:'经济技术研究院',show:'1'},
			{name:'0620',type:'string',cnname:'电力科学研究院',show:'1'},
			{name:'0621',type:'string',cnname:'送变电工程公司',show:'1'},
			{name:'0623',type:'string',cnname:'电力中心医院',show:'1'},
			{name:'0602',type:'string',cnname:'济南',show:'1'},
			{name:'0603',type:'string',cnname:'青岛',show:'1'},
			{name:'0604',type:'string',cnname:'淄博',show:'1'},
			{name:'0605',type:'string',cnname:'潍坊',show:'1'},
			{name:'0606',type:'string',cnname:'烟台',show:'1'},
			{name:'0607',type:'string',cnname:'济宁',show:'1'},
			{name:'0608',type:'string',cnname:'临沂',show:'1'},
			{name:'0609',type:'string',cnname:'德州',show:'1'},
			{name:'0610',type:'string',cnname:'泰安',show:'1'},
			{name:'0611',type:'string',cnname:'聊城',show:'1'},
			{name:'0614',type:'string',cnname:'威海',show:'1'},
			{name:'0615',type:'string',cnname:'菏泽',show:'1'},
			{name:'0613',type:'string',cnname:'滨州',show:'1'},
			{name:'0616',type:'string',cnname:'东营',show:'1'},
			{name:'0618',type:'string',cnname:'日照',show:'1'},
			{name:'0612',type:'string',cnname:'枣庄',show:'1'},
			{name:'0617',type:'string',cnname:'莱芜',show:'1'},
			{name:'0619',type:'string',cnname:'检修公司',show:'1'},
			{name:'hj',type:'string',cnname:'合计',show:'1'}];
		$(document).ready(function(){
			setColumnHeader(cols1,'.tableborder');
			//给小图标添加默认隐藏
			$(".input_select_div").css({"display":"none"});
			$("input[type='text']").each(function(){
				$(this).focusin(function(){
					$(this).next().css({"display":"inline"});
					$("input[type='text']").not($(this)).next().css({"display":"none"});
				});
			});
			/**
			*绑定ajax执行开始与完成，控制控件展示与否。
			$(".tableborder").ajaxStart(function(){
				$("#myShow").css({display:"block"});
			});
			$(".tableborder").ajaxComplete(function(){
				$("#myShow").hide();
			});
			*/
			query();
		});
		
		//总的查询
		function query(){
			$("#myShow").show();
			dhjQuery();// 到货统计
		}
		
		/**
		*到货统计查询
		*/
		function dhjQuery(){
			var data = getQueryCondition();
			var tblStr1 = '';
			var tblStr2 = '';
			var tblStr3 = '';
			var tblStr4 = '';
			var sumYwh = 0;
			var sumWwh = 0;
			var sumXwh = 0;
			$("#table2 tr:gt(0)").remove();
			$.ajax({
				url : '<%=request.getContextPath()%>/servlet/ywgz/ydyp/fx/queryDH',
				type : 'POST',
				data : data,
				async:true,
				success : function(resp, textStatus) {
					var jsonObj = eval('('+resp+')');
					var categoriesStr = '<categories>';
			   		var xAxisStr = '<dataset seriesName="到货完成订单数">';
			   		var xAxisStr2 = '<dataset seriesName="到货评价订单数">';
			   		var yAxisStr = '<dataset seriesName="到货评价率（%）" parentYAxis="S">';
			   		var setStr = '';
					tblStr1 += '<tr><td rowspan="3">到货验收评价</td><td align="left">到货完成订单数</td>';
					tblStr2 += '<tr><td align="left">到货评价订单数</td>';
					tblStr3 += '<tr><td align="left">到货评价率（%）</td>';
		    		$.each(jsonObj.data,function(i,n){
		    			categoriesStr += '<category label="'+n.name+'" labelDisplay="Rotate" slantLabels="1"/>';
		    			xAxisStr += '<set value="'+n.ddw+'" link="Javascript:seedetail(\'scjdxxfx\',\'到货查询\',\'<%=request.getContextPath()%>/servlet/wzdp/ywgz/htly/shfx?isQuery=Y&ydyp_seindt='+$("#seindt").val()+'&ydyp_eeindt='+$("#eeindt").val()+'&zwerks='+n.zorg+'&zorg_flag=true\')" />';
		    			xAxisStr2 += '<set value="'+n.ddp+'" link="Javascript:seedetail(\'scjdxxfx\',\'到货评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')" />';
		    			yAxisStr += '<set value="'+n.pjl+'"/>';
		    			setStr += '<set label="'+n.name+'" value="'+n.pjl+'" /> ';
		    			tblStr1 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'到货查询\',\'<%=request.getContextPath()%>/servlet/wzdp/ywgz/htly/shfx?isQuery=Y&ydyp_seindt='+$("#seindt").val()+'&ydyp_eeindt='+$("#eeindt").val()+'&zwerks='+n.zorg+'&flag=ywh&zorg_flag=true\')">'+n.ddw+'</a></td>';
		    			tblStr2 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'到货评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')">'+n.ddp+'</a></td>';
		    			if(n.pjl>100){
		    			tblStr3 += '<td style="color:red">'+n.pjl+'%</td>';
		    			}else if(n.pjl<50){
		    			tblStr3 += '<td style="color:orange">'+n.pjl+'%</td>';
		    			}else{
		    			tblStr3 += '<td>'+n.pjl+'%</td>';
		    			}
		    			sumYwh += Number(n.ddw);
		    			sumWwh += Number(n.ddp);
		    			//sumXwh += Number(n.pjl);
		    		});
		    		categoriesStr += '</categories>';
			   		xAxisStr += '</dataset>';
			   		xAxisStr2 += '</dataset>';
			   		yAxisStr += '</dataset>';
		    		tblStr1 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'到货查询\',\'<%=request.getContextPath()%>/servlet/wzdp/ywgz/htly/shfx?isQuery=Y&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&flag=ywh\')">'+sumYwh+'</a></td></tr>';
		    		tblStr2 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'到货评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'\')">'+sumWwh+'</a></td>';
		    		if(sumWwh/sumYwh*100>100){
		    		tblStr3 += '<td style="color:red">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else if(sumWwh/sumYwh*100<50){
		    		tblStr3 += '<td style="color:orange">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else{
		    		tblStr3 += '<td>'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}
		    		var combinationChart1 = new FusionCharts("<%=request.getContextPath()%>/wzdp/FusionCharts/Charts/MSCombiDY2D.swf", "combinationChart1", "999px", "350", "0", "1" );
			   		var combinationChartDataString = ' <chart caption="到货订单评价统计分析" unescapeLinks="0" PYAxisName="条目数(条)" SYAxisName="评价率(%)" formatNumberScale="0" showBorder="0" showValues="0" showLabels="1" bgColor="#FFFFFF" paletteColors="#4F81BD,#FFFF6B,#C0504D" exportEnabled="1" exportHandler="<%=request.getContextPath()%>/JSP/ExportExample/FCExporter"  plotSpacePercent="40" palette = "3" useRoundEdges="1" setAdaptiveYMin="1" setAdaptiveSYMin="1" lineThickness="3">\n\	'+
									categoriesStr+xAxisStr+xAxisStr2+yAxisStr+
									'<trendLines><line startValue="100" color="009933" displayvalue="100%" valueOnLeft="1" toolText="100%分割线" parentYAxis="S"/></trendLines>'+
									' </chart>';
		   			combinationChart1.setXMLData( combinationChartDataString );
		   			combinationChart1.render("charsDiv1-1");
	       			
	       			$("#table2").append(tblStr1);
	       			$("#table2").append(tblStr2);
	       			$("#table2").append(tblStr3);
	       			//$("#myShow").hide();
	       			tyjQuery();// 投运统计
				},
				error : function(){
					alert('服务器出错，请稍后再试!');
				}
			});
		}
		
		/**
		*投运统计查询
		*/
		function tyjQuery(){
			var data = getQueryCondition();
			var tblStr1 = '';
			var tblStr2 = '';
			var tblStr3 = '';
			var tblStr4 = '';
			var sumYwh = 0;
			var sumWwh = 0;
			var sumXwh = 0;
			//$("#table2 tr:gt(0)").remove();
			$.ajax({
				url : '<%=request.getContextPath()%>/servlet/ywgz/ydyp/fx/queryTY',
				type : 'POST',
				data : data,
				async:true,
				success : function(resp, textStatus) {
					var jsonObj = eval('('+resp+')');
					var categoriesStr = '<categories>';
			   		var xAxisStr = '<dataset seriesName="投运完成订单数">';
			   		var xAxisStr2 = '<dataset seriesName="投运评价订单数">';
			   		var yAxisStr = '<dataset seriesName="投运评价率（%）" parentYAxis="S">';
			   		var setStr = '';
					tblStr1 += '<tr><td rowspan="3">投运评价</td><td align="left">投运完成订单数</td>';
					tblStr2 += '<tr><td align="left">投运评价订单数</td>';
					tblStr3 += '<tr><td align="left">投运评价率（%）</td>';
		    		$.each(jsonObj.data,function(i,n){
		    			categoriesStr += '<category label="'+n.name+'"/>';
		    			xAxisStr += '<set value="'+n.ddw+'" link="Javascript:seedetail(\'scjdxxfx\',\'投运查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')" />';
		    			xAxisStr2 += '<set value="'+n.ddp+'" link="Javascript:seedetail(\'scjdxxfx\',\'投运评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')"  />';
		    			yAxisStr += '<set value="'+n.pjl+'"/>';
		    			setStr += '<set label="'+n.name+'" value="'+n.pjl+'"/> ';
		    			tblStr1 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'投运查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')">'+n.ddw+'</a></td>';
		    			tblStr2 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'投运评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')">'+n.ddp+'</a></td>';
		    			if(n.pjl>100){
		    			tblStr3 += '<td style="color:red">'+n.pjl+'%</td>';
		    			}else if(n.pjl<50){
		    			tblStr3 += '<td style="color:orange">'+n.pjl+'%</td>';
		    			}else{
		    			tblStr3 += '<td>'+n.pjl+'%</td>';
		    			}
		    			sumYwh += Number(n.ddw);
		    			sumWwh += Number(n.ddp);
		    			//sumXwh += Number(n.pjl);
		    		});
		    		categoriesStr += '</categories>';
			   		xAxisStr += '</dataset>';
			   		xAxisStr2 += '</dataset>';
			   		yAxisStr += '</dataset>';
		    		tblStr1 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'投运查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=1&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'\')">'+sumYwh+'</a></td></tr>';
		    		tblStr2 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'投运评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'\')">'+sumWwh+'</a></td>';
		    		if(sumWwh/sumYwh*100>100){
		    		tblStr3 += '<td style="color:red">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else if(sumWwh/sumYwh*100<50){
		    		tblStr3 += '<td style="color:orange">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else{
		    		tblStr3 += '<td>'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}
		    		var combinationChart2 = new FusionCharts("<%=request.getContextPath()%>/wzdp/FusionCharts/Charts/MSCombiDY2D.swf", "combinationChart2", "999px", "350", "0", "1" );
			   		var combinationChartDataString = ' <chart caption="投运订单评价率统计分析" unescapeLinks="0" PYAxisName="条目数(条)" SYAxisName="评价率(%)" formatNumberScale="0" showBorder="0" showValues="0" showLabels="1" bgColor="#FFFFFF" paletteColors="#4F81BD,#FFFF6B,#C0504D" exportEnabled="1" exportHandler="<%=request.getContextPath()%>/JSP/ExportExample/FCExporter"  plotSpacePercent="40" palette = "3" useRoundEdges="1" setAdaptiveYMin="1" setAdaptiveSYMin="1" lineThickness="3">\n\	'+
									' \n\                                                                                                                                              ' +
									categoriesStr+xAxisStr+xAxisStr2+yAxisStr+' \n\                                                                                                                                              ' +
									'<trendLines><line startValue="100" color="009933" displayvalue="100%" valueOnLeft="1" toolText="100%分割线" parentYAxis="S"/></trendLines>'+
									' </chart>';
		   			combinationChart2.setXMLData( combinationChartDataString );
		   			combinationChart2.render("charsDiv2-1");
	       			
	       			$("#table2").append(tblStr1);
	       			$("#table2").append(tblStr2);
	       			$("#table2").append(tblStr3);
	       			//$("#myShow").hide();
	       			zbjQuery();// 质保统计
				},
				error : function(){
					alert('服务器出错，请稍后再试!');
				}
			});
		}
		
		/**
		*质保统计查询
		*/
		function zbjQuery(){
			var data = getQueryCondition();
			var tblStr1 = '';
			var tblStr2 = '';
			var tblStr3 = '';
			var tblStr4 = '';
			var sumYwh = 0;
			var sumWwh = 0;
			var sumXwh = 0;
			//$("#table2 tr:gt(0)").remove();
			$.ajax({
				url : '<%=request.getContextPath()%>/servlet/ywgz/ydyp/fx/queryZB',
				type : 'POST',
				data : data,
				async:true,
				success : function(resp, textStatus) {
					var jsonObj = eval('('+resp+')');
					var categoriesStr = '<categories>';
			   		var xAxisStr = '<dataset seriesName="质保完成订单数">';
			   		var xAxisStr2 = '<dataset seriesName="质保评价订单数">';
			   		var yAxisStr = '<dataset seriesName="质保评价率（%）" parentYAxis="S">';
			   		var setStr = '';
					tblStr1 += '<tr><td rowspan="3">质保评价</td><td align="left">质保完成订单数</td>';
					tblStr2 += '<tr><td align="left">质保评价订单数</td>';
					tblStr3 += '<tr><td align="left">质保评价率（%）</td>';
		    		$.each(jsonObj.data,function(i,n){
		    			categoriesStr += '<category label="'+n.name+'" />';
		    			xAxisStr += '<set value="'+n.ddw+'" link="Javascript:seedetail(\'scjdxxfx\',\'质保查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')" />';
		    			xAxisStr2 += '<set value="'+n.ddp+'" link="Javascript:seedetail(\'scjdxxfx\',\'质保评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=3&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')" />';
		    			yAxisStr += '<set value="'+n.pjl+'"/>';
		    			setStr += '<set label="'+n.name+'" value="'+n.pjl+'")" /> ';
		    			tblStr1 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'质保查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')">'+n.ddw+'</a></td>';
		    			tblStr2 += '<td><a href="javascript:seedetail(\'scjdxxfx\',\'质保评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=3&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'&zorg='+n.zorg+'\')">'+n.ddp+'</a></td>';
		    			if(n.pjl>100){
		    			tblStr3 += '<td style="color:red">'+n.pjl+'%</td>';
		    			}else if(n.pjl<50){
		    			tblStr3 += '<td style="color:orange">'+n.pjl+'%</td>';
		    			}else{
		    			tblStr3 += '<td>'+n.pjl+'%</td>';
		    			}
		    			sumYwh += Number(n.ddw);
		    			sumWwh += Number(n.ddp);
		    			//sumXwh += Number(n.pjl);
		    		});
		    		categoriesStr += '</categories>';
			   		xAxisStr += '</dataset>';
			   		xAxisStr2 += '</dataset>';
			   		yAxisStr += '</dataset>';
		    		tblStr1 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'质保查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/ydyptyzbcx?tab_num=2&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'\')">'+sumYwh+'</a></td></tr>';
		    		tblStr2 += '<td><a href="Javascript:seedetail(\'tzwhfx\',\'质保评价查询\',\'<%=request.getContextPath()%>/servlet/ywgz/ydyp/cx/my_ydyp_tabs?tab_num=3&seindt='+$("#seindt").val()+'&eeindt='+$("#eeindt").val()+'\')">'+sumWwh+'</a></td>';
		    		if(sumWwh/sumYwh*100>100){
		    		tblStr3 += '<td style="color:red">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else if(sumWwh/sumYwh*100<50){
		    		tblStr3 += '<td style="color:orange">'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}else{
		    		tblStr3 += '<td>'+roundFun(sumWwh/sumYwh*100,2)+'%</td>';
		    		}
		    		var combinationChart3 = new FusionCharts("<%=request.getContextPath()%>/wzdp/FusionCharts/Charts/MSCombiDY2D.swf", "combinationChart3", "999px", "350", "0", "1" );
			   		var combinationChartDataString = ' <chart caption="质保订单评价率统计分析" unescapeLinks="0" PYAxisName="条目数(条)" SYAxisName="评价率(%)" formatNumberScale="0" showBorder="0" showValues="0" showLabels="1" bgColor="#FFFFFF" paletteColors="#4F81BD,#FFFF6B,#C0504D" exportEnabled="1" exportHandler="<%=request.getContextPath()%>/JSP/ExportExample/FCExporter"  plotSpacePercent="40" palette = "3" useRoundEdges="1" setAdaptiveYMin="1" setAdaptiveSYMin="1" lineThickness="3">\n\	'+
									' \n\                                                                                                                                              ' +
									categoriesStr+xAxisStr+xAxisStr2+yAxisStr+' \n\                                                                                                                                              ' +
									'<trendLines><line startValue="100" color="009933" displayvalue="100%" valueOnLeft="1" toolText="100%分割线" parentYAxis="S"/></trendLines>'+
									' </chart>';
		   			combinationChart3.setXMLData( combinationChartDataString );
		   			combinationChart3.render("charsDiv3-1");
	       			
	       			$("#table2").append(tblStr1);
	       			$("#table2").append(tblStr2);
	       			$("#table2").append(tblStr3);
	       			$("#myShow").hide();
	       			
				},
				error : function(){
					alert('服务器出错，请稍后再试!');
				}
			});
		}
		
		// 四舍五入
		function roundFun(numberRound,roundDigit){
			if(numberRound>=0){
				var tempNumber=parseInt((numberRound*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
				return tempNumber;
			}else{
				numberRound=-numberRound;
				var tempNumber=parseInt((numberRound*Math.pow(10,roundDigit)+0.5))/Math.pow(10,roundDigit);
				return -tempNumber;
			}
		}
		
		//查看详细
		function seedetail(tabId,tabTitle,url){
			window.parent.addTab(tabId+(new Date().getTime()),tabTitle,url);
		}
		
		function setColumnHeader(cols,target) {
			$(target).empty();
			var str = '<thead>';
			for (var i = 0; i < cols.length; i++) {
				if (cols[i].show == '1') {
					str += '<th align="center" class="normal" style="cursor:pointer">'
							+ cols[i].cnname + '</th>';
				}
			}
			str += '</thead>';
			$(target).append(str);
			if($("#myShow")){
				$("#myShow").remove();
			}
			$(".bloc").append('<div id="myShow" style="display:block;height:100%;width: 100%; position: fixed; _position: absolute; bottom: 0;left:0; z-index: 1000; opacity: 0.3; filter: alpha(opacity=30); background-color: #000;"> '+
			' <div align="center" style=" margin-top:15%; color:#FFF; font-size:18px"><img alt="loading" src="/wzdp/wzdp/img/022.gif" /><br> '+
			' 正在查询，请稍后...</div> '+
			' </div>');	
		}
		
		function getQueryCondition(){
			var data = {};
			
			var seindt = $.trim(document.form.seindt.value);
			if(seindt){
				data.seindt = seindt;
			}

			var eeindt = $.trim(document.form.eeindt.value);
			if(eeindt){
				data.eeindt = eeindt;
			}
			
			return data;
		}
		
		//初始化多选链接
		function initAmulti(values,id){
			if(values!='[]'){
				$(id).removeClass();
				$(id).addClass("input_multi_selected");
				$(id).bind("mouseover",function(){
					$(id).removeClass();
					$(id).addClass("input_multi_select");
				}).bind("mouseout",function(){
					$(id).removeClass();
					$(id).addClass("input_multi_selected");
				});
			}else{
				$(id).removeClass();
				$(id).addClass("input_multi_select");
				$(id).unbind();
			}
		}
		
		//修改清空方法，除清空外还需修改图标
		function resetForm(form) {
			form.reset();
			$(".input_multi_selected").removeClass().addClass("input_multi_select").unbind();
		}
		
		function lookupBack(myid,myjsp,title,second){
			window.open("/wzdp/wzdp/common/web/lookupBack/"+myjsp+".jsp?second="+second+"&title="+encodeURI(title)+"&id="+myid,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=850, height=400");
		}
		
		function expExcel(){
			$("#zdwzType").val($("#zdwzlb").val());
			$("#formgyjhfx").attr("action","<%=request.getContextPath()%>/servlet/ywgz/ydyp/fx/exportExcel");
			$("#formgyjhfx").submit();
		}
		
	</script>
	</head>
	<body>
    <div class="bloc">
      <div class="content">
        <div class="x-panel-header x-panel-collapsed" style="height:15px;"><span class="x-panel-header-text" style="color:#FFF;line-height:15px">查询条件</span></div>
        <!--查询区域-->
        <form id="formgyjhfx" name="form" action="<%=ln.Cfg.basePath%>/servlet/wzdp/ywgz/htly/gyjhfx/query" method="post">
          <input name="methodName" id="methodName" type="hidden"/>
          <input name="className" id="className" type="hidden"/>
          <input name="colsName" id="colsName" type="hidden"/>
          <input name="zebelnMulti" id="zebelnMulti" type="hidden"/>
          <input name="gyschMulti" id="gyschMulti" type="hidden"/>
          <input name="zmatnrMulti" id="zmatnrMulti" type="hidden"/>
          <input name="zmatklMulti" id="zmatklMulti" type="hidden"/>
          <input name="zwerksMulti" id="zwerksMulti" type="hidden"/>
          <input name="zekorgMulti" id="zekorgMulti" type="hidden"/>
          <input name="zlifnrMulti" id="zlifnrMulti" type="hidden"/>
          <input name="zekgrpMulti" id="zekgrpMulti" type="hidden"/>
          <input name="pspidMulti" id="pspidMulti" type="hidden"/>
          <input name="posidMulti" id="posidMulti" type="hidden"/>
          <input name="zdwzType" id="zdwzType" type="hidden"/>
          
          <table id="mytab" width="99%" align="center" border="1" cellpadding="0" cellspacing="0">
            <tr>
              <td align="right" width="10%"><label>实际到货日期&nbsp;</label></td>
              <td width="15%"><input id="seindt" type="text" name="seindt" onClick="WdatePicker()" class="Wdate"></td>
              <td align="center" width="8%"><label>到</label></td>
              <td width="15%"><input id="eeindt" type="text" name="eeindt" onClick="WdatePicker()" class="Wdate"></td>
               <td align="right" width="10%"></td>
              <td width="15%"></td>
              <td align="center" width="8%"></td>
              <td></td>
            </tr>
          </table>
        </form>
        <!--list 表格-->
        <div class="List_table"> 
          <!--操作按钮-->
          <div class="Form_button">
            <input id="queryBtn" type="button" value="查询" onclick="query();" class="btnnav"/>
            <input id="clearBtn" type="button" value="清空" onclick="resetForm(document.form);" class="btnnav"/>
            <input id="expBtn" type="button" value="一键导出" onclick="expExcel();" class="btnnav" style="width:80px"/>
          </div>
          <div id="charsDiv1" style="width:1000px;height:350px;margin:auto;">
          	<div id="charsDiv1-1"></div>
          </div>
          <div id="charsDiv2" style="width:1000px;height:350px;margin:auto;">
          	<div id="charsDiv2-1"></div>
          </div>
          <div id="charsDiv3" style="width:1000px;height:350px;margin:auto;">
          	<div id="charsDiv3-1"></div>
          </div>
          <div style="overflow-x:auto;overflow-y:hidden;">
            <table id="table2" class="tableborder" cellpadding="0" cellspacing="0" width="100%">
            </table>
          </div>
        </div>
      </div>
    </div>
</body>
</html>