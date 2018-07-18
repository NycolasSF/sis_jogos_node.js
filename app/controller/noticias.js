module.exports.noticias = function (app, req, res) {
  let connection = app.Server_config.banco();
  var noticias = new app.app.model.pesquisar_dados(connection);

  noticias.todasNoticias(function(error, result){
    res.render('noticias/noticias', {noticias: result});
  });
}
module.exports.Recentes_noticias = function (app, req, res) {
  let connection = app.Server_config.banco();
  var noticias = new app.app.model.pesquisar_dados(connection);

  noticias.Recentes_noticias(function(error, result){
    res.render('noticias/noticias', {noticias: result});
  });
}

module.exports.curti = function (app, req, res) {
  var connection = app.Server_config.banco();
  var noticias = new app.app.model.pesquisar_dados(connection);

  if (req.query.id_noticia) {
     var id_noticia = req.query;
     console.log('O id é: '+id_noticia.id_noticia)
   }else{
     res.redirect('/');
     return;
   }

  noticias.curtidas_noticias(id_noticia, function (error, result){
    console.log('pesquisouu')
    res.redirect('/');
  });
}
module.exports.Ncurti = function (app, req, res) {
  var connection = app.Server_config.banco();
  var noticias = new app.app.model.pesquisar_dados(connection);

  if (req.query.id_noticia) {
     var id_noticia = req.query;
   }else{
     res.redirect('/');
     return;
   }

  noticias.descurtidas_noticias(id_noticia, function (error, result){
    res.redirect('/');
  });
}
