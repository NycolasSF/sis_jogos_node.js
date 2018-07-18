module.exports = function(app) {
	app.get('/altletas/inscrever',function(req,res) {
			app.app.controller.acessar.cadastrar_atleta(app,req,res);
	})
}