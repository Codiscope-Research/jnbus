package org.g4studio.system.admin.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.g4studio.core.json.JsonHelper;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.model.SpringBeanLoader;
import org.g4studio.core.mvc.xstruts.action.ActionForm;
import org.g4studio.core.mvc.xstruts.action.ActionForward;
import org.g4studio.core.mvc.xstruts.action.ActionMapping;
import org.g4studio.core.util.G4Constants;
import org.g4studio.core.util.G4Utils;
import org.g4studio.core.web.BizAction;
import org.g4studio.core.web.CommonActionForm;
import org.g4studio.system.admin.service.OrganizationService;
import org.g4studio.system.admin.service.UserService;
import org.g4studio.system.common.dao.vo.UserInfoVo;

/**
 * 首页Action
 * 
 * @author XiongChun
 * @since 2010-01-13
 * @see BizAction
 */
public class IndexAction extends BizAction {
	
	private OrganizationService organizationService = (OrganizationService)SpringBeanLoader.getSpringBean("organizationService");

	/**
	 * 首页初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward indexInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setAttribute("sysTitle", getParamValue("SYS_TITLE", request));
		request.setAttribute("westTitle", getParamValue("WEST_NAVIGATE_TITLE", request));
		String viewString = "indexView";
		String appLayout = getParamValue("APP_LAYOUT", request);
		if (appLayout.equals(G4Constants.APP_LAYOUT_DESKTOP)) {
			viewString = "desktopView";
		}
        String userLayout = getSessionContainer(request).getUserInfo().getLayout();
        if (G4Utils.isNotEmpty(userLayout)) {
    		if (userLayout.equals(G4Constants.APP_LAYOUT_DESKTOP)) {
    			viewString = "desktopView";
    		}else {
    			viewString = "indexView";
    		}
		}
        
        List list = g4Reader.queryForList("Bus.querySiteName");
		Dto sites = new BaseDto();
		for(int i=0;i<list.size();i++){
			Dto t = (Dto) list.get(i);
			sites.put(t.getAsString("id"), t.getAsString("name"));
			
		}
		getServlet().getServletContext().setAttribute("siteNameList", sites);
		
		Dto timesection = new BaseDto();
//		for(int i=4;i<40;i++){
//			if(i%2==0){
//				timesection.put((i-3), i+":30-"+(i+1)+":00");
//			}
//			else{
//				
//				timesection.put((i-3), i+":00-"+(i)+":30");
//			}
//			
//			
//		}
//		
		timesection.put("3T", "4:30-5:00");
		timesection.put("4T", "5:00-5:30");
		timesection.put("5T", "5:30-6:00");
		timesection.put("6T", "6:00-6:30");
		timesection.put("7T", "6:30-7:00");
		timesection.put("8T", "7:00-7:30");
		timesection.put("9T", "7:30-8:00");
		timesection.put("10T", "8:00-8:30");
		timesection.put("11T", "8:30-9:00");
		timesection.put("12T", "9:00-9:30");
		timesection.put("13T", "9:30-10:00");
		timesection.put("14T", "10:00-10:30");
		timesection.put("15T", "10:30-11:00");
		timesection.put("16T", "11:00-11:30");
		timesection.put("17T", "11:30-12:00");
		timesection.put("18T", "12:00-12:30");
		timesection.put("19T", "12:30-13:00");
		timesection.put("20T", "13:00-13:30");
		timesection.put("21T", "13:30-14:00");
		timesection.put("22T", "14:00-14:30");
		timesection.put("23T", "14:30-15:00");
		timesection.put("24T", "15:00-15:30");
		timesection.put("25T", "16:30-17:00");
		timesection.put("26T", "17:00-17:30");
		timesection.put("27T", "17:30-18:00");
		timesection.put("28T", "18:00-18:30");
		timesection.put("29T", "18:30-19:00");
		timesection.put("30T", "19:00-19:30");
		timesection.put("31T", "19:30-20:00");
		timesection.put("32T", "20:00-20:30");
		timesection.put("33T", "20:30-21:00");
		timesection.put("34T", "21:00-21:30");
		timesection.put("35T", "21:30-22:00");
		timesection.put("36T", "22:00-22:30");
		timesection.put("37T", "22:30-23:00");
		timesection.put("38T", "23:00-23:30");
		timesection.put("39T", "23:30-00:00");
		timesection.put("40T", "00:00-00:30");
		timesection.put("41T", "00:30-01:00");
		timesection.put("42T", "01:00-01:30");
		getServlet().getServletContext().setAttribute("timesection", timesection);
		return mapping.findForward(viewString);
	}

	/**
	 * 欢迎页面初始化
	 * 
	 * @param
	 * @return
	 */
	public ActionForward preferencesInit(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		return mapping.findForward("welcomeView");
	}
	
	/**
	 * 保存用户自定义皮肤
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveUserTheme(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String theme = request.getParameter("theme");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("theme", theme);
		Dto outDto = organizationService.saveUserTheme(dto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 保存用户自定义布局
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveUserLayout(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String layout = request.getParameter("layout");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("layout", layout);
		Dto outDto = organizationService.saveUserLayout(dto);
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		userInfoVo.setLayout(layout);
		getSessionContainer(request).setUserInfo(userInfoVo);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 保存用户自定义桌面背景
	 * 
	 * @param
	 * @return
	 */
	public ActionForward saveUserBackground(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		Dto dto = new BaseDto();
		String background = request.getParameter("background");
		dto.put("userid", super.getSessionContainer(request).getUserInfo().getUserid());
		dto.put("background", background);
		Dto outDto = organizationService.saveUserBackground(dto);
		String jsonString = JsonHelper.encodeObject2Json(outDto);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 加载当前登录用户信息
	 * 
	 * @param
	 * @return
	 */
	public ActionForward loadUserInfo(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		Dto inDto = new BaseDto();
		G4Utils.copyPropFromBean2Dto(userInfoVo, inDto);
		Dto outDto = (BaseDto)g4Reader.queryForObject("User.getUserInfoByKey", inDto);
		outDto.remove("password");
		String jsonString = JsonHelper.encodeDto2FormLoadJson(outDto, null);
		write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 修改当前登录用户信息
	 * 
	 * @param
	 * @return
	 */
	public ActionForward updateUserInfo(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm)form;
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		UserService service = (UserService)getService("userService");
		Dto indDto = cForm.getParamAsDto(request);
		Dto outDto = new BaseDto(G4Constants.TRUE);
		outDto.put("flag", G4Constants.SUCCESS);
		String password = G4Utils.encryptBasedDes(indDto.getAsString("password2")); 
		if (password.equals(userInfoVo.getPassword())) {
			service.updateUserItem4IndexPage(indDto);
			outDto.put("flag", G4Constants.SUCCESS);
			userInfoVo.setPassword(G4Utils.encryptBasedDes(indDto.getAsString("password1")));
			getSessionContainer(request).setUserInfo(userInfoVo);
		}else {
			outDto.setSuccess(G4Constants.FALSE);
			outDto.put("flag", G4Constants.FAILURE);
		}
		write(outDto.toJson(), response);
		return mapping.findForward(null);
	}
	
	/**
	 * 解锁系统
	 * 
	 * @param
	 * @return
	 */
	public ActionForward unlockSystem(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm)form;
		UserInfoVo userInfoVo = getSessionContainer(request).getUserInfo();
		Dto indDto = cForm.getParamAsDto(request);
		String password = G4Utils.encryptBasedDes(indDto.getAsString("password"));
		Dto outDto = new BaseDto(G4Constants.TRUE);
		if (password.equals(userInfoVo.getPassword())) {
			outDto.put("flag", G4Constants.SUCCESS);
		}else {
			outDto.put("flag", G4Constants.FAILURE);
		}
		write(outDto.toJson(), response);
		return mapping.findForward(null);
	}

}
