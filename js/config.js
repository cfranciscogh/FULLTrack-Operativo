// JavaScript Document


	
$(document).ready(function(e) {  

			  
	//$("#btnRegresar").attr("href","transporte.html?puerto=" + $.QueryString["puerto"] );	
	getConfiguracion(0);
	
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	 
	$("#btnConfirmar").click(function(e) {        
		e.preventDefault();
		
		if ( $("#anno").val() == "" ){
			 alerta("Ingresar Año");
			$("#anno").focus();
			 return;
		}
		
		if ( $("#numero").val() == "" ){
			alerta("Ingresar Número");
			$("#numero").focus();
			 return;
		}
		
		if ( $("#puerto").val() == "0" ){
			alerta("Seleccionar puerto");
			$("#puerto").focus();
			 return;
		}
		
		$.mobile.loading('show');
		var parametros = new Object();
		//parametros.Cod_seg_op = $.QueryString["codigo"];	
		//parametros.Seg_contenedor = "";	
		parametros.anno_manifiesto = $("#anno").val();
		parametros.nro_manifiesto = $("#numero").val();
		parametros.puerto = $("#puerto").val();
		//console.log(parametros);
		$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/registrarManifiestoPuerto",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					//console.log(data);
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					if ( resultado.code == 1){	
						 alerta(resultado.message);		
						 $("#anno").val("");
						$("#numero").val("");
						$("#puerto").val(0);
						$("#puerto").selectmenu('refresh');			 
						 getConfiguracion(0);
						
					 }	
					 if ( resultado.code == 2){						 
						 alerta(resultado.message);
					 }	
					  if ( resultado.code == 3){						 
						 alerta(resultado.message);
					 }				 	
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);
				   $.mobile.loading('hde');	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});	
		
    });
	
	 
	
});

 

function alertDismissed(){
}
//
function CerrarOperacion(a){
	
	if (confirm('¿Esta seguro de finalizar esta operación?')) {
		//$("#anno").focus();
		
		$.mobile.loading('show');			
			var parametros = new Object();
			parametros.IDConfiguracion = a;
			//console.log(parametros);
		 	$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/finalizarManifiesto",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					if ( resultado.code == 1){
						$("#panelManifiestos").html(""); 
    					getConfiguracion(0);
					 }			  
					 alerta(resultado.message);
				 
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});	
		
		
		
	}
	
	
}
function getConfiguracion(flag){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listTransporte").html("");  
	//alert(codigo);
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/consultarManifiestoPendientes",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        //data : '{"IDSeguimiento":"'+ codigo +'", "Puerto":"'+$.QueryString["puerto"]+'"}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		
			//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$(".panelCTN").find("form").show();
				 $(".panelCTN").find("h3").remove();
				 	for (var i = 0; i<resultado.length;i++){					
					//$("#anno").val(resultado[i].anno_manifiesto);	
					//$("#numero").val(resultado[i].nro_manifiesto);	
					
					$("#panelManifiestos").append('<div data-role="collapsible"><h3>' + resultado[i].anno_manifiesto + ' - ' + resultado[i].nro_manifiesto + '<span style="float:right;">Total de CTN: ' + resultado[i].total_ctn + '</span></h3><div id="panel' + resultado[i].IDConfiguracion  + '" class="content-panel"><a href="javascript:CerrarOperacion(' + resultado[i].IDConfiguracion  + ');"  data-position-to="window" data-icon="close" data-inline="true" data-corners="true" data-shadow="true"   data-wrapperels="span" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-icon-delete"> Finalizar operación </a></div></div>');
					$("#panelManifiestos" ).collapsibleset("refresh");
					$("#panelManifiestos .content-panel").last().append('<ul class="listview" id="lista' + resultado[i].IDConfiguracion  + '" data-role="listview" data-text="" data-filter="true" data-inset="true"></ul>');           
					$( "#lista" + resultado[i].IDConfiguracion ).listview();  
					getContenedores(resultado[i].IDConfiguracion,flag);				 
				}
			}
			else{				 
				//$(".panelCTN").find("form").hide();
				$(".panelCTN").find("h3").remove();
				$(".panelCTN").append("<h3>No hay configuración para el dia de hoy</h3>").hide().fadeIn("fast");		 				
			}
        },

        error : function(jqxhr) 
        {
		   //console.log(jqxhr);	
           alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}




function getContenedores(codigo,flag){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#lista" + codigo).html("");  
	//alert(codigo);
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/consultarContenedoresTodos",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDConfig":"'+ codigo +'", "NroContenedor":""}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		
			//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){				 
			 
				var count = 0;
				for (var i = 0; i<resultado.length;i++){					
					
				 var html = "<table cellpadding='0' cellspacing='0' width='100%'>";
					html += "<tr><td colspan='2' class='titulo'>CTN:  " + resultado[i].NroContenedor +  "<img src='img/estado_" + ( resultado[i].Seg_Est ? "1" : "2") + ".png' style='float:right; margin-right:18px;' /></td></tr>";
					html += "<tr><td colspan='2'><b>Precinto: </b>" +  resultado[i].Precinto +  "</td></tr>";
					html += "<tr><td><b>Size:</b> " + resultado[i].Size +  "</td><td><b>Tipo:</b> " + resultado[i].Tipo +  "</td></tr>";
					html += "</table>";
					$("#lista" + codigo).append('<li><a   href="#">  ' + html +  '</a></li> ');						 
				}
				if ( flag == 1 )
					alerta("Se registro " + resultado.length + " contenedores");
				 
				$("#lista" + codigo).listview( "refresh" );  
			}
			else{
				if ( $("#listTransporte li").length < 2 ) {				 
					$("#lista" + codigo).parent().find("form").hide();
					$("#lista" + codigo).parent().append("<h3>No se encontrarón contenedores</h3>").hide().fadeIn("fast");	
				}
			}
        },

        error : function(jqxhr) 
        {
		   //console.log(jqxhr);	
           alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}



function alerta(mensaje){
	alert(mensaje);
	return;
	 navigator.notification.alert(
            mensaje,  // message
            alertDismissed,         // callback
           'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	
}
