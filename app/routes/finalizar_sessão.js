module.exports = function(app) {
	app.get('/sessao_finalizada',function(req,res) {
		app.app.controller.acessar.finalizar_sessão(app,req,res);
	})
}