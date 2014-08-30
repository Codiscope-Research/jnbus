package org.bus.runtime.web;

import java.sql.SQLException;
import java.util.List;

import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.model.SpringBeanLoader;
import org.g4studio.core.model.dao.Dao;
import org.g4studio.core.model.dao.Reader;



public class Test {

	public static void main(String[] args) throws SQLException {
		// TODO Auto-generated method stub
		Test t = new Test();
		//t.updateavg();
		t.updateall();
		//g4Reader.

	}
	
	
	public void updateall() throws SQLException{
		Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
		
		Dao dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
		
		int count =12506713;
		//count=10000;
		double num =Math.round(12506713/10000.0);
		System.out.println("s    "+num);
		
		int ci= (int)Math.rint(num);
		
		System.out.println("s    "+ci);
		Dto qDto = new BaseDto();
		for(int i=0;i<ci;i++){
			qDto.put("start", i*10000);
			qDto.put("limit", 10000);
			List list = g4Reader.queryForPage("Bus.addtimearea", qDto);
			//List list = g4Reader.queryForList("Bus.addtimearea", qDto);
			for(int n=0;n<list.size();n++){
				Dto d =(Dto) list.get(n);
				String[] arr = new String[3];
				arr=	d.getAsString("time").split("\\.");
				int h= Integer.parseInt(arr[0]);
				int m= Integer.parseInt(arr[1]);
				
				if(h==0)
					h=24;
				System.out.println("====    "+d.getAsString("time"));
				if(m>=30){
					d.put("timeinterval", (h-4)*2+1);
				}else{
					d.put("timeinterval", (h-4)*2);
				}
				System.out.println("xccc  "+d.getAsString("timeinterval"));
				dao.update("Bus.updateByjsb", d);
				
			}
			
		}
		
	}
	
	public void updateavg() throws SQLException{
		
		Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
		
		Dao dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
		
		
		int count =320339;
		//count=10000;
		double num =Math.round(count/10000.0);
		System.out.println("s    "+num);
		
		int ci= (int)Math.rint(num);
		
		System.out.println("s    "+ci);
		Dto qDto = new BaseDto();
		for(int i=0;i<ci;i++){
			qDto.put("start", i*10000);
			qDto.put("limit", 10000);
			List list = g4Reader.queryForPage("Bus.getavgtime", qDto);
			//List list = g4Reader.queryForList("Bus.addtimearea", qDto);
			for(int n=0;n<list.size();n++){
				Dto d =(Dto) list.get(n);
				String[] arr = new String[6];
				arr=	d.getAsString("time").split(":");
				int h= Integer.parseInt(arr[0]);
				int m= Integer.parseInt(arr[1]);
				
				if(h==0)
					h=24;
				System.out.println("====    "+d.getAsString("time"));
				if(m>=30){
					d.put("timeinterval", (h-4)*2+1);
				}else{
					d.put("timeinterval", (h-4)*2);
				}
				System.out.println("xccc  "+d.getAsString("timeinterval"));
				dao.update("Bus.updateByavg", d);
				
			}
			
		}
		
	}

}
