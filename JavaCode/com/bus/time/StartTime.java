package com.bus.time;

import java.util.Timer;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class StartTime implements ServletContextListener {

	public void contextDestroyed(ServletContextEvent arg0) {
	}

	public void contextInitialized(ServletContextEvent arg0) {
		  Timer timer = new Timer();
	        MissionTime11 missionTime = new MissionTime11();
	        timer.schedule(missionTime, 0, 3600*1000*12);
	}

}
