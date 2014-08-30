package org.bus.banCiNumDynamic2Count.web;

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

public class BanCiNumDynamic2CountAction extends BizAction{
	
	// 分等级加载线路
			public ActionForward queryrouteDatasByClass(ActionMapping mapping,
					ActionForm form, HttpServletRequest request,
					HttpServletResponse response) throws Exception {
				CommonActionForm aForm = (CommonActionForm) form;
				Dto dto = aForm.getParamAsDto(request);
				System.out.println(dto.toString());
				// loginuserid
				List areaList1 = g4Reader.queryForList(
						"BanCiNumDynamic2Count.queryloginusersdeptid", dto);
				Dto d = (Dto) areaList1.get(0);
				String deptid = d.getAsString("deptid");
				List areaList = null;
				
				System.out.println(deptid.length());

				if ("001".equals(deptid)) {
					areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryrouteDatas", dto);
				} else if (deptid.length() == 6) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryrouteDatasByClassCompany", dto);
				} else if (deptid.length() == 9) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryrouteDatasByClassTeam", dto);
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
						"BanCiNumDynamic2Count.queryloginusersdeptid", dto);
				Dto d = (Dto) areaList1.get(0);
				String deptid = d.getAsString("deptid");
				List areaList = null;
				System.out.println(deptid.length());

				if ("001".equals(deptid)) {
					areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryteamDatas", dto);
				} else if (deptid.length() == 6) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryteamDatas", dto);
				} else if (deptid.length() == 9) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryTeamDatasByClassTeam", dto);
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
						"BanCiNumDynamic2Count.queryloginusersdeptid", dto);
				Dto d = (Dto) areaList1.get(0);
				String deptid = d.getAsString("deptid");

				List areaList = null;
				if ("001".equals(deptid)) {
					areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryCompanyDatas", dto);
				} else {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryCompanyDatasByClass", dto);
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
				String date4Bancitj = dateFormat4Day.format(now);//2014-09-01
				String currentTime = timeFormat.format(now);//11:29:07
				
				//获取比当前时间提前的一个时间点
				Calendar calendar = Calendar.getInstance();
				calendar.set(Calendar.SECOND, calendar.get(Calendar.SECOND) - 5);//5秒之前
				String preCurrent =  timeFormat.format(calendar.getTime());
				

				String jsonString = "{}";//存放结果
				
				int num = 0;//查询实时车辆总数
				int duringNum = 0;//查询累计车辆总数
				
				
				Map timeMap = new HashMap();
				Map duringMap = new HashMap();
				
				timeMap.put("date",date4Bancitj);
				timeMap.put("routeId", routeId);
				timeMap.put("startTime",preCurrent);
				timeMap.put("endTime",currentTime);
				num = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", timeMap);
				
				//查询动态累计
				duringMap.put("date",date4Bancitj);
				duringMap.put("routeId", routeId);
				duringMap.put("startTime","04:00:00");
				duringMap.put("endTime",currentTime);
				duringNum = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", duringMap);
				
				Map result = new HashMap();
				result.put("num", num);
				result.put("duringNum", duringNum);
				
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
				
				
				List areaList = null;
				
				if ("001".equals(deptid)) {
					areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryrouteDatas", dto);
				} else if (deptid.length() == 6) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryrouteDatasByClassCompany", dto);
				} else if (deptid.length() == 9) {
					dto.put("deptid", deptid);
					areaList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryrouteDatasByClassTeam", dto);
				}
				
				
				int num = 0;//查询实时车辆总数
				int duringNum = 0;//查询实时累计总数
				
				Date now = new Date();
				DateFormat allFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
				DateFormat dateFormat4Month = new SimpleDateFormat("yyyy-MM");//2014-09
				DateFormat dateFormat4Day = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
				DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00
				
				//获取当前系统时间
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
					
					Map timeMap = new HashMap();
					Map duringMap = new HashMap();
					
					timeMap.put("date",date4Bancitj);
					timeMap.put("routeId", routeId);
					timeMap.put("startTime",preCurrent);
					timeMap.put("endTime",currentTime);
					int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", timeMap);
					
					num += numTmp;
					
					//查询动态累计
					duringMap.put("date",date4Bancitj);
					duringMap.put("routeId", routeId);
					duringMap.put("startTime","04:00:00");
					duringMap.put("endTime",currentTime);
					int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", duringMap);
					
					duringNum += duringNumTmp;
					
					
				}
				
				Map result = new HashMap();
				result.put("num", num);
				result.put("duringNum", duringNum);
				
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
				
				List TeamList = null; 
				
				if ("001".equals(deptid)) {
					TeamList = g4Reader.queryForList("BanCiNumDynamic2Count.queryteamDatas", dto);
				} else if (deptid.length() == 6) {
					dto.put("deptid", deptid);
					TeamList = g4Reader.queryForList("BanCiNumDynamic2Count.queryteamDatas", dto);
				} else if (deptid.length() == 9) {
					dto.put("deptid", deptid);
					TeamList = g4Reader.queryForList(
							"BanCiNumDynamic2Count.queryTeamDatasByClassTeam", dto);
				}
				
				
				int num = 0;//查询实时车辆总数
				int duringNum = 0;//查询实时累计
				
				
				Date now = new Date();
				DateFormat allFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//可以方便地修改日期格式
				DateFormat dateFormat4Month = new SimpleDateFormat("yyyy-MM");//2014-09
				DateFormat dateFormat4Day = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
				DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00
				
				//获取当前系统时间
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
					
//					System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!teamId："+deptid);
					
					//获得路线列表
					
					List areaList = null;
					if ("001".equals(deptid)) {
						areaList = g4Reader.queryForList("BanCiNumDynamic2Count.queryrouteDatas", dto);
					} else if (deptid.length() == 6) {
						dto.put("deptid", deptid);
						areaList = g4Reader.queryForList(
								"BanCiNumDynamic2Count.queryrouteDatasByClassCompany", dto);
					} else if (deptid.length() == 9) {
						dto.put("deptid", deptid);
						areaList = g4Reader.queryForList(
								"BanCiNumDynamic2Count.queryrouteDatasByClassTeam", dto);
					}
					
//					System.out.println("areaList:"+areaList);
					
					
					//返回routeId列表
					for(int i=0;i<areaList.size();i++){
						
						Dto dtoRoute = (Dto)areaList.get(i);
						String routeId = dtoRoute.getAsString("value");
						
						Map timeMap = new HashMap();
						Map duringMap = new HashMap();
						
						timeMap.put("date",date4Bancitj);
						timeMap.put("routeId", routeId);
						timeMap.put("startTime",preCurrent);
						timeMap.put("endTime",currentTime);
						int numTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", timeMap);
						
						num += numTmp;
						
						//查询动态累计
						duringMap.put("date",date4Bancitj);
						duringMap.put("routeId", routeId);
						duringMap.put("startTime","04:00:00");
						duringMap.put("endTime",currentTime);
						int duringNumTmp = (Integer)g4Reader.queryForObject("BanCiNumDynamic2Count.queryBusBanciExcuteDynamicNum", duringMap);
						
						duringNum += duringNumTmp;
						
					}
					
				}
				
				
				Map result = new HashMap();
				result.put("num", num);
				result.put("duringNum", duringNum);
				
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
