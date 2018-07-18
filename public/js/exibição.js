$('#btn_modalidades').click(function() {
	$('#modalidades').slideToggle();
	$('#Atletas').hide( "slow" );
	$('#disputas').hide( "slow" );
	$('#recurso').hide( "slow" );
  $('#boletim').hide( "slow ");
   $('#painel').hide('slow');
});
$('#btn_painel').click(function() {
  $('#painel').slideToggle();
  $('#modalidades').hide('slow');
  $('#Atletas').hide( "slow" );
  $('#disputas').hide( "slow" );
  $('#recurso').hide( "slow" );
  $('#boletim').hide( "slow ");
});
$('#btn_disputas').click(function() {
	$('#disputas').slideToggle();
  $('#modalidades').hide('slow');
	$('#Atletas').hide( "slow" );
	$('#painel').hide( "slow" );
	$('#recursos').hide( "slow" );
  $('#boletim').hide( "slow ");
});
$('#btn_recurso').click(function() {
	$('#recursos').slideToggle();
  $('#modalidades').hide('slow');
	$('#disputas').hide( "slow" );
	$('#Atletas').hide( "slow" );
	$('#painel').hide( "slow" );
  $('#boletim').hide( "slow ");
});
$('#btn_boletim').click(function() {
  $('#boletim').slideToggle();
  $('#modalidades').hide('slow');
  $('#recursos').hide( "slow ");
  $('#disputas').hide( "slow" );
  $('#Atletas').hide( "slow" );
  $('#painel').hide( "slow" );
});
$('#menu').click(function() {
	$('#ul_menu').slideToggle();
});
$('#Btn_informações_usuario').click(function() {
	$('#modal_usuario').slideToggle();
});
$('#close').click(function() {
	$('#modal_usuario').hide();
});
$( function() {
    $( "#dialog-confirm" ).dialog({

      autoOpen: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {

        "Encerrar Sessão": function() {
          sair(true);
        },
        Cancelar: function() {
          sair(false);
        }
      }
    });
     $( "#opener" ).on( "click", function() {
      $( "#dialog-confirm" ).dialog( "open" );
    });
  });
    $( function() {
    $( "#dialog-message" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
});