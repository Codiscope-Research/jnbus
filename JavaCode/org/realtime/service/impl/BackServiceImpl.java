package org.realtime.service.impl;



import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.bson.types.BSONTimestamp;
import org.bson.types.ObjectId;
import org.g4studio.core.metatype.Dto;
import org.g4studio.core.metatype.impl.BaseDto;
import org.g4studio.core.model.SpringBeanLoader;
import org.g4studio.core.model.dao.Dao;
import org.g4studio.core.model.dao.Reader;
import org.g4studio.core.orm.xibatis.sqlmap.client.SqlMapExecutor;
import org.g4studio.core.orm.xibatis.support.SqlMapClientCallback;

import org.realtime.dao.Mongodb;
import org.realtime.service.BackService;








import com.mongodb.DBObject;


public class BackServiceImpl implements BackService {

	//Reader g4Reader = (Reader) SpringBeanLoader.getSpringBean("g4Reader");
	
	//Dao dao = (Dao)SpringBeanLoader.getSpringBean("g4Dao");
	
	protected Dao g4Dao;
	
	public void setG4Dao(Dao g4Dao) {
		this.g4Dao = g4Dao;
	}
	
	Mongodb mongo;
	
	DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", java.util.Locale.ENGLISH);
	
	static String tmpid= "";
	
	
	public void allrun() throws Exception{
		
		while(true){
			
			run();
		}
		
		
	}
	
	@Override
	public void run() throws Exception {
		// TODO Auto-generated method stub
		String endid="";
		mongo = Mongodb.getMongo();
		Dto dto =  (Dto) g4Dao.queryForObject("Pos.querypostag");
		if(dto!=null){
			
			String _id= dto.getAsString("cur_id");
			List<DBObject> ls = mongo.getRecordsID(_id);
			//System.out.println("data size: "+ls.size());
			
			//System.out.println("out:::::::::"+ls);
			if(ls!=null&&ls.size()>0){
				batchSaveMoAll(ls);
				DBObject last=ls.get(ls.size()-1);
				ObjectId t_id=(ObjectId) last.get("_id");
				endid= t_id.toString();
				
				setPostoMysql(endid,"update");
				System.out.println("in ::::::::::::::::"+ls.size());
			}
			
			
		}else{
			List<DBObject> ls = mongo.getlastlist();
			if(ls!=null&&ls.size()>0){
				batchSaveMoAll(ls);
				DBObject last=ls.get(0);
				
				ObjectId _id=(ObjectId) last.get("_id");
				endid= _id.toString();
				setPostoMysql(endid,"insert");
			}
			
		}
		
	}
	
	

	
//	public void batchSaveMo(final List<DBObject> ls){
//		
//		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
//			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
//				executor.startBatch();
//				
//				for(int i=0;i<ls.size();i++){
//					
//					Dto dto = new BaseDto();
//					DBObject  tp =  ls.get(i);
//					System.out.println("::: "+tp);
//					String xmid = IDHelper.getXmID();
//					ObjectId t_id=(ObjectId) tp.get("_id");
//					//dto.put("xmid", xmid);
//					if(tp.get("mark").equals("TRIPCTL")){
//						dto.put("_id", xmid);
//						dto.put("id", tp.get("id"));
//						dto.put("obu", tp.get("obu"));
//						dto.put("type", tp.get("type"));
//						dto.put("operator", tp.get("operator"));
//						dto.put("service", tp.get("service"));
//						dto.put("route", tp.get("route"));
//						dto.put("bf", tp.get("bf"));
//						dto.put("obj_id", t_id.toString());
//						executor.insert("Pos.batchSaveTRIPCTL", dto);
//						
//					} else if(tp.get("mark").equals("INOUT")){
//						dto.put("_id", xmid);
//						dto.put("id", tp.get("id"));
//						dto.put("obu", tp.get("obu"));
//						dto.put("io", tp.get("io"));
//						dto.put("auto_hand", tp.get("auto^hand"));
//						dto.put("service", tp.get("service"));
//						dto.put("station", tp.get("station"));
//						dto.put("time", tp.get("time"));
//						dto.put("obj_id", t_id.toString());
//						executor.insert("Pos.batchSaveINOUT", dto);
//						
//					}
//					
//				}
//				
//				
//				executor.executeBatch();
//				return null;
//			}
//		});
//		
//		
//	}
	
	
	
	public void batchSaveMoAll(final List<DBObject> ls){
		
		g4Dao.getSqlMapClientTpl().execute(new SqlMapClientCallback() {
			public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
				executor.startBatch();
				
				for(int i=0;i<ls.size();i++){
					
					Dto dto = new BaseDto();
					DBObject  tp =  ls.get(i);
					
					//String xmid = IDHelper.getXmID();
					ObjectId t_id=(ObjectId) tp.get("_id");
					//dto.put("xmid", xmid);
					//System.out.println(" ***"+tp.get("_id"));
					//System.out.println(" *** TPPPPPP"+tp);
					
					if(tp.containsKey("route")&&!tp.get("route").toString().equals("")){
						if(tp.get("mark").equals("TRIPCTL")){
							dto.put("_id", t_id.toString());
							dto.put("id", tp.get("id"));
							
							dto.put("ROUTEID", Integer.parseInt(tp.get("route").toString()) );
							dto.put("PRODUCTID", tp.get("obu"));
							dto.put("RECORDTYPE", tp.get("mark"));
							dto.put("type", tp.get("type").toString().substring(2, tp.get("type").toString().length()));
							
							//BSONTimestamp datetime = (BSONTimestamp) tp.get("time");
							//DBObject datetime = (DBObject) tp.get("time");
							String datetime = tp.get("time").toString();
							//System.out.println("datetime::: "+datetime);
							try {
								dto.put("date", df.parse(datetime));
								dto.put("time", df.parse(datetime));
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							
							dto.put("service", tp.get("service"));
							dto.put("bf", tp.get("bf").toString().substring(2, tp.get("type").toString().length()));
							
							
							dto.put("flag", "0");
							dto.put("flagbanci", "0");
							//System.out.println("::: "+tp);
							
							executor.insert("Pos.batchInsertAll", dto);
							
						} else if(tp.get("mark").equals("INOUT")){
							dto.put("_id", t_id.toString());
							dto.put("id", tp.get("id"));
							
							
							
							dto.put("ROUTEID", Integer.parseInt(tp.get("route").toString()));
							
							dto.put("PRODUCTID", tp.get("obu"));
							dto.put("RECORDTYPE", tp.get("mark"));
							dto.put("STATIONSEQNUM", tp.get("station").toString().substring(tp.get("station").toString().length()-3, tp.get("station").toString().length()));
							
							dto.put("ISARRLFT", tp.get("io").toString().equals("1")?"1":"2");
							String datetime = tp.get("time").toString();
							//System.out.println("datetime::: "+datetime);
							try {
								dto.put("date", df.parse(datetime));
								dto.put("time", df.parse(datetime));
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							dto.put("flag", "0");
							dto.put("flagbanci", "0");
							//System.out.println("::: "+tp);
							executor.insert("Pos.batchInsertAll", dto);
							
						}
						
						
					}
					
					
					
				}
				
				
				executor.executeBatch();
				return null;
			}
		});
		
		
	}
	
	
	public void setPostoMysql(String _id,String state){
		Dto dto = new BaseDto();
		dto.put("id", "999999");
		dto.put("cur_id", _id);
		if(state.equals("insert")){
			
			g4Dao.insert("Pos.insertePos", dto);
		}else{
			g4Dao.update("Pos.updatePos", dto);
		}
		
		
	}
	
//	public static void main(String[] args) throws Exception {
//		BackServiceImpl b =new BackServiceImpl();
//		b.run();
//		
//		
//		
//	}

}
