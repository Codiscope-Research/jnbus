package org.bus.datainput.service;

import org.g4studio.core.metatype.Dto;

public interface BusDataService {
	/**
	 * 保存plan2计划表的数据
	 * @param dto
	 * @return
	 */
	public Dto saveBusDaysPlan(Dto dto);
	/**
	 * 当plan2没有当前计划时，添加一个没有值的计划
	 * @param dto
	 * @return
	 */
	public Dto insertBusDaysPlan(Dto dto);
	
	public Dto addBusBanci(Dto dto);
	
	public Dto deleteBusBanci(Dto dto);
	
	public Dto updateBusBanci(Dto dto);
	
	
	
	
	
}
