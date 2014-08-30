package org.bus.runtime.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Enumeration;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.g4studio.core.model.SpringBeanLoader;
import org.realtime.service.BackService;

public class AjaxProxy extends HttpServlet{
	
	public AjaxProxy() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public void init(ServletConfig config) throws ServletException {
		
		
		
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException{

		proxy1(req,resp);
	
		
		
	}
	
	
	
	public String proxy1(HttpServletRequest req, HttpServletResponse resp) throws HttpException, IOException{
		Enumeration paramNames = req.getParameterNames();
	      StringBuffer bfParams = new StringBuffer("http://127.0.0.1:8081/Read_Data.aspx?");
	      //bfParams.append(req.getParameter("url")).append("?1=1");
	      while(paramNames.hasMoreElements()) {
	          String param = (String)paramNames.nextElement();
	         
	          bfParams.append(param).append("=").append( req.getParameter(param)).append("&");
	      }
	      
	        String url= bfParams.toString().substring(0, bfParams.toString().length()-1);
	        System.out.println("URL::::::::::::"+url);
			//设置代理服务器地址和端口  
	        HttpClient client = new HttpClient();   
	        //client.getHostConfiguration().setProxy("172.100.1.28",8080);  
	        //使用GET方法，如果服务器需要通过HTTPS连接，那只需要将下面URL中的http换成https  
	        client.setTimeout(6000);  
	       
	       
	        HttpMethod method = new GetMethod(url);  
	        //使用POST方法  
	        //HttpMethod method = new PostMethod("http://java.sun.com");  
	        client.executeMethod(method);  
	        //打印服务器返回的状态  
	        
	        //打印返回的信息  
	        String result=null;  
	        result=method.getResponseBodyAsString();  
	       // log.info("返回的信息:"+result);  
	        method.releaseConnection();   
	        /*将结果写到输出流里面*/  
	        ServletOutputStream out = resp.getOutputStream();  
	        System.out.println("ccc  "+result);
	        OutputStreamWriter ow = new OutputStreamWriter(out,"utf8");    
	        ow.write(result);    
	        ow.flush();    
	        ow.close();  
		
		return "";
	} 
	
	
	public String proxy2(HttpServletRequest req, HttpServletResponse resp) throws HttpException, IOException{
		
		resp.setContentType("text/html");
      PrintWriter pw = resp.getWriter();
      Enumeration paramNames = req.getParameterNames();
      StringBuffer bfParams = new StringBuffer("http://192.168.1.100:8081/Read_Data.aspx?1=1");
      //bfParams.append(req.getParameter("url")).append("?1=1");
      while(paramNames.hasMoreElements()) {
          String param = (String)paramNames.nextElement();
          if("url".equals(param)){continue;}
          bfParams.append("&").append(param).append("=").append(req.getParameter(param));
      }
      
      URL url = new URL(bfParams.toString());
      BufferedReader bf = 
          new BufferedReader(new InputStreamReader(url.openStream(),"gb2312"));
      String line;
      while ((line = bf.readLine()) != null) {
      	System.out.println("ss dd "+line);
          pw.println(line);
      }
      System.out.println("cccc"+ bf.toString());
     
      bf.close();
		
		
		return "";
	}
	
public String proxy3(HttpServletRequest req, HttpServletResponse resp) throws HttpException, IOException{
	 HttpClient client = new HttpClient();   
     //client.getHostConfiguration().setProxy("172.100.1.28",8080);  
     //使用GET方法，如果服务器需要通过HTTPS连接，那只需要将下面URL中的http换成https  
     client.setTimeout(6000);  
	  String	url = "http://192.168.1.100:8081/Read_Data.aspx";
	  PostMethod postMethod = new PostMethod(url);
	  // 填入各个表单域的值
	  NameValuePair[] data = { new NameValuePair("id", "2"),new NameValuePair("route", "") ,new NameValuePair("sxx", "")};
	  // 将表单的值放入postMethod中
	  postMethod.setRequestBody(data);
	  // 执行postMethod
	  int statusCode = client.executeMethod(postMethod);
	  System.out.println(" status code:" + statusCode);
		
		return "";
	}

}
