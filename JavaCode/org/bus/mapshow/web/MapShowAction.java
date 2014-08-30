package org.bus.mapshow.web;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.g4studio.core.web.BizAction;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
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


public class MapShowAction extends BizAction {
	/**
	 * 地图显示
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showMapInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showMapInitView");
	}
	/**
	 * 站点停靠时间热力图
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showDockTimeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showDockTimeInitView");
	}
	/**
	 * 站点查询
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showMapStationInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showMapStationInitView");
	}
	/**
	 * 道路查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showMapRoadInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showMapRoadInitView");
	}
	/**
	 * 显示全网速度
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showSpeedMapInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showSpeedMapInitView");
	}
	/**
	 * 全网查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward showMapNetInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		return mapping.findForward("showMapNetInitView");
	}
	/**
	 * 线路查询
	 */
	public ActionForward queryRouteMap(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		String route_id=request.getParameter("route_id");
		String sxx=request.getParameter("sxx");
		sxx = java.net.URLDecoder.decode(sxx,"UTF-8");
		System.out.println(sxx);
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("route_id", route_id);
		dto.put("sxx", sxx);
		List areaList = g4Reader.queryForList("Bus.queryRouteMap", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查出所有线路
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryAllRouteMap(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("Bus.queryAllRouteMap", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 线路上的站点查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRouteStation(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		String route_id=request.getParameter("route_id");
		String sxx=request.getParameter("sxx");
		System.out.println(sxx);
		sxx = java.net.URLDecoder.decode(sxx,"UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("route_id", route_id.toUpperCase());
		dto.put("sxx", sxx);
		List areaList = g4Reader.queryForList("Bus.queryRouteStation", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 图片查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRouteImg(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("lat", Double.parseDouble(dto.getAsString("lat")));
		dto.put("lng", Double.parseDouble(dto.getAsString("lng")));
		List areaList = null;
		switch(Integer.parseInt(dto.getAsString("mode1"))){
			case 0:
				areaList = g4Reader.queryForList("Bus.queryRouteImg", dto);
			break;
			default:
				areaList = g4Reader.queryForList("Bus.queryRouteImg2", dto);
			break;
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 站点查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryStationMap(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String station_name=request.getParameter("station_name");
		System.out.println(station_name);
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("station_name", station_name);
		List areaList = g4Reader.queryForList("Bus.queryStationMap", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	public ActionForward queryLaKuangStation(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		String swlng=request.getParameter("swlng");
		String swlat=request.getParameter("swlat");
		String nelng=request.getParameter("nelng");
		String nelat=request.getParameter("nelat");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("swlng", swlng);
		dto.put("swlat", swlat);
		dto.put("nelng", nelng);
		dto.put("nelat", nelat);
		List areaList = g4Reader.queryForList("Bus.queryLaKuangStation", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询某时间段的所有路段和他的速度
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward querySpeedMap(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String timesection=request.getParameter("timesection");
		String date=request.getParameter("date");
		System.out.println(timesection);
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("timesection", timesection);
		dto.put("date", date);
		List areaList = g4Reader.queryForList("Bus.querySpeedMap", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	public ActionForward queryRoad(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String pos=request.getParameter("pos");
		String posp=request.getParameter("posp");
		String color=request.getParameter("color");
		System.out.println(pos);
		System.out.println(posp);
		
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("posp", posp);
		dto.put("pos", pos);
		String road_id2 = "";
		String road_id = "";
		String master_id = "";
		String sxx = "";
		List areaList = g4Reader.queryForList("Bus.queryRoad", dto);
		if(areaList.size()>0){
			String result = areaList.get(0).toString();
				String[] results = result.split(",");
				road_id = results[0].substring(4, results[0].length());
				master_id= results[3].substring(4, results[3].length()-1);
		}
		CommonActionForm aForm1 = (CommonActionForm) form;
		Dto dto1 = aForm.getParamAsDto(request);
		dto1.put("posp", posp);
		dto1.put("route_master_id", master_id);
		List areaList1 = g4Reader.queryForList("Bus.queryRoad2", dto1);
		if(areaList1.size()>0){
			String result = areaList1.get(0).toString();
			System.out.println(result);
				String[] results = result.split(",");
				road_id2  = results[0].substring(4, results[0].length());
				sxx = results[4].substring(5, results[4].length()-1);
				System.out.println(master_id+"上一节点"+road_id2+"下一个："+road_id+sxx);
		}
		if(master_id.trim()!=""&&master_id!=null){
			CommonActionForm aForm2 = (CommonActionForm) form;
			Dto dto2 = aForm.getParamAsDto(request);
			dto2.put("id1", road_id2);
			dto2.put("id2", road_id);
			dto2.put("color", color);
			dto2.put("sxx", sxx);
			dto2.put("route_id", master_id);
			List areaList2 = g4Reader.queryForList("Bus.queryRouteSpeedMap", dto2);
			List re = new ArrayList();
			for(int i=0;i<areaList2.size();i++){
				Dto d = (Dto) areaList2.get(i);
				
			}
			String jsonString2 = JsonHelper.encodeObject2Json(areaList2);
			System.out.println(jsonString2);
			write(jsonString2, response);
		}
		
		return mapping.findForward(null);
	}
	/**
	 * 查询停靠时间
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryDockTime(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		String route_id=request.getParameter("route_id");
		String time=request.getParameter("time");
		String day=request.getParameter("day");
		String sxx=request.getParameter("sxx");
		sxx = java.net.URLDecoder.decode(sxx,"UTF-8");
		String starttime = day+" ";
		String endtime = day+" ";;
		if("6:00-8:00".equals(time)){
			starttime += "6:00:00";
			endtime += "8:00:00";
		}else if("9:00-15:00".equals(time)){
			starttime += "9:00:00";
			endtime += "15:00:00";
		}else{
			starttime += "16:00:00";
			endtime += "18:00:00";
		}
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("route_id", route_id);
		dto.put("sxx", sxx);
		dto.put("starttime", starttime);
		dto.put("endtime", endtime);
		List areaList = g4Reader.queryForList("Bus.queryDockTime", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 根据输入模糊搜索线路的名称
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRoadByName(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("MapShow.queryRoadByName", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 加载所有道路走廊的信息
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRoadByCorridor(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("MapShow.queryRoadByCorridor", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查找具体线路信息
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRoadDetailInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = null;
		if("1".equals(dto.getAsString("nameorcorridor"))){
			areaList = g4Reader.queryForList("MapShow.queryRoadDetailByName", dto);
		}else{
			areaList = g4Reader.queryForList("MapShow.queryRoadDetailByCorridor", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 根据在线路上点击下载图片及其详细信息
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRoadInfoImg(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		dto.put("lng", Double.parseDouble(dto.getAsString("lng")));
		dto.put("lat", Double.parseDouble(dto.getAsString("lat")));
		List areaList = g4Reader.queryForList("MapShow.queryRoadInfoImg", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 站点网络查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryStationNet(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		int selectvalue = Integer.parseInt(dto.getAsString("selectvalue"));
		List areaList = null;
		/*<option value="2">港湾式</option>
		<option value="1">非港湾式</option>
		<option value="3">中央岛式</option>
		<option value="0">全部</option>*/
		switch(selectvalue){
		case 0:
			areaList = g4Reader.queryForList("MapShow.queryStationNet_0", dto);
			break;
		case 1:
			areaList = g4Reader.queryForList("MapShow.queryStationNet_1", dto);
			break;
		case 2:
			areaList = g4Reader.queryForList("MapShow.queryStationNet_2", dto);
			break;
		case 3:
			areaList = g4Reader.queryForList("MapShow.queryStationNet_3", dto);
			break;
		}
		
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询站点线路
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryStationRouteNet(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		int selectvalue = Integer.parseInt(dto.getAsString("selectvalue"));
		List areaList = null;
		/*<option value="4">>8</option>
		<option value="3">>6且<=8</option>
		<option value="2">>4且<=6</option>
		<option value="1">>2且<=4</option>
		<option value="0"><=2</option>*/
		System.out.println(selectvalue);
		switch(selectvalue){
		case 0:
			dto.put("sc", "");
			dto.put("bc", 2);
			areaList = g4Reader.queryForList("MapShow.queryStationRouteNet", dto);
			break;
		case 1:
			dto.put("sc", 2);
			dto.put("bc", 4);
			areaList = g4Reader.queryForList("MapShow.queryStationRouteNet", dto);
			break;
		case 2:
			dto.put("sc", 4);
			dto.put("bc", 6);
			areaList = g4Reader.queryForList("MapShow.queryStationRouteNet", dto);
			break;
		case 3:
			dto.put("sc", 6);
			dto.put("bc", 8);
			areaList = g4Reader.queryForList("MapShow.queryStationRouteNet", dto);
			break;
		case 4:
			dto.put("sc", 8);
			dto.put("bc", "");
			areaList = g4Reader.queryForList("MapShow.queryStationRouteNet", dto);
			break;
		}
		
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 重复系数网络查询
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRepeatNet(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		int selectvalue = Integer.parseInt(dto.getAsString("selectvalue"));
		List areaList = null;
		/*<option value="1">单向(NE)</option>
		<option value="2">单向(SW)</option>
		<option value="3">双向</option>
		<option value="4">17条以上</option>
		<option value="5">13-17条</option>
		<option value="6">8-12条</option>
		<option value="7">4-7条</option>
		<option value="8">1-3条</option>*/
		System.out.println(selectvalue);
		switch(selectvalue){
		case 1:
			dto.put("pos1", "N");
			dto.put("pos2", "E");
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByPos", dto);
			break;
		case 2:
			dto.put("pos1", "W");
			dto.put("pos2", "S");
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByPos", dto);
			break;
		case 3:
			dto.put("pos1", "");
			dto.put("pos2", "");
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByPos", dto);
			break;
		case 4:
			dto.put("sc", 18);
			dto.put("bc", "");
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByRouteCount", dto);
			break;
		case 5:
			dto.put("sc", 13);
			dto.put("bc", 17);
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByRouteCount", dto);
			break;
		case 6:
			dto.put("sc", 8);
			dto.put("bc", 12);
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByRouteCount", dto);
			break;
		case 7:
			dto.put("sc", 4);
			dto.put("bc", 7);
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByRouteCount", dto);
			break;
		case 8:
			dto.put("sc", 1);
			dto.put("bc", 3);
			areaList = g4Reader.queryForList("MapShow.queryRepeatNetByRouteCount", dto);
			break;
		}
		
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询公交网络
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryBusNet(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		int selectvalue = Integer.parseInt(dto.getAsString("selectvalue"));
		List areaList = null;
		/*<option value="7">七公司</option>
		 <option value="8">BRT网络</option>*/
		System.out.println(selectvalue);
		switch(selectvalue){
		case 1:
			dto.put("ssgs", "一公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 2:
			dto.put("ssgs", "二公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 3:
			dto.put("ssgs", "三公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 4:
			dto.put("ssgs", "四公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 5:
			dto.put("ssgs", "五公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 6:
			dto.put("ssgs", "六公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 7:
			dto.put("ssgs", "七公司");
			areaList = g4Reader.queryForList("MapShow.queryBusNetByCompany", dto);
			break;
		case 8:
			areaList = g4Reader.queryForList("MapShow.queryBusNetByBRT", dto);
			break;
		}
		
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	public ActionForward querySpecialNet(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("MapShow.querySpecialNet", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
}
