package com.bus.time;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import com.bus.map.connection.CreateConnection;

public class InsertTableMess {

	// 班次月统计-公司
	public void insertIntoBanci_month_comp(String date) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		try {
			sql = con.createStatement();
			String sqlStr = "insert into bancitj_month_comp SELECT "+
							"  base6.comp_id AS id,"+
							"  DATE_FORMAT(base6.date, '%Y-%m-%d') AS DATE,"+
							"  comp_name AS comp_id,"+
							"  runs_day,"+
							"  qrwc,"+
							"  ROUND(qrwc / runs_day * 100, 1) AS qrbfb,"+
							 " zg_jh,"+
							"  zg_wc,"+
							 " ROUND(zg_wc / zg_jh * 100, 1) AS zgbfb,"+
							 " wg_jh,"+
							 " wg_wc,"+
							"  ROUND(wg_wc / wg_jh * 100, 1) AS wgbfb,"+
							 " (zg_jh + wg_jh) AS gf_jh,"+
							"  (zg_wc + wg_wc) AS gfwc,"+
							 " ROUND((zg_wc + wg_wc) / (zg_jh + wg_jh) * 100, 2) AS gfbfb "+
							" FROM "+
							 " (SELECT "+
							"    base5.comp_id,"+
							 "   base5.date,"+
							"    comp_name,"+
							 "   qrwc,"+
							 "   runs_day,"+
							 "   zg_jh,"+
							 "   zg_wc,"+
							"    wg_jh "+
							 " FROM "+
							  "  (SELECT "+
							 "     base4.comp_id,"+
							  "    base4.date,"+
							  "    comp_name,"+
							 "    qrwc,"+
							 "     runs_day,"+
							 "     zg_jh,"+
							  "    zg_wc "+
							  "  FROM "+
							   "   (SELECT "+
							    "    base3.comp_id,"+
							   "     base3.date,"+
							    "    comp_name,"+
							    "    qrwc,"+
							   "     runs_day,"+
							   "     zg_jh "+
							   "   FROM "+
							   "     (SELECT "+
							    "      base2.comp_id,"+
							      "    base2.date,"+
							      "    comp_name,"+
							      "    qrwc,"+
							       "   runs_day "+
							      "  FROM "+
							       "   (SELECT "+
							       "     base.deptid AS comp_id,"+
							      "      zbc.date,"+
							       "     deptname AS comp_name,"+
							       "     realtotalrun AS qrwc "+
							       "   FROM "+
							       "     (SELECT "+
							       "       ee.deptid,"+
							        "      deptname "+
							        "    FROM "+
							       "      eadept ee "+
							       "     WHERE ee.deptname LIKE '%公司') base "+
							        "    LEFT JOIN "+
							        "      (SELECT "+
							        "        COUNT(*) AS realtotalrun,"+
							       "         DATE,"+
							        "        deptid "+
							        "      FROM "+
							        "        (SELECT "+
							        "          t.*,"+
							        "          m.deptid "+
							        "        FROM "+
							         "         tb_banci_201406 t "+
							        "          LEFT JOIN "+
							       "            (SELECT * "+
							       "             FROM "+
							      "                meta_dept_route) m "+
							        "            ON t.routeid = m.routeid "+
							      "          WHERE t.date = '"+date+"' "+
							      "            AND (t.error = '0' "+
							      "              OR t.error = '3')) aa "+
							      "        GROUP BY deptid) zbc "+
							      "        ON base.deptid = zbc.deptid) base2 "+
							     "     LEFT JOIN "+
							     "       (SELECT "+
							     "         a.date,"+
							     "         a.comp_id,"+
							     "         SUM(a.runs_day) AS runs_day "+
							     "       FROM "+
							      "        (SELECT "+
							      "          * "+
							      "        FROM "+
							     "           plan2_month t "+
							     "         WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
							     "           AND t.C = 1 "+
							     "           AND t.comp_id IN "+
							     "           (SELECT "+
							     "             d.DEPTID "+
							    "            FROM "+
							     "             eadept d "+
							    "            WHERE d.DEPTNAME LIKE '%公司')) a "+
							   "         GROUP BY a.comp_id) runsdayb "+
							    "        ON runsdayb.comp_id = base2.comp_id) base3 "+
							    "    LEFT JOIN "+
							     "     (SELECT "+
							      "      b.date,"+
							     "       b.comp_id,"+
							    "        SUM(b.runs) AS zg_jh "+
							    "      FROM "+
							    "        (SELECT "+
							    "          * "+
							    "        FROM "+
							    "          plan2_month t "+
							    "        WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
							    "          AND t.C = 1 "+
							     "         AND t.comp_id IN "+
							     "         (SELECT "+
							    "            d.DEPTID "+
							    "          FROM "+
							    "            eadept d "+
							     "         WHERE d.DEPTNAME LIKE '%公司')) b "+
							    "      GROUP BY b.comp_id) zgjhb "+
							     "     ON zgjhb.comp_id = base3.comp_id) base4 "+
							   "   LEFT JOIN "+
							   "     (SELECT "+
							    "      COUNT(*) AS zg_wc,"+
							    "      zgbc.deptid "+
							    "    FROM "+
							    "      (SELECT "+
							    "        bb.time,"+
							    "        bb.routename,"+
							    "        bb.deptid,"+
							    "        bb.date "+
							    "      FROM "+
							    "        (SELECT "+
							   "           t.*,"+
							   "           m.deptid,"+
							   "           m.routename "+
							   "         FROM "+
							   "           tb_banci_201406 t,"+
							    "          meta_dept_route m "+
							   "         WHERE t.date = '"+date+"' "+
							   "           AND (t.error = '0' "+
							   "             OR t.error = '3') "+
							   "           AND t.routeid = m.routeid) bb "+
							   "         LEFT JOIN "+
							   "           (SELECT "+
							  "              pp.C,"+
							  "              pp.m_start,"+
							  "              pp.m_end,"+
							 "               pp.route_id "+
							  "            FROM "+
							 "               plan2_month pp "+
							  "            WHERE pp.C = 1 "+
							 "               AND pp.date = SUBSTR('"+date+"', 1, 7)) cc "+
							 "             ON bb.routename = cc.route_id "+
							 "         WHERE bb.time BETWEEN cc.m_start "+
							 "           AND cc.m_end) zgbc "+
							 "       GROUP BY zgbc.deptid) zgwcb "+
							 "       ON zgwcb.deptid = base4.comp_id) base5 "+
							 "   LEFT JOIN "+
							 "     (SELECT "+
							 "       c.date,"+
							 "       c.comp_id,"+
							 "       SUM(c.runs) AS wg_jh "+
							 "     FROM "+
							 "       (SELECT * "+
							 "       FROM "+
							 "         plan2_month t "+
							 "       WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
							 "         AND t.C = 2 "+
							 "         AND t.comp_id IN "+
							 "         (SELECT "+
							 "           d.DEPTID "+
							 "         FROM "+
							 "           eadept d "+
							 "         WHERE d.DEPTNAME LIKE '%公司')) c "+
							"      GROUP BY c.comp_id) wgjhb "+
							 "     ON wgjhb.comp_id = base5.comp_id) base6 "+
							 " LEFT JOIN "+
							 "   (SELECT "+
							"      COUNT(*) wg_wc,"+
							 "     zgbc.deptid "+
							"    FROM "+
							 "     (SELECT "+
							 "       bb.time,"+
							 "       bb.routename,"+
							 "       bb.deptid,"+
							 "       bb.date "+
							"      FROM "+
							 "       (SELECT "+
							 "         t.*,"+
							 "         m.deptid,"+
							 "         m.routename "+
							 "       FROM "+
							 "         tb_banci_201406 t,"+
							 "         meta_dept_route m "+
							"        WHERE t.date = '"+date+"' "+
							"          AND (t.error = '0' "+
							 "           OR t.error = '3') "+
							 "         AND t.routeid = m.routeid) bb "+
							"        LEFT JOIN "+
							"          (SELECT "+
							"            pp.C,"+
							"            pp.m_start,"+
							"            pp.m_end,"+
							 "           pp.route_id "+
							"          FROM "+
							"            plan2_month pp "+
							"          WHERE pp.C = 2 "+
							"            AND pp.date = SUBSTR('"+date+"', 1, 7)) cc "+
							"          ON bb.routename = cc.route_id "+
							"      WHERE bb.time BETWEEN cc.m_start "+
							"        AND cc.m_end) zgbc "+
							"    GROUP BY zgbc.deptid) wgwcb "+
							"    ON wgwcb.deptid = base6.comp_id ";
			System.out.println("班次月统计-公司："+sqlStr);
			sql.executeUpdate(sqlStr);
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	// 班次月统计-路队
	public void insertIntoBanci_month_team(String date, List<String> list_comp) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String sqlStr ="";
		try {
			sql = con.createStatement();
			for(int i=0;i<list_comp.size();i++){
			sqlStr = "insert into bancitj_month_team SELECT "+
						"  base6.team_id AS id,"+
						"  deptname AS team_id,"+
						"  DATE_FORMAT(base6.date, '%Y-%m-%d') AS DATE,"+
						"  comp_id,"+
						"  runs_day,"+
						"  qrwc,"+
						"  ROUND(qrwc / runs_day * 100, 1) AS qrbfb,"+
						"  zg_jh,"+
						"  zg_wc,"+
						"  ROUND(zg_wc / zg_jh * 100, 1) AS zgbfb,"+
						"  wg_jh,"+
						"  wg_wc,"+
						"  ROUND(wg_wc / wg_jh * 100, 1) AS wgbfb "+
						" FROM "+
						"  (SELECT "+
						"    base5.team_id,"+
						"    deptname,"+
						"    base5.date,"+
						"    comp_id,"+
						"    runs_day,"+
						"    qrwc,"+
						"    zg_jh,"+
						"    wg_jh,"+
						"    zg_wc "+
						"  FROM "+
						"    (SELECT "+
						"      base4.team_id,"+
						"      deptname,"+
						"      base4.date,"+
						"      comp_id,"+
						"      runs_day,"+
						"      qrwc,"+
						"      zg_jh,"+
						"      wg_jh "+
						"    FROM "+
						"      (SELECT "+
						"        base3.team_id,"+
						"        deptname,"+
						"        base3.date,"+
						"        comp_id,"+
						"        runs_day,"+
						"        qrwc,"+
						"        zg_jh "+
						"      FROM "+
						"        (SELECT  "+
						"          base2.team_id,"+
						"          deptname,"+
						"          base2.date,"+
						"          base2.comp_id,"+
						"          runs_day,"+
						"          qrwc "+
						"        FROM "+
						"          (SELECT "+
						"            base.deptid AS team_id,"+
						"            base.deptname,"+
						"            zbc.realtotalrun AS qrwc,"+
						"            zbc.date,"+
						"            zbc.deptid AS comp_id "+
						"          FROM "+
						"            (SELECT "+
						"              ee.deptid,"+
						"              ee.deptname "+
						"            FROM "+
						"              eadept ee "+
						"            WHERE ee.PARENTID = '"+list_comp.get(i)+"') base "+
						"            LEFT JOIN "+
						"              (SELECT "+
						"                COUNT(*) AS realtotalrun,"+
						"                aa.date,"+
						"                deptid,"+
						"                teamname "+
						"              FROM "+
						"                (SELECT "+
						"                  t.*,"+
						"                  m.deptid,"+
						"                  m.teamname "+
						"                FROM "+
						"                  tb_banci_201406 t "+
						"                  LEFT JOIN "+
						"                    (SELECT "+
						"                      * "+
						"                    FROM "+
						"                      meta_dept_route) m "+
						"                    ON t.routeid = m.routeid "+
						"                WHERE t.date = '"+date+"' "+
						"                  AND (t.error = 0 "+
						"                    OR t.error = 3)) aa "+
						"              WHERE deptid = '"+list_comp.get(i)+"' "+
						"              GROUP BY teamname) zbc "+
						"              ON base.deptid = zbc.teamname) base2 "+
						"          LEFT JOIN "+
						"            (SELECT "+
						"              a.team_id,"+
						"              SUM(a.runs_day) AS runs_day "+
						"            FROM "+
						"              (SELECT "+
						"                * "+
						"              FROM "+
						"                plan2_month t "+
						"              WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
						"                AND t.C = 1 "+
						"                AND t.team_id IN "+
						"                (SELECT "+
						"                  ee.deptid AS team_id "+
						"                FROM "+
						"                  eadept ee "+
						"                WHERE ee.PARENTID = '"+list_comp.get(i)+"')) a "+
						"            GROUP BY a.team_id) qrwcb "+
						"            ON qrwcb.team_id = base2.team_id) base3 "+
						"        LEFT JOIN "+
						"          (SELECT "+
						"            b.team_id,"+
						"            SUM(b.runs) AS zg_jh "+
						"          FROM "+
						"            (SELECT "+
						"              * "+
						"            FROM "+
						"              plan2_month t "+
						"            WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
						"              AND t.C = 1 "+
						"              AND t.team_id IN "+
						 "             (SELECT "+
						 "               ee.deptid AS team_id "+
						"              FROM "+
						"                eadept ee "+
						"              WHERE ee.PARENTID = '"+list_comp.get(i)+"')) b "+
						"          GROUP BY b.team_id) zgjhb "+
						"          ON base3.team_id = zgjhb.team_id) base4 "+
						"      LEFT JOIN "+
						"        (SELECT "+
						"          c.team_id,"+
						"          SUM(c.runs) AS wg_jh "+
						"        FROM "+
						"          (SELECT "+
						"            * "+
						"          FROM "+
						"            plan2_month t "+
						"          WHERE t.date = SUBSTR('"+date+"', 1, 7) "+
						"            AND t.C = 2 "+
						"            AND t.team_id IN "+
						"            (SELECT "+
						"              ee.deptid AS team_id "+
						"            FROM "+
						"              eadept ee "+
						"            WHERE ee.PARENTID = '"+list_comp.get(i)+"')) c "+
						"        GROUP BY c.team_id) wgjhb "+
						"        ON wgjhb.team_id = base4.team_id) base5 "+
						"    LEFT JOIN "+
						"      (SELECT "+
						"        COUNT(*) zg_wc,"+
						"        zgbc.team_id "+
						 "     FROM "+
						 "       (SELECT "+
						"          bb.time,"+
						"          bb.routename,"+
						"          bb.team_id "+
						"        FROM "+
						"          (SELECT "+
						"            t.*,"+
						"            m.teamname AS team_id,"+
						"            m.deptid,"+
						"            m.routename "+
						"          FROM "+
						"            tb_banci_201406 t,"+
						"            meta_dept_route m "+
						"          WHERE t.date = '"+date+"' "+
						"            AND (t.error = '0' "+
						"              OR t.error = '3') "+
						"            AND t.routeid = m.routeid) bb "+
						"          LEFT JOIN "+
						"            (SELECT "+
						"              pp.C,"+
						"              pp.m_start,"+
						"              pp.m_end,"+
						"              pp.route_id "+
						"            FROM "+
						"              plan2_month pp "+
						"            WHERE pp.C = 1 "+
						"              AND pp.date = SUBSTR('"+date+"', 1, 7)) cc "+
						"            ON bb.routename = cc.route_id "+
						"        WHERE bb.deptid = '"+list_comp.get(i)+"' "+
						"          AND bb.time BETWEEN cc.m_start "+
						"          AND cc.m_end) zgbc "+
						"      GROUP BY zgbc.team_id) zgwcb "+
						"      ON zgwcb.team_id = base5.team_id) base6 "+
						"  LEFT JOIN "+
						"    (SELECT "+
						"      COUNT(*) wg_wc,"+
						"      wgbc.team_id "+
						"    FROM "+
						"      (SELECT "+
						"        bb.time,"+
						"        bb.routename,"+
						 "       bb.team_id "+
						"      FROM "+
						"        (SELECT "+
						"          t.*,"+
						"          m.teamname AS team_id,"+
						"          m.deptid,"+
						"          m.routename "+
						"        FROM "+
						"          tb_banci_201406 t,"+
						"          meta_dept_route m "+
						"        WHERE t.date = '"+date+"' "+
						"          AND (t.error = '0' "+
						"            OR t.error = '3') "+
						"          AND t.routeid = m.routeid) bb "+
						"        LEFT JOIN "+
						"          (SELECT "+
						"            pp.C,"+
						"            pp.m_start,"+
						"            pp.m_end,"+
						"            pp.route_id "+
						"          FROM "+
						"            plan2_month pp "+
						"          WHERE pp.C = 2 "+
						"            AND pp.date = SUBSTR('"+date+"', 1, 7)) cc "+
						"          ON bb.routename = cc.route_id "+
						"      WHERE bb.deptid = '"+list_comp.get(i)+"' "+
						"        AND bb.time BETWEEN cc.m_start "+
						"        AND cc.m_end) wgbc "+
						"    GROUP BY wgbc.team_id) wgwcb ON wgwcb.team_id = base6.team_id ";
			System.out.println("班次月统计-路队："+sqlStr);
			sql.executeUpdate(sqlStr);
			}
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// 班次月统计-线路
	public void insertIntoBanci_month_route(String date,List<String> list_team) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}

		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String sqlStr ="";
		try {
			sql = con.createStatement();
			for(int i=0;i<list_team.size();i++){
			sqlStr = "insert into bancitj_month_route SELECT "+
						"  (SELECT "+
						"    me.routename "+
						"  FROM "+
						"    meta_dept_route me "+
						"  WHERE me.routeid = t1.routeid) AS routeid,"+
						"  t1.team_id,"+
						"  DATE_FORMAT('"+date+"', '%Y-%m-%d') AS DATE,"+
						"  t1.runs_day,"+
						"  t2.qrwc,"+
						"  ROUND(t2.qrwc / t1.runs_day * 100, 1) AS qrbfb,"+
						"  t3.zg_jh,"+
						"  t3.zgwc,"+
						"  ROUND(t3.zgwc / t3.zg_jh * 100, 1) AS zgbfb,"+
						"  t4.wg_jh,"+
						"  t4.wgwc,"+
						"  ROUND(t4.wgwc / t4.wg_jh * 100, 1) AS wgbfb "+
						" FROM "+
						"  (SELECT "+
						"    mdr.routeid,"+
						"    pl.team_id,"+
						"    pl.date,"+
						"    pl.runs_day "+
						"  FROM "+
						"    plan2_month pl,"+
						"    meta_dept_route mdr "+
						"  WHERE pl.team_id = '"+list_team.get(i)+"' "+
						 "   AND pl.route_id = mdr.routename "+
						 "   AND pl.date = SUBSTR('"+date+"', 1, 7) "+
						"  GROUP BY pl.date,"+
						"    mdr.routeid,"+
						"    pl.runs_day) t1 "+
						"  LEFT JOIN "+
						"    (SELECT "+
						"      p.routeid,"+
						"      bc.date,"+
						 "     COUNT(1) AS qrwc "+
						"    FROM "+
						"      tb_banci_201406 bc,"+
						"      (SELECT "+
						"        mdr.routeid "+
						"      FROM "+
						"        plan2_month pl,"+
						"        meta_dept_route mdr "+
						"      WHERE pl.team_id = '"+list_team.get(i)+"' "+
						"        AND pl.date = SUBSTR('"+date+"', 1, 7) "+
						"        AND pl.route_id = mdr.routename "+
						"      GROUP BY mdr.routeid) p "+
						"    WHERE 1 = 1 "+
						"      AND p.routeid = bc.routeid "+
						"      AND bc.date = '"+date+"' "+
						"      AND (bc.error = '0' "+
						"        OR bc.error = '3') "+
						"    GROUP BY p.routeid,"+
						"      bc.date) t2 "+
						"    ON t1.routeid = t2.routeid "+
						"  LEFT JOIN "+
						"    (SELECT "+
						"      p.routeid,"+
						"      bc.date,"+
						"      p.runs AS zg_jh,"+
						"      COUNT(1) AS zgwc "+
						"    FROM "+
						"      tb_banci_201406 bc,"+
						"      (SELECT "+
						"        mdr.routeid,"+
						"        pl.m_start,"+
						"        pl.m_end,"+
						"        pl.runs "+
						"      FROM "+
						"        plan2_month pl,"+
						"        meta_dept_route mdr "+
						"      WHERE pl.team_id = '"+list_team.get(i)+"' "+
						"        AND pl.date = SUBSTR('"+date+"', 1, 7) "+
						"        AND pl.route_id = mdr.routename "+
						"        AND pl.c = '1' "+
						"      GROUP BY mdr.routeid) p "+
						"    WHERE 1 = 1 "+
						"      AND p.routeid = bc.routeid "+
						"      AND bc.date = '"+date+"' "+
						"      AND (bc.error = '0' "+
						"        OR bc.error = '3') "+
						"      AND bc.time BETWEEN p.m_start "+
						"      AND p.m_end "+
						"    GROUP BY p.routeid,"+
						"      bc.date,"+
						"      p.runs) t3 "+
						"    ON t1.routeid = t3.routeid "+
						"  LEFT JOIN "+
						"    (SELECT "+
						"      p.routeid,"+
						"      bc.date,"+
						"      p.runs AS wg_jh,"+
						"      COUNT(1) AS wgwc "+
						"    FROM "+
						"      tb_banci_201406 bc,"+
						"      (SELECT "+
						"        mdr.routeid,"+
						"        pl.m_start,"+
						 "       pl.m_end,"+
						 "       pl.runs "+
						 "     FROM "+
						"        plan2_month pl,"+
						"        meta_dept_route mdr "+
						"      WHERE pl.team_id = '"+list_team.get(i)+"' "+
						 "       AND pl.date = SUBSTR('"+date+"', 1, 7) "+
						"        AND pl.route_id = mdr.routename "+
						"        AND pl.c = '2' "+
						"      GROUP BY mdr.routeid) p "+
						"    WHERE 1 = 1 "+
						"      AND p.routeid = bc.routeid "+
						 "     AND bc.date = '"+date+"' "+
						 "     AND (bc.error = '0' "+
						 "       OR bc.error = '3') "+
						 "     AND bc.time BETWEEN p.m_start "+
						 "     AND p.m_end "+
						 "   GROUP BY p.routeid,"+
						 "     bc.date,"+
						"      p.runs) t4 "+
						"    ON t1.routeid = t4.routeid ";
			System.out.println("班次月统计-线路："+sqlStr);
			sql.executeUpdate(sqlStr);
			}
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// 出车月统计-公司
	public void insertIntochuche_month_comp(String date) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		try {
			sql = con.createStatement();
			String sqlStr = "insert into chuchetj_month_comp "+
							"  SELECT chuche0.comp_id,"+
							"  chuche0.date,"+
							"  c.deptname,"+
							"  zf_num_yypeiche,"+
							"  zf_num_guache,"+
							"  qr_out,"+
							"  zf_out,"+
							"  wf_out,"+
							"  chuche3.gf_out AS gf,"+
							"  (zf_out + wf_out) / (zf_num_yypeiche * 2) * 100 AS peichelv "+
							" FROM "+
							"  (SELECT "+
							"    al.comp_id,"+
							 "   al.date,"+
							 "   SUM(al.qr_out) AS qr_out "+
							 " FROM "+
							 "   (SELECT "+
							 "     a.comp_id,"+
							 "    a.routeid,"+
							 "   a.date,"+
							"      COUNT(*) AS qr_out "+
							"  FROM "+
							 "     (SELECT "+
							 "       pl.comp_id,"+
							 "       banci.date,"+
							 "       banci.routeid,"+
							  "      banci.productid "+
							  "    FROM "+
							  "      tb_banci_201406 banci,"+
							  "      (SELECT "+
							  "        comp_id,"+
							   "       m.routeid AS route_id "+
							   "     FROM "+
							    "      plan2_month p,"+
							    "      meta_dept_route m "+
							    "    WHERE p.comp_id IN "+
							   "       (SELECT "+
							    "        deptid "+
							   "       FROM "+
							   "         eadept t "+
							   "       WHERE t.DEPTNAME LIKE '%公司') "+
							    "      AND p.route_id = m.routename "+
							    "      AND p.date = substr('"+date+"',1,7)) pl "+
							    "  WHERE pl.route_id = banci.routeid "+
							    "    AND (banci.error = 0 "+
							    "      OR banci.error = 3) "+
							    "    AND banci.date = '"+date+"' "+
							    "  GROUP BY pl.comp_id,"+
							    "    banci.date,"+
							    "    banci.routeid,"+
							    "    banci.productid) a "+
							   " GROUP BY a.comp_id,a.date,"+
							   "   a.routeid) al "+
							 " GROUP BY al.comp_id,al.date) chuche0 "+
							"  LEFT JOIN "+
							"    (SELECT "+
							"      al.comp_id,"+
							"      SUM(al.zg_out) AS zf_out,"+
							"      SUM(al.num_yypeiche) AS zf_num_yypeiche,"+
							"      SUM(al.num_guache) AS zf_num_guache "+
							"    FROM "+
							"      (SELECT "+
							"        a.comp_id,"+
							"        a.routeid,"+
							"        COUNT(*) AS zg_out,"+
							"        a.num_yypeiche,"+
							 "       a.num_guache "+
							 "     FROM "+
							"        (SELECT "+
							"          pl.comp_id,"+
							"          banci.date,"+
							"          banci.routeid,"+
							"          pl.num_yypeiche,"+
							"          pl.num_guache,"+
							"          banci.productid,"+
							"          '1' AS c "+
							"        FROM "+
							"          tb_banci_201406 banci,"+
							"          (SELECT "+
							"            comp_id,"+
							"            m.routeid AS route_id,"+
							"            m_start,"+
							"            m_end,"+
							"            num_yypeiche,"+
							"            num_guache "+
							"          FROM "+
							"            plan2_month p,"+
							"            meta_dept_route m "+
							"          WHERE p.comp_id IN "+
							"            (SELECT "+
							"              deptid "+
							"            FROM "+
							"              eadept t "+
							"            WHERE t.DEPTNAME LIKE '%公司') "+
							"            AND p.route_id = m.routename "+
							"            AND p.date = substr('"+date+"',1,7) "+
							"            AND p.c = '1') pl "+
							"        WHERE pl.route_id = banci.routeid "+
							"          AND (banci.error = 0 "+
							"            OR banci.error = 3) "+
							"          AND banci.time BETWEEN pl.m_start "+
							"          AND pl.m_end "+
							"          AND banci.date = '"+date+"' "+
							"        GROUP BY pl.comp_id,"+
							"          banci.date,"+
							"          banci.routeid,"+
							"          banci.productid,"+
							"          pl.num_yypeiche,"+
							"          pl.num_guache) a "+
							"      GROUP BY a.comp_id,"+
							"        a.routeid,"+
							"        a.num_yypeiche,"+
							"        a.num_guache) al "+
							"    GROUP BY al.comp_id) chuche1 "+
							"    ON chuche0.comp_id = chuche1.comp_id "+
							"  LEFT JOIN "+
							"    (SELECT "+
							"      al.comp_id,"+
							"      SUM(al.zg_out) AS wf_out,"+
							"      SUM(al.num_yypeiche) AS wf_num_yypeiche,"+
							"      SUM(al.num_guache) AS wf_num_guache "+
							"    FROM "+
							"      (SELECT "+
							"        a.comp_id,"+
							"        a.routeid,"+
							"        COUNT(*) AS zg_out,"+
							"        a.num_yypeiche,"+
							"        a.num_guache "+
							"      FROM "+
							"        (SELECT "+
							"          pl.comp_id,"+
							 "         banci.date,"+
							"          banci.routeid,"+
							"         pl.num_yypeiche,"+
							 "         pl.num_guache,"+
							 "         banci.productid,"+
							 "         '2' AS c "+
							  "      FROM "+
							 "         tb_banci_201406 banci,"+
							 "         (SELECT "+
							 "           comp_id,"+
							 "           m.routeid AS route_id,"+
							 "           m_start,"+
							 "           m_end,"+
							 "           num_yypeiche,"+
							 "           num_guache "+
							 "         FROM "+
							     "       plan2_month p,"+
							     "       meta_dept_route m "+
							     "     WHERE p.comp_id IN "+
							     "       (SELECT "+
							      "        deptid "+
							      "      FROM "+
							      "        eadept t "+
							      "      WHERE t.DEPTNAME LIKE '%公司') "+
							      "      AND p.route_id = m.routename "+
							      "      AND p.date = substr('"+date+"',1,7) "+
							      "      AND p.c = '2') pl "+
							     "   WHERE pl.route_id = banci.routeid "+
							     "     AND (banci.error = 0 "+
							     "       OR banci.error = 3) "+
							    "      AND banci.time BETWEEN pl.m_start "+
							    "      AND pl.m_end "+
							   "       AND banci.date = '"+date+"' "+
							   "     GROUP BY pl.comp_id,"+
							   "       banci.date,"+
							 "         banci.routeid,"+
							  "        banci.productid,"+
							  "        pl.num_yypeiche,"+
							  "        pl.num_guache) a "+
							  "    GROUP BY a.comp_id,"+
							  "      a.routeid,"+
							  "      a.num_yypeiche,"+
							  "      a.num_guache) al "+
							 "   GROUP BY al.comp_id) chuche2 "+
							 "   ON chuche1.comp_id = chuche2.comp_id "+
							 " LEFT JOIN "+
							  "  (SELECT  "+
							   "   comp_id,"+
							    "  COUNT(1) AS gf_out "+
							   " FROM "+
							    "  (SELECT "+
							     "   comp_id,"+
							     "   routeid,"+
							     "   productid "+
							     " FROM "+
							      "  (SELECT "+
							       "   pl.comp_id,"+
							       "   banci.date,"+
							       "   banci.routeid,"+
							       "   banci.productid,"+
							       "   '1' AS c "+
							       " FROM "+
							        "  tb_banci_201406 banci,"+
							         " (SELECT "+
							         "   comp_id,"+
							         "   m.routeid AS route_id,"+
							         "   p.m_start,"+
							         "   p.m_end,"+
							         "   p.num_yypeiche,"+
							        "    p.num_guache "+
							        "  FROM "+
							        "    plan2_month p,"+
							        "    meta_dept_route m "+
							        "  WHERE p.comp_id IN "+
							        "    (SELECT "+
							         "     deptid "+
							         "   FROM "+
							         "     eadept t "+
							        "    WHERE t.DEPTNAME LIKE '%公司') "+
							         "   AND p.route_id = m.routename "+
							        "    AND p.date = substr('"+date+"',1,7) "+
							        "    AND p.c = '1') pl "+
							      "  WHERE pl.route_id = banci.routeid "+
							        "  AND (banci.error = 0 "+
							       "     OR banci.error = 3) "+
							        "  AND banci.time BETWEEN pl.m_start "+
							        "  AND pl.m_end "+
							       "   AND banci.date = '"+date+"' "+
							      "  GROUP BY pl.comp_id,"+
							      "    banci.date,"+
							       "   banci.routeid,"+
							       "   banci.productid "+
							      "  UNION "+
							       " SELECT "+
							       "   pl.comp_id,"+
							       "   banci.date,"+
							       "   banci.routeid,"+
							       "   banci.productid,"+
							       "   '2' AS c "+
							      "  FROM "+
							      "    tb_banci_201406 banci,"+
							       "   (SELECT "+
							       "     comp_id,"+
							       "     m.routeid AS route_id,"+
							       "     p.m_start,"+
							       "     p.m_end,"+
							       "     p.num_yypeiche,"+
							       "     p.num_guache "+
							       "   FROM "+
							       "     plan2_month p,"+
							       "     meta_dept_route m "+
							       "   WHERE p.comp_id IN "+
							       "     (SELECT "+
							        "      deptid "+
							       "     FROM "+
							       "       eadept t "+
							       "     WHERE t.DEPTNAME LIKE '%公司') "+
							      "      AND p.route_id = m.routename "+
							     "       AND p.date = substr('"+date+"',1,7) "+
							     "       AND p.c = '2') pl "+
							    "    WHERE pl.route_id = banci.routeid "+
							   "       AND (banci.error = 0 "+
							   "         OR banci.error = 3) "+
							   "       AND banci.time BETWEEN pl.m_start "+
							    "      AND pl.m_end "+
							  "        AND banci.date = '"+date+"' "+
							   "     GROUP BY pl.comp_id,"+
							 "         banci.date,"+
							  "        banci.routeid,"+
							 "         banci.productid) a "+
							  "    GROUP BY comp_id,"+
							 "       routeid,"+
							 "       productid) b "+
							 "   GROUP BY b.comp_id) chuche3 "+
							 "   ON chuche1.comp_id = chuche3.comp_id "+
							 " LEFT JOIN "+
							  "  (SELECT "+
							  "    deptid,"+
							  "    DEPTNAME "+
							  "  FROM "+
							  "    eadept t "+
							  "  WHERE t.deptname LIKE '%公司') c "+
							   " ON chuche1.comp_id = c.deptid ";
			System.out.println("出车月统计-公司:"+sqlStr);
			sql.executeUpdate(sqlStr);
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// 出车月统计-路队
	public void insertIntochuche_month_team(String date, List<String> list_comp) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String sqlStr ="";
		try {
			sql = con.createStatement();
			for(int i=0;i<list_comp.size();i++){
				sqlStr = "insert into chuchetj_month_team SELECT "+
				"  chuche0.comp_id,"+
				"  chuche1.team_id,"+
				"  c.deptname,"+
				"  chuche0.date,"+
				"  zf_num_yypeiche,"+
				"  zf_num_guache,"+
				 " qr_out,"+
				"  zf_out,"+
				"  wf_out,"+
				"  chuche3.gf_out AS gf,"+
				"  (zf_out + wf_out) / (zf_num_yypeiche * 2) * 100 AS peichelv "+
				" FROM "+
				"  (SELECT "+
				"    al.comp_id,"+
				"    al.team_id,"+
				"    al.date,"+
				"    SUM(al.qr_out) AS qr_out "+
				"  FROM "+
				"    (SELECT "+
				"      a.comp_id,"+
				"      a.team_id,"+
				"      a.routeid,"+
				"      a.date,"+
				 "     COUNT(*) AS qr_out "+
				 "   FROM "+
				  "    (SELECT "+
				  "      pl.comp_id,"+
				  "      pl.team_id,"+
				  "      banci.date,"+
				  "      banci.routeid,"+
				  "      banci.productid "+
				  "    FROM "+
				   "     tb_banci_201406 banci,"+
				  "      (SELECT "+
				  "        p.comp_id,"+
				  "        p.team_id,"+
				   "       m.routeid AS route_id "+
				  "      FROM "+
				  "        plan2_month p,"+
				  "        meta_dept_route m "+
				  "      WHERE p.team_id IN "+
				  "        (SELECT "+
				 "           deptid "+
				 "         FROM "+
				 "           eadept t "+
				 "         WHERE t.parentid = '"+list_comp.get(i)+"') "+
				  "        AND p.route_id = m.routename "+
				 "         AND p.date = substr('"+date+"',1,7)) pl "+
				 "     WHERE pl.route_id = banci.routeid "+
				 "       AND (banci.error = 0 "+
				 "         OR banci.error = 3) "+
				 "       AND banci.date = '"+date+"' "+
				 "     GROUP BY pl.comp_id,pl.team_id,"+
				  "      banci.date,"+
				 "       banci.routeid,"+
				 "       banci.productid) a "+
				"    GROUP BY a.comp_id,a.team_id,"+
				 "     a.routeid,a.date) al "+
				 " GROUP BY al.comp_id,al.team_id,al.date) chuche0 "+
				"  LEFT JOIN "+
				 "   (SELECT "+
				 "     al.team_id,"+
				 "     SUM(al.zg_out) AS zf_out,"+
				 "     SUM(al.num_yypeiche) AS zf_num_yypeiche,"+
				  "    SUM(al.num_guache) AS zf_num_guache "+
				 "   FROM "+
				  "    (SELECT "+
				  "      a.team_id,"+
				  "      a.routeid,"+
				 "       COUNT(*) AS zg_out,"+
				 "       a.num_yypeiche,"+
				 "       a.num_guache "+
				  "    FROM "+
				 "       (SELECT "+
				  "        pl.team_id,"+
				  "        banci.date,"+
				  "        banci.routeid,"+
				   "       pl.num_yypeiche,"+
				  "        pl.num_guache,"+
				  "        banci.productid,"+
				  "        '1' AS c "+
				  "      FROM "+
				  "        tb_banci_201406 banci,"+
				  "        (SELECT "+
				 "           team_id,"+
				 "           m.routeid AS route_id,"+
				   "         m_start,"+
				  "          m_end,"+
				   "         num_yypeiche,"+
				  "          num_guache "+
				  "        FROM "+
				  "          plan2_month p,"+
				   "         meta_dept_route m "+
				  "        WHERE p.team_id IN "+
				  "          (SELECT "+
				  "            deptid "+
				  "          FROM "+
				 "             eadept t "+
				   "         WHERE t.parentid = '"+list_comp.get(i)+"') "+
				  "          AND p.route_id = m.routename "+
				  "          AND p.date = substr('"+date+"',1,7) "+
				  "          AND p.c = '1') pl "+
				 "       WHERE pl.route_id = banci.routeid "+
				 "         AND (banci.error = 0 "+
				 "           OR banci.error = 3) "+
				 "         AND banci.time BETWEEN pl.m_start "+
				 "         AND pl.m_end "+
				 "         AND banci.date = '"+date+"' "+
				  "      GROUP BY pl.team_id,"+
				 "         banci.date,"+
				 "         banci.routeid,"+
				 "         banci.productid,"+
				"          pl.num_yypeiche,"+
				 "         pl.num_guache) a "+
				"      GROUP BY a.team_id,"+
				"        a.routeid,"+
				"        a.num_yypeiche,"+
				"        a.num_guache) al "+
				"    GROUP BY al.team_id) chuche1 "+
				"    ON chuche0.team_id = chuche1.team_id "+
				"  LEFT JOIN "+
				 "   (SELECT "+
				"      al.team_id,"+
				"      SUM(al.zg_out) AS wf_out,"+
				"      SUM(al.num_yypeiche) AS wf_num_yypeiche,"+
				"      SUM(al.num_guache) AS wf_num_guache "+
				 "   FROM "+
				 "     (SELECT "+
				 "       a.team_id,"+
				 "       a.routeid,"+
				 "       COUNT(*) AS zg_out,"+
				 "       a.num_yypeiche,"+
				 "       a.num_guache "+
				 "     FROM "+
				 "       (SELECT "+
				 "         pl.team_id,"+
				 "         banci.date,"+
				 "         banci.routeid,"+
				 "         pl.num_yypeiche,"+
				"          pl.num_guache,"+
				 "         banci.productid,"+
				 "         '2' AS c "+
				 "       FROM "+
				 "         tb_banci_201406 banci,"+
				 "         (SELECT "+
				 "           team_id,"+
				"            m.routeid AS route_id,"+
				 "           m_start,"+
				 "           m_end,"+
				 "           num_yypeiche,"+
				"            num_guache "+
				 "         FROM "+
				 "           plan2_month p,"+
				  "          meta_dept_route m "+
				  "        WHERE p.team_id IN "+
				 "           (SELECT "+
				  "            deptid "+
				 "           FROM "+
				 "             eadept t "+
				 "           WHERE t.parentid = '"+list_comp.get(i)+"') "+
				 "           AND p.route_id = m.routename "+
				 "           AND p.date = substr('"+date+"',1,7) "+
				 "           AND p.c = '2') pl "+
				 "       WHERE pl.route_id = banci.routeid "+
				"          AND (banci.error = 0 "+
				 "           OR banci.error = 3) "+
				 "         AND banci.time BETWEEN pl.m_start "+
				 "         AND pl.m_end "+
				 "         AND banci.date = '"+date+"' "+
				"        GROUP BY pl.team_id,"+
				 "         banci.date,"+
				"          banci.routeid,"+
				"          banci.productid,"+
				 "         pl.num_yypeiche,"+
				"          pl.num_guache) a "+
				"      GROUP BY a.team_id,"+
				"        a.routeid,"+
				"        a.num_yypeiche,"+
				"        a.num_guache) al "+
				"    GROUP BY al.team_id) chuche2 "+
				"    ON chuche1.team_id = chuche2.team_id "+
				"  LEFT JOIN "+
				"    (SELECT "+
				 "     team_id,"+
				"      COUNT(1) AS gf_out "+
				"    FROM "+
				"      (SELECT "+
				"        team_id,"+
				"        routeid,"+
				"        productid "+
				"      FROM "+
				"        (SELECT "+
				"          pl.team_id,"+
				"          banci.date,"+
				"          banci.routeid,"+
				"          banci.productid "+
				"        FROM "+
				"          tb_banci_201406 banci,"+
				"          (SELECT "+
				"            team_id,"+
				"            m.routeid AS route_id,"+
				"            m_start,"+
				"            m_end "+
				"          FROM "+
				"            plan2_month p,"+
				"            meta_dept_route m "+
				"          WHERE p.team_id IN "+
				"            (SELECT "+
				"              deptid "+
				"            FROM "+
				"              eadept t "+
				"            WHERE t.parentid = '"+list_comp.get(i)+"') "+
				"            AND p.route_id = m.routename "+
				"            AND p.date = substr('"+date+"',1,7) "+
				"            AND p.c = '1') pl "+
				"        WHERE pl.route_id = banci.routeid "+
				"          AND (banci.error = 0 "+
				"            OR banci.error = 3) "+
				"          AND banci.time BETWEEN pl.m_start "+
				"          AND pl.m_end "+
				"          AND banci.date = '"+date+"' "+
				"        GROUP BY pl.team_id,"+
				"          banci.date,"+
				"          banci.routeid,"+
				"          banci.productid "+
				"        UNION "+
				"        SELECT "+
				"          pl.team_id,"+
				"          banci.date,"+
				"          banci.routeid,"+
				"          banci.productid "+
				"        FROM "+
				"          tb_banci_201406 banci,"+
				"          (SELECT "+
				"            team_id,"+
				"            m.routeid AS route_id,"+
				"            m_start,"+
				"            m_end "+
				"          FROM "+
				"            plan2_month p,"+
				"            meta_dept_route m "+
				"          WHERE p.team_id IN "+
				"            (SELECT "+
				"              deptid "+
				"            FROM "+
				"              eadept t "+
				"            WHERE t.parentid = '"+list_comp.get(i)+"') "+
				"            AND p.route_id = m.routename "+
				"            AND p.date = substr('"+date+"',1,7) "+
				"            AND p.c = '2') pl "+
				"        WHERE pl.route_id = banci.routeid "+
				"          AND (banci.error = 0 "+
				"            OR banci.error = 3) "+
				"          AND banci.time BETWEEN pl.m_start "+
				"          AND pl.m_end "+
				"          AND banci.date = '"+date+"' "+
				"        GROUP BY pl.team_id,"+
				"          banci.date,"+
				"          banci.routeid,"+
				"          banci.productid) a "+
				 "     GROUP BY a.team_id,"+
				"        a.routeid,"+
				"        a.productid) b "+
				"    GROUP BY b.team_id) chuche3 "+
				"    ON chuche1.team_id = chuche3.team_id "+
				"  LEFT JOIN "+
				"    (SELECT "+
				"      deptid,"+
				"      DEPTNAME "+
				"    FROM "+
				"      eadept t "+
				"    WHERE t.parentid = '"+list_comp.get(i)+"') c "+
				"    ON chuche1.team_id = c.deptid";
				System.out.println("出车月统计-路队:"+sqlStr);
				sql.executeUpdate(sqlStr);
			}
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// 出车月统计-线路
	public void insertIntochuche_month_route(String date,List<String> list_team) {
		if (date == null || "".equals(date)) {
			date = getNowDate();
		}
		Connection con = new CreateConnection().getConnection();
		Statement sql = null;
		String sqlStr ="";
		try {
			sql = con.createStatement();
			for(int i=0;i<list_team.size();i++){
			sqlStr = "insert into chuchetj_month_route SELECT "+
					"  chuche1.routeid,"+
					"  m.routename,"+
					"  chuche0.date,"+
					"  chuche0.team_id, "+
					" chuche1.zf_num_yypeiche,"+
					"  chuche1.zf_num_guache,"+
					 " chuche0.qr_out,"+
					"  chuche1.zf_out,"+
					"  chuche2.wf_out,"+
					"  chuche3.gf_out AS gf,"+
					"  (chuche1.zf_out + chuche2.wf_out) / (chuche1.zf_num_yypeiche * 2)* 100 AS peichelv "+
					" FROM "+
					 " (SELECT "+
					"    a.routeid,"+
					"    a.date,"+
					"    a.team_id,"+
					"    COUNT(*) AS qr_out "+
					"  FROM "+
					"    (SELECT "+
					 "     banci.date,"+
					 "     pl.team_id,"+
					 "     banci.routeid,"+
					"      banci.productid "+
					 "   FROM "+
					 "     tb_banci_201406 banci,"+
					 "     (SELECT "+
					 "      p.team_id,"+
					 "       m.routeid AS route_id "+
					 "     FROM "+
					 "       plan2_month p,"+
					  "      meta_dept_route m "+
					 "     WHERE p.team_id = '"+list_team.get(i)+"' "+
					 "       AND p.route_id = m.routename "+
					 "       AND p.date = substr('"+date+"',1,7)) pl "+
					 "   WHERE pl.route_id = banci.routeid "+
					"      AND (banci.error = 0 "+
					 "       OR banci.error = 3) "+
					 "     AND banci.date = '"+date+"' "+
					 "   GROUP BY banci.date,"+
					 "      pl.team_id,"+
					"      banci.routeid,"+
					 "     banci.productid) a "+
					 " GROUP BY a.team_id,a.routeid,a.date) chuche0 "+
					 " LEFT JOIN "+
					 "   (SELECT "+
					 "     a.routeid,"+
					 "     COUNT(*) AS zf_out,"+
					 "     a.num_yypeiche AS zf_num_yypeiche,"+
					"      a.num_guache AS zf_num_guache "+
					 "   FROM "+
					"      (SELECT "+
					 "       banci.date,"+
					 "       banci.routeid,"+
					 "       pl.num_yypeiche,"+
					 "       pl.num_guache,"+
					 "       banci.productid,"+
					 "       '1' AS c "+
					 "     FROM "+
					 "       tb_banci_201406 banci,"+
					 "       (SELECT "+
					 "         m.routeid AS route_id,"+
					 "         m_start,"+
					 "         m_end,"+
					 "         num_yypeiche,"+
					 "         num_guache "+
					"        FROM "+
					 "         plan2_month p,"+
					 "         meta_dept_route m "+
					 "       WHERE p.team_id = '"+list_team.get(i)+"' "+
					 "         AND p.route_id = m.routename "+
					"          AND p.date = substr('"+date+"',1,7) "+
					 "         AND p.c = '1') pl "+
					 "     WHERE pl.route_id = banci.routeid "+
					 "       AND (banci.error = 0 "+
					 "         OR banci.error = 3) "+
					 "       AND banci.time BETWEEN pl.m_start "+
					 "       AND pl.m_end "+
					 "       AND banci.date = '"+date+"' "+
					 "     GROUP BY banci.date,"+
					"        banci.routeid,"+
					 "       banci.productid,"+
					"        pl.num_yypeiche,"+
					 "       pl.num_guache) a "+
					"    GROUP BY a.routeid,"+
					 "     a.num_yypeiche,"+
					 "     a.num_guache) chuche1 "+
					 "   ON chuche0.routeid = chuche1.routeid "+
					"  LEFT JOIN "+
					"    (SELECT "+
					"      routeid,"+
					 "     COUNT(1) AS gf_out "+
					"    FROM "+
					 "     (SELECT "+
					  "      routeid,"+
					  "      productid "+
					  "    FROM "+
					  "      (SELECT "+
					  "        banci.date,"+
					  "        banci.routeid,"+
					  "        banci.productid "+
					  "      FROM "+
					  "        tb_banci_201406 banci,"+
					  "        (SELECT "+
					  "          m.routeid AS route_id,"+
					 "           m_start,"+
					  "          m_end "+
					 "         FROM "+
					 "           plan2_month p,"+
					 "           meta_dept_route m "+
					 "         WHERE p.team_id = '"+list_team.get(i)+"' "+
					"            AND p.route_id = m.routename "+
					 "           AND p.date = substr('"+date+"',1,7) "+
					 "           AND p.c = '1') pl "+
					 "       WHERE pl.route_id = banci.routeid "+
					 "         AND (banci.error = 0 "+
					 "           OR banci.error = 3) "+
					 "         AND banci.time BETWEEN pl.m_start "+
					 "         AND pl.m_end "+
					 "         AND banci.date = '"+date+"' "+
					 "       GROUP BY banci.date,"+
					 "         banci.routeid,"+
					 "         banci.productid "+
					 "       UNION "+
					"        SELECT "+
					"          banci.date,"+
					"          banci.routeid,"+
					"          banci.productid "+
					"        FROM "+
					"          tb_banci_201406 banci,"+
					"          (SELECT "+
					 "           m.routeid AS route_id,"+
					 "           m_start,"+
					 "           m_end "+
					 "         FROM "+
					 "           plan2_month p,"+
					 "           meta_dept_route m "+
					 "         WHERE p.team_id = '"+list_team.get(i)+"' "+
					"            AND p.route_id = m.routename "+
					 "           AND p.date = substr('"+date+"',1,7) "+
					"            AND p.c = '2') pl "+
					"        WHERE pl.route_id = banci.routeid "+
					"          AND (banci.error = 0 "+
					"            OR banci.error = 3) "+
					"          AND banci.time BETWEEN pl.m_start "+
					 "         AND pl.m_end "+
					 "         AND banci.date = '"+date+"' "+
					 "       GROUP BY banci.date,"+
					"          banci.routeid,"+
					"          banci.productid) a "+
					 "     GROUP BY a.routeid,"+
					 "       a.productid) b "+
					 "   GROUP BY b.routeid) chuche3 "+
					 "   ON chuche1.routeid = chuche3.routeid "+
					"  LEFT JOIN "+
					"    (SELECT "+
					"      a.routeid,"+
					"      COUNT(*) AS wf_out,"+
					"      a.num_yypeiche,"+
					"      a.num_guache "+
					"    FROM "+
					 "     (SELECT "+
					 "       banci.date,"+
					 "       banci.routeid,"+
					 "       pl.num_yypeiche,"+
					"        pl.num_guache,"+
					"        banci.productid,"+
					 "       '2' AS c "+
					"      FROM "+
					"        tb_banci_201406 banci,"+
					"        (SELECT "+
					"          m.routeid AS route_id,"+
					"          m_start,"+
					"          m_end,"+
					"          num_yypeiche,"+
					"          num_guache "+
					"        FROM "+
					"          plan2_month p,"+
					 "         meta_dept_route m "+
					"        WHERE p.team_id = '"+list_team.get(i)+"' "+
					"          AND p.route_id = m.routename "+
					"          AND p.date = substr('"+date+"',1,7) "+
					"          AND p.c = '2') pl "+
					"      WHERE pl.route_id = banci.routeid "+
					"        AND (banci.error = 0 "+
					"          OR banci.error = 3) "+
					"        AND banci.time BETWEEN pl.m_start "+
					"        AND pl.m_end "+
					"        AND banci.date = '"+date+"' "+
					"      GROUP BY banci.date,"+
					"        banci.routeid,"+
					"        banci.productid,"+
					"        pl.num_yypeiche,"+
					"        pl.num_guache) a "+
					"    GROUP BY a.routeid,"+
					"      a.num_yypeiche,"+
					"      a.num_guache) chuche2 "+
					"    ON chuche1.routeid = chuche2.routeid "+
					"  LEFT JOIN meta_dept_route m "+
					"    ON chuche1.routeid = m.routeid";
			System.out.println("出车月统计-线路:"+sqlStr);
			sql.executeUpdate(sqlStr);
			}
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取系统当前日期
	 * 
	 * @return
	 */
	public String getNowDate() {
		Date dt = new Date();
		SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd");
		return matter1.format(dt);
	}
}
