package org.realtime.dao;

import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.WriteResult;


public class Mongodb {
	
	private Mongo mongo;
	private DBCollection dbCollection;
	private DB db;
	
	private static Mongodb instance = null;
	
	private Mongodb() throws Exception{
		//使用ip地址创建Mongo对象
		mongo=new Mongo("127.0.0.1");
		//获取orcl数据库
		db=mongo.getDB("lt");
		//判断是否存在集合person
		boolean b=db.collectionExists("abc");
		System.out.println("是否存在集合[abc]:"+b);
		dbCollection = db.getCollection("abc");
	
	}
	
	
	public static Mongodb getMongo() throws Exception{
		
		 if (instance == null) { // 
			 instance = new Mongodb(); // 
		 }
		 return instance;
	}
	 
	
	
	
	public void list(){
		dbCollection=db.getCollection("abc");
		BasicDBObject dbObject=new BasicDBObject();
		//dbObject.put("mark", new BasicDBObject("$gt",20).append("$lt", 60));
		
		dbObject.put("mark", "GPS");
		
		DBCursor cursor = dbCollection.find(dbObject);
		
		System.out.println(cursor.count());
		while(cursor.hasNext()){
			//System.out.println(cursor.next());
		}
		
	}
	
	
	public Object getRecordByID(String id){
		dbCollection=db.getCollection("abc");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("_id", new ObjectId(id));
		DBObject object=dbCollection.findOne(dbObject);
		return object;
	}
	
	
	
	private boolean insert(){
		
		dbCollection=db.getCollection("person");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("name", "zhangsan");
		dbObject.put("age", 20);
		WriteResult writeResult = dbCollection.save(dbObject);
		System.out.println(writeResult.getN());
		return false;
	}
	
	private boolean delete(){
		dbCollection=db.getCollection("person");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("name", "zhangsan");
		WriteResult writeResult = dbCollection.remove(dbObject);
		System.out.println(writeResult.getN());
		return false;
	}
	
	
	private boolean update(){
		dbCollection=db.getCollection("person");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("name", "s0020");
		BasicDBObject dbObject2=new BasicDBObject();
		dbObject2.put("name", "s0020");
		dbObject2.put("age", 65);
		WriteResult writeResult = dbCollection.update(dbCollection.findOne(dbObject), dbObject2);
		System.out.println(writeResult.getN());
		return false;
	}
	
	
	private Object getOne(){
		dbCollection=db.getCollection("person");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("name", "s0020");
		//dbObject.put("age", 65);
		DBObject object=dbCollection.findOne(dbObject);
		System.out.println(object.toMap().get("name")+"\t"+object.toMap().get("age"));
		return object;
	}
	
	public Object getRecordAfID(String id){
		dbCollection=db.getCollection("abc");
		BasicDBObject dbObject=new BasicDBObject();
		dbObject.put("_id", new ObjectId(id));
		
		DBObject object=dbCollection.findOne(new BasicDBObject("_id",new BasicDBObject("$gt",new ObjectId(id))));
		return object;
	}
	
	public List<DBObject> getRecordsID(String id){
		dbCollection=db.getCollection("abc");
		List<DBObject> ls =dbCollection.find(new BasicDBObject("_id",new BasicDBObject("$gt",new ObjectId(id)))).limit(500).toArray();
		return ls;
	}
	
	
	public List<DBObject> getlastlist(){
		dbCollection=db.getCollection("abc");
		 DBObject orderBy = new BasicDBObject(); 
		 orderBy.put("_id", -1);
		 List<DBObject> ls = dbCollection.find().sort(orderBy).limit(10).toArray();
		return ls;
	}
	
	public DBCursor getlastlist(String tag){
		dbCollection=db.getCollection("abc");
		 DBObject orderBy = new BasicDBObject(); 
		 orderBy.put("_id", -1);
		 DBCursor ls = dbCollection.find(new BasicDBObject("mark",new BasicDBObject("$gt",tag ))).sort(orderBy).limit(10);
		return ls;
	}
	
	
	
	public static void main(String[] args) throws Exception{
		Mongodb mongodb=new Mongodb();
		
		System.out.println("DB   "+mongodb.getRecordByID("53e0b9f229058e55eb000027"));
		System.out.println("DB   "+mongodb.getRecordAfID("53e0b9f229058e55eb000027"));
		//mongodb.getRecordByID("53e0b9f229058e55eb000001");
		//mongodb.insert();
		//mongodb.getOne();
		//mongodb.update();
		//mongodb.delete();
		//mongodb.list();
	}
}
