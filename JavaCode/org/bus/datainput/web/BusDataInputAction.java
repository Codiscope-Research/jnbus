package org.bus.datainput.web;

import java.util.List;

import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bus.datainput.service.BusDataService;
import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.model.service.impl.BizServiceImpl;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.util.G4Constants;
import org.g4studio.core.util.G4Utils;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;
import org.g4studio.demo.service.DemoService;

/**
 * 
 * @author ToDoU
 * @since 2014-5-26
 */
public class BusDataInputAction extends BizAction {

	private BusDataService busDataService = (BusDataService) getService("busDataService");

	/**
	 * 工作日营运计划2
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busDaysPlanInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busDaysPlanInitView");
	}

	/**
	 * 工作日营运计划1
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward busDaysPlan1Init(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return mapping.findForward("busDaysPlan1InitView");
	}

	/**
	 * 线路站点下拉框加载
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRouteStation(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		List areaList = g4Reader.queryForList("BusDataInput.queryRouteStation",
				dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 分上下行查询起始站点名
	public ActionForward queryRouteStationUporDownStart(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		List areaList = g4Reader.queryForList(
				"BusDataInput.queryRouteStationUporDownStart", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 分上下行查询站点名结束站点
	public ActionForward queryRouteStationUporDownEnd(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		List areaList = g4Reader.queryForList(
				"BusDataInput.queryRouteStationUporDownEnd", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 营运计划数据显示
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward insertBusDaysPlan(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		System.out.println(dto.toString());
		List areaList = g4Reader.queryForList("BusDataInput.insertBusDaysPlan",
				dto);
		List resultList = new ArrayList();
		Dto dtoresult = new BaseDto();
		for (int i = 0; i < areaList.size(); i++) {
			Dto dtoi = (Dto) areaList.get(i);
			if ("1".equals(dtoi.getAsString("c"))) {
				dtoresult.put("mpstarttime", dtoi.getAsString("m_start"));
				dtoresult.put("mpendtime", dtoi.getAsString("m_end"));
				dtoresult.put("mpruns", dtoi.getAsString("runs"));
				dtoresult.put("mpspaceavg", dtoi.getAsString("inteval_avg"));
				// dtoresult.put("mpdid", dtoi.getAsString("mpdid"));
				dtoresult.put("mpdstarttime",
						dtoi.getAsString("section_time_start"));
				dtoresult.put("mpdendtime",
						dtoi.getAsString("section_time_end"));
				dtoresult.put("mpdruns", dtoi.getAsString("section_runs"));
				dtoresult.put("mpdspaceavg",
						dtoi.getAsString("interval_avg_section"));
			} else {
				dtoresult.put("epstarttime", dtoi.getAsString("m_start"));
				dtoresult.put("ependtime", dtoi.getAsString("m_end"));
				dtoresult.put("epruns", dtoi.getAsString("runs"));
				dtoresult.put("epspaceavg", dtoi.getAsString("inteval_avg"));
				dtoresult.put("epdstarttime",
						dtoi.getAsString("section_time_start"));
				dtoresult.put("epdendtime",
						dtoi.getAsString("section_time_end"));
				dtoresult.put("epdruns", dtoi.getAsString("section_runs"));
				dtoresult.put("epdspaceavg",
						dtoi.getAsString("interval_avg_section"));
			}
			dtoresult.put("section_id", dtoi.getAsString("section_id"));
			dtoresult.put("runs_day", dtoi.getAsString("runs_day"));
			dtoresult.put("maxspaceavg", dtoi.getAsString("f_max_inrerval"));
			dtoresult.put("p_rate", dtoi.getAsString("p_rate"));
			dtoresult.put("num_yypeiche", dtoi.getAsString("num_yypeiche"));
			dtoresult.put("num_guache", dtoi.getAsString("num_guache"));

			dtoresult.put("weekendtime3_p", dtoi.getAsString("weekendtime3_p"));
			dtoresult.put("weekendtime3_1", dtoi.getAsString("weekendtime3_1"));
			dtoresult.put("weekendtime3_2", dtoi.getAsString("weekendtime3_2"));
			dtoresult.put("weekendtime2_p", dtoi.getAsString("weekendtime2_p"));
			dtoresult.put("weekendtime2_2", dtoi.getAsString("weekendtime2_2"));
			dtoresult.put("weekendtime1_p", dtoi.getAsString("weekendtime1_p"));
			dtoresult.put("weekendtime1", dtoi.getAsString("weekendtime1"));

			dtoresult.put("chuanche_zaodifeng",
					dtoi.getAsString("chuanche_zaodifeng"));
			dtoresult.put("chuanche_zaogaofeng",
					dtoi.getAsString("chuanche_zaogaofeng"));
			dtoresult.put("chuanche_pingfeng",
					dtoi.getAsString("chuanche_pingfeng"));
			dtoresult.put("chuanche_wangaofeng",
					dtoi.getAsString("chuanche_wangaofeng"));
			dtoresult.put("chuanche_wandifeng",
					dtoi.getAsString("chuanche_wandifeng"));
		}
		if (G4Utils.isEmpty(dtoresult)) {
			dtoresult.put("msg", "无相关数据,请在下面插入新数据！");
			dto.put("c", "1");
			busDataService.insertBusDaysPlan(dto);
			dto.put("c", "2");
			busDataService.insertBusDaysPlan(dto);
		} else {
			dtoresult.put("msg", "ok");
		}
		resultList.add(dtoresult);
		System.out.println(resultList.toString());
		String jsonString = JsonHelper.encodeDto2FormLoadJson(dtoresult,
				G4Constants.FORMAT_Date);
		// String jsonString = JsonHelper.encodeObject2Json(resultList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	public ActionForward saveBusDaysPlan(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		Dto updatedto = new BaseDto();
		updatedto.put("upordown", dto.getAsString("sxx"));
		updatedto.put("date", dto.getAsString("date"));
		updatedto.put("comp_id", dto.getAsString("companyName"));
		updatedto.put("route_id", dto.getAsString("routeid"));
		updatedto.put("runs_day", dto.getAsString("runs_day"));
		updatedto.put("f_max_inrerval", dto.getAsString("maxspaceavg"));
		updatedto.put("p_rate", dto.getAsString("p_rate"));
		updatedto.put("section_id", dto.getAsString("station_id"));
		updatedto.put("num_yypeiche", dto.getAsString("num_yypeiche"));
		updatedto.put("num_guache", dto.getAsString("num_guache"));

		updatedto.put("weekendtime3_p", dto.getAsString("weekendtime3_p"));
		updatedto.put("weekendtime3_1", dto.getAsString("weekendtime3_1"));
		updatedto.put("weekendtime3_2", dto.getAsString("weekendtime3_2"));
		updatedto.put("weekendtime2_p", dto.getAsString("weekendtime2_p"));
		updatedto.put("weekendtime2_2", dto.getAsString("weekendtime2_2"));
		updatedto.put("weekendtime1_p", dto.getAsString("weekendtime1_p"));
		updatedto.put("weekendtime1", dto.getAsString("weekendtime1"));

		updatedto.put("chuanche_zaodifeng",
				dto.getAsString("chuanche_zaodifeng"));
		updatedto.put("chuanche_zaogaofeng",
				dto.getAsString("chuanche_zaogaofeng"));
		updatedto
				.put("chuanche_pingfeng", dto.getAsString("chuanche_pingfeng"));
		updatedto.put("chuanche_wangaofeng",
				dto.getAsString("chuanche_wangaofeng"));
		updatedto.put("chuanche_wandifeng",
				dto.getAsString("chuanche_wandifeng"));

		updatedto.put("c", "1");
		updatedto.put("m_start", dto.getAsString("mpstarttime"));
		updatedto.put("m_end", dto.getAsString("mpendtime"));
		updatedto.put("runs", dto.getAsString("mpruns"));
		updatedto.put("inteval_avg", dto.getAsString("mpspaceavg"));
		updatedto.put("section_time_start", dto.getAsString("mpdstarttime"));
		updatedto.put("section_time_end", dto.getAsString("mpdendtime"));
		updatedto.put("section_runs", dto.getAsString("mpdruns"));
		updatedto.put("interval_avg_section", dto.getAsString("mpdspaceavg"));
		Dto dtoback1 = new BaseDto();
		dtoback1 = busDataService.saveBusDaysPlan(updatedto);
		System.out.println(dtoback1.toString());
		// List areaList =
		// g4Reader.queryForList("BusDataInput.updateBusDaysPlan",updatedto);
		Dto updatedtoe = new BaseDto();
		updatedtoe.put("upordown", dto.getAsString("sxx"));
		updatedtoe.put("date", dto.getAsString("date"));
		updatedtoe.put("comp_id", dto.getAsString("companyName"));
		updatedtoe.put("route_id", dto.getAsString("routeid"));
		updatedtoe.put("runs_day", dto.getAsString("runs_day"));
		updatedtoe.put("f_max_inrerval", dto.getAsString("maxspaceavg"));
		updatedtoe.put("p_rate", dto.getAsString("p_rate"));
		updatedtoe.put("section_id", dto.getAsString("station_id"));
		updatedtoe.put("num_yypeiche", dto.getAsString("num_yypeiche"));
		updatedtoe.put("num_guache", dto.getAsString("num_guache"));

		updatedtoe.put("c", "2");
		updatedtoe.put("m_start", dto.getAsString("epstarttime"));
		updatedtoe.put("m_end", dto.getAsString("ependtime"));
		updatedtoe.put("runs", dto.getAsString("epruns"));
		updatedtoe.put("inteval_avg", dto.getAsString("epspaceavg"));
		updatedtoe.put("section_time_start", dto.getAsString("epdstarttime"));
		updatedtoe.put("section_time_end", dto.getAsString("epdendtime"));
		updatedtoe.put("section_runs", dto.getAsString("epdruns"));
		updatedtoe.put("interval_avg_section", dto.getAsString("epdspaceavg"));

		updatedtoe.put("weekendtime3_p", dto.getAsString("weekendtime3_p"));
		updatedtoe.put("weekendtime3_1", dto.getAsString("weekendtime3_1"));
		updatedtoe.put("weekendtime3_2", dto.getAsString("weekendtime3_2"));
		updatedtoe.put("weekendtime2_p", dto.getAsString("weekendtime2_p"));
		updatedtoe.put("weekendtime2_2", dto.getAsString("weekendtime2_2"));
		updatedtoe.put("weekendtime1_p", dto.getAsString("weekendtime1_p"));
		updatedtoe.put("weekendtime1", dto.getAsString("weekendtime1"));

		updatedtoe.put("chuanche_zaodifeng",
				dto.getAsString("chuanche_zaodifeng"));
		updatedtoe.put("chuanche_zaogaofeng",
				dto.getAsString("chuanche_zaogaofeng"));
		updatedtoe.put("chuanche_pingfeng",
				dto.getAsString("chuanche_pingfeng"));
		updatedtoe.put("chuanche_wangaofeng",
				dto.getAsString("chuanche_wangaofeng"));
		updatedtoe.put("chuanche_wandifeng",
				dto.getAsString("chuanche_wandifeng"));
		// List areaListe =
		// g4Reader.queryForList("BusDataInput.updateBusDaysPlan",updatedtoe);
		Dto dtoback = busDataService.saveBusDaysPlan(updatedtoe);
		System.out.println(dtoback.toString());
		setOkTipMsg("数据修改成功", response);
		return mapping.findForward(null);
	}

	// 修改班次数据
	public ActionForward saveBusBanci(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		Dto dtoback = busDataService.updateBusBanci(dto);
		System.out.println(dtoback.toString());
		if("0".equals(dtoback.getAsString("x"))){
			setOkTipMsg("修改失败", response);
		}else{
			setOkTipMsg("修改成功", response);}
		return mapping.findForward(null);
	}

	// 修改班次数据
	public ActionForward deleteBusBanci(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		Dto dtoback = busDataService.deleteBusBanci(dto);
		if("0".equals(dtoback.getAsString("x"))){
			setOkTipMsg("删除失败", response);
		}else{
			setOkTipMsg("删除成功", response);}
		return mapping.findForward(null);
	}

	// 添加班次数据
	public ActionForward addBusBanci(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("1".equals(dto.getAsString("updown_name"))) {
			dto.put("sxx", "下行");
		} else {
			dto.put("sxx", "上行");
		}
		Dto dtoback = busDataService.addBusBanci(dto);
		setOkTipMsg("添加成功", response);
		return mapping.findForward(null);
	}
	
	//分等级加载公司
	public ActionForward queryCompanyDatasByClass(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		//loginuserid
		List areaList1 = g4Reader.queryForList("BusDataInput.queryloginusersdeptid",
				dto);
		Dto d = (Dto) areaList1.get(0);
		String deptid = d.getAsString("deptid");
		
		List areaList = null;
		if("001".equals(deptid)){
			areaList = g4Reader.queryForList("Bus.queryCompanyDatas", dto);
		}else{
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList("BusDataInput.queryCompanyDatasByClass", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	//分等级加载线路
	public ActionForward queryrouteDatasByClass(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		//loginuserid
		List areaList1 = g4Reader.queryForList("BusDataInput.queryloginusersdeptid",
				dto);
		Dto d = (Dto) areaList1.get(0);
		String deptid = d.getAsString("deptid");
		List areaList = null;
		System.out.println(deptid.length());
		
		if("001".equals(deptid)){
			areaList = g4Reader.queryForList("Bus.queryrouteDatas", dto);
		}else if(deptid.length()==6){
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList("BusDataInput.queryrouteDatasByClassCompany", dto);
		}else if(deptid.length()==9){
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList("BusDataInput.queryrouteDatasByClassTeam", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
}
