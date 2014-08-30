package com.bus.time;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimerTask;

import com.bus.map.connection.ConnectionMySql;

public class MissionTime11 extends TimerTask {

	private List<String> list_team=null;
	private List<String> list_comp=null;
	
	
	@Override
	public void run() {
		Date dt = new Date();
		SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat matter2 = new SimpleDateFormat("yyyy-MM-dd");
		if("10:30:00".equals(matter1.format(dt).substring(11, 19))){
			if(list_team==null){
				ConnectionMySql mysql=new ConnectionMySql();
				list_team=mysql.getComp_teamList();
			}
			if(list_comp==null){
				ConnectionMySql mysql=new ConnectionMySql();
				list_comp=mysql.getComp_List();
			}
			InsertTableMess insert=new InsertTableMess();
			
			// 班次月统计-公司
			insert.insertIntoBanci_month_comp(matter2.format(dt));
			
			// 班次月统计-路队
			insert.insertIntoBanci_month_team(matter2.format(dt), list_comp);
			
			// 班次月统计-线路
			insert.insertIntoBanci_month_route(matter2.format(dt), list_team);
			
			// 出车月统计-公司
			insert.insertIntochuche_month_comp(matter2.format(dt));
			
			// 出车月统计-路队
			insert.insertIntochuche_month_team(matter2.format(dt), list_comp);
			
			// 出车月统计-线路
			insert.insertIntochuche_month_route(matter2.format(dt), list_team);
			
			System.out.println("-----------------------------------voer------------------------------------------");
		}
	}

}
