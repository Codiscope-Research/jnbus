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
public class SelectPassergerServlet extends HttpServlet {

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
		String lng=request.getParameter("lng");
		String lat=request.getParameter("lat");
		String lng1=request.getParameter("lng1");
		String lat1=request.getParameter("lat1");
		ConnectionMySql conn=new ConnectionMySql();
		
		List<LoadStatistics> list_sta=conn.getPassenger_List(lng, lat,lng1, lat1);
		String restr="";
		if(list_sta!=null&&list_sta.size()>0){
			for(int i=0;i<list_sta.size();i++){
				LoadStatistics sta=list_sta.get(i);
				restr=restr+"routeid="+sta.getRouteId()+"@";
				restr=restr+"station="+sta.getStation()+"@";
				restr=restr+"station_name="+sta.getStation_name()+"@";
				restr=restr+"baidu_lng="+sta.getLongiTude()+"@";
				restr=restr+"baidu_lat="+sta.getLatiTude()+"@";
				restr=restr+"sxx="+sta.getSxx()+"@";
				restr=restr+"p_down="+sta.getP_down()+"@";
				restr=restr+"p_up="+sta.getP_up()+"@";
				restr=restr+"p_duan="+sta.getP_duan()+"|";
			}
		}
		out.write(restr);
		
	}

}
