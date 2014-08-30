package org.bus.busdynamic.web;

import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.validator.Var;
import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.util.G4Constants;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;

public class BusDynamicAction2 extends BizAction {
	
	//某一站点通过车次监测  画柱状图
	public ActionForward queryBusStationExcuteDynamic(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		/*CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);*/
		return mapping.findForward("queryBusStationExcuteDynamicInitView");
	}
	//查询站点  nagsh
	public ActionForward queryBusSectionRuns2(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String routeId=dto.getAsString("routeId");
		
		List list=g4Reader.queryForList("BusDynamic2.queryBusSectionRuns", routeId);
		String jsonString = JsonHelper.encodeObject2Json(list);
		write(jsonString, response);
	
		return mapping.findForward(null);
	}
	
	//nagsh
	public ActionForward queryStationRuns(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String routeValue=dto.getAsString("routeValue");
	    String stationValue=dto.getAsString("stationValue");
	    
		boolean flag=false;   //当前时间是否在考核时间范围内
		String kaoheStart=null;   //若在考核范围内 考核所在范围开始时间
		String kaoheEnd=null;     //若在考核范围内 考核所在范围结束时间
		int section_runs=0;       //要求通过量
		int shiji=0;              //实际通过量
		Map result = new HashMap();  //最后要返回的数据
		
		Date now = new Date();
		DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");//22:20:00   //可以方便修改时间
		DateFormat dateFormatDay = new SimpleDateFormat("yyyy-MM-dd");//2014-09-01
		
		
		//获取当前系统时间
		String currentTime = timeFormat.format(now);//11:29:07
		String currentTimeDay = dateFormatDay.format(now);//2014-09-01
		Date current = timeFormat.parse(currentTime.toString());//当前时间
		Date lastStart = null;  //当当前时间不在考核范围内时，用来保存下一次开始考核的时间
	    //查询考核时间段
		List list=g4Reader.queryForList("BusDynamic2.queryStationRuns", dto);
		//判断当前时间是否在考核时间范围内 若在 得出该范围
		if(list!=null && list.size()!=0){
			for(int i=0;i<list.size();i++){
				Map time =  (Map) list.get(i);
				java.sql.Time starttime = (Time)time.get("starttime");
				java.sql.Time endtime = (Time)time.get("endtime");
				
				//格式化时间
				Date start = timeFormat.parse(starttime.toString());
				Date end = timeFormat.parse(endtime.toString());
				
				//判断当前时间是否在考核时间范围内
				if(start.before(current) && current.before(end)){
					  flag=true;
					  kaoheStart=starttime.toString();
					  kaoheEnd=endtime.toString();
					  section_runs=Integer.parseInt(time.get("section_runs").toString());
					  break;
				}else if(current.before(start)&&lastStart==null){   //当前时间早于时区开始时间且lastStart==null;
					  lastStart=start;
				}else if(current.before(start)&&start.before(lastStart)){//当前时间早于时区开始时间且时区开始时间早于lastStart;
					  lastStart=start;
				} 
				
			}
		}
		
		if(flag==true){
			//考核时间 如 2014-09-01 10:10:10
	        String kaoheStartAll=currentTimeDay+" "+kaoheStart;
	        String kaoheEndAll=currentTimeDay+" "+kaoheEnd;
	        Map timeMap = new HashMap();
			timeMap.put("starttime",kaoheStartAll);
			timeMap.put("endtime",kaoheEndAll);
			timeMap.put("routeValue", routeValue);
			timeMap.put("stationValue", stationValue);
			//查询这段时间内通过该站点的车次
			shiji = (Integer)g4Reader.queryForObject("BusDynamic2.queryStationRunsShiji",timeMap);
			System.out.println(section_runs+"---------"+shiji);
			result.put("plan", section_runs);  //计划通过量
			result.put("shiji", shiji);        //实际通过量
			result.put("kaoheEnd", kaoheEnd);
	        	
		}else{
			String hour,minute,second;
			if(lastStart==null){
				hour="-1";
				minute="-1";
				second="-1";
			}else{
				  hour=String.valueOf(lastStart.getHours());
				 if(hour.length()==1)
					 hour="0"+hour;
				  minute=String.valueOf(lastStart.getMinutes());
				  if(minute.length()==1)
					  minute="0"+minute;
			      second=String.valueOf(lastStart.getSeconds());
				  if(second.length()==1)
					  second="0"+second;
			}
			
			String lastStartStr=hour+":"+minute+":"+second;
			System.out.println("不在考核时间内");
			result.put("plan", "不在考核时间内");  //计划通过量
			result.put("shiji",lastStartStr);        //实际通过量
		}
        
        String jsonString = JsonHelper.encodeObject2Json(result);
		System.out.println("jsonString:"+jsonString);
		write(jsonString,response);
		return mapping.findForward(null);
	}
}
