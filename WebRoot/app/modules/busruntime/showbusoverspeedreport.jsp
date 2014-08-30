<%@ page contentType="text/html; charset=utf-8"%>
<%@ include file="/common/include/taglib.jsp"%>
<G4Studio:html title="超速百分比" fcfEnabled="true">
<G4Studio:import src="/app/modules/busruntime/js/showbusoverspeedreport.js" />
<G4Studio:body>
	<G4Studio:flashReport type="2DP" dataVar="xmlString" id="my2DcChart" align="center" style="margin-top:50px" height="90%" width="100%"
		visible="false" />
</G4Studio:body>
</G4Studio:html>