  class pesquisar_dados{
	constructor(connection){
		this.connection = connection;
	}
	modalidades(callback){
		this.connection.query('select*from modalidades',callback);
	}
	encontrar_modalidade(id,callback){
		this.connection.query("select*from modalidades where id_modalidade = '"+id+"'",callback);
	}
	pontuação_turma(turma,callback){
		this.connection.query("SELECT nome_modalidade,nome_integrante_organização,data_disputada,pontuação,adversario_turma,relatorio_jogo FROM modalidades INNER JOIN arbitros INNER JOIN disputas INNER JOIN Turma ON disputas.id_modalidade = modalidades.id_modalidade and disputas.id_turma = Turma.id_turma and disputas.id_arbitro = arbitros.id_arbitro and Turma.nome_turma='"+turma+"'",callback);
	}
	atletas_turma(lider,callback){
		this.connection.query("SELECT nome_aluno,nome_turma,nome_modalidade,altletas.RA FROM lider_sala INNER JOIN modalidades INNER JOIN Turma INNER JOIN altletas on altletas.id_lider = lider_sala.id_lider AND altletas.id_turma = Turma.id_turma and altletas.id_modalidade = modalidades.id_modalidade and lider_sala.nome_completo = '"+lider+"'",callback);
	}
	recursos_turma(turma,callback){
		this.connection.query("SELECT nome_completo,horario_recurso,modalidade,situação FROM recursos INNER JOIN lider_sala INNER JOIN Turma ON recursos.id_turma = Turma.id_turma and recursos.id_lider = lider_sala.id_lider WHERE Turma.nome_turma = '"+turma+"'",callback);
	}
	login(user,senha,callback){
		this.connection.query("SELECT*FROM lider_sala INNER JOIN Turma on lider_sala.id_turma = Turma.id_turma WHERE nome_completo='"+user+"' and Ra = '"+senha+"'",callback);
	}
	login_acesso(id_user,callback){
		this.connection.query("update lider_sala set data_acesso=now()  where id_lider='"+id_user+"'",callback);
	}
	entrar_recurso(argumentos,modalidade,lider,turma,callback){
		this.connection.query("insert into recursos values(0,'"+argumentos+"','"+modalidade+"','"+lider+"','"+turma+"',now(),'enviado')",callback);
	}
	enviar_disputada(date,relatorio,adversario_turma,pontuação,modalidade,turma,arbitro,callback){
		this.connection.query("insert into disputas values(0,'"+date+"','"+relatorio+"','"+adversario_turma+"','"+pontuação+"','"+modalidade+"','"+turma+"','"+arbitro+"')",callback);
	}
	insert_aluno(nome,ra,turma,lider,modalidade,email,callback){
		this.connection.query("insert into altletas values(0,'"+nome+"','"+ra+"','"+turma+"','"+lider+"','"+modalidade+"','"+email+"')",callback);
	}
	pontuação(Turma,callback){
		this.connection.query("select sum(pontuação) as soma FROM disputas INNER JOIN Turma on disputas.id_turma = Turma.id_turma where Turma.nome_turma='"+Turma+"'",callback);
	}
	arbitragem(nome_organização,ra,callback){
		this.connection.query("SELECT nome_integrante_organização,id_arbitro,RA from arbitros where nome_integrante_organização='"+nome_organização+"' and RA='"+ra+"'",callback);
	}
	arbitragem_relatorio(arbitro,callback){
		this.connection.query("SELECT nome_modalidade,nome_integrante_organização,data_disputada,pontuação,adversario_turma,relatorio_jogo FROM modalidades INNER JOIN arbitros INNER JOIN disputas INNER JOIN Turma ON disputas.id_modalidade = modalidades.id_modalidade and disputas.id_turma = Turma.id_turma and disputas.id_arbitro = arbitros.id_arbitro and arbitros.nome_integrante_organização='"+arbitro+"'",callback);
	}
	verificar_usuario_existe_modalidade(nome_modalidade,ra_user,id_modalidade,callback){
		this.connection.query('SELECT nome_aluno,nome_turma,nome_modalidade,altletas.RA FROM lider_sala INNER JOIN modalidades INNER JOIN Turma INNER JOIN altletas on altletas.id_lider = lider_sala.id_lider AND altletas.id_turma = Turma.id_turma and altletas.id_modalidade = modalidades.id_modalidade where nome_aluno like"%'+nome_modalidade+'%" and modalidades.id_modalidade="'+id_modalidade+'" and altletas.RA = "'+ra_user+'" ',callback);
	}
	turma(callback){
			this.connection.query('select*from Turma',callback);
	}
	noticias(callback){
		this.connection.query('select*from Noticias',callback);
	}
	 todasNoticias(callback){
    this.connection.query('SELECT id_noticia, titulo_noticia, desc_noticia, data_noticia, img_noticia, curtidas_noticias, descurtidas_noticias from Noticias limit 3', callback);
  }
  Recentes_noticias(callback){
    this.connection.query('SELECT id_noticia, titulo_noticia, desc_noticia, data_noticia, img_noticia, curtidas_noticias, descurtidas_noticias from Noticias where data_noticia < now() limit 4', callback);
  }
  pesquisarNoticias(pesquisar, callback){
    this.connection.query('SELECT * from noticias where titulo_noticia like "%"'+pesquisar+'"%" group by data_noticia < now()', callback);
  }
  curtidas_noticias(id_noticia, callback){
    this.connection.query('UPDATE Noticias SET curtidas_noticias = curtidas_noticias + 1 WHERE id_noticia ='+ id_noticia.id_noticia, callback);
  }
  descurtidas_noticias(id_noticia, callback){
    this.connection.query('UPDATE Noticias SET descurtidas_noticias = descurtidas_noticias + 1 WHERE id_noticia ='+ id_noticia.id_noticia, callback);
  }
}
module.exports = function() {
	return pesquisar_dados;
}
