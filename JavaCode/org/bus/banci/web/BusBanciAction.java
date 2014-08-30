package org.bus.banci.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.util.G4Constants;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;

/**
 * 
 * @author ToDoU
 * 
 */
public class BusBanciAction extends BizAction {
	// 获取班次表里面的时间范围
	public ActionForward getbanci_table_daterange(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String maxtable = (String)g4Reader.queryForObject(
					"BusBanci.table_banci_xxxx_max");
		System.out.println(maxtable);
		dto.put("maxtable", maxtable);
		List areaListmax = g4Reader.queryForList(
				"BusBanci.getbanci_table_maxdate", dto);
		String maxdate = ((Dto) (areaListmax.get(0))).getAsString("date");
		List areaListmin = g4Reader.queryForList(
				"BusBanci.getbanci_table_mindate", dto);
		String mindate = ((Dto) (areaListmin.get(0))).getAsString("date");
		setOkTipMsg(mindate + "~" + maxdate, response);
		return mapping.findForward(null);
	}

	// 班次执行
	public ActionForward queryBanciExecute(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String datetime = dto.getAsString("datetime");
		StringBuilder s = new StringBuilder("tb_banci_");
		String[] datetimes = datetime.split("-");
		s.append(datetimes[0]);
		s.append(datetimes[1]);
		dto.put("table", s);
		List list = g4Reader.queryForPage("BusBanci.queryBanciExecute", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject(
				"BusBanci.countqueryBanciExecute", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger,
				G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	// 班次执行情况
	public ActionForward queryBanciExecuteInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryBanciExecuteInitView");
	}

	// 计划间隔
	public ActionForward queryBanciJianGePlan(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		String datetime = dto.getAsString("date");
		StringBuilder s = new StringBuilder("tb_fsjiange_");
		String[] datetimes = datetime.split("-");
		s.append(datetimes[0]);
		s.append(datetimes[1]);
		dto.put("table", s);
		List list = g4Reader.queryForPage("BusBanci.queryBanciJianGePlan", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject(
				"BusBanci.countqueryBanciJianGePlan", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger,
				G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	public ActionForward queryBanciJianGePlanInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryBanciJianGePlanInitView");
	}

	/**
	 * 分公司查询班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryCompanyBanci(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = null;
		if ("1".equals(dto.getAsString("week"))) {
			areaList = g4Reader.queryForList("BusBanci.queryCompanyBanci", dto);
		} else {
			areaList = g4Reader
					.queryForList("BusBanci.queryCompanyBanciW", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 查询分公司的班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryCompanyBanciInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryCompanyBanciInitView");
	}

	// 分等级加载公司
	public ActionForward queryCompanyDatasByClass(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		// loginuserid
		List areaList1 = g4Reader.queryForList(
				"BusBanci.queryloginusersdeptid", dto);
		Dto d = (Dto) areaList1.get(0);
		String deptid = d.getAsString("deptid");

		List areaList = null;
		if ("001".equals(deptid)) {
			areaList = g4Reader.queryForList("Bus.queryCompanyDatas", dto);
		} else {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BusBanci.queryCompanyDatasByClass", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	public ActionForward queryCompanyFlatPeakInterval(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryCompanyFlatPeakInterval", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 平峰发车间隔公司
	public ActionForward queryCompanyFlatPeakIntervalInfo(
			ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryCompanyFlatPeakIntervalInfo", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 平峰发车间隔公司情况
	public ActionForward queryCompanyFlatPeakIntervalInit(
			ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryCompanyFlatPeakIntervalInitView");
	}

	// 班次月超车情况
	public ActionForward queryCompanyOver(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);

		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList("BusBanci.queryCompanyOver", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 班次月超车
	public ActionForward queryCompanyOverInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryCompanyOverInitView");
	}

	public ActionForward queryCompanyPeakSection(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryCompanyPeakSection", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 公司高峰断面点击跳转的详细信息
	public ActionForward queryCompanyPeakSectionInfo(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryCompanyPeakSectionInfo", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 断面车次情况公司
	public ActionForward queryCompanyPeakSectionInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryCompanyPeakSectionInitView");
	}

	// 平峰发车间隔线路情况
	public ActionForward queryFlatTeamInfo(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryRouteFlatPeakInterval", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 线路班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRouteBanci(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = null;
		if ("1".equals(dto.getAsString("week"))) {
			areaList = g4Reader.queryForList("BusBanci.queryRouteBanci", dto);
		} else {
			areaList = g4Reader.queryForList("BusBanci.queryRouteBanciW", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 线路班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryRouteBanciInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryRouteBanciInitView");
	}

	// 分等级加载线路
	public ActionForward queryrouteDatasByClass(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.toString());
		// loginuserid
		List areaList1 = g4Reader.queryForList(
				"BusBanci.queryloginusersdeptid", dto);
		Dto d = (Dto) areaList1.get(0);
		String deptid = d.getAsString("deptid");
		List areaList = null;
		System.out.println(deptid.length());

		if ("001".equals(deptid)) {
			areaList = g4Reader.queryForList("Bus.queryrouteDatas", dto);
		} else if (deptid.length() == 6) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BusBanci.queryrouteDatasByClassCompany", dto);
		} else if (deptid.length() == 9) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BusBanci.queryrouteDatasByClassTeam", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 平峰间隔线路情况
	public ActionForward queryRouteFlatPeakIntervalInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryRouteFlatPeakIntervalInitView");
	}

	// 班次月超车情况
	public ActionForward queryRouteOver(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList("BusBanci.queryRouteOver", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 班次月超车
	public ActionForward queryRouteOverInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryRouteOverInitView");
	}

	public ActionForward queryRoutePeakSection(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList("BusBanci.queryRoutePeakSection",
				dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 断面车次情况线路
	public ActionForward queryRoutePeakSectionInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryRoutePeakSectionInitView");
	}

	/**
	 * 路队查询班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryTeamBanci(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = null;
		if ("1".equals(dto.getAsString("week"))) {
			areaList = g4Reader.queryForList("BusBanci.queryTeamBanci", dto);
		} else {
			areaList = g4Reader.queryForList("BusBanci.queryTeamBanciW", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 路队班次情况
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryTeamBanciInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryTeamBanciInitView");
	}

	/**
	 * 根据公司查路队
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward queryteamDatas(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("BusBanci.queryteamDatas", dto);
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
				"BusBanci.queryloginusersdeptid", dto);
		Dto d = (Dto) areaList1.get(0);
		String deptid = d.getAsString("deptid");
		List areaList = null;
		System.out.println(deptid.length());

		if ("001".equals(deptid)) {
			areaList = g4Reader.queryForList("BusBanci.queryteamDatas", dto);
		} else if (deptid.length() == 6) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList("BusBanci.queryteamDatas", dto);
		} else if (deptid.length() == 9) {
			dto.put("deptid", deptid);
			areaList = g4Reader.queryForList(
					"BusBanci.queryTeamDatasByClassTeam", dto);
		}
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	public ActionForward queryTeamFlatPeakInterval(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryTeamFlatPeakInterval", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 平峰发车间隔路队
	public ActionForward queryTeamFlatPeakIntervalInfo(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryTeamFlatPeakIntervalInfo", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 平峰发车间隔路队情况
	public ActionForward queryTeamFlatPeakIntervalInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryTeamFlatPeakIntervalInitView");
	}

	// 班次月超车情况
	public ActionForward queryTeamOver(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList("BusBanci.queryTeamOver", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 班次月超车
	public ActionForward queryTeamOverInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryTeamOverInitView");
	}

	public ActionForward queryTeamPeakSection(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList("BusBanci.queryTeamPeakSection",
				dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 路队高峰断面点击跳转的详细信息
	public ActionForward queryTeamPeakSectionInfo(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		if ("".equals(dto.getAsString("date2"))) {
			dto.put("date2", dto.getAsString("date1"));
		}
		List areaList = g4Reader.queryForList(
				"BusBanci.queryTeamPeakSectionInfo", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 断面车次情况路队
	public ActionForward queryTeamPeakSectionInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryTeamPeakSectionInitView");
	}

	// 双休日班次
	public ActionForward queryWeekendBanci(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader
				.queryForList("BusBanci.queryWeekendBanci", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		write(jsonString, response);
		return mapping.findForward(null);
	}

	// 双休日班次
	public ActionForward queryWeekendBanciInit(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return mapping.findForward("queryWeekendBanciInitView");
	}

}
