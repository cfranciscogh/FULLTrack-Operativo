// JavaScript Document


	
$(document).ready(function(e) {  

			  
	//$("#btnRegresar").attr("href","transporte.html?puerto=" + $.QueryString["puerto"] );	
	getConfiguracion();
	
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	 
	$("#btnConfirmar").click(function(e) {        
		e.preventDefault();
		$.mobile.loading('show');
		var parametros = new Object();
		//parametros.Cod_seg_op = $.QueryString["codigo"];	
		//parametros.Seg_contenedor = "";	
		parametros.anno_manifiesto = $("#anno").val();
		parametros.nro_manifiesto = $("#numero").val();
		//console.log(parametros);
		$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/registrarManifiesto",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					//console.log(data);
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					if ( resultado.code == 1){
						 
						 getConfiguracion();
					 }			  
					 alerta(resultado.message);
				 	
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

function getConfiguracion(){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listTransporte").html("");  
	//alert(codigo);
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/consultarManifiesto",
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
					getContenedores(resultado[i].IDConfiguracion);				 
				}
			}
			else{				 
				$(".panelCTN").find("form").hide();
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




function getContenedores(codigo){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listTransporte").html("");  
	//alert(codigo);
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/consultarContenedores",
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
					html += "<tr><td colspan='2' class='titulo'>CTN:  " + resultado[i].NroContenedor +  "</td></tr>";
					html += "<tr><td colspan='2'><b>Precinto: </b>" +  resultado[i].Precinto +  "</td></tr>";
					html += "<tr><td><b>Size:</b> " + resultado[i].Size +  "</td><td><b>Tipo:</b> " + resultado[i].Tipo +  "</td></tr>";
					html += "</table>";
					$("#listTransporte").append('<li><a   href="#">  ' + html +  '</a></li> ');						 
				}
				 
				 $( "#listTransporte" ).listview( "refresh" );  
			}
			else{
				if ( $("#listTransporte li").length < 2 ) {				 
					$(".panelCTN").find("form").hide();
					$(".panelCTN").append("<h3>No se encontrarón contenedores</h3>").hide().fadeIn("fast");	
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
