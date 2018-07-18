module.exports = function(app) {
	app.get('/Entrar/recurso',function(req,res) {
		app.app.controller.acessar.recurso(app,req,res);
	})
	app.post('/salvar_recurso',function(req,res) {
		app.app.controller.acessar.solicitar_recurso(app,req,res);
	})
}