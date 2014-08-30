package com.bus.map.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.DiskFileUpload;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

import com.bus.map.connection.ConnectionMySql;
import com.bus.po.PlanMess;
import com.bus.util.ReadExcel;

public class ImporteMessage extends HttpServlet {

	 /**
	   * 文件上传
	  */
	  private static final long serialVersionUID = 1L;

	 public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	   doPost(request,response);
	  }
	  
	  public void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	   response.setContentType("text/html");
	   request.setCharacterEncoding("utf-8");
	   response.setCharacterEncoding("utf-8");
	   //解析request对象
	  DiskFileUpload dfu = new DiskFileUpload();
	   //存放上传文件路径
	  List<String> fileUrls = new ArrayList<String>();
	   try {
	    //解析request中表单所有值放入集合中
	   List<FileItem> fileItems = dfu.parseRequest(request);
	    for (FileItem fileItem :fileItems) {
	     if(fileItem.isFormField()){//如果是文本域
	     if("desc1".equals(fileItem.getFieldName())){
	       InputStream in =  fileItem.getInputStream();
	       byte[] bt = new byte[in.available()];
	       in.read(bt);
	       in.close();
	       //获取文本域值
	      String desc1 = new String(bt,"utf-8");
	       System.out.println(desc1);
	      }
	      if("desc2".equals(fileItem.getFieldName())){
	       InputStream in =  fileItem.getInputStream();
	       byte[] bt = new byte[in.available()];
	       in.read(bt);
	       in.close();
	       //获取文本域值
	      String desc2 = new String(bt,"utf-8");
	       System.out.println(desc2);
	      }
	     }else{//否则为文件域
	     //打印保存上传文件路径
	     System.out.println(this.getServletContext().getRealPath("upload"));
	      
	 //     if("file1".equals(fileItem.getFieldName())){
	      if(fileItem.getName()!=null&&!"".equals(fileItem.getName())){
	      
	       //上传文件在服务器端的路径保存集合中
	      //fileUrls.add(request.getContextPath()+"/upload/"+remoteFile.getName());
	      fileUrls.add(request.getContextPath()+"/upload/plan.xls");
	       //定义服务器下文件
	      File servFile = new File(this.getServletContext().getRealPath("upload"),"plan.xls");
	       //创建文件夹
	      servFile.getParentFile().mkdirs();
	       //读取客户端文件输入流
	      InputStream in =  fileItem.getInputStream();
	       //定义写入服务器文件流
	      OutputStream os = new FileOutputStream(servFile);
	       //定义字节数组
	      byte[] bt = new byte[in.available()];
	       //对流进行读和写
	      for (;;) {
	        int len = in.read(bt);
	        if(len==-1){
	         break;
	        }
	        os.write(bt, 0, len);
	       }
	       //关闭输入输出流
	      if(os!=null){
	        os.flush();
	        os.close();
	       }
	       if(in!=null){
	        in.close();
	       }
	      }
	 //     }
	     }
	    }
	   } catch (FileUploadException e) {
	    e.printStackTrace();
	   }
	   
	   insertPlanMess(request,response);
	   
	   PrintWriter out = response.getWriter();
	   out.print("上传成功！");
	   out.print("<br>");
	   for (int i = 0; i < fileUrls.size(); i++) {
	    out.print("<a href='"+fileUrls.get(i)+"' target=_blank>上传文件"+(i+1)+"</a>");
	    out.print("<br>");
	   }
	   out.flush();
	   out.close();
	  }
	  
	  public void insertPlanMess(HttpServletRequest request, HttpServletResponse response){
		  ReadExcel readExcel=new ReadExcel();
		  try {
			  List<PlanMess> list_plan=readExcel.readXls(this.getServletContext().getRealPath("upload")+"\\plan.xls");
			  new ConnectionMySql().insertIntoPlanFace(list_plan);
		} catch (IOException e) {
			e.printStackTrace();
		}
	  }


}
