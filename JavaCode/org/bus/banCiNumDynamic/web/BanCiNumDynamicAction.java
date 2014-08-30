package org.bus.banCiNumDynamic.web;

import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;

public class BanCiNumDynamicAction extends BizAction {
	
	
	
	// 分等级加载线路
		public ActionForward queryrouteDatasByClass(ActionMapping mapping,
				ActionForm form, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			System.out.println(dto.toString());
			// loginuserid
			List areaList1 = g4Reader.queryForList(
					"BanCiNumDynamic.queryloginusersdeptid", dto);
			Dto d = (Dto) areaList1.get(0);
			String deptid = d.getAsString("deptid");
			List areaList = null;
			
			System.out.println(deptid.length());

			if ("001".equals(deptid)) {
				areaList = g4Reader.queryForList("BanCiNumDynamic.queryrouteDatas", dto);
			} else if (deptid.length() == 6) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryrouteDatasByClassCompany", dto);
			} else if (deptid.length() == 9) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryrouteDatasByClassTeam", dto);
			}
			String jsonString = JsonHelper.encodeObject2Json(areaList);
			write(jsonString, response);
			return mapping.findForward(null);
		}
	
	
	
	
	// 分等级加载路队
		public ActionForward queryteamDatasByClass(ActionMapping mapping,
				ActionForm form, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			System.out.println(dto.toString());
			// loginuserid
			List areaList1 = g4Reader.queryForList(
					"BanCiNumDynamic.queryloginusersdeptid", dto);
			Dto d = (Dto) areaList1.get(0);
			String deptid = d.getAsString("deptid");
			List areaList = null;
			System.out.println(deptid.length());

			if ("001".equals(deptid)) {
				areaList = g4Reader.queryForList("BanCiNumDynamic.queryteamDatas", dto);
			} else if (deptid.length() == 6) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList("BanCiNumDynamic.queryteamDatas", dto);
			} else if (deptid.length() == 9) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryTeamDatasByClassTeam", dto);
			}
			String jsonString = JsonHelper.encodeObject2Json(areaList);
			write(jsonString, response);
			return mapping.findForward(null);
		}
	
	
	
	
	// 分等级加载公司
		public ActionForward queryCompanyDatasByClass(ActionMapping mapping,
				ActionForm form, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			
			
			// loginuserid
			List areaList1 = g4Reader.queryForList(
					"BanCiNumDynamic.queryloginusersdeptid", dto);
			Dto d = (Dto) areaList1.get(0);
			String deptid = d.getAsString("deptid");

			List areaList = null;
			if ("001".equals(deptid)) {
				areaList = g4Reader.queryForList("BanCiNumDynamic.queryCompanyDatas", dto);
			} else {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryCompanyDatasByClass", dto);
			}
			
			String jsonString = JsonHelper.encodeObject2Json(areaList);
			write(jsonString, response);
			return mapping.findForward(null);
		}
		
		
		
		
		
		
		
	//线路班次实时查询
	public ActionForward queryBanciNumDynamic4Route(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
	
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String routeId = dto.getAsString("routeId");
		
		Date now = new Date();
		DateFormat allFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
		DateFormat dateFormat4Month = new SimpleDateFormat("yyyy-MM");//2014-09
		DateFormat dateFormat4Day = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
		DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00
		
		//获取当前系统时间
		String date4Plan = dateFormat4Month.format(now); //2014-09
		String date4Bancitj = dateFormat4Day.format(now);//2014-09-01
		String currentTime = timeFormat.format(now);//11:29:07
		
		//获取比当前时间提前的一个时间点
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) - 5);//5秒之前
		String preCurrent =  timeFormat.format(calendar.getTime());
		
		Map map = new HashMap<String,String>();
		map.put("routeId", routeId);
		
		//测试更改
//		date4Plan = "2014-09";
		map.put("date", date4Plan);
		//查询该线路车的高峰时间段
		List areaList = null;
		List areaListResult = null;
		
		
		areaList = g4Reader.queryForList("BanCiNumDynamic.queryBusBanciExcuteDuring", map);
		
		String jsonString = "{}";
		
		String ZGFSTime="";
		String ZGFETime="";
		String ZWTime = "12:00:00";
		String WGFSTime="";
		String WGFETime="";
		String WDFETime = "23:00:00";
		
		int num = 0;//查询实时车辆总数
		int duringNum = 0;//查询累计车辆总数
		int zdNum = 0;//查询早低峰值
		int zgNum = 0;//查询早高峰值
		int swpNum = 0;//查询上午平峰值
		int xwpNum = 0;//查询下午平峰值
		int wgNum = 0;//查询晚高峰值
		int wdNum = 0;//查询晚低峰值
		
		if( areaList!=null && areaList.size()!=0 ){
			
			//得到高峰时间段
			Map GF1 =  (Map) areaList.get(0);
			Map GF2 =  (Map) areaList.get(1);
			String gf1 =  (String) GF1.get("gf");
			String gf2 =  (String) GF2.get("gf");
			
			java.sql.Time tmp = (Time) GF1.get("stime");
			
			if(tmp != null){
				if(gf1.equals("1")){
					
					java.sql.Time tmp1 = (Time) GF1.get("stime");
					java.sql.Time tmp2 = (Time)GF1.get("etime");
					
					ZGFSTime =  tmp1.toString();
					ZGFETime =  tmp2.toString();
					
				}else{
					
					java.sql.Time tmp1 = (Time) GF1.get("stime");
					java.sql.Time tmp2 = (Time)GF1.get("etime");
					
					WGFSTime = tmp1.toString();
					WGFETime = tmp2.toString();
				}
				
				if(gf2.equals("2")){
					
					java.sql.Time tmp1 = (Time)GF2.get("stime");
					java.sql.Time tmp2 = (Time)GF2.get("etime");
					
					WGFSTime = tmp1.toString();
					WGFETime = tmp2.toString();
					
				}else{
					java.sql.Time tmp1 = (Time)GF2.get("stime");
					java.sql.Time tmp2 = (Time)GF2.get("etime");
					
					ZGFSTime = tmp1.toString();
					ZGFETime = tmp2.toString();
				}
				
				
				
				//字符串处理
				Date current = timeFormat.parse(currentTime.toString());
				
				Date zgstime = timeFormat.parse(ZGFSTime.toString());
				Date zgetime = timeFormat.parse(ZGFETime.toString());
				Date wgstime = timeFormat.parse(WGFSTime.toString());
				Date wgetime = timeFormat.parse(WGFETime.toString());
				Date zwtime = timeFormat.parse(ZWTime.toString());
				Date wdetime = timeFormat.parse(WDFETime.toString());
				
				//
				Map timeMap = new HashMap();
				Map duringMap = new HashMap();
				List areaListTmp = null;
				
				if(current.before(zgstime) ){//查询实时的  小于  zgstime
					
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime","04:00:00");
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
					
				}else if(current.before(zgetime)){//查询早低峰
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);//
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",ZGFSTime);//
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
					
				}else if(current.before(zwtime)){//查询早低峰+早高峰+实时
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					//早高峰值
					Map zgParam = new HashMap();
					zgParam.put("routeId", routeId);
					zgParam.put("date", date4Bancitj);
					zgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",ZGFETime);
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
				}else if(current.before(wgstime)){//查询早低峰+早高峰+上午平峰+实时
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					//早高峰值
					Map zgParam = new HashMap();
					zgParam.put("routeId", routeId);
					zgParam.put("date", date4Bancitj);
					zgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
					
					
					//上午平峰
					Map swpParam = new HashMap();
					swpParam.put("routeId", routeId);
					swpParam.put("date", date4Bancitj);
					swpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
					
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",ZWTime);
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
					
				}else if(current.before(wgetime)){//查询早低峰+早高峰+上午平峰+下午平峰+实时
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					
					//早高峰值
					Map zgParam = new HashMap();
					zgParam.put("routeId", routeId);
					zgParam.put("date", date4Bancitj);
					zgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
					
					
					//上午平峰
					Map swpParam = new HashMap();
					swpParam.put("routeId", routeId);
					swpParam.put("date", date4Bancitj);
					swpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
					
					
					//下午平峰
					Map xwpParam = new HashMap();
					xwpParam.put("routeId", routeId);
					xwpParam.put("date", date4Bancitj);
					xwpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
					
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",WGFSTime);
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
				}else if(current.before(wdetime)){//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+实时
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					
					//早高峰值
					Map zgParam = new HashMap();
					zgParam.put("routeId", routeId);
					zgParam.put("date", date4Bancitj);
					zgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
					
					
					//上午平峰
					Map swpParam = new HashMap();
					swpParam.put("routeId", routeId);
					swpParam.put("date", date4Bancitj);
					swpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
					
					
					//下午平峰
					Map xwpParam = new HashMap();
					xwpParam.put("routeId", routeId);
					xwpParam.put("date", date4Bancitj);
					xwpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
					
					//晚高峰
					Map wgParam = new HashMap();
					wgParam.put("routeId", routeId);
					wgParam.put("date", date4Bancitj);
					wgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
					
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",WGFETime);
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
				}else {//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+晚低峰+实时
					//查询早低峰
					Map zdParam = new HashMap();
					zdParam.put("routeId", routeId);
					zdParam.put("date", date4Bancitj);
					zdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
					
					
					//早高峰值
					Map zgParam = new HashMap();
					zgParam.put("routeId", routeId);
					zgParam.put("date", date4Bancitj);
					zgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
					System.out.println("zgNum:"+zgNum);
					
					
					//上午平峰
					Map swpParam = new HashMap();
					swpParam.put("routeId", routeId);
					swpParam.put("date", date4Bancitj);
					swpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
					
					
					//下午平峰
					Map xwpParam = new HashMap();
					xwpParam.put("routeId", routeId);
					xwpParam.put("date", date4Bancitj);
					xwpNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
					System.out.println("xwpNum:"+xwpNum);
					
					//晚高峰
					Map wgParam = new HashMap();
					wgParam.put("routeId", routeId);
					wgParam.put("date", date4Bancitj);
					wgNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
					
					
					//晚低峰
					Map wdParam = new HashMap();
					wdParam.put("routeId", routeId);
					wdParam.put("date", date4Bancitj);
					wdNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWDWCNum",wdParam);
					
					
					//查询动态
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					num = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime",WDFETime);
					duringMap.put("endTime",currentTime);
					duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
					
				}
			}
			
		}else{
			
			System.out.println("该数据库中没有该辆车的信息！！！");
			
		}
		
		
		Map result = new HashMap();
		result.put("num", num);
		result.put("duringNum",duringNum);
		result.put("currentTime", currentTime);
		result.put("zdNum",zdNum);
		result.put("ZGFSTime", ZGFSTime);
		result.put("zgNum",zgNum);
		result.put("ZGFETime",ZGFETime);
		result.put("swpNum",swpNum);
		result.put("ZWTime",ZWTime);
		result.put("xwpNum",xwpNum);
		result.put("WGFSTime",WGFSTime);
		result.put("wgNum",wgNum);
		result.put("WGFETime",WGFETime);
		result.put("wdNum", wdNum);
		result.put("WDFETime", WDFETime);
		
		jsonString = JsonHelper.encodeObject2Json(result);
		
		
		write(jsonString,response);
		
		return mapping.findForward(null);
		
	}
	
	
	//路队班次实时查询
	public ActionForward queryBanciNumDynamic4Team(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		//获得一系列的routeId
		Dto dto = aForm.getParamAsDto(request);
		String deptid = dto.getAsString("teamId");
		
//		System.out.println("!!!!!!deptid:"+deptid);
		//按照路队查询出routeId，循环计算
		
		List areaList = null;
		
		if ("001".equals(deptid)) {
			areaList = g4Reader.queryForList("BanCiNumDynamic.queryrouteDatas", dto);
		} else if (deptid.length() == 6) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BanCiNumDynamic.queryrouteDatasByClassCompany", dto);
		} else if (deptid.length() == 9) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BanCiNumDynamic.queryrouteDatasByClassTeam", dto);
		}
		
		
		int num = 0;//查询实时车辆总数
		int duringNum = 0;//查询实时累计总数
		int zdNum = 0;//查询早低峰值
		int zgNum = 0;//查询早高峰值
		int swpNum = 0;//查询上午平峰值
		int xwpNum = 0;//查询下午平峰值
		int wgNum = 0;//查询晚高峰值
		int wdNum = 0;//查询晚低峰值
		
		String ZGFSTime="";
		String ZGFETime="";
		String ZWTime = "12:00:00";
		String WGFSTime="";
		String WGFETime="";
		String WDFETime = "23:00:00";
		
		Date now = new Date();
		DateFormat allFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
		DateFormat dateFormat4Month = new SimpleDateFormat("yyyy-MM");//2014-09
		DateFormat dateFormat4Day = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
		DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00
		
		//获取当前系统时间
		String date4Plan = dateFormat4Month.format(now); //2014-09
		String date4Bancitj = dateFormat4Day.format(now);//2014-09-01
		String currentTime = timeFormat.format(now);//11:29:07
		
		//获取比当前时间提前的一个时间点
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) - 10);//10秒之前
		String preCurrent =  timeFormat.format(calendar.getTime());
		
		
		String jsonString = "{}";
		
		//返回routeId列表
		for(int i=0;i<areaList.size();i++){
			
			Dto dtoRoute = (Dto)areaList.get(i);
			String routeId = dtoRoute.getAsString("value");
//			System.out.println("!!!!!routeId:"+routeId);
			
			
			Map map = new HashMap<String,String>();
			map.put("routeId", routeId);
			
			//测试更改
//			date4Plan = "2014-09";
			map.put("date", date4Plan);
			//查询该线路车的高峰时间段
			List routeTimeList = null;
//			List routeIdListResult = null;
			
			
			routeTimeList = g4Reader.queryForList("BanCiNumDynamic.queryBusBanciExcuteDuring", map);
			
			
			if( routeTimeList!=null && routeTimeList.size()!=0 ){
				
				//得到高峰时间段
				Map GF1 =  (Map) routeTimeList.get(0);
				Map GF2 =  (Map) routeTimeList.get(1);
				String gf1 =  (String) GF1.get("gf");
				String gf2 =  (String) GF2.get("gf");
				
				
				java.sql.Time tmp = (Time) GF1.get("stime");
				if(tmp != null){
					
					if(gf1.equals("1")){
						
						java.sql.Time tmp1 = (Time) GF1.get("stime");
						java.sql.Time tmp2 = (Time)GF1.get("etime");
						
						ZGFSTime =  tmp1.toString();
						ZGFETime =  tmp2.toString();
						
					}else{
						
						java.sql.Time tmp1 = (Time) GF1.get("stime");
						java.sql.Time tmp2 = (Time)GF1.get("etime");
						
						WGFSTime = tmp1.toString();
						WGFETime = tmp2.toString();
					}
					
					if(gf2.equals("2")){
						
						java.sql.Time tmp1 = (Time)GF2.get("stime");
						java.sql.Time tmp2 = (Time)GF2.get("etime");
						
						WGFSTime = tmp1.toString();
						WGFETime = tmp2.toString();
						
					}else{
						java.sql.Time tmp1 = (Time)GF2.get("stime");
						java.sql.Time tmp2 = (Time)GF2.get("etime");
						
						ZGFSTime = tmp1.toString();
						ZGFETime = tmp2.toString();
					}
					
					
					//将当前时间与上述时间点进行比较
					
					//测试数据
//					date4Bancitj = "2014-09-01";
//					currentTime = "7:30:00";
					
					
					//字符串处理
					Date current = timeFormat.parse(currentTime.toString());
					
					Date zgstime = timeFormat.parse(ZGFSTime.toString());
					Date zgetime = timeFormat.parse(ZGFETime.toString());
					Date wgstime = timeFormat.parse(WGFSTime.toString());
					Date wgetime = timeFormat.parse(WGFETime.toString());
					Date zwtime = timeFormat.parse(ZWTime.toString());
					Date wdetime = timeFormat.parse(WDFETime.toString());
					
					//
					Map timeMap = new HashMap();
					Map duringMap = new HashMap();
					List areaListTmp = null;
					
					if(current.before(zgstime) ){//查询实时的  小于  zgstime
						
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime","04:00:00");
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
					}else if(current.before(zgetime)){//查询早低峰
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						
						zdNum += zdNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",ZGFSTime);//
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
					}else if(current.before(zwtime)){//查询早低峰+早高峰+实时
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						
						zdNum += zdNumTmp;
						
						//早高峰值
						Map zgParam = new HashMap();
						zgParam.put("routeId", routeId);
						zgParam.put("date", date4Bancitj);
						int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
						
						zgNum += zgNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						

						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",ZGFETime);
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
											
						duringNum += duringNumTmp;
						
						
					}else if(current.before(wgstime)){//查询早低峰+早高峰+上午平峰+实时
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						zdNum += zdNumTmp; 
						
						//早高峰值
						Map zgParam = new HashMap();
						zgParam.put("routeId", routeId);
						zgParam.put("date", date4Bancitj);
						int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
						zgNum += zgNumTmp;
						
						//上午平峰
						Map swpParam = new HashMap();
						swpParam.put("routeId", routeId);
						swpParam.put("date", date4Bancitj);
						int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
						swpNum += swpNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						num += numTmp;
						

						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",ZWTime);
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
					}else if(current.before(wgetime)){//查询早低峰+早高峰+上午平峰+下午平峰+实时
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						
						zdNum += zdNumTmp;
						
						//早高峰值
						Map zgParam = new HashMap();
						zgParam.put("routeId", routeId);
						zgParam.put("date", date4Bancitj);
						int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
						
						zgNum += zgNumTmp;
						
						//上午平峰
						Map swpParam = new HashMap();
						swpParam.put("routeId", routeId);
						swpParam.put("date", date4Bancitj);
						int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
						
						swpNum += swpNumTmp;
						
						//下午平峰
						Map xwpParam = new HashMap();
						xwpParam.put("routeId", routeId);
						xwpParam.put("date", date4Bancitj);
						int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
						
						xwpNum += xwpNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",WGFSTime);
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
								
						duringNum += duringNumTmp;
						
						
					}else if(current.before(wdetime)){//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+实时
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						
						zdNum += zdNumTmp;
						
						//早高峰值
						Map zgParam = new HashMap();
						zgParam.put("routeId", routeId);
						zgParam.put("date", date4Bancitj);
						int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
						
						zgNum += zgNumTmp;
						
						//上午平峰
						Map swpParam = new HashMap();
						swpParam.put("routeId", routeId);
						swpParam.put("date", date4Bancitj);
						int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
						
						swpNum += swpNumTmp;
						
						//下午平峰
						Map xwpParam = new HashMap();
						xwpParam.put("routeId", routeId);
						xwpParam.put("date", date4Bancitj);
						int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
						
						xwpNum += xwpNumTmp;
						
						//晚高峰
						Map wgParam = new HashMap();
						wgParam.put("routeId", routeId);
						wgParam.put("date", date4Bancitj);
						int wgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
						
						wgNum += wgNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",WGFETime);
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
						
					}else {//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+晚低峰+实时
						//查询早低峰
						Map zdParam = new HashMap();
						zdParam.put("routeId", routeId);
						zdParam.put("date", date4Bancitj);
						int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
						
						zdNum += zdNumTmp;
						
						//早高峰值
						Map zgParam = new HashMap();
						zgParam.put("routeId", routeId);
						zgParam.put("date", date4Bancitj);
						int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);

						zgNum += zgNumTmp;
						
						//上午平峰
						Map swpParam = new HashMap();
						swpParam.put("routeId", routeId);
						swpParam.put("date", date4Bancitj);
						int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
						
						swpNum += swpNumTmp;
						
						//下午平峰
						Map xwpParam = new HashMap();
						xwpParam.put("routeId", routeId);
						xwpParam.put("date", date4Bancitj);
						int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);

						xwpNum += xwpNumTmp;
						
						//晚高峰
						Map wgParam = new HashMap();
						wgParam.put("routeId", routeId);
						wgParam.put("date", date4Bancitj);
						int wgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
						
						wgNum += wgNumTmp;
						
						//晚低峰
						Map wdParam = new HashMap();
						wdParam.put("routeId", routeId);
						wdParam.put("date", date4Bancitj);
						int wdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWDWCNum",wdParam);
						
						wdNum += wdNumTmp;
						
						//查询动态
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime",WDFETime);
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
					}
					
				}
				
			}else{
				
				System.out.println("该数据库中没有该辆车的信息！！！");
				
			}
			
		}
		
		Map result = new HashMap();
		result.put("num", num);
		result.put("duringNum", duringNum);
		result.put("currentTime", currentTime);
		result.put("zdNum",zdNum);
		result.put("ZGFSTime", ZGFSTime);
		result.put("zgNum",zgNum);
		result.put("ZGFETime",ZGFETime);
		result.put("swpNum",swpNum);
		result.put("ZWTime",ZWTime);
		result.put("xwpNum",xwpNum);
		result.put("WGFSTime",WGFSTime);
		result.put("wgNum",wgNum);
		result.put("WGFETime",WGFETime);
		result.put("wdNum", wdNum);
		result.put("WDFETime", WDFETime);
		
		jsonString = JsonHelper.encodeObject2Json(result);
		
		write(jsonString,response);
		
		return mapping.findForward(null);
	}
	
	
	
	
	//公司班次实时查询
	public ActionForward queryBanciNumDynamic4Company(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String deptid = dto.getAsString("deptId");
		
//		System.out.println("Action!!!!!!!!!!!!!!!!!!开始");
		
//		System.out.println("公司编号!!!!!!deptid:"+deptid);
		
		List TeamList = null; 
		
		
		if ("001".equals(deptid)) {
			TeamList = g4Reader.queryForList("BanCiNumDynamic.queryteamDatas", dto);
		} else if (deptid.length() == 6) {
			dto.put("deptid", deptid);
			TeamList = g4Reader.queryForList("BanCiNumDynamic.queryteamDatas", dto);
		} else if (deptid.length() == 9) {
			dto.put("deptid", deptid);
			TeamList = g4Reader.queryForList(
					"BanCiNumDynamic.queryTeamDatasByClassTeam", dto);
		}
		
		
		
		int num = 0;//查询实时车辆总数
		int duringNum = 0;//查询实时累计
		int zdNum = 0;//查询早低峰值
		int zgNum = 0;//查询早高峰值
		int swpNum = 0;//查询上午平峰值
		int xwpNum = 0;//查询下午平峰值
		int wgNum = 0;//查询晚高峰值
		int wdNum = 0;//查询晚低峰值
		
		String ZGFSTime="";
		String ZGFETime="";
		String ZWTime = "12:00:00";
		String WGFSTime="";
		String WGFETime="";
		String WDFETime = "23:00:00";
		
		Date now = new Date();
		DateFormat allFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
		DateFormat dateFormat4Month = new SimpleDateFormat("yyyy-MM");//2014-09
		DateFormat dateFormat4Day = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
		DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00
		
		//获取当前系统时间
		String date4Plan = dateFormat4Month.format(now); //2014-09
		String date4Bancitj = dateFormat4Day.format(now);//2014-09-01
		String currentTime = timeFormat.format(now);//11:29:07
		
		//获取比当前时间提前的一个时间点
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) - 20);//20秒之前
		String preCurrent =  timeFormat.format(calendar.getTime());
		
		String jsonString = "{}";
		
		
		//获得路队列表
		for(int j=0;j<TeamList.size();j++){
			Dto dtoTeam = (Dto)TeamList.get(j);
			deptid = dtoTeam.getAsString("value");
			
//			System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!teamId："+deptid);
			
			//获得路线列表
			
			List areaList = null;
			if ("001".equals(deptid)) {
				areaList = g4Reader.queryForList("BanCiNumDynamic.queryrouteDatas", dto);
			} else if (deptid.length() == 6) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryrouteDatasByClassCompany", dto);
			} else if (deptid.length() == 9) {
				dto.put("deptid", deptid);
				areaList = g4Reader.queryForList(
						"BanCiNumDynamic.queryrouteDatasByClassTeam", dto);
			}
			
//			System.out.println("areaList:"+areaList);
			
			
			//返回routeId列表
			for(int i=0;i<areaList.size();i++){
				
				Dto dtoRoute = (Dto)areaList.get(i);
				String routeId = dtoRoute.getAsString("value");
				
//				System.out.println("routeId:"+routeId);
				
				Map map = new HashMap<String,String>();
				map.put("routeId", routeId);
				
//!!!!!!!!!!!!				//测试更改
//				date4Plan = "2014-09";
				map.put("date", date4Plan);
				//查询该线路车的高峰时间段
				List routeTimeList = null;
//				List routeIdListResult = null;
				
				
				routeTimeList = g4Reader.queryForList("BanCiNumDynamic.queryBusBanciExcuteDuring", map);
				
				
				if( routeTimeList!=null && routeTimeList.size()!=0 ){
					
					//得到高峰时间段
					Map GF1 =  (Map) routeTimeList.get(0);
					Map GF2 =  (Map) routeTimeList.get(1);
					String gf1 =  (String) GF1.get("gf");
					String gf2 =  (String) GF2.get("gf");
					
					java.sql.Time tmp = (Time) GF1.get("stime");
					
					if(tmp != null){
						
						if(gf1.equals("1")){
							
							java.sql.Time tmp1 = (Time) GF1.get("stime");
							java.sql.Time tmp2 = (Time)GF1.get("etime");
							
							ZGFSTime =  tmp1.toString();
							ZGFETime =  tmp2.toString();
							
						}else{
							
							java.sql.Time tmp1 = (Time) GF1.get("stime");
							java.sql.Time tmp2 = (Time)GF1.get("etime");
							
							WGFSTime = tmp1.toString();
							WGFETime = tmp2.toString();
						}
						
						if(gf2.equals("2")){
							
							java.sql.Time tmp1 = (Time)GF2.get("stime");
							java.sql.Time tmp2 = (Time)GF2.get("etime");
							
							WGFSTime = tmp1.toString();
							WGFETime = tmp2.toString();
							
						}else{
							java.sql.Time tmp1 = (Time)GF2.get("stime");
							java.sql.Time tmp2 = (Time)GF2.get("etime");
							
							ZGFSTime = tmp1.toString();
							ZGFETime = tmp2.toString();
						}
						
						//将当前时间与上述时间点进行比较
						
						//测试数据
//						date4Bancitj = "2014-09-01";
//						currentTime = "7:30:00";
						
						
						//字符串处理
						Date current = timeFormat.parse(currentTime.toString());
						
						Date zgstime = timeFormat.parse(ZGFSTime.toString());
						Date zgetime = timeFormat.parse(ZGFETime.toString());
						Date wgstime = timeFormat.parse(WGFSTime.toString());
						Date wgetime = timeFormat.parse(WGFETime.toString());
						Date zwtime = timeFormat.parse(ZWTime.toString());
						Date wdetime = timeFormat.parse(WDFETime.toString());
						
						//
						Map timeMap = new HashMap();
						Map duringMap = new HashMap();
						List areaListTmp = null;
						
						if(current.before(zgstime) ){//查询实时的  小于  zgstime
							
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							
							
							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime","04:00:00");
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
							
							duringNum += duringNumTmp;
							
						}else if(current.before(zgetime)){//查询早低峰
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							
							zdNum += zdNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							

							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",ZGFSTime);//
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
													
							duringNum += duringNumTmp;
							
							
						}else if(current.before(zwtime)){//查询早低峰+早高峰+实时
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							
							zdNum += zdNumTmp;
							
							//早高峰值
							Map zgParam = new HashMap();
							zgParam.put("routeId", routeId);
							zgParam.put("date", date4Bancitj);
							int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
							
							zgNum += zgNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							
							
							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",ZGFETime);
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
												
							duringNum += duringNumTmp;
							
							
						}else if(current.before(wgstime)){//查询早低峰+早高峰+上午平峰+实时
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							zdNum += zdNumTmp; 
							
							//早高峰值
							Map zgParam = new HashMap();
							zgParam.put("routeId", routeId);
							zgParam.put("date", date4Bancitj);
							int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
							zgNum += zgNumTmp;
							
							//上午平峰
							Map swpParam = new HashMap();
							swpParam.put("routeId", routeId);
							swpParam.put("date", date4Bancitj);
							int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
							swpNum += swpNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							num += numTmp;
							
							

							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",ZWTime);
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
												
							duringNum += duringNumTmp;

							
							
						}else if(current.before(wgetime)){//查询早低峰+早高峰+上午平峰+下午平峰+实时
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							
							zdNum += zdNumTmp;
							
							//早高峰值
							Map zgParam = new HashMap();
							zgParam.put("routeId", routeId);
							zgParam.put("date", date4Bancitj);
							int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
							
							zgNum += zgNumTmp;
							
							//上午平峰
							Map swpParam = new HashMap();
							swpParam.put("routeId", routeId);
							swpParam.put("date", date4Bancitj);
							int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
							
							swpNum += swpNumTmp;
							
							//下午平峰
							Map xwpParam = new HashMap();
							xwpParam.put("routeId", routeId);
							xwpParam.put("date", date4Bancitj);
							int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
							
							xwpNum += xwpNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							

							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",WGFSTime);
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
															
							duringNum += duringNumTmp;
							
							
						}else if(current.before(wdetime)){//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+实时
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							
							zdNum += zdNumTmp;
							
							//早高峰值
							Map zgParam = new HashMap();
							zgParam.put("routeId", routeId);
							zgParam.put("date", date4Bancitj);
							int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);
							
							zgNum += zgNumTmp;
							
							//上午平峰
							Map swpParam = new HashMap();
							swpParam.put("routeId", routeId);
							swpParam.put("date", date4Bancitj);
							int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
							
							swpNum += swpNumTmp;
							
							//下午平峰
							Map xwpParam = new HashMap();
							xwpParam.put("routeId", routeId);
							xwpParam.put("date", date4Bancitj);
							int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);
							
							xwpNum += xwpNumTmp;
							
							//晚高峰
							Map wgParam = new HashMap();
							wgParam.put("routeId", routeId);
							wgParam.put("date", date4Bancitj);
							int wgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
							
							wgNum += wgNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							
							
							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",WGFETime);
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
							
							duringNum += duringNumTmp;
							
							
						}else {//查询早低峰+早高峰+上午平峰+下午平峰+晚高峰+晚低峰+实时
							//查询早低峰
							Map zdParam = new HashMap();
							zdParam.put("routeId", routeId);
							zdParam.put("date", date4Bancitj);
							int zdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZDWCNum",zdParam);
							
							zdNum += zdNumTmp;
							
							//早高峰值
							Map zgParam = new HashMap();
							zgParam.put("routeId", routeId);
							zgParam.put("date", date4Bancitj);
							int zgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteZGWCNum",zgParam);

							zgNum += zgNumTmp;
							
							//上午平峰
							Map swpParam = new HashMap();
							swpParam.put("routeId", routeId);
							swpParam.put("date", date4Bancitj);
							int swpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteSWPWCNum",swpParam);
							
							swpNum += swpNumTmp;
							
							//下午平峰
							Map xwpParam = new HashMap();
							xwpParam.put("routeId", routeId);
							xwpParam.put("date", date4Bancitj);
							int xwpNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteXWPWCNum",xwpParam);

							xwpNum += xwpNumTmp;
							
							//晚高峰
							Map wgParam = new HashMap();
							wgParam.put("routeId", routeId);
							wgParam.put("date", date4Bancitj);
							int wgNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWGWCNum",wgParam);
							
							wgNum += wgNumTmp;
							
							//晚低峰
							Map wdParam = new HashMap();
							wdParam.put("routeId", routeId);
							wdParam.put("date", date4Bancitj);
							int wdNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteWDWCNum",wdParam);
							
							wdNum += wdNumTmp;
							
							//查询动态
							timeMap.put("date",date4Bancitj);
							timeMap.put("routeId", routeId);
							timeMap.put("startTime",preCurrent);
							timeMap.put("endTime",currentTime);
							int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", timeMap);
							
							num += numTmp;
							
							
							//查询动态累计
							duringMap.put("date",date4Bancitj);
							duringMap.put("routeId", routeId);
							duringMap.put("startTime",WDFETime);
							duringMap.put("endTime",currentTime);
							int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic.queryBusBanciExcuteDynamicNum", duringMap);
							
							duringNum += duringNumTmp;
							
						}
						
					}
					
					System.out.println("该数据库中没有该辆车的信息！！！");
					
				}
				
			}
			
		}
	
		
		//存储计算结果
		Map result = new HashMap();
		result.put("num", num);
		result.put("duringNum", duringNum);
		result.put("currentTime", currentTime);
		result.put("zdNum",zdNum);
		result.put("ZGFSTime", ZGFSTime);
		result.put("zgNum",zgNum);
		result.put("ZGFETime",ZGFETime);
		result.put("swpNum",swpNum);
		result.put("ZWTime",ZWTime);
		result.put("xwpNum",xwpNum);
		result.put("WGFSTime",WGFSTime);
		result.put("wgNum",wgNum);
		result.put("WGFETime",WGFETime);
		result.put("wdNum", wdNum);
		result.put("WDFETime", WDFETime);
		
		jsonString = JsonHelper.encodeObject2Json(result);
		
		write(jsonString,response);
		
		return mapping.findForward(null);
	}
	
	
	
	//线路班次实时查询初始界面
	public ActionForward BusBanciDynamicNumInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		

		return mapping.findForward("BusBanciDynamicNum");
	}
	
	//路队班次实时查询初始界面
	public ActionForward BusBanciDynamicNum4TeamInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		

		return mapping.findForward("BusBanciDynamicNum4Team");
	}
	
	
	//公司班次实时查询初始界面
	public ActionForward BusBanciDynamicNum4CompanyInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		

		return mapping.findForward("BusBanciDynamicNum4Company");
	}
	
	
}