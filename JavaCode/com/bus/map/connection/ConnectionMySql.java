package com.bus.map.connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.bus.po.LoadStatistics;
import com.bus.po.PlanMess;
import com.bus.po.Station;

public class ConnectionMySql {

	public List<Station> getStation_List(String station_name) {
		List<Station> list_sta = new ArrayList<Station>();
		Connection con = new CreateConnection().getConnection();
		Statement sql;
		try {
			sql = con.createStatement();
			String sqlstr = "select station_name,baidu_lng,baidu_lat,sjcc,route_count from station_info where station_name like '%"
					+ station_name + "%'";
			ResultSet result = sql.executeQuery(sqlstr);
			while (result.next()) {
				Station sta = new Station();
				sta.setStation_name(result.getString("station_name"));
				sta.setBaidu_lng(result.getString("baidu_lng"));
				sta.setBaidu_lat(result.getString("baidu_lat"));
				sta.setSjcc(result.getString("sjcc"));
				sta.setRoute_count(result.getString("route_count"));
				list_sta.add(sta);
			}
			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	public List<LoadStatistics> getTa_alert_List(String routeId,
			String start_date, String end_date) {
		List<LoadStatistics> list_sta = new ArrayList<LoadStatistics>();
		Connection con = new CreateConnection().getConnection();
		Statement sql;
		try {
			sql = con.createStatement();
			/*
			 * String sqlstr=" SELECT "+ " b.cs / a.qb * 100 AS la,"+ "
			 * a.station,m.station_name "+ "FROM"+ " (SELECT "+ " COUNT(1) AS
			 * qb,"+ " station "+ " FROM"+ " tb_alert_03_04 t "+ " WHERE
			 * t.ROUTEID ="+routeId+ " AND t.date >= '"+start_date+"' "+ " AND
			 * t.date <= '"+end_date+"' "+ " GROUP BY t.station) a "+ " LEFT
			 * JOIN "+ " (SELECT "+ " COUNT(1) AS cs,"+ " station "+ " FROM"+ "
			 * tb_alert_03_04 t "+ " WHERE t.ROUTEID = "+routeId+ " AND t.date >=
			 * '"+start_date+"' "+ " AND t.date <= '"+end_date+"' "+ " AND
			 * t.type = 31 "+ " GROUP BY t.station) b "+ " ON a.station =
			 * b.station LEFT JOIN (SELECT station_id,station_name FROM
			 * route_station_view WHERE route_id="+routeId+") m "+ "ON
			 * m.station_id = RIGHT(a.station, 3)+0";
			 */
			String sqlstr = " SELECT "
					+ "  a.cs  AS la,"
					+ "  a.station,m.station_name "
					+ "FROM"
					+ "  (SELECT "
					+ "    COUNT(1) AS cs,"
					+ "    station "
					+ "  FROM"
					+ "    tb_alert_03_04 t "
					+ "  WHERE t.ROUTEID ="
					+ routeId
					+ "   AND t.date >= '"
					+ start_date
					+ "' "
					+ "    AND t.date <= '"
					+ end_date
					+ "' "
					+ "      AND t.type = 31 "
					+ "  GROUP BY t.station) a "
					+ " LEFT JOIN (SELECT station_id,station_name FROM route_station_view WHERE route_id="
					+ routeId + ") m "
					+ "ON m.station_id = RIGHT(a.station, 3)+0";
			System.out.println(sqlstr);

			ResultSet result = sql.executeQuery(sqlstr);
			while (result.next()) {
				LoadStatistics sta = new LoadStatistics();
				sta.setStation(result.getString("station"));
				sta.setZ_cs(result.getString("la"));
				sta.setStation_name(result.getString("station_name"));
				list_sta.add(sta);
			}
			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	public List<LoadStatistics> getTa_alert_List(String routeId,
			String station, String start_date, String end_date, String fq_type) {
		List<LoadStatistics> list_sta = new ArrayList<LoadStatistics>();
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String start_time = "";
		String end_time = "";

		if ("01".equals(fq_type)) {

			start_time = "06:00:00";
			end_time = "08:30:00";
		} else if ("02".equals(fq_type)) {

			start_time = "08:30:00";
			end_time = "16:00:00";
		} else if ("03".equals(fq_type)) {

			start_time = "16:00:00";
			end_time = "18:30:00";
		}

		try {
			double z_cs = 0;
			int z_cs_sum = 0;
			int z_cs_10 = 0;
			int z_cs_20 = 0;
			int z_cs_30 = 0;
			sql = con.createStatement();
			String sqlstr = "SELECT "
					+ "  (t.nowvalue - t.standard)/t.standard*100 AS cs_num "
					+ " FROM " + "  tb_alert_03_04 t " + "WHERE t.ROUTEID ="
					+ routeId + "  AND t.station='" + station + "' "
					+ "  AND t.date >= '" + start_date + "' "
					+ "  AND t.date <= '" + end_date + "' "
					+ "  AND TIME_TO_SEC(t.time) >= TIME_TO_SEC('" + start_time
					+ "') " + "  AND TIME_TO_SEC(t.time) <= TIME_TO_SEC('"
					+ end_time + "') " + "  AND t.type = 31 ";
			System.out.println(sqlstr);
			ResultSet result = sql.executeQuery(sqlstr);
			while (result.next()) {
				z_cs_sum = z_cs_sum + 1;
				z_cs = Double.parseDouble(result.getString("cs_num"));
				if (z_cs < 10) {
					z_cs_10 = z_cs_10 + 1;
				} else if (z_cs >= 10 && z_cs <= 20) {
					z_cs_20 = z_cs_20 + 1;
				} else if (z_cs > 30) {
					z_cs_30 = z_cs_30 + 1;
				}
			}
			LoadStatistics sta = new LoadStatistics();
			sta.setRouteId(routeId);
			sta.setStation(station);
			if (z_cs_sum <= 0) {
				sta.setZ_cs_10(String.valueOf(0));
				sta.setZ_cs_20(String.valueOf(0));
				sta.setZ_cs_30(String.valueOf(0));
			} else {
				sta.setZ_cs_10(String.valueOf(z_cs_10 / z_cs_sum * 100));
				sta.setZ_cs_20(String.valueOf(z_cs_20 / z_cs_sum * 100));
				sta.setZ_cs_30(String.valueOf(z_cs_30 / z_cs_sum * 100));
			}
			list_sta.add(sta);

			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	public List<LoadStatistics> getTa_alert_MessList(String station,
			String start_date, String end_date, String fq_type, String bfb_type) {
		List<LoadStatistics> list_sta = new ArrayList<LoadStatistics>();
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String start_time = "";
		String end_time = "";

		if ("01".equals(fq_type)) {

			start_time = "06:00:00";
			end_time = "08:30:00";
		} else if ("02".equals(fq_type)) {

			start_time = "08:30:00";
			end_time = "16:00:00";
		} else if ("03".equals(fq_type)) {

			start_time = "16:00:00";
			end_time = "18:30:00";
		}

		String sql_cs_num = " and t1.cs_num < 10 ";
		if ("10".equals(bfb_type)) {

			sql_cs_num = " and t1.cs_num < 10 ";
		} else if ("20".equals(bfb_type)) {

			sql_cs_num = " and t1.cs_num >= 10 and t1.cs_num <= 20 ";
		} else if ("30".equals(bfb_type)) {

			sql_cs_num = " and t1.cs_num > 30 ";
		}

		try {
			sql = con.createStatement();
			String sqlstr = "SELECT "
					+ "  t1.rowid,"
					+ "  t1.routeid,"
					+ "  t1.productid,"
					+ "  t1.recordtype,"
					+ "  t1.station,"
					+ "  t2.station_name,"
					+ "  t1.id,"
					+ "  t1.date,"
					+ "  t1.time,"
					+ "  t1.longitude,"
					+ "  t1.latitude,"
					+ "  t1.service,"
					+ "  t1.standard,"
					+ "  t1.nowvalue,"
					+ "  t1.gpsspeed,"
					+ "  t1.direction "
					+ "FROM"
					+ "  (SELECT "
					+ "    (t.nowvalue - t.standard) / t.standard * 100 AS cs_num,"
					+ "    t.rowid,"
					+ "    t.routeid,"
					+ "    t.productid,"
					+ "    t.recordtype,"
					+ "    t.station,"
					+ "    t.id,"
					+ "    t.date,"
					+ "    t.time,"
					+ "    t.longitude,"
					+ "    t.latitude,"
					+ "    t.service,"
					+ "    t.standard,"
					+ "    t.nowvalue,"
					+ "    t.gpsspeed,"
					+ "    t.direction "
					+ "  FROM"
					+ "    tb_alert_03_04 t "
					+ "  WHERE t.ROUTEID = 165 "
					+ "    AND t.station = '"
					+ station
					+ "' "
					+ "    AND t.date >= '"
					+ start_date
					+ "' "
					+ "    AND t.date <= '"
					+ end_date
					+ "' "
					+ "    AND TIME_TO_SEC(t.time) >= TIME_TO_SEC('"
					+ start_time
					+ "') "
					+ "    AND TIME_TO_SEC(t.time) <= TIME_TO_SEC('"
					+ end_time
					+ "') "
					+ "    AND t.type = 31) t1 LEFT JOIN route_station_view t2 "
					+ " ON t2.route_id = t1.routeid "
					+ " AND t2.station_id = RIGHT(t1.station, 3)+0 "
					+ "WHERE 1=1 ";
			System.out.println(sqlstr + sql_cs_num);
			ResultSet result = sql.executeQuery(sqlstr + sql_cs_num);
			while (result.next()) {
				LoadStatistics sta = new LoadStatistics();
				sta.setRowid(result.getString("rowid"));
				sta.setRouteId(result.getString("routeid"));
				sta.setStation(result.getString("station"));
				sta.setDate(result.getString("date"));
				sta.setTime(result.getString("time"));
				sta.setStandard(result.getString("standard"));
				sta.setNowValue(result.getString("nowvalue"));
				sta.setLongiTude(result.getString("longitude"));
				sta.setLatiTude(result.getString("latitude"));
				sta.setStation_name(result.getString("station_name"));
				list_sta.add(sta);
			}

			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	/**
	 * 客流量查询
	 * 
	 * @param lng
	 * @param lat
	 * @param lng1
	 * @param lat1
	 * @return
	 */
	public List<LoadStatistics> getPassenger_List(String lng, String lat,
			String lng1, String lat1) {
		List<LoadStatistics> list_sta = new ArrayList<LoadStatistics>();
		Connection con = new CreateConnection().getConnection();
		Statement sql;
		try {
			sql = con.createStatement();
			String sqlstr = "SELECT t.route_id,t.station_id,t.station_name,t.baidu_lng,t.baidu_lat,t.sxx,t1.p_down,t1.p_up,t1.p_duan "
					+ " FROM route_station_view t LEFT JOIN sheet1 t1 "
					+ " ON t.route_id=t1.route_id AND t.station_id=t1.station_id WHERE "
					+ " t.baidu_lat>'"
					+ lat1
					+ "' AND t.baidu_lat<'"
					+ lat
					+ "' AND t.baidu_lng>'"
					+ lng
					+ "' AND t.baidu_lng<'"
					+ lng1 + "' order by t.route_id,t.station_id";
			ResultSet result = sql.executeQuery(sqlstr);
			while (result.next()) {
				LoadStatistics sta = new LoadStatistics();
				sta.setRouteId(result.getString("route_id"));
				sta.setStation(result.getString("station_id"));
				sta.setStation_name(result.getString("station_name"));
				sta.setLongiTude(result.getString("baidu_lng"));
				sta.setLatiTude(result.getString("baidu_lat"));
				sta.setSxx(result.getString("sxx"));
				sta.setP_down(result.getString("p_down"));
				sta.setP_up(result.getString("p_up"));
				sta.setP_duan(result.getString("p_duan"));
				list_sta.add(sta);
			}
			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	/**
	 * 查询所有站点坐标，以热力图的形式展示在地图中
	 * 
	 * @return
	 */
	public List<LoadStatistics> getPassenger_List(String routeId) {
		List<LoadStatistics> list_sta = new ArrayList<LoadStatistics>();
		Connection con = new CreateConnection().getConnection();
		Statement sql;
		try {
			sql = con.createStatement();
			String sqlstr = "SELECT   t.baidu_lng,  t.baidu_lat,  t1.p_down  FROM "
					+ "  route_station_view t "
					+ "  LEFT JOIN sheet1 t1 "
					+ "    ON t.route_id = t1.route_id "
					+ "    AND t.station_id = t1.station_id "
					+ " where t.route_id='"
					+ routeId
					+ "' "
					+ "    ORDER BY t.route_id," + "  t.station_id ";
			System.out.println(sqlstr);
			ResultSet result = sql.executeQuery(sqlstr);
			while (result.next()) {
				LoadStatistics sta = new LoadStatistics();
				sta.setLongiTude(result.getString("baidu_lng"));
				sta.setLatiTude(result.getString("baidu_lat"));
				sta.setP_down(result.getString("p_down"));
				list_sta.add(sta);
			}
			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list_sta;
	}

	/**
	 * 添加导入计划方法
	 * @param list_plan
	 */
	public void insertIntoPlanFace(List<PlanMess> list_plan) {
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		try {
			sql = con.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String insert = "";
		PlanMess planMess = null;
		for (int i = 0; i < list_plan.size(); i++) {
			planMess = list_plan.get(i);
			if(!"".equals(planMess.getNum_banci())&&!"".equals(planMess.getSeq_banci())){
				insert = "INSERT INTO tb_plan_fache_201405 " + "  VALUES " + " ('"
						+ planMess.getPlan_month() + "', " + "'"
						+ planMess.getRouteid() + "', "
						+ planMess.getNum_banci() + ", "
						+ planMess.getSeq_banci() + ", " + "    '"
						+ planMess.getD_time() + "', " + "    '"
						+ planMess.getA_time() + "', " + "    '"
						+ planMess.getInterval_time() + "', " + "    '"
						+ planMess.getStop_time() + "', " + "    '"
						+ planMess.getDisp_mode() + "', " + "    '"
						+ planMess.getSingle_miles() + "', " + "    '"
						+ planMess.getSingle_time() + "', " + "    '"
						+ planMess.getUpordown() + "', " + "    '"
						+ planMess.getEffec_icon() + "', " + "    '"
						+ planMess.getIsmain() + "' " + "  )";
	
				try {
					System.out.println(insert);
					sql.executeUpdate(insert);
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		try {
			sql.close();
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取部门组织信息
	 * @return
	 */
	public List<String> getComp_List(){
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		try {
			sql = con.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		List<String> comp_list= new ArrayList<String>();
		
		String comp_sql="SELECT deptid FROM eadept t WHERE t.deptname LIKE '%公司'";
		ResultSet result;
		try {
			result = sql.executeQuery(comp_sql);
			while (result.next()) {
				comp_list.add(result.getString(1));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			try {
				sql.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return comp_list;
	}

	/**
	 * 获取部门组织信息
	 * @return
	 */
	public List<String> getComp_teamList(){
		List<String> list_team= new ArrayList<String>();
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		try {
			sql = con.createStatement();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		String team_sql="SELECT  deptid FROM eadept t WHERE t.parentid IN (SELECT  deptid  FROM eadept t  WHERE t.deptname LIKE '%公司')";
		ResultSet result=null;
		Map<String,String> mapz=new HashMap<String,String>();
			try {
				result = sql.executeQuery(team_sql);
				while (result.next()) {
					list_team.add(result.getString(1));
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}finally{
				try {
					sql.close();
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		
		return list_team;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ConnectionMySql con = new ConnectionMySql();
		con.getTa_alert_List("165", "2014-03-25", "2014-03-25");
	}
}
