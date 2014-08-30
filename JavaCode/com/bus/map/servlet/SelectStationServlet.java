package com.bus.map.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bus.map.connection.ConnectionMySql;
import com.bus.po.Station;

/**
 * 公交站点查询
 * @author jsl
 * DATE:2014-05-08
 *
 */
public class SelectStationServlet extends HttpServlet {

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
		
		String select_name=request.getParameter("select_name");
		//select_name=URLEncoder.encode(select_name,"GB2312");
		ConnectionMySql conn=new ConnectionMySql();
		List<Station> list_sta=conn.getStation_List(select_name);
		String restr="";
		if(list_sta!=null&&list_sta.size()>0){
			for(int i=0;i<list_sta.size();i++){
				Station sta=list_sta.get(i);
				restr=restr+"station_name="+sta.getStation_name()+"@";
				restr=restr+"baidu_lng="+sta.getBaidu_lng()+"@";
				restr=restr+"baidu_lat="+sta.getBaidu_lat()+"@";
				restr=restr+"sjcc="+sta.getSjcc()+"@";
				restr=restr+"route_count="+sta.getRoute_count()+"|";
			}
		}
		out.write(restr);
	}

}
