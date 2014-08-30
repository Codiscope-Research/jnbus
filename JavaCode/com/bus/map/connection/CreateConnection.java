package com.bus.map.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * @author Administrator
 *
 */
public class CreateConnection {

	/**
	 * @return
	 */
	public Connection getConnection(){
		Connection conn =null;
		String url = "jdbc:mysql://localhost:3306/bus";
		String userName = "root";
		String password = "1234";
		//String password = "111111";
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = (Connection) DriverManager.getConnection(url,userName,password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return conn;
		}
	
	/**
	 * @param conn
	 */
	public void Close(Connection conn ){
		if(conn!=null){
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
