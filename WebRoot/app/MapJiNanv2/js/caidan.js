<!--控制菜单层的显示与关闭-->
	function qiehuan(num){
				if(num==0)
				{
var ima="<img src='../Images/index.gif' height='50%' width='95%' vertical-align:'top' text-align:'center' />";
 
 document.getElementById("navigation").innerHTML=ima;
				}
				else
				{
				}
				if(num==1)
				{
				document.getElementById("div_bus_qstbar").style.display="block";
				document.getElementById("xscheck").style.display="block";
				show_all_route();
				}
				else
				{
				document.getElementById("div_bus_qstbar").style.display="none";
				document.getElementById("xscheck").style.display="none";			
				}
				if(num==2)
				{
				document.getElementById("div_searchrange_qstbar").style.display="block";
				}
				else
				{
				document.getElementById("div_searchrange_qstbar").style.display="none";
				}
				if(num==3)
				{
				document.getElementById("div_searcharound_qstbar").style.display="block";
				}
				else
				{
				document.getElementById("div_searcharound_qstbar").style.display="none";
				}
				if(num==4)
				{
				document.getElementById("div_searchfeature_qstbar").style.display="block";
				}
				else
				{
				document.getElementById("div_searchfeature_qstbar").style.display="none";
				}
		for(var id = 0;id<=4;id++)
		{
			if(id==num)
			{
//				document.getElementById("qh_con"+id).style.display="block";
				document.getElementById("mynav"+id).className="select";
				document.getElementById("qh_con"+id).className="select";
			}
			else
			{
//				document.getElementById("qh_con"+id).style.display="none";
				document.getElementById("mynav"+id).className="";
				document.getElementById("qh_con"+id).className="";
			}
		}
	}