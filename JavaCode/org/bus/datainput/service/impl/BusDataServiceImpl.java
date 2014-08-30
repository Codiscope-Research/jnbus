package org.bus.datainput.service.impl;

import org.bus.datainput.service.BusDataService;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.model.service.impl.BizServiceImpl;
import org.g4studio.demo.service.DemoService;
import org.g4studio.system.common.util.idgenerator.IDHelper;

public class BusDataServiceImpl	 extends BizServiceImpl implements BusDataService  {
	/**
	 * 保存plan2表工作日计划
	 */
	public Dto saveBusDaysPlan(Dto dto) {
		Dto outDto = new BaseDto();
		String xmid = IDHelper.getXmID();
		int x = g4Dao.update("BusDataInput.updateBusDaysPlan", dto);
		outDto.put("xmid",xmid);
		outDto.put("intid", x);
		System.out.println(xmid+"");
		System.out.println(outDto.toString()+"");
		return outDto;
	}
	/**
	 * 插入plan2表工作日计划
	 */
	public Dto insertBusDaysPlan(Dto dto) {
		Dto outDto = new BaseDto();
		String xmid = IDHelper.getXmID();
		g4Dao.insert("BusDataInput.insertBusDaysPlanKong", dto);
		outDto.put("xmid",xmid);
		return outDto;
	}
	@Override
	public Dto updateBusBanci(Dto dto) {
		Dto outDto = new BaseDto();
		String xmid = IDHelper.getXmID();
		int x = g4Dao.update("BusDataInput.updateBusBanci", dto);
		outDto.put("xmid",xmid);
		outDto.put("intid", x);
		return outDto;
	}
	@Override
	public Dto deleteBusBanci(Dto dto) {
		Dto outDto = new BaseDto();
		String xmid = IDHelper.getXmID();
		int x = g4Dao.delete("BusDataInput.deleteBusBanci", dto);
		outDto.put("xmid",xmid);
		outDto.put("intid", x);
		return outDto;
	}
	@Override
	public Dto addBusBanci(Dto dto) {
		Dto outDto = new BaseDto();
		String xmid = IDHelper.getXmID();
		g4Dao.insert("BusDataInput.addBusBanci", dto);
		outDto.put("xmid",xmid);
		return outDto;
	}

	}
