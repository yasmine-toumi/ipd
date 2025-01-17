! function(t) {
    "use strict";
$(document).ready(function(){

  var id_import = $('#table_traitement').attr('data-id');
  var table_companies = $('#table_traitement').dataTable({
	"bStateSave": true,
	"fnStateSave": function (oSettings, oData) {
	localStorage.setItem( 'DataTables_'+window.location.pathname, JSON.stringify(oData) );
	},
	"fnStateLoad": function (oSettings) {
	return JSON.parse( localStorage.getItem('DataTables_'+window.location.pathname) );
	},	
    "ajax": "module/hb/table/php/data_acide_traitement.php?job=get_traitement_admin&id_import=" + id_import,
    "columns": [
		{ "data": "alerte", "sClass": "" },
    
    { "data": "functions", "sClass": "functions" },
    { "data": "correction", "sClass": "company_name" },
    { "data": "telephone", "sClass": "company_name" },

    { "data": "newraison", "sClass": "company_name" },
    { "data": "newsiret", "sClass": "company_name" },
    { "data": "newcivilite", "sClass": "company_name" },
    { "data": "newnom", "sClass": "company_name" },
    { "data": "newprenom", "sClass": "company_name" },
    { "data": "newfonction", "sClass": "company_name" },

    { "data": "collab", "sClass": "" },
    { "data": "temps", "sClass": "" },
    { "data": "mood", "sClass": "" },


    { "data": "raison", "sClass": "company_name" },
	  { "data": "codep", "sClass": "company_name" },
	  { "data": "ville", "sClass": "company_name" },
	  { "data": "siret", "sClass": "company_name" },
    
	  { "data": "idc", "sClass": "company_name" },
	  { "data": "idrefs", "sClass": "company_name" },
	  { "data": "statc", "sClass": "company_name" },
	  { "data": "idrefc", "sClass": "company_name" },

    { "data": "civilite", "sClass": "company_name" },
    
    { "data": "nom", "sClass": "company_name" },
    
    { "data": "prenom", "sClass": "company_name" },
    
    { "data": "idsc", "sClass": "company_name" },
    { "data": "ids", "sClass": "company_name" },
    { "data": "idreff", "sClass": "company_name" },
    { "data": "fonction", "sClass": "company_name" },
    
    { "data": "codefonction", "sClass": "company_name" },

    { "data": "fonctionexacte", "sClass": "company_name" },
    { "data": "email", "sClass": "company_name" },
    { "data": "emailcollect", "sClass": "company_name" },
    { "data": "emailactif", "sClass": "company_name" },
    { "data": "date_hard", "sClass": "company_name" }
    



    
    ],
    dom: 'Bfrtip',
  	"buttons": [
  	'csv', {
  	extend: 'excelHtml5',
  	exportOptions: {
  		columns: ':visible'
  	}
  	},
  	{
  	extend: 'pdfHtml5',
  	exportOptions: {
  		columns: ':visible'
  	}
  	},{
  	extend: 'print',
  	exportOptions: {
  		columns: ':visible'
  	}
  	}, 'colvis'
    ],
    
    "oLanguage": {
      "oPaginate": {
        "sFirst":       "<<",
        "sPrevious":    "Précédent",
        "sNext":        "Suivant",
        "sLast":        ">>",
      },
      "sLengthMenu":    "Lignes par page : _MENU_",
      "sInfo":          "Total de _TOTAL_ Lignes (Affichage _START_ à _END_)",
	  "sSearch":          "Recherche : ",
      "sInfoFiltered":  "(Filtré depuis _MAX_ total Lignes)",
	  "sLoadingRecords": "Chargement en cours des données ..."
    }
  });  
  
  
	
	jQuery.validator.setDefaults({
    success: 'valid',
    rules: {
      fiscal_year: {
        required: true,
        min:      2000,
        max:      2025
      }
    },
    errorPlacement: function(error, element){
      error.insertBefore(element);
    },
    highlight: function(element){
      $(element).parent('.field_container').removeClass('valid').addClass('error');
    },
    unhighlight: function(element){
      $(element).parent('.field_container').addClass('valid').removeClass('error');
    }
  });
  var form_company = $('#form_company');
  form_company.validate();

  function show_message(message_text, message_type){
    $('#message').html('<p>' + message_text + '</p>').attr('class', message_type);
    $('#message_container').show();
    if (typeof timeout_message !== 'undefined'){
      window.clearTimeout(timeout_message);
    }
    timeout_message = setTimeout(function(){
      hide_message();
    }, 8000);
  }
  function hide_message(){
    $('#message').html('').attr('class', '');
    $('#message_container').hide();
  }

  function show_loading_message(){
    $('#loading_container').show();
  }
  function hide_loading_message(){
    $('#loading_container').hide();
  }

  function show_lightbox(){
    $('.lightbox_bg').show();
    $('.lightbox_container').show();
  }
  function hide_lightbox(){
    $('.lightbox_bg').hide();
    $('.lightbox_container').hide();
  }
  $(document).on('click', '.lightbox_bg', function(){
    hide_lightbox();
  });
  $(document).on('click', '.lightbox_close', function(){
    hide_lightbox();
  });
  $(document).keyup(function(e){
    if (e.keyCode == 27){
      hide_lightbox();
    }
  });
  
  function hide_ipad_keyboard(){
    document.activeElement.blur();
    $('input').blur();
  }
  
  
  $(document).on('click', '#function_edit_web', function(e){
    e.preventDefault();
    show_loading_message();
    var id      = $(this).data('id');
    var request = $.ajax({
      url:          'module/hb/table/php/data_acide_traitement.php?job=get_traitement_add_admin',
      cache:        false,
      data:         'id=' + id,
      dataType:     'json',
      contentType:  'application/json; charset=utf-8',
      type:         'get'
    });
    request.done(function(output){
      if (output.result == 'success'){
        $('.lightbox_content h2').text('Fiche HB n° : '+ id);
        $('#form_company button').text('ENREGISTREMENT');
        $('#form_company').attr('class', 'form edit');
        $('#form_company').attr('data-id', id);
        $('#form_company .field_container label.error').hide();
        $('#form_company .field_container').removeClass('valid').removeClass('error');
        $('#form_company #raison').val(output.data[0].raison);
        $('#form_company #newraison').val(output.data[0].newraison);

        $('#form_company #nomprenom').val(output.data[0].nomprenom);

        $('#form_company #newprenom').val(output.data[0].newprenom);
        $('#form_company #newnom').val(output.data[0].newnom);

        $('#form_company #email').val(output.data[0].email);
        $("#form_company #reporting option").filter(function() {
          return $(this).val() == output.data[0].reporting; 
        }).prop('selected', true);
    			
    		$('#form_company #correctemail').val(output.data[0].correctemail);
    		$('#form_company #phone').val(output.data[0].phone);	
    		
    		$('#form_company #commentaire').val(output.data[0].commentaire);
        $('#form_company #commentaire_collab').val(output.data[0].commentaire_collab);
        $('#form_company #user_name').val(output.data[0].user_name);
		
    		

        hide_loading_message();
        show_lightbox();
      } else {
        hide_loading_message();
        show_message("Une erreur s'est produite lors de l'enregistrement", 'error');
      }
    });
    request.fail(function(jqXHR, textStatus){
      hide_loading_message();
      show_message("Une erreur s'est produite lors de l'enregistrement " + textStatus, 'error');
    });
  });
  
  
  $(document).on('submit', '#form_company.edit', function(e){
    e.preventDefault();
    if (form_company.valid() == true){
      hide_ipad_keyboard();
      hide_lightbox();
      /*show_loading_message();*/
      var id        = $('#form_company').attr('data-id');
      var form_data = $('#form_company').serialize();
      var request   = $.ajax({
        url:          'module/hb/table/php/data_acide_traitement.php?job=edit_traitement_admin&id=' + id,
        cache:        true,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
			window.location.reload(function(){
				table_companies.api().ajax.reload;
				/*hide_loading_message();*/
				/*var company_name = $('#raison').val();
				show_message("Opération '" + company_name + "' modifiée avec succés.", 'success');*/			
			}, true); 
			
			/*table_companies.api().ajax.reload(function(){				
				hide_loading_message();
				var company_name = $('#raison').val();
				show_message("Opération '" + company_name + "' modifiée avec succés.", 'success');			
			}, true); */        
        } else {
          hide_loading_message();
          show_message('Edit request failed', 'error');
        }
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Edit request failed: ' + textStatus, 'error');
      });
    }
  });
  
  $(document).on('click', '#mood_affichage', function(){
      var temps_reel      = $(this).data('id');
		t.dialog({
			title: "Nb de modifications",
			content: "url:module/hb/table/data/mood-table.php?id_stat=" + temps_reel,
			animation: 'zoom',
			columnClass: 'medium',
			closeAnimation: 'scale',
			backgroundDismiss: false,
			closeIcon: true,
			draggable: false
		  });
    });
  
  
  
  
   

});
}(jQuery);