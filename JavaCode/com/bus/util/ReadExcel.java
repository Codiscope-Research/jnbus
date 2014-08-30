package com.bus.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import com.bus.po.PlanMess;

public class ReadExcel {

	public static void main(String[] args) throws IOException {

		ReadExcel xlsMain = new ReadExcel();

		PlanMess xls = null;

		List<PlanMess> list = xlsMain.readXls("");

		try {

			// XlsDto2Excel.xlsDto2Excel(list);

		} catch (Exception e) {

			e.printStackTrace();

		}

		for (int i = 0; i < list.size(); i++) {

			xls = (PlanMess) list.get(i);

			System.out.println(xls.getPlan_month());

		}

	}

	/**
	 * 
	 * 读取xls文件内容
	 * 
	 * 
	 * 
	 * @return List<XlsDto>对象
	 * 
	 * @throws IOException
	 * 
	 * 输入/输出(i/o)异常
	 * 
	 */

	public List<PlanMess> readXls(String path) throws IOException {

		InputStream is = new FileInputStream(path);
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		
		List<PlanMess> list = new ArrayList<PlanMess>();
		String month_down = "";
		String routeid_down = "";
		String zhou_down = "";

		// 下行
		HSSFSheet hssfSheet_down = hssfWorkbook.getSheetAt(0);
		HSSFCell row0_title = hssfSheet_down.getRow(0).getCell(0);
		HSSFCell row1_route = hssfSheet_down.getRow(1).getCell(0);
		HSSFCell row1_zhou = hssfSheet_down.getRow(1).getCell(2);

		// 获取年月时间
		if (row0_title != null) {
			month_down = getValue(row0_title);
			if (month_down != "" && month_down != null) {
				month_down = month_down.substring(0, 4)+"-"+month_down.substring(5, 6);
			}
		}

		// 获取路线
		if (row1_route != null) {
			routeid_down = getValue(row1_route);
			if (!"".equals(routeid_down) && routeid_down != null) {
				routeid_down = routeid_down.split("：")[1].substring(0,1);
			}
		}
		// 获取计划单位
		if (row1_zhou != null) {
			zhou_down = getValue(row1_zhou);
		}
		for (int rowNum = 3; rowNum <= hssfSheet_down.getLastRowNum(); rowNum++) {
			HSSFRow hssfRow = hssfSheet_down.getRow(rowNum);
			if (hssfRow != null) {
				PlanMess xlsDto = new PlanMess();
				xlsDto.setPlan_month(month_down);
				xlsDto.setRouteid(routeid_down);
				// 峰期
				HSSFCell fq = hssfRow.getCell(0);
				if(fq!=null){
					//System.out.println(getValue(fq));
				}
				
				// 序号
				HSSFCell seq = hssfRow.getCell(1);
				if(seq!=null){
					xlsDto.setNum_banci(getValue(seq));
				}else{
					xlsDto.setNum_banci("");
				}
				
				// 班次
				HSSFCell banci = hssfRow.getCell(2);
				if(banci!=null){
					xlsDto.setSeq_banci(getValue(banci));
				}else{
					xlsDto.setSeq_banci("");
				}
				
				// 离站
				HSSFCell leaveS = hssfRow.getCell(3);
				if(leaveS!=null){
					xlsDto.setA_time(getValue(leaveS));
				}else{
					xlsDto.setA_time("");
				}
				
				// 到站
				HSSFCell getS = hssfRow.getCell(4);
				if(getS!=null){
					xlsDto.setD_time(getValue(getS));
				}else{
					xlsDto.setD_time("");
				}

				// 发车间隔(分钟)
				HSSFCell sendj = hssfRow.getCell(5);
				if(sendj!=null){
					xlsDto.setInterval_time(getValue(sendj));
				}else{
					xlsDto.setInterval_time("");
				}

				// 停站时间(分钟)
				HSSFCell stopt = hssfRow.getCell(6);
				if(stopt!=null){
					xlsDto.setStop_time(getValue(stopt));
				}else{
					xlsDto.setStop_time("");
				}

				// 调度形式
				HSSFCell ddxs = hssfRow.getCell(7);
				if(ddxs!=null){
					xlsDto.setDisp_mode(getValue(ddxs));
				}else{
					xlsDto.setDisp_mode("");
				}

				// 单程里程
				HSSFCell dclc = hssfRow.getCell(8);
				if(dclc!=null){
					xlsDto.setSingle_miles(getValue(dclc));
				}else{
					xlsDto.setSingle_miles("");
				}

				// 单程时间
				HSSFCell dctime = hssfRow.getCell(9);
				if(dctime!=null){
					xlsDto.setSingle_time(getValue(dctime));
				}else{
					xlsDto.setSingle_time("");
				}
				
				// 下行为1 上行为3
				xlsDto.setUpordown("1"); 
				xlsDto.setEffec_icon("1");
				xlsDto.setIsmain("1");
				
				// 备注
				//HSSFCell bz = hssfRow.getCell(10);
				list.add(xlsDto);
			}
			
		}

		// 上行
		String month_up = "";
		String routeid_up = "";
		String zhou_up = "";
		HSSFSheet hssfSheet_up = hssfWorkbook.getSheetAt(1);
		HSSFCell row0_title_up = hssfSheet_up.getRow(0).getCell(0);
		HSSFCell row1_route_up = hssfSheet_up.getRow(1).getCell(0);
		HSSFCell row1_zhou_up = hssfSheet_up.getRow(1).getCell(2);
		
		// 获取年月时间8
		if (row0_title_up != null) {
			month_up = getValue(row0_title);
			if (month_up != "" && month_up != null) {
				month_up = month_down.substring(0, 4)+"-"+month_down.substring(5, 6);
			}
		}

		// 获取路线
		if (row1_route_up != null) {
			routeid_up = getValue(row1_route);
			if (!"".equals(routeid_up) && routeid_up != null) {
				routeid_up = routeid_up.split("：")[1].substring(0,1);
			}
		}
		// 获取计划单位
		if (row1_zhou_up != null) {
			zhou_up = getValue(row1_zhou);
		}
		for (int rowNum = 3; rowNum <= hssfSheet_up.getLastRowNum(); rowNum++) {
			HSSFRow hssfRow = hssfSheet_up.getRow(rowNum);
			if (hssfRow != null) {
				PlanMess xlsDto = new PlanMess();
				xlsDto.setPlan_month(month_up);
				xlsDto.setRouteid(routeid_up);
				
				// 峰期
				//HSSFCell fq = hssfRow.getCell(0);
				//if(fq!=null){
				//	System.out.println(getValue(fq));
				//}
				
				// 序号
				HSSFCell seq = hssfRow.getCell(0);
				if(seq!=null){
					xlsDto.setNum_banci(getValue(seq));
				}else{
					xlsDto.setNum_banci("");
				}
				
				// 班次
				HSSFCell banci = hssfRow.getCell(1);
				if(banci!=null){
					xlsDto.setSeq_banci(getValue(banci));
				}else{
					xlsDto.setSeq_banci("");
				}
				
				// 离站
				HSSFCell leaveS = hssfRow.getCell(2);
				if(leaveS!=null){
					xlsDto.setA_time(getValue(leaveS));
				}else{
					xlsDto.setA_time("");
				}
				
				// 到站
				HSSFCell getS = hssfRow.getCell(3);
				if(getS!=null){
					xlsDto.setD_time(getValue(getS));
				}else{
					xlsDto.setD_time("");
				}

				// 发车间隔(分钟)
				HSSFCell sendj = hssfRow.getCell(4);
				if(sendj!=null){
					xlsDto.setInterval_time(getValue(sendj));
				}else{
					xlsDto.setInterval_time("");
				}

				// 停站时间(分钟)
				HSSFCell stopt = hssfRow.getCell(5);
				if(stopt!=null){
					xlsDto.setStop_time(getValue(stopt));
				}else{
					xlsDto.setStop_time("");
				}
				
				//HSSFCell xxx = hssfRow.getCell(6);

				// 调度形式
				HSSFCell ddxs = hssfRow.getCell(7);
				if(ddxs!=null){
					xlsDto.setDisp_mode(getValue(ddxs));
				}else{
					xlsDto.setDisp_mode("");
				}

				// 单程里程
				HSSFCell dclc = hssfRow.getCell(8);
				if(dclc!=null){
					xlsDto.setSingle_miles(getValue(dclc));
				}else{
					xlsDto.setSingle_miles("");
				}

				// 单程时间
				HSSFCell dctime = hssfRow.getCell(9);
				if(dctime!=null){
					xlsDto.setSingle_time(getValue(dctime));
				}else{
					xlsDto.setSingle_time("");
				}
				
				// 下行为1 上行为3
				xlsDto.setUpordown("3"); 
				xlsDto.setEffec_icon("1");
				xlsDto.setIsmain("1");
				
				// 备注
				//HSSFCell bz = hssfRow.getCell(10);
				list.add(xlsDto);
			}
			
		}

		return list;
	}

	/**
	 * 
	 * 得到Excel表中的值
	 * 
	 * 
	 * 
	 * @param hssfCell
	 * 
	 * Excel中的每一个格子
	 * 
	 * @return Excel中每一个格子中的值
	 * 
	 */
	public String getValue(HSSFCell hssfCell) {
		DecimalFormat df = new DecimalFormat("#");
		if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {

			// 返回布尔类型的值
			return String.valueOf(hssfCell.getBooleanCellValue());
		} else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
			
			// 返回数值类型的值
			return String.valueOf(hssfCell.getNumericCellValue());
		} else if(hssfCell.getCellType()== hssfCell.CELL_TYPE_FORMULA){
			
			// 返回公式类型的值
			return String.valueOf(hssfCell.getNumericCellValue());
		}else{
			// 返回字符串类型的值
			return String.valueOf(hssfCell.getStringCellValue());

		}

	}

}
