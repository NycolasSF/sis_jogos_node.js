module.exports = function(app) {
	app.get('/',function(req,res) {
		app.app.controller.noticias.noticias(app,req, res);
	})
	app.get('/',function(req,res) {
		app.app.controller.noticias.Recentes_noticias(app,req, res);
	})
}