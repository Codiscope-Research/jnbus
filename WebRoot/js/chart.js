function doClose(){
	if($('#statistictype')){
		$('#statistictype').val('0');
	}
	
	if($('#sType')){
		$('#sType').val('city');
	}
	$('#container').css({'display':'none'});
	$('#shadeLayer').hide();
}