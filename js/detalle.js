// JavaScript Document


	
$(document).ready(function(e) {  

			  
	
	getTransportes( $.QueryString["codigo"] );
	
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	
	$("#agregarDatos").click(function(e) {
		 
		 e.preventDefault();
		
		if (  $(".autocompletePlaca").parent().find("input").eq(0).val() == "" ){
			alerta("Ingresar Placa");
			$(".autocompletePlaca").parent().find("input").eq(0).focus();
		}
		else if (  $(".autocompleteConductor").parent().find("input").eq(0).val() == "" ){
			alerta("Ingresar Conductor");
			$(".autocompleteConductor").parent().find("input").eq(0).focus();
		}
		else{
			var strPlaca = $(".autocompletePlaca").parent().find("input").eq(0).val();		 
			var idPlaca =  $(".autocompletePlaca").parent().find("input").eq(1).val();
			var strConductor =   $(".autocompleteConductor").parent().find("input").eq(0).val();
			var idConductor =  $(".autocompleteConductor").parent().find("input").eq(1).val();
			var strCTN = "";
			
			$.mobile.loading('show');
			var html = "<table cellpadding='0' cellspacing='0' width='100%'>";
			 html += "<tr><td colspan='2' class='titulo'>Placa Nro: " + strPlaca +  "</td></tr>";
			  html += "<tr><td colspan='2'><b>Conductor: </b>" + strConductor +  "</td></tr>";
			   html += "<tr><td><b>Contenedor Nro: </b>" + strCTN +  "</td><td><b>Nro Viaje:</b> 1</td></tr>";
			html += "</table>";
			
			$("#listTransporte").append('<li><a data-ajax="false" href="detalle.html?codigo='+ 0 +'&puerto='+$.QueryString["puerto"] +'">  ' + html +  '</a></li> ');
			
			
			var parametros = new Object();
			parametros.Seg_cod_unidad = idPlaca;	
			parametros.Seg_cod_chofer = idConductor;	
			parametros.Seg_contenedor = "";	
			parametros.Seg_puerto = $.QueryString["puerto"];	
			 
	
			$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/registrarTransporte",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					// if ( resultado.code == 1){
						$("#myPopup").popup("close");
						$( "#listTransporte" ).listview( "refresh" );				
						$.mobile.loading('hide');		
					// }	
				 
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});
		}
	});
	
	 
	$("#btnConfirmar").click(function(e) {        
		e.preventDefault();
		
		var parametros = new Object();
		parametros.Cod_seg_op = $.QueryString["codigo"];	
		parametros.Seg_contenedor = "";	
		parametros.Seg_T1LL = $("#hora1").val();
		parametros.Seg_T1IN = $("#hora2").val();
		parametros.Seg_T1SA = $("#hora3").val();
		parametros.Seg_D1LL = $("#hora4").val();	
		parametros.Seg_D1IN = $("#hora5").val();
		parametros.Seg_D1SA = $("#hora6").val();
		console.log(parametros);
		$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/actualizarTransporte",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					if ( resultado.code == 1){
						 
					 }			  
					 alerta(resultado.message);
				 
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});	
		
    });
	
	$("#btnRegresar").attr("href","transporte.html?puerto=" + $.QueryString["puerto"] );	 
	
});

function actualizarChofer(IDPedido,IDChofer){
	
	$.mobile.loading('show');
			$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/actualizarChofer",
				type: "POST",
				//crossDomain: true,
				dataType : "json",
				data : '{"IDPedido":"' + IDPedido + '","IDChofer":"' + IDChofer + '"}',
				//contentType: "xml",
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
				resultado = $.parseJSON(data.d);
					//console.log(resultado);
					$.mobile.loading('hide');
					if ( resultado == 1  ){
						alerta('OC agregada con exito.');
						$("#myPopup").popup("close");
						getProgramaciones();
					}
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});
	
}


function alertDismissed(){
}
//

function getTransportes(codigo){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listTransporte").html("");  
	//alert(codigo);
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/ConsultarTransportes",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDSeguimiento":"'+ codigo +'", "Puerto":"'+$.QueryString["puerto"]+'"}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		
			//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$("#panelSeguimiento").find("h3").remove();
			 
				var count = 0;
				for (var i = 0; i<resultado.length;i++){					
					
					var html = "<table cellpadding='0' cellspacing='0' width='100%'>";
					html += "<tr><td colspan='2' class='titulo'>Placa Nro:  " + resultado[i].PLACA +  "</td></tr>";
					html += "<tr><td colspan='2'><b>Conductor: </b>" +  resultado[i].NOMBRES + " "  + resultado[i].APELLIDOS +  "</td></tr>";
					html += "<tr><td><b>Contenedor Nro:</b> " + resultado[i].Seg_contenedor +  "</td><td><b>Nro Viaje:</b> " + resultado[i].Seg_Secuencia +  "</td></tr>";
					html += "</table>";
					$("#listTransporte").append('<li><a>  ' + html +  '</a></li> ');	
					
					$("#hora1").val(resultado[i].Hora_T1LL);	
					$("#hora2").val(resultado[i].Hora_T1IN);	
					$("#hora3").val(resultado[i].Hora_T1SA);	
					$("#hora4").val(resultado[i].Hora_D1LL);	
					$("#hora5").val(resultado[i].Hora_D1IN);	
					$("#hora6").val(resultado[i].Hora_D1SA);					
					 
				}
				
				
					 
					
				 
				 $( "#listTransporte" ).listview( "refresh" );  
			}
			else{				 
					$("#panelSeguimiento").append("<h3>No hay información para el dia de hoy</h3>").hide().fadeIn("fast");		 
			 
				
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
