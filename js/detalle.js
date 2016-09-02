// JavaScript Document
$( document).on( "click", ".autocomplete li", function() {      
      var selectedItem = $(this).html();
	  var selectedValue = $(this).attr("id");
	 // alert(selectedValue);
      $(this).parent().parent().find('input').val(selectedItem); 
	  $(this).parent().parent().find('input[type="hidden"]').val(selectedValue);   
      $('.autocomplete').hide();     
    });

	
$(document).ready(function(e) {  

			  
	$( ".autocompleteContenedor" ).on( "listviewbeforefilter", function ( e, data ) {        
			var $ul = $(this);                        // $ul refers to the shell unordered list under the input box
			var value = $( data.input ).val();        // this is value of what user entered in input box
			var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
			$ul.html("") ;                            // clears value of set the html content of unordered list
			
			// on third character, trigger the drop-down
			if ( value && value.length > 2 ) {
			
			$('.autocompleteContenedor').show();           
			$ul.html( "<li><div class='ui-loader'><span class='ui-li-static ui-body-inherit ui-icon ui-icon-loading' >Buscando...</span></div></li>" );
			$ul.listview("refresh");
			dropdownContent = "";
			
			$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/consultarContenedoresPendientes",
				type: "POST",
				dataType : "json",
				data : '{"IDConfig" : 0, "NroContenedor":"'+ value +'"}',
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					resultado = $.parseJSON(data.d);
					console.log(resultado);	
					if ( resultado.length > 0 ){					
						for (var i = 0; i<resultado.length;i++){					
							$(".autocompleteContenedor").append("<li class='ui-li-static ui-body-inherit' id='" + resultado[i].IDConfiguracion + "'>" + resultado[i].NroContenedor + "</li>");	
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
	  
	  
	  
	getTransportes( $.QueryString["codigo"] );
	
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	
	
	$("#agregarCTN").click(function(e) {
		 
		 e.preventDefault();
		
		if (  $(".autocompleteContenedor").parent().find("input").eq(0).val() == "" ){
			alerta("Ingresar Contenedor");
			$(".autocompleteContenedor").parent().find("input").eq(0).focus();
		}
		else{
			var strContenedor = $(".autocompleteContenedor").parent().find("input").eq(0).val();		 
			var idContenedor =  $(".autocompleteContenedor").parent().find("input").eq(1).val();
			
			
			if ( idContenedor == "" || strContenedor == "" ){
				alerta("Ingresar datos correctos");
				return;
			}
			 
			
			$.mobile.loading('show');			
			var parametros = new Object();
			parametros.Cod_seg_op = $.QueryString["codigo"];	
			parametros.Seg_contenedor = strContenedor;	
			parametros.IDConfiguracion = idContenedor;
			 console.log(parametros);
		 	$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/actualizarTransporte_CTN",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					console.log(data);
					resultado = $.parseJSON(data.d);
					$.mobile.loading('hide');
					if ( resultado.code == 1){
						$(".autocompleteContenedor").parent().find("input").eq(0).val("");		 
	    				$(".autocompleteContenedor").parent().find("input").eq(1).val("");
						$(".autocompleteContenedor").html("");
						$("#myPopup").popup("close");
						 getTransportes($.QueryString["codigo"]);
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
		//console.log(parametros);
		$.ajax({
				url : "http://www.meridian.com.pe/ServiciosWEB_TEST/TransportesMeridian/Operativo/WSOperativo.asmx/actualizarTransporte",
				type: "POST",
				dataType : "json",
				data :JSON.stringify(parametros),
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
					//console.log(data);
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
					html += "<tr><td style='vertical-align: top;'><b>Conductor: </b></td><td>" +  resultado[i].NOMBRES + " "  + resultado[i].APELLIDOS +  "</td></tr>";
					html += "<tr><td><b>Nro Viaje:</b></td><td>" + resultado[i].Seg_Secuencia +  "</td></tr>";
					
					
					//html += "<tr><td><b>Contenedor Nro:</b> " + resultado[i].Seg_contenedor +  "</td><td><b>Nro Viaje:</b> " + resultado[i].Seg_Secuencia +  "</td></tr>";
					
					html += "</table>";
					
					$("#listTransporte").append('<li><a>  ' + html +  '</a></li> ');	
					
					$("#hora1").val(resultado[i].Hora_T1LL);	
					$("#hora2").val(resultado[i].Hora_T1IN);	
					$("#hora3").val(resultado[i].Hora_T1SA);	
					$("#hora4").val(resultado[i].Hora_D1LL);	
					$("#hora5").val(resultado[i].Hora_D1IN);	
					$("#hora6").val(resultado[i].Hora_D1SA);
					$(".ctn").html(resultado[i].Seg_contenedor);
					$(".tipo").html(resultado[i].Size + " - " + resultado[i].Tipo);				
					$(".manifiesto").html( ( resultado[i].anno_manifiesto == 0 ? "" : resultado[i].anno_manifiesto) + " " + resultado[i].nro_manifiesto);	
					$(".nave").html(resultado[i].nave); 
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
