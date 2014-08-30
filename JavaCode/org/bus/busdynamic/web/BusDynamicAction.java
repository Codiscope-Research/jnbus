package org.bus.busdynamic.web;

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
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;

public class BusDynamicAction extends BizAction {
	//实时曲线测试
	public ActionForward testInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		return mapping.findForward("testInitView");
	}
	//实时表格查询
	public ActionForward testTableInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		return mapping.findForward("testTableInitView");
	}
	//实时班次执行表格界面初始化
	public ActionForward BusBanciExcuteDynamicTableInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		return mapping.findForward("BusBanciExcuteDynamicTableInitView");
	}
	
	//动态轨迹图界面初始化
		public ActionForward BusBanciTrailDynamicInit(ActionMapping mapping, ActionForm form,
				HttpServletRequest request, HttpServletResponse response)
				throws Exception {

			return mapping.findForward("BusBanciTrailDynamicInitView");
		}
		
		
	//实时曲线数据获取
	public ActionForward queryTest(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = g4Reader.queryForPage("BusBanci.queryBanciExecute", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject(
				"BusBanci.countqueryBanciExecute", dto);
		String jsonString = JsonHelper.encodeList2PageJson(list, countInteger,
				G4Constants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	public ActionForward queryTestTable(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		//System.out.println("____________"+dto.toString());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		String date = sdf.format(new Date());
		String s = date.substring(17,19);
		List list = new ArrayList();
		Dto dto1 = new BaseDto();
		dto1.put("num", s);
		dto1.put("dynamictime",date);
		list.add(dto1);
		String jsonString = JsonHelper.encodeObject2Json(list);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	//班次执行动态表格
	public ActionForward queryBusBanciExcuteDynamicTable(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		System.out.println(dto.getAsString("maxrowid"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String tb_banci_table = "tb_banci_"+sdf.format(new Date());
		System.out.println(tb_banci_table);
		List list = g4Reader.queryForList("BusDynamic.queryBusBanciExcuteDynamicTable", dto);
		String jsonString = JsonHelper.encodeObject2Json(list);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	
	//动态轨迹图
		public ActionForward queryBusBanciTrailDynamic(ActionMapping mapping,
				ActionForm form, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			CommonActionForm aForm = (CommonActionForm) form;
			Dto dto = aForm.getParamAsDto(request);
			String sxx = dto.getAsString("sxx");
			List list_station_num = g4Reader.queryForList("BusDynamic.queryBusBanciTrailDynamic_list_station_num", dto);
			String numshangxing=null,numxiaxing=null;
			for(int i = 0; i<list_station_num.size(); i++){
				Dto d = (Dto)list_station_num.get(i);
				if("上行".equals(d.getAsString("sxx"))){
					numshangxing = d.getAsString("station_count");	
				}else{
					numxiaxing = d.getAsString("station_count");
				}
			}
			if("上行".equals(dto.getAsString("sxx"))){
				dto.put("time1", Integer.parseInt(numxiaxing)+1);
				dto.put("time2", Integer.parseInt(numxiaxing)+Integer.parseInt(numshangxing));
			}else{
				dto.put("time1", 1);
				dto.put("time2", Integer.parseInt(numxiaxing));
			}
			List list = g4Reader.queryForList("BusDynamic.queryBusBanciTrailDynamic", dto);
			String jsonString = JsonHelper.encodeObject2Json(list);
			super.write(jsonString, response);
			return mapping.findForward(null);
		}
		
		//
	
}
