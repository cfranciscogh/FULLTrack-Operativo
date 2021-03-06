// JavaScript Document

$( document).on( "click", ".autocomplete li", function() {      
      var selectedItem = $(this).html();
	  var selectedValue = $(this).attr("id");
	  //alert(selectedItem);
      $(this).parent().parent().find('input').val(selectedItem); 
	  $(this).parent().parent().find('input[type="hidden"]').val(selectedValue);   
      $('.autocomplete').hide();     
    });
	
$(document).ready(function(e) {  

		$( ".autocompletePlaca" ).on( "listviewbeforefilter", function ( e, data ) {        
			var $ul = $(this);                        // $ul refers to the shell unordered list under the input box
			var value = $( data.input ).val();        // this is value of what user entered in input box
			var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
			$ul.html("") ;                            // clears value of set the html content of unordered list
			
			// on third character, trigger the drop-down
			if ( value && value.length > 2 ) {
			
			$('.autocompletePlaca').show();           
			$ul.html( "<li><div class='ui-loader'><span class='ui-li-static ui-body-inherit ui-icon ui-icon-loading' >Buscando...</span></div></li>" );
			$ul.listview("refresh");
			dropdownContent = "";
			
			$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/BuscarPlaca",
				type: "POST",
				dataType : "json",
				data : '{"Apellido":"'+ value +'"}',
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					resultado = $.parseJSON(data.d);
					//console.log(resultado);	
					if ( resultado.length > 0 ){					
						for (var i = 0; i<resultado.length;i++){					
							$(".autocompletePlaca").append("<li class='ui-li-static ui-body-inherit' id='" + resultado[i].CODIGO + "'>" + resultado[i].PLACA + "</li>");	
						}						
					}
					
				},
		
				error : function(jqxhr) 
				{
				   //console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}	
			});	
			
			$ul.listview("refresh");
			$ul.trigger( "updatelayout");  
			
        	}
      });
	  
	  
	  
	  
	  
	  $( ".autocompleteConductor" ).on( "listviewbeforefilter", function ( e, data ) {        
			var $ul = $(this);                        // $ul refers to the shell unordered list under the input box
			var value = $( data.input ).val();        // this is value of what user entered in input box
			var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
			$ul.html("") ;                            // clears value of set the html content of unordered list
			
			// on third character, trigger the drop-down
			if ( value && value.length > 2 ) {
			// hard code some values... TO DO: replace with AJAX call
			
			$('.autocompleteConductor').show();           
			$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading' >Buscando...</span></div></li>" );
			$ul.listview("refresh");
			dropdownContent = "";
			
			$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/BuscarChofer",
				type: "POST",
				dataType : "json",
				data : '{"Apellido":"'+ value +'"}',
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					resultado = $.parseJSON(data.d);
					//console.log(resultado);	
					if ( resultado.length > 0 ){					
						for (var i = 0; i<resultado.length;i++){					
							$(".autocompleteConductor").append("<li class='ui-li-static ui-body-inherit' id='" + resultado[i].CODIGO + "'> " + resultado[i].APELLIDOS + " " + resultado[i].NOMBRES + " </li>");	
						}						
					}					
				},
		
				error : function(jqxhr) 
				{
				   //console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}	
			});	
			
			$ul.listview("refresh");
			$ul.trigger( "updatelayout");  
		  
			
        }
      });
	  
	
	getTransportes();
	
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
			
			
			if ( idPlaca == "" || idConductor == "" ){
				alerta("Ingresar datos correctos");
				return;
			}
			
			
			var strCTN = "";
			
			$.mobile.loading('show');
			var html = "<table cellpadding='0' cellspacing='0' width='100%'>";
			 html += "<tr><td colspan='2' class='titulo'>Placa Nro: " + strPlaca +  "</td></tr>";
			  html += "<tr><td colspan='2'><b>Conductor: </b>" + strConductor +  "</td></tr>";
			   html += "<tr><td><b>Contenedor Nro: </b>" + strCTN +  "</td><td><b>Nro Viaje:</b> 1</td></tr>";
			html += "</table>";
			
			//$("#listTransporte").append('<li><a data-ajax="false" href="detalle.html?codigo='+ 0 +'&puerto='+$.QueryString["puerto"] +'">  ' + html +  '</a></li> ');
			
			
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
					$.mobile.loading('hide');	
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					 if ( resultado.code == 1){
						$("#myPopup").popup("close");
						
						$(".autocompletePlaca").parent().find("input").eq(0).val("");		 
			  $(".autocompletePlaca").parent().find("input").eq(1).val("");
			  $(".autocompleteConductor").parent().find("input").eq(0).val("");
			 $(".autocompleteConductor").parent().find("input").eq(1).val("");
			
						$("#panelSeguimiento h3").remove();	
						getTransportes();
						//$( "#listTransporte" ).listview( "refresh" );	
						
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
	});
	
	 
	$("#actualizar").click(function(e) {
		 
        
		
    });
	
	if ($.QueryString["puerto"] == "apm"){
		$("#ptoName").html("APM");
	}
	if ($.QueryString["puerto"] == "dpw"){
		$("#ptoName").html("DPW");
	}
	
	//$("#regresarEmpresa").attr("href","empresa.html?idChofer=" + $.QueryString["idChofer"]);
	//$("#irTracking").attr("href","panel.html?idChofer=" + $.QueryString["idChofer"] +'&empresa='+ $.QueryString["empresa"] );
	
	$("#btnConfig").attr("href","configuracion.html?puerto=" + $.QueryString["puerto"] );	  
	
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

function getTransportes(){
	
	
	
	$.mobile.loading('show');
	//alert($.QueryString["idChofer"]);   
	$("#listTransporte").html("");  
	 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/ConsultarTransportes",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDSeguimiento":"'+ 0 +'", "Puerto":"'+$.QueryString["puerto"]+'"}',
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
					$("#listTransporte").append('<li><a data-ajax="false" href="detalle.html?codigo='+ resultado[i].Cod_seg_op +'&puerto='+$.QueryString["puerto"] +'">  ' + html +  '</a></li> ');						
					 
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
