package org.bus.runtime.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;

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
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;
import org.g4studio.core.web.report.fcf.Categorie;
import org.g4studio.core.web.report.fcf.CategoriesConfig;
import org.g4studio.core.web.report.fcf.DataSet;
import org.g4studio.core.web.report.fcf.FcfDataMapper;
import org.g4studio.core.web.report.fcf.GraphConfig;
import org.g4studio.core.web.report.fcf.Set;

public class BusSpeedAction extends BizAction {
	
	
	/**
	 * 车辆使用率统计初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busUseInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("busUseInitInitView");
	}
	
	/**
	 *  second    车辆使用率统计初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward secondbusUseInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("secondbusUseInitView");
	}
	
	
	
	/**
	 * 班次执行情况初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward bancizhixingInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("bancizhixingInitiew");
	}
	
	/**
	 * 班次执行情况初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward bancijiangenewInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("bancijiangenewInitview");
	}
	
	/**
	 * 车辆班次统计初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward bustourInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("bustourInitInitView");
	}
	
	/**
	 * 线路速度排序初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward topspeedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("topspeedInitView");
	}
	
	
	/**
	 * 停靠时间异常初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward stoptimeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("stoptimeInitView");
	}
	
	/**
	 * 路堵初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward roadblockedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("roadblockedInitView");
	}
	
	/**
	 * 常发路堵初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward commonroadblockedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("commonroadblockedInitView");
	}
	
	
	/**
	 * 班次间隔初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward bancijiangeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("bancijiangeInitView");
	}
	
	/**
	 * 线路速度统计初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward routespeedInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("routespeedInitView");
	}
	
	
	/**
	 * 车辆使用率统计数量
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querybusUse(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" 00:00:30" ;
		String datetime2= datetime+" 23:00:30" ;
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		List list = g4Reader.queryForList("Bus.querybusUse", dto);
		
		String jsonString = JsonHelper.encodeObject2Json(list);
		
		
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 车辆使用率统计数量
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querybusUseRecord(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" 00:00:30" ;
		String datetime2= datetime+" 23:00:30" ;
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		List list = g4Reader.queryForList("Bus.querybusUserecord", dto);
		
		String proid="";
		for(int i=0;i<list.size();i++){
			Dto tmp =(Dto) list.get(i);
			proid= proid+tmp.getAsString("productid")+" ";
			
		}
		Dto formdata = new BaseDto();	
		formdata.put("route", dto.getAsString("route"));
		formdata.put("pids", proid);
		
		String jsonString = JsonHelper.encodeDto2FormLoadJson(formdata, null);
		
		
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
	public ActionForward querybustour(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		List list =g4Reader.queryForPage("Bus.querybustour", dto);
		
		Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countquerybustour", dto);
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	public ActionForward querybustourReportbak(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String selectroute = dto.getAsString("selectroute");
		String updown_name = dto.getAsString("updown_name").equals("Down")?"下行":"上行";
		List list =g4Reader.queryForList("Bus.querybustourReport", dto);
		
		
		
		CategoriesConfig categoriesConfig = new CategoriesConfig();
		List cateList = new ArrayList();
		
		
		
		List dataList = new ArrayList();
		//实例化一个图形配置对象
				GraphConfig graphConfig = new GraphConfig();
				
				//主标题
				graphConfig.setCaption("班次统计 第:" + selectroute+" "+updown_name+" 路车");
				//X坐标轴名称
				graphConfig.setXAxisName("时段");
				//数字值前缀
				graphConfig.setNumberPrefix("");
				//使用这种方式可以加入框架没有封装的原生报表属性,原生属可以参考《G4Studio开发指南》的相关章节
				//graphConfig.put("propertyName", "value");
				List dataList1 = new ArrayList();
				
				
				DataSet dataSet1 = new DataSet();
				dataSet1.setSeriesname("班次执行次数");
				dataSet1.setColor("FDC12E");
				
				//将原始数据对象转换为框架封装的Set报表数据对象
				for (int i = 0; i < list.size(); i++) {
					Dto dto1 = (BaseDto)list.get(i);
					//实例化一个图表元数据对象
					Set set = new Set();
					//set.setName(dto1.getAsString("hour")); //名称
					
					cateList.add(new Categorie(dto1.getAsString("hour")));
					
					
					set.setValue(dto1.getAsString("num")); //数据值
					
					dataList1.add(set);
				}
				
				dataSet1.setData(dataList1);
				dataList.add(dataSet1);
				
				categoriesConfig.setCategories(cateList);
				
				List dataList2 = new ArrayList();
				
				
				DataSet dataSet2 = new DataSet();
				dataSet2.setSeriesname("班次累加数");
				dataSet2.setColor("FDC12E");
				int total=0;
				//将原始数据对象转换为框架封装的Set报表数据对象
				for (int i = 0; i < list.size(); i++) {
					Dto dto1 = (BaseDto)list.get(i);
					//实例化一个图表元数据对象
					Set set = new Set();
					//set.setName(dto1.getAsString("hour")); //名称
					
					total=total+ dto1.getAsInteger("num");
					set.setValue(total+""); //数据值
					
					dataList2.add(set);
				}
				
				dataSet2.setData(dataList2);
				dataList.add(dataSet2);
				
				
				
				
				//将图表数据转为Flash能解析的XML资料格式
				String xmlString = FcfDataMapper.toFcfXmlData(dataList, graphConfig,categoriesConfig);
				Dto outDto = new BaseDto();
				outDto.put("success", new Boolean(true));
				outDto.put("xmlstring", xmlString);
				System.out.println("<<<<<<<<<<<<<<<");
				//write(JsonHelper.encodeObject2Json(outDto), response);
				request.setAttribute("xmlString", xmlString);
		return mapping.findForward("querybustourReportInitView");
	}
	
	
	
	public ActionForward querybustourReport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String selectroute = dto.getAsString("selectroute");
		//String updown_name = dto.getAsString("updown_name").equals("Down")?"下行":"上行";
		dto.put("upordown", "1");
		List list =g4Reader.queryForList("Bus.querybustourReport", dto);
		dto.put("upordown", "3");
		List list1 =g4Reader.queryForList("Bus.querybustourReport", dto);
		
		String da= dto.getAsString("datetime");
		String[] ee = new String[3];
		ee=da.split("-");
		dto.put("datetime", ee[0]+"-"+ee[1]+"-1");
		List list2 =g4Reader.queryForList("Bus.getbanciplan", dto);
		String re ="";
		String re1 ="";
		for(int i=0;i<list2.size();i++){
			Dto d =(Dto) list2.get(i);
			String[] arr = new String[3];
			String ph = d.getAsString("m_start");
			arr=ph.split(":");
			int h= Integer.parseInt(arr[0]);
			int m= Integer.parseInt(arr[1]);
			
			String[] arr1 = new String[3];
			String ph1 = d.getAsString("m_end");
			arr1=ph1.split(":");
			int h1= Integer.parseInt(arr1[0]);
			int m1= Integer.parseInt(arr1[1]);
			
			
			String count = d.getAsString("runs");
			if(i==0){
				re=re+h+"."+arr[1]+","+count+"|";
				re=re+h1+"."+arr1[1]+","+count+"|";
			}else{
				re1=re1+h+"."+arr[1]+","+count+"|";
				re1=re1+h1+"."+arr1[1]+","+count+"|";
			}
			
			
		}
		
		String restr1= getStringDataFromList(list);
		String restr2= getStringDataFromList(list1);
		
		super.write(restr1+"*"+restr2+"*"+re+"*"+re1, response);
		return mapping.findForward("querybustourReportInitView");
	}
	
	
	public ActionForward queryspeedtop(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String timearea = dto.getAsString("updown_name");
		
		String timeinterval1 = "";
		String timeinterval2 = "";
		
		if(timearea.equals("1")){
			timeinterval1="3";
			timeinterval2="8";
			
		}else if(timearea.equals("2")){
			timeinterval1="9";
			timeinterval2="23";
			
		}else{
			
			timeinterval1="23";
			timeinterval2="28";
		}
		
		
		dto.put("timeinterval1", timeinterval1);
		dto.put("timeinterval2", timeinterval2);
		//String updown_name = dto.getAsString("updown_name").equals("Down")?"下行":"上行";
		dto.put("UporDown", "Down");
		List list =g4Reader.queryForList("Bus.queryroutespeedtop", dto);
		dto.put("UporDown", "Up");
		List list1 =g4Reader.queryForList("Bus.queryroutespeedtop", dto);
		

		list.addAll(list1);
		
		Collections.sort(list,new TopSpeedComparetor());
		List re = list.subList(0, 9);
		String jsonString = JsonHelper.encodeObject2Json(list, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward("querybustourReportInitView");
	}
	
	
	
	
	public String getStringDataFromList(List list) throws ParseException{
		String re="";String re1="";
		int total=0;
		
		SimpleDateFormat format =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" );

	      
	       //System.out.println("dd "+date.getTime());
		for(int i=0;i<list.size();i++){
			
			Dto d = (Dto) list.get(i);
			String hour= d.getAsString("hour");
			 //String time="2014-01-06 "+hour+":00:00";

		      //Date date = format.parse(time);
		      //hour=date.getTime()+"";
			String num= d.getAsString("num");
			total=total+ d.getAsInteger("num");
			re=re+hour+","+num+"|";
			
			re1=re1+hour+","+total+"|";
		}
		
		if(re!=null&&!re.equals("")){
			re = re.substring(0, re.length()-1);
			re1 = re1.substring(0, re1.length()-1);
			
		}
		return re+"*"+re1;
	}
	
	
	/**
	 * 获取班次统计的元数据 (折线组合图)
	 * @param pDto
	 * @return
	 */
	private List getFcfDataList4LineGroup(Dto pDto){
		pDto.put("fcfid", "12");
		List dataList = new ArrayList();
		DataSet dataSet1 = new DataSet();
		dataSet1.setSeriesname("班次执行次数");
		dataSet1.setColor("FDC12E");
		pDto.put("product", "1");
		List alist = g4Reader.queryForList("Demo.getFcfDataList", pDto);;
		List aSetList = new ArrayList();
		for (int i = 0; i < alist.size(); i++) {
			Dto dto = (BaseDto)alist.get(i);
			Set set = new Set();
			set.setValue(dto.getAsString("value"));
			aSetList.add(set);
		}
		dataSet1.setData(aSetList);
		dataList.add(dataSet1);
		
		DataSet dataSet2 = new DataSet();
		dataSet2.setSeriesname("班次执行累加次数");
		dataSet2.setColor("44BC2F");
		pDto.put("product", "2");
		List blist = g4Reader.queryForList("Demo.getFcfDataList", pDto);
		List bSetList = new ArrayList();
		for (int i = 0; i < blist.size(); i++) {
			Dto dto = (BaseDto)blist.get(i);
			Set set = new Set();
			set.setValue(dto.getAsString("value"));
			bSetList.add(set);
		}
		dataSet2.setData(bSetList);
		dataList.add(dataSet2);
		return dataList;
	}
	
	
	public ActionForward queryroutespeed(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryroutespeed", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList,G4Constants.FORMAT_Date);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	public ActionForward queryroutespeedreport(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryroutespeed", dto);
		
		String re="";String re1="";
		
		for(int i=0;i<areaList.size();i++){
			
			Dto d = (Dto) areaList.get(i);
			String time = d.getAsString("timeinterval");
			
			String speed = d.getAsString("standspeed");
			if(speed.equals("")){
				
				speed="22.1";
			}
			speed=speed.substring(0, speed.indexOf("."));
			String avspeed = d.getAsString("avspeed");
			
			if(avspeed.equals("")){
				speed="25";
				
			}
			avspeed=avspeed.substring(0, avspeed.indexOf("."));
			//avspeed="20";
			re=re+time+","+speed+"|";
			re1=re1+time+","+avspeed+"|";
			
		}
		
		super.write(re+"*"+re1, response);
		
		
		return mapping.findForward(null);
	}
	
	
	
	/**
	 * 停靠时间异常分页
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querystoptime(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" 00:00:30" ;
		String datetime2= datetime+" 23:00:30" ;
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		List list =g4Reader.queryForList("Bus.querystoptime", dto);
		
		
		String jsonString = JsonHelper.encodeObject2Json(list,  G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 路堵查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryroadblocked(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" 00:00:30" ;
		String datetime2= datetime+" 23:00:30" ;
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		List list =g4Reader.queryForList("Bus.queryroadblocked", dto);
		
		
		String jsonString = JsonHelper.encodeObject2Json(list,  G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 常发路堵查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querycommonroadblocked(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" 00:00:30" ;
		String datetime2= datetime+" 23:00:30" ;
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		
		Dto sites =(Dto) getServlet().getServletContext().getAttribute("siteNameList");
		
		Dto timesection =(Dto) getServlet().getServletContext().getAttribute("timesection");
		List list =g4Reader.queryForList("Bus.querycommonroadblocked", dto);
		
		for(int i=0;i<list.size();i++){
			Dto t = (Dto) list.get(i);
			t.put("uniquenumpro", sites.get(t.get("uniquenumpro")));
			
			t.put("uniquenum", sites.get(t.get("uniquenum")));
			
			
//			if(t.get("timeinterval")==null||t.get("timeinterval").equals("null")){
//				int times= (int) (Math.random() * 10);
//				t.put("timeinterval", timesection.get(times+"T"));
//			}
//			else
//			
//			t.put("timeinterval", timesection.get(t.get("timeinterval")+"T"));
			
		}
		String jsonString = JsonHelper.encodeObject2Json(list,  G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 班次间隔查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querybancijiange(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String[] ee = new String[2];
		
		String selectroutetime = dto.getAsString("selectroutetime");
		String updown_name = dto.getAsString("updown_name").equals("Down")?"1":"3";
		dto.put("updown_name", updown_name);
		
		ee=selectroutetime.split("-");
		
		String datetime= dto.getAsString("datetime");
		String datetime1=datetime+" "+ee[0] ;
		String datetime2= datetime+" "+ee[1] ;
		
		
		
		dto.put("datetime1", datetime1);
		dto.put("datetime2", datetime2);
		Integer countInteger = (Integer) g4Reader.queryForObject("Bus.countgetbancijiange", dto);
		List list =g4Reader.queryForPage("Bus.getbancijiange", dto);
		
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 班次执行分页
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querybancizhixing(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String updown_name = dto.getAsString("updown_name").equals("Down")?"1":"3";
		dto.put("updown_name", updown_name);
		List list =g4Reader.queryForPage("BusNew.querybancizhixing", dto);
		
		Integer countInteger = (Integer) g4Reader.queryForObject("BusNew.countbancizhixing", dto);
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	/**
	 * 班次执行分页
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querybancijiangenew(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		int start = dto.getAsInteger("start");
		int limit = dto.getAsInteger("limit");
		String updown_name = dto.getAsString("updown_name").equals("Down")?"1":"3";
		dto.put("updown_name", updown_name);
		List list ;
		
		if(start>0){
			start=start-1;
			limit=limit+1;
			list=g4Reader.queryForPage("BusNew.querybancizhixingorderBytime", dto);
			for(int i=1;i<list.size();i++){
				
				Dto cur =  (Dto) list.get(i);
				Dto pre =  (Dto) list.get(i-1);
				
				String timecur = cur.getAsString("time");
				String timepre = pre.getAsString("time");
				
				cur.put("cha", compareTime(timepre,timecur));
				
				
			}
			//list = list.subList(1, list.size());
			
			
			
		}else {
			
			list =g4Reader.queryForPage("BusNew.querybancizhixingorderBytime", dto);
			for(int i=1;i<list.size();i++){
				
				Dto cur =  (Dto) list.get(i);
				Dto pre =  (Dto) list.get(i-1);
				
				String timecur = cur.getAsString("time");
				String timepre = pre.getAsString("time");
				
				cur.put("cha", compareTime(timepre,timecur));
				
				
			}
		}
		
		
		
		Integer countInteger = (Integer) g4Reader.queryForObject("BusNew.countbancizhixing", dto);
		
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger, G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	public String compareTime(String begintime,String endtime) throws ParseException{
		 SimpleDateFormat dfs = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		   java.util.Date begin=dfs.parse("2004-01-02 "+begintime);

		   java.util.Date end = dfs.parse("2004-01-02 "+endtime);
		   
		   long l=end.getTime()-begin.getTime();

		   long day=l/(24*60*60*1000);

		   long hour=(l/(60*60*1000)-day*24);

		   long min=((l/(60*1000))-day*24*60-hour*60);

		   long s=(l/1000-day*24*60*60-hour*60*60-min*60);

//		   long between=(end.getTime()-begin.getTime())/1000;//除以1000是为了转换成秒
//
//		   long day1=between/(24*3600);
//
//		   long hour1=between%(24*3600)/3600;
//
//		   long minute1=between%3600/60;
//
//		   long second1=between%60/60;
		   String re="";
		   if(day>0){
			   re= re+day+"天";
		   }
		   if(hour>0){
			   re= re+hour+"小时";
		   }
		   if(min>0){
			   re= re+min+"分钟"; 
		   }
		   if(s>0){
			   re= re+s+"秒";
		   }
		    
		
		return re;
	}
	
}
