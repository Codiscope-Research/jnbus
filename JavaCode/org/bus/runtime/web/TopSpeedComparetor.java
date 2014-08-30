package org.bus.runtime.web;

import java.util.Comparator;

import org.g4studio.core.metatype.Dto;

public class TopSpeedComparetor implements Comparator {

	@Override
	public int compare(Object arg0, Object arg1) {
		// TODO Auto-generated method stub
		
		Dto p1 = (Dto) arg0;
		Dto p2 = (Dto) arg1;
		double num1;
		double num2;
		num1=Double.parseDouble(p1.getAsString("topspeed"));
		num2=Double.parseDouble(p2.getAsString("topspeed"));
		if((num1-num2)>0){
			return -1;
		}else if((num1-num2)==0){
			return 0;
			
		}else
		return 1;
	}

}
