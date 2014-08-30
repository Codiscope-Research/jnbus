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

public class StatisticsTMBServlet extends HttpServlet {

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
		
		String fq_type=request.getParameter("fq_type");
		String start_date=request.getParameter("start_date");
		String end_date=request.getParameter("end_date");
		String routeId=request.getParameter("routeId");
		String station=request.getParameter("station");
		ConnectionMySql conn=new ConnectionMySql();
		List<LoadStatistics> list_sta=null;
		
		list_sta=conn.getTa_alert_List(routeId,station, start_date, end_date,fq_type);
		String restr="";
		if(list_sta!=null&&list_sta.size()>0){
			for(int i=0;i<list_sta.size();i++){
				LoadStatistics sta=list_sta.get(i);
				restr=restr+"station_name="+sta.getStation()+"@";
				restr=restr+"z_cs_10="+sta.getZ_cs_10()+"@";
				restr=restr+"z_cs_20="+sta.getZ_cs_20()+"@";
				restr=restr+"z_cs_30="+sta.getZ_cs_30();
			}
		}
		out.write(restr);
	}

}
