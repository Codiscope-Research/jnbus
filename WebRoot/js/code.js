function transMore(points,type,callback){    
for(var index in points){        
if(index > 50){return;}       
 var xyUrl = "http://api.map.baidu.com/geoconv/v1/?coords=;&from=1&to=5&ak=n1SSalem6xqM2OrVQVf3NkcG&callback=callback";        
 //动态创建script标签        
 load_script(xyUrl);    
 }
 }
 
 
 function callback(xyResult){   
 if(xyResult.error != 0){return;}
 //出错就直接返回;    
 var point = new BMap.Point(xyResult.x, xyResult.y);   
  var marker = new BMap.Marker(point);   
   map.addOverlay(marker);    
   map.setCenter(point);
   // 由于写了这句，可以每一个被转的点都是中心点的过程
   }