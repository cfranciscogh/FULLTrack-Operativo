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
			// hard code some values... TO DO: replace with AJAX call
			var response = ['01111','1112','1113','1114','2116','2117','2119','3111', '21117','21119','3111','1111','1112','1113','1114','2116','2117','2119','3111', '221117','221119','33111','11114','11124','11153','11146','21166','21177','21189','31181', '211187','21119','3111','11111','11112','11113','1114','2116','2117','21192','23111', '221117','321119','31141','11141','111562','11163','11174','21186','21187','21189','31811', '211197','211219','31111'];
			  
	  
			  $('.autocompletePlaca').show();           
			  $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading' ></span></div></li>" );
			  $ul.listview( "refresh" );
			  $.each(response, function( index, val ) {
				  dropdownContent += "<li id='0'>" + val + "</li>";
				$ul.html( dropdownContent );
				$ul.listview( "refresh" );
				$ul.trigger( "updatelayout");  
			  });
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
			var response = ['FRANCISCO','ANGELO','CARLOS', 'LUIS','FELIPE','ARTURO'];
			  
	  
			  $('.autocompleteConductor').show();           
			  $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading' >Buscando...</span></div></li>" );
			  $ul.listview( "refresh" );
			  $.each(response, function( index, val ) {
				  dropdownContent += "<li id='1'>" + val + "</li>";
				$ul.html( dropdownContent );
				$ul.listview( "refresh" );
				$ul.trigger( "updatelayout");  
			  });
        }
      });
	  
	
	//getTransportes();
	
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
			 html += "<tr><td colspan='2' class='titulo'>Placa Nro:  " + strPlaca +  "</td></tr>";
			  html += "<tr><td colspan='2'>Conductor:  " + strConductor +  "</td></tr>";
			   html += "<tr><td>Contenedor Nro:  " + strCTN +  "</td><td>Nro Viaje: 1</td></tr>";
			html += "</table>";
			
			$("#listTransporte").append('<li><a data-ajax="false" href="contenedor.html?idItem='+ 0 +'&puerto='+$.QueryString["puerto"] +'">  ' + html +  '</a></li> ');
			$("#myPopup").popup("close");
			$( "#listTransporte" ).listview( "refresh" );	
			
			$.mobile.loading('hide');
			
			/*$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ObtenerTrakingPorOC",
				type: "POST",
				dataType : "json",
				data : '{"oc":"' + $("#oc").val() + '"}',
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
				resultado = $.parseJSON(data.d);
					//console.log(resultado);
					$.mobile.loading('hide');
					if ( resultado.length > 0  ){
						if ( resultado[0].IDEstado == 1 ){
							alerta("OC no ha sida programda.");
						}
						else if ( resultado[0].IDEstado == 2 ){
							actualizarChofer(resultado[0].IDPedido,$.QueryString["idChofer"]);
						}
						else{
							alerta("Pedido ya esta despachado.");
						}
					}
					else{
						$("#placa").val("");
						alerta("Placa no existe!");
						$("#placa").focus();
					}
				},	
				error : function(jqxhr) 
				{
				   console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}			
			});*/
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
					console.log(resultado);
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
	$("#listProgramacion").html("");  
	$("#listProgramacionDAD").html("");  
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Sodimac/Pedido/WSPedido.asmx/ConsultarPedidosPicking",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"IDChofer":"'+$.QueryString["idChofer"]+'", "Empresa":"'+$.QueryString["empresa"]+'"}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		
			//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$("#contentProgramaciones").find("h3").remove();
				$("#contentProgramaciones #divTABS").fadeIn("fast");
				var count = 0;
				for (var i = 0; i<resultado.length;i++){
					
					if ( resultado[i].Operacion == "E" ){
						//alert(resultado[i].IDEstado);
						if (  resultado[i].IDEstado == 1 )
							$("#listProgramacion").append('<input data-pedido="' + resultado[i].IDPedido +  '" disabled="disabled" type="checkbox" name="checkbox-' + i + '" id="checkbox-' + i + '"><label for="checkbox-' + i + '">'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</label> ');
						else {
							 
				 													 
							$("#listProgramacion").append('<input data-pedido="' + resultado[i].IDPedido +  '" type="checkbox" name="checkbox-' + i + '" id="checkbox-' + i + '"><label for="checkbox-' + i + '">'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</label> ');								 
						}
						
						$("#listProgramacion input").checkboxradio().checkboxradio("refresh");
						//$("#listProgramacion").find("input").last().checkboxradio().checkboxradio("refresh");
					
					}
					if ( resultado[i].Operacion == "D" ){
						
						if (  resultado[i].IDEstado == 1 )
		 				$("#listProgramacionDAD").append('<input data-pedido="' + resultado[i].IDPedido +  '" disabled="disabled" type="checkbox" name="checkbox-' + i + '" id="checkbox-' + i + '"><label for="checkbox-' + i + '">'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</label> ');
					else {						 
						$("#listProgramacionDAD").append('<input data-pedido="' + resultado[i].IDPedido +  '" type="checkbox" name="checkbox-' + i + '" id="checkbox-' + i + '"><label for="checkbox-' + i + '">'+ resultado[i].NroOrdenCompra + ' - ' + resultado[i].NombreCliente +'</label> ');								 
					}
					
						$("#listProgramacionDAD input").checkboxradio().checkboxradio("refresh");
						
					}
					
				}
				//$( "#listProgramacion" ).listview( "refresh" );
				//$( "#listProgramacionDAD" ).listview( "refresh" );
			}
			else{
				$("#contentProgramaciones #divTABS").fadeOut("fast", function(){
					$("#contentProgramaciones").append("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>").hide().fadeIn("fast");
				});
				//$("#contentProgramaciones").find("h3").remove();
				
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
