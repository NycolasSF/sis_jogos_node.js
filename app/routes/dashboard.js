module.exports = function(app) {
	app.get('/dashboard',function(req,res) {
		app.app.controller.acessar.admin(app,req,res);
	})
	app.post('/salvar/altleta',function(req,res) {
		app.app.controller.acessar.salvar_atleta(app,req,res);
	})
	app.post('/salvar/arbitro/disputa',function(req,res) {
		app.app.controller.acessar.enviar_disputa(app,req,res);
	})
}