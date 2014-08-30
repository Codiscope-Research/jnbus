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

public class HotPointServlet extends HttpServlet {

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
		String routeId=request.getParameter("routeId");
		ConnectionMySql conn=new ConnectionMySql();
		
		List<LoadStatistics> list_sta=conn.getPassenger_List(routeId);
		String restr="";
		if(list_sta!=null&&list_sta.size()>0){
			for(int i=0;i<list_sta.size();i++){
				LoadStatistics sta=list_sta.get(i);
				restr=restr+"baidu_lng="+sta.getLongiTude()+"@";
				restr=restr+"baidu_lat="+sta.getLatiTude()+"@";
				restr=restr+"p_down="+sta.getP_down()+"|";
			}
		}
		out.write(restr);
	}

}
