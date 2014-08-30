package com.bus.map.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bus.map.connection.ConnectionMySql;
import com.bus.po.LoadStatistics;

public class StatisticsServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		
		String start_date=request.getParameter("start_date");
		String end_date=request.getParameter("end_date");
		String routeId=request.getParameter("routeId");
		ConnectionMySql conn=new ConnectionMySql();
		List<LoadStatistics> list_sta=conn.getTa_alert_List(routeId, start_date, end_date);
		String restr="";
		if(list_sta!=null&&list_sta.size()>0){
			for(int i=0;i<list_sta.size();i++){
				LoadStatistics sta=list_sta.get(i);
				if(!"-1".equals(sta.getStation())&&"-1"!=sta.getStation()){
					restr=restr+"station="+sta.getStation()+"@";
					if(sta.getZ_cs()!=null){
						restr=restr+"route_count="+sta.getZ_cs()+"@";
					}else{
						restr=restr+"route_count=0|";
					}
					if("".equals(sta.getStation_name())||null==sta.getStation_name()){
						restr=restr+"station_name=-|";
					}else{
						restr=restr+"station_name="+sta.getStation_name()+"|";
					}
				}
			}
		}
		out.write(restr);
	}

}
