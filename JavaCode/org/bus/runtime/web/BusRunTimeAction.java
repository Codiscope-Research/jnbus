package org.bus.runtime.web;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.util.G4Constants;
import org.g4studio.core.util.G4Utils;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;
import org.g4studio.core.web.report.fcf.Categorie;
import org.g4studio.core.web.report.fcf.CategoriesConfig;
import org.g4studio.core.web.report.fcf.DataSet;
import org.g4studio.core.web.report.fcf.FcfDataMapper;
import org.g4studio.core.web.report.fcf.GraphConfig;
import org.g4studio.core.web.report.fcf.Set;

/**
 * 
 * 
 * @author lz
 * @since 2014-4-15
 * @see BizAction
 */
public class BusRunTimeAction extends BizAction {

	/**
	 * 周转时间预测初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward calculateTimeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("calculateTimeInitView");
	}
	
	/**
	 * 周转时间预测初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward testcharts(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("testchartsInitView");
	}
	
	/**
	 * 分线路单车实际周转时间对比
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward compareTimeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("compareTimeInitView");
	}
	
	/**
	 * 站点间平均运行速度
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showbussitespeedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showbussitespeedInitView");
	}
	
	/**
	 * 超速比例图表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showbusoverspeedreportInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showbusoverspeedreportInitView");
	}
	
	
	/**
	 * 线路每日各车超速查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward overbusspeedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("overbusspeedInitView");
	}
	
	
	/**
	 * 分线路单车实际周转时间对比
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward proveTimeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("proveTimeInitView");
	}
	
	
	
	
	/**
	 * 地图线路展示
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward routeshowBymap(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("routeshowBymapView");
	}
	
	
	/**
	 * 查询周转预测
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryTimebyRoute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		List list = getTimebyRoute(form,request);
		//Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countStddev", dto);
		String jsonString = JsonHelper.encodeObject2Json(list);
		
		//String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 查询周转预测
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryTimebyRouteReport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		List list = getTimebyRoute(form,request);
		//Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countStddev", dto);
		String jsonString = JsonHelper.encodeObject2Json(list);
		
		//String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	
	
	/**
	 * 站点间平均运行速度分页
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querysitespeed(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		List list =g4Reader.queryForPage("Bus.querysitespeed", dto);
		
		Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countquerysitespeed", dto);
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 站点间平均运行速度分页
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryoverspeed(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		List list =g4Reader.queryForPage("Bus.queryoverspeed", dto);
		
		Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countqueryoverspeed", dto);
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	
	
	/**
	 * 
	 * 分线路单车实际周转时间 获取分页数据
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryCompareBustime(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		 java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd");
		
			String selectroute = dto.getAsString("selectroute");
			if(selectroute==null||selectroute.equals("")){
				return null;
			}
			if(!isNumeric(selectroute)){
				String pre= selectroute.substring(0, 1);
				if(pre.equals("K")){
					selectroute= selectroute.substring(1, selectroute.length());
				}else{
					//selectroute= selectroute.substring(1, selectroute.length());
					
				}
				
			}
			String datetime =dto.getAsString("datetime");
			String temp=null;
			if(!datetime.equals("")){
				
				 temp = datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
			}else{
				
				datetime=format1.format(new Date());
				temp =  datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
				
			}

			int day= Integer.parseInt(temp) ;
			if(day>1&&day<=10){
				dto.put("bit1", 0.5);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.2);
			}else if(day>10&&day<=20){
				
				dto.put("bit1", 0.3);
				dto.put("bit2", 0.5);
				dto.put("bit3", 0.2);
			}else{
				
				dto.put("bit1", 0.2);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.5);
			}
			dto.put("route", selectroute);
		
		List list = g4Reader.queryForPage("Bus.compareBustime", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countcompareBustime", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	
	/**
	 * 查询周转预测 报表查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryTimeReport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		List list = getTimebyRoute(form,request);
		//Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countStddev", dto);
		String jsonString = JsonHelper.encodeObject2Json(list);
		
		String re = "";
		for(int i=0;i<list.size();i++){
			Dto d = (Dto) list.get(i);
			String timeinterval = d.getAsString("timeinterval");
			String avtime = d.getAsString("avtime");
			String[] arr = new String[3];
					
			arr=	timeinterval.split("\\~");
			
			String tmp =  arr[0].substring(1, arr[0].length());
			tmp=tmp.replace(":", ".");
			
			
			
			//triptime="20";
			re=re+tmp+","+avtime+"|";
		}
		
		
		
		re = re.substring(0, re.length()-1);
		super.write(re, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 
	 * 分线路单车实际周转时间 获取分页数据
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryCompareBustimeReport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		 java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd");
		
			String selectroute = dto.getAsString("selectroute");
			if(selectroute==null||selectroute.equals("")){
				return null;
			}
			if(!isNumeric(selectroute)){
				String pre= selectroute.substring(0, 1);
				if(pre.equals("K")){
					selectroute= selectroute.substring(1, selectroute.length());
				}else{
					//selectroute= selectroute.substring(1, selectroute.length());
					
				}
				
			}
			String datetime =dto.getAsString("datetime");
			String temp=null;
			if(!datetime.equals("")){
				
				 temp = datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
			}else{
				
				datetime=format1.format(new Date());
				temp =  datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
				
			}

			int day= Integer.parseInt(temp) ;
			if(day>1&&day<=10){
				dto.put("bit1", 0.5);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.2);
			}else if(day>10&&day<=20){
				
				dto.put("bit1", 0.3);
				dto.put("bit2", 0.5);
				dto.put("bit3", 0.2);
			}else{
				
				dto.put("bit1", 0.2);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.5);
			}
			dto.put("route", selectroute);
		
		List list = g4Reader.queryForList("Bus.compareBustime", dto);
		
		
		  
	    Date date=null;  
	    SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");  
	    
		
		String re = "";
		for(int i=0;i<list.size();i++){
			Dto d = (Dto) list.get(i);
			//String starttime = d.getAsString("starttime").substring(0, d.getAsString("starttime").lastIndexOf("."));
			String starttime = d.getAsString("starttime");
			String[] arr1 = new String[3];
			arr1=starttime.split("\\.");
			DecimalFormat df = new DecimalFormat("0.00");
			double hi= Float.parseFloat(arr1[0]);
			double mi=(float) (Math.round(Integer.parseInt(arr1[1]))/60.0);
			//String result = (mi+hi)+"" .format("%.2f");
			
			String triptime = d.getAsString("triptime");
			String[] arr = new String[3];
					
			arr=	triptime.split("\\.");
			int h= Integer.parseInt(arr[0])*60; 
			int m= Integer.parseInt(arr[1]); 
			
			//triptime="20";
			re=re+(mi+hi)+","+(h+m)+"|";
		}
		
		
		if(re!=null&&!re.equals("")){
			re = re.substring(0, re.length()-1);
			super.write(re, response);
		}
		
		return mapping.findForward(null);
	}
	
	
	public ActionForward queryCompanyDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryCompanyDatas", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	public ActionForward queryrouteDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryrouteDatas", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	public ActionForward queryroutetimeDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String da= dto.getAsString("datetime");
		String[] ee = new String[3];
		ee=da.split("-");
		dto.put("datetime", ee[0]+"-"+ee[1]+"-1");
		List areaList = g4Reader.queryForList("Bus.queryroutetimeDatas", dto);
		Dto andone = new BaseDto();
		String tmp ="";
		for(int i=0;i<areaList.size();i++){
			
			Dto re = (Dto) areaList.get(i);
			re.put("value", i);
			andone.put("route", re.getAsString("route"));
			if(re.getAsString("c").equals("1")){
				tmp=re.getAsString("m_end");
			}else if(re.getAsString("c").equals("2")){
				tmp=tmp+"-"+re.getAsString("m_end");
				
			}
			
		}
		andone.put("timearea", tmp);
		areaList.add(andone);
		
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	public static boolean isNumeric(String str){
		  for (int i = str.length();--i>=0;){   
		   if (!Character.isDigit(str.charAt(i))){
		    return false;
		   }
		  }
		  return true;
		 }
	
	public List getTimebyRoute( ActionForm form, HttpServletRequest request
			) throws Exception {
		
		 java.text.DateFormat format1 = new java.text.SimpleDateFormat("yyyy-MM-dd");
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			String selectroute = dto.getAsString("selectroute");
			if(selectroute==null||selectroute.equals("")){
				return null;
			}
			if(!isNumeric(selectroute)){
				String pre= selectroute.substring(0, 1);
				if(pre.equals("K")){
					selectroute= selectroute.substring(1, selectroute.length());
				}else{
					//selectroute= selectroute.substring(1, selectroute.length());
					
				}
				
			}
			String datetime =dto.getAsString("datetime");
			String temp=null;
			if(!datetime.equals("")){
				
				 temp = datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
			}else{
				
				datetime=format1.format(new Date());
				temp =  datetime.substring(datetime.lastIndexOf("-")+1, datetime.length());
				
			}

			int day= Integer.parseInt(temp) ;
			if(day>1&&day<=10){
				dto.put("bit1", 0.5);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.2);
			}else if(day>10&&day<=20){
				
				dto.put("bit1", 0.3);
				dto.put("bit2", 0.5);
				dto.put("bit3", 0.2);
			}else{
				
				dto.put("bit1", 0.2);
				dto.put("bit2", 0.3);
				dto.put("bit3", 0.5);
			}
			dto.put("route", selectroute);
			
			
			List list = g4Reader.queryForList("Bus.countStddev", dto);
			return list;
		
		
	}
	
	/**
	 * 保存表格脏数据
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward saveDirtyDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		List list  = aForm.getGridDirtyData(request);
		for (int i = 0; i < list.size(); i++) {
			Dto dto = (BaseDto)list.get(i);
			System.out.println("脏数据:\n" + dto);
			//todo anything what u want
		}
		Dto outDto = new BaseDto();
		outDto.put("success", new Boolean(true));
		outDto.put("msg", "数据已提交到后台,但演示程序没有将其持久化到数据库.<br>" + request.getParameter("dirtydata"));
		super.write(outDto.toJson(), response);
		return mapping.findForward(null);
	}
	
	/**
	 * 周转时间预测报表展示
	 * 
	 * @param
	 * @return
	 */
	public ActionForward showBusTimeByReport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		//实例化一个图形配置对象
		GraphConfig graphConfig = new GraphConfig();
		//主标题
		graphConfig.setCaption("周转时间预测");
		//X坐标轴名称
		graphConfig.setXAxisName("时段");
		//数字值前缀
		graphConfig.setNumberPrefix("");
		//使用这种方式可以加入框架没有封装的原生报表属性,原生属可以参考《G4Studio开发指南》的相关章节
		//graphConfig.put("propertyName", "value");
        Dto qDto = new BaseDto();		
        qDto.put("product", "1");
        //查询原始数据
		
		List dataList = new ArrayList();
		//将原始数据对象转换为框架封装的Set报表数据对象
		
		//将图表数据转为Flash能解析的XML资料格式
		String xmlString = FcfDataMapper.toFcfXmlData(dataList, graphConfig);
		//此Key对应的<flashReport />标签的datavar属性
		request.setAttribute("xmlString", xmlString);
		return mapping.findForward("showbustimereportView");
	}
	
	/**
	 * 查询数据报表XML格式串
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryReportXmlDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String selectroute = dto.getAsString("selectroute");
		String updown_name = dto.getAsString("updown_name").equals("Down")?"下行":"上行";
		
		
		List list = getTimebyRoute(form,request);
		//实例化一个图形配置对象
		GraphConfig graphConfig = new GraphConfig();
		
		//主标题
		graphConfig.setCaption("周转时间预测 第:" + selectroute+" "+updown_name+" 路车");
		//X坐标轴名称
		graphConfig.setXAxisName("时段");
		//数字值前缀
		graphConfig.setNumberPrefix("");
		//使用这种方式可以加入框架没有封装的原生报表属性,原生属可以参考《G4Studio开发指南》的相关章节
		//graphConfig.put("propertyName", "value");
		List dataList = new ArrayList();
		//将原始数据对象转换为框架封装的Set报表数据对象
		for (int i = 0; i < list.size(); i++) {
			Dto dto1 = (BaseDto)list.get(i);
			//实例化一个图表元数据对象
			Set set = new Set();
			set.setName(dto1.getAsString("timenum")); //名称
			set.setValue(dto1.getAsString("avtime")); //数据值
			set.setColor(dto1.getAsString("color")); //柱状图颜色
			dataList.add(set);
		}
		//将图表数据转为Flash能解析的XML资料格式
		String xmlString = FcfDataMapper.toFcfXmlData(dataList, graphConfig);
		Dto outDto = new BaseDto();
		outDto.put("success", new Boolean(true));
		outDto.put("xmlstring", xmlString);
		write(JsonHelper.encodeObject2Json(outDto), response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 查询超速比例数据报表XML格式串
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryoverspeedReportXmlDatas(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String selectroute = dto.getAsString("selectroute");
		String updown_name = dto.getAsString("updown_name").equals("Down")?"下行":"上行";
		
		
		//实例化一个图形配置对象
				GraphConfig graphConfig = new GraphConfig();
				//主标题
				graphConfig.setCaption("超速比例");
				//设置数字值的前缀
				graphConfig.setNumberPrefix("");
				graphConfig.setShowNames(new Boolean(true));
				//使用这种方式可以加入框架没有封装的原生报表属性,原生属可以参考《开发指南》的相关章节
				//graphConfig.put("propertyName", "value");
		        Dto qDto = new BaseDto();		
		       
		        //查询原始数据
		        dto.put("bit1", 0);
		        dto.put("bit2", 0.1);
		        Integer rate1 = (Integer) g4Reader.queryForObject("Bus.countoverspeedbit", dto);
		        dto.put("bit1", 0.1);
		        dto.put("bit2", 0.2);
		        Integer rate2 = (Integer) g4Reader.queryForObject("Bus.countoverspeedbit", dto);
		        dto.put("bit1", 0.3);
		        dto.remove("bit2");
		        Integer rate3 = (Integer) g4Reader.queryForObject("Bus.countoverspeedbit", dto);
		        List dataList = new ArrayList();
		        
		        Set set1 = new Set();
				set1.setName("超速10%"); //名称
				set1.setValue(rate1.toString()); //数据值
				set1.setColor("AFD8F8"); //柱状图颜色
				set1.setIsSliced("0");//浮动
				Set set2 = new Set();
				set2.setName("超速20%"); //名称
				set2.setValue(rate2.toString()); //数据值
				set2.setColor("F6BD0F"); //柱状图颜色
				set2.setIsSliced("0");//浮动
				Set set3 = new Set();
				set3.setName("超速30%"); //名称
				set3.setValue(rate3.toString()); //数据值
				set3.setColor("red"); //柱状图颜色
				set3.setIsSliced("0");//浮动
				dataList.add(set1);
				dataList.add(set2);
				dataList.add(set3);
		       
		        
				//将原始数据对象转换为框架封装的Set报表数据对象
				
				//将图表数据转为Flash能解析的XML资料格式
				String xmlString = FcfDataMapper.toFcfXmlData(dataList, graphConfig);
				
		Dto outDto = new BaseDto();
		outDto.put("success", new Boolean(true));
		outDto.put("xmlstring", xmlString);
		write(JsonHelper.encodeObject2Json(outDto), response);
		return mapping.findForward(null);
	}
	
	
	
	
	
	
	
	/**
	 * 断面通过车次
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busSectionRunsInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busSectionRunsInitView");
	}

	/**
	 * 线路运行大间隔识别与统计
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busPeakInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return mapping.findForward("busPeakInitView");
	}

	/**
	 * 串车发现
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busChuanInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		return mapping.findForward("busChuanInitView");
	}

	/**
	 * 全天班次完成率
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busCompletionDayInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busCompletionDayInitView");
	}

	/**
	 * 高峰班次完成率
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busCompletionPeakInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busCompletionPeakInitView");
	}

	/**
	 * 平峰间隔验证
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busSpaceTestInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busSpaceTestInitView");
	}

	/**
	 * 高峰间隔验证
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busPeakSpaceTestInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busPeakSpaceTestInitView");
	}
	
	
	
	
	/**
	 * 高峰班次执行情况查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusCompletionPeak(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List routeList = g4Reader.queryForList("Bus.queryRouteByCompany", dto);
		List list = new ArrayList();
		for (int r = 0; r < routeList.size(); r++) {
			Dto dtor = (BaseDto) routeList.get(r);
			String routeid = dtor.getAsString("text");
			String date = dto.getAsString("date");
			dto.put("routeid", routeid);
			// 早高峰
			int runs = 0;
			int runscount = 0;
			List areaList = g4Reader.queryForList("Bus.queryBusPeakM", dto);
			for (int i = 0; i < areaList.size(); i++) {
				Dto d = (Dto) areaList.get(i);
				String m_start = d.getAsString("m_start");
				String m_end = d.getAsString("m_end");
				runs += Integer.parseInt(d.getAsString("runs").equals("") ? "0"
						: d.getAsString("runs"));
				dto.put("m_start", m_start);
				dto.put("m_end", m_end);
				List mlist = g4Reader.queryForList("Bus.queryBusPeakMCount",
						dto);
				for (int j = 0; j < mlist.size(); j++) {
					Dto dm = (Dto) mlist.get(j);
					runscount += Integer.parseInt(dm.getAsString("runscount")
							.equals("") ? "0" : dm.getAsString("runscount"));
				}
			}
			Dto outDto = new BaseDto();
			outDto.put("date", date);
			outDto.put("routeid", routeid);
			outDto.put("runs", runs);
			outDto.put("runscount", runscount);
			if (runscount == 0) {
				outDto.put("runsrate", 0);
			} else {
				outDto.put("runsrate", (new Float(runs))
						/ (new Float(runscount)) + "%");
			}
			list.add(outDto);
		}
		String jsonString = JsonHelper.encodeObject2Json(list);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 全天班次执行情况查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusCompletionDay(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List routeList = g4Reader.queryForList("Bus.queryRouteByCompany", dto);
		List list = new ArrayList();
		for (int r = 0; r < routeList.size(); r++) {
			Dto dtor = (BaseDto) routeList.get(r);
			String routeid = dtor.getAsString("text");
			String date = dto.getAsString("date");
			dto.put("routeid", routeid);

			int runs_day = 0;
			int runscount = 0;
			List areaList = g4Reader.queryForList("Bus.queryBusDay", dto);
			for (int i = 0; i < areaList.size(); i++) {
				Dto d = (Dto) areaList.get(i);
				runs_day += Integer.parseInt(d.getAsString("runs_day").equals(
						"") ? "0" : d.getAsString("runs_day"));
				List daylist = g4Reader.queryForList("Bus.queryBusDayCount",
						dto);
				for (int j = 0; j < daylist.size(); j++) {
					Dto dm = (Dto) daylist.get(j);
					runscount += Integer.parseInt(dm.getAsString("runscount")
							.equals("") ? "0" : dm.getAsString("runscount"));
				}
			}
			Dto outDto = new BaseDto();
			outDto.put("date", date);
			outDto.put("routeid", routeid);
			outDto.put("runs", runs_day);
			outDto.put("runscount", runscount);
			if (runscount == 0) {
				outDto.put("runsrate", 0);
			} else {
				outDto.put("runsrate", (new Float(runs_day))
						/ (new Float(runscount)) + "%");
			}
			list.add(outDto);
		}
		String jsonString = JsonHelper.encodeObject2Json(list);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 平峰发车间隔
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusSpaceTest(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Bus.queryBusPeakM", dto);
		String flat_start = "";
		String flat_end = "";
		String avg = "";
		System.out.println(areaList.toString());
		for (int i = 0; i < areaList.size(); i++) {
			Dto d = (Dto) areaList.get(i);
			if (i == 0) {
				flat_start = d.getAsString("m_end");
			} else {
				flat_end = d.getAsString("m_start");
				avg = d.getAsString("avg");
			}
		}

		dto.put("flat_start", dto.getAsString("date") + " " + flat_start);
		dto.put("flat_end", dto.getAsString("date") + " " + flat_end);
		List avglist = g4Reader.queryForList("Bus.queryBusSpaceAvg", dto);
		for (int i = 0; i < avglist.size(); i++) {
			Dto dtoavg = (Dto) avglist.get(i);
			String jiange = dtoavg.getAsString("jiange");
			dtoavg.put("date", dto.getAsString("date"));
			if (jiange.equals("")) {
				dtoavg.put("jiange", " ");
				dtoavg.put("qualified", " ");
				dtoavg.put("diff", " ");
			} else {
				System.out.println(jiange);
				String[] jianges = jiange.split(":");
				String jiangestring = jianges[1].replaceAll("0", "")
						+ "."
						+ (Double.parseDouble(jianges[2]) / 60 + "")
								.replaceAll("0.", "");
				dtoavg.put("jiange", jiangestring);
				Double diff = Double.parseDouble(jiangestring)
						- Double.parseDouble(avg);
				String qualified = "不合格";
				if (diff > 0) {
					qualified = "合格";
				}
				dtoavg.put("avg", avg);
				dtoavg.put("qualified", qualified);
				dtoavg.put("diff", diff);
			}

		}
		System.out.println(avglist.toString());
		String jsonString = JsonHelper.encodeObject2Json(avglist);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 高峰间隔验证
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusPeakSpaceTest(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		List areaList = g4Reader.queryForList("Bus.queryBusPeakM", dto);
		String flat_start = "";
		String flat_end = "";
		String peakavg = "";
		for (int i = 0; i < areaList.size(); i++) {
			Dto d = (Dto) areaList.get(i);
			if (i == 1) {
				peakavg = d.getAsString("peakavg");
			}
		}
		List resultlist = new ArrayList();
		for (int i = 0; i < areaList.size(); i++) {
			Dto d = (Dto) areaList.get(i);
			dto.put("flat_start",
					dto.getAsString("date") + " " + d.getAsString("m_start"));
			dto.put("flat_end",
					dto.getAsString("date") + " " + d.getAsString("m_end"));
			List avglist = g4Reader.queryForList("Bus.queryBusSpaceAvg", dto);
			for (int j = 0; j < avglist.size(); j++) {
				Dto dtoavg = (Dto) avglist.get(j);
				String jiange = dtoavg.getAsString("jiange");
				dtoavg.put("date", dto.getAsString("date"));
				if (jiange.equals("")) {
					dtoavg.put("jiange", " ");
					dtoavg.put("qualified", " ");
					dtoavg.put("diff", " ");
				} else {
					System.out.println(jiange);
					String[] jianges = jiange.split(":");
					String jiangestring = jianges[1].replaceAll("0", "")
							+ "."
							+ (Double.parseDouble(jianges[2]) / 60 + "")
									.replaceAll("0.", "");
					dtoavg.put("jiange", jiangestring);
					Double diff = Double.parseDouble(jiangestring)
							- Double.parseDouble(peakavg);
					String qualified = "不合格";
					if (diff > 0) {
						qualified = "合格";
					}
					dtoavg.put("avg", peakavg);
					dtoavg.put("qualified", qualified);
					dtoavg.put("diff", diff);
				}
				resultlist.add(dtoavg);
			}
		}
		String jsonString = JsonHelper.encodeObject2Json(resultlist);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 线路运行大间隔识别与统计
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busPeak_View(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);String updown_name = dto.getAsString("updown_name");// 峰期
		String plan_name = dto.getAsString("plan_name");
		List areaList = null;
		if ("1".equals(updown_name)) {
			if ("1".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewG_A", dto);
			} else if ("2".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewG_B", dto);
			} else if ("3".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewG_C", dto);
			}
		} else if ("0".equals(updown_name)) {
			if ("1".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewP_A", dto);
			} else if ("2".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewP_B", dto);
			} else if ("3".equals(plan_name)) {
				areaList = g4Reader.queryForList("Bus.querybuspeakviewP_C", dto);
			}
		}

		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 串车发现
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busChuanView(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.querybuschuanview", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 断面车次通过率
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusSectionRuns(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryBusSectionRuns", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
