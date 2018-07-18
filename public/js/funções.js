function sair(logico) {
	if (logico == true) {
		window.location.href='/sessao_finalizada';
	}else{
     $('#dialog-message').dialog( "open" );
		$( "#dialog-confirm" ).dialog( "close" );
	}
}