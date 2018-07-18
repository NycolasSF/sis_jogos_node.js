	module.exports = function(app) {
		app.get('/curti', function (req, res) {
				app.app.controller.noticias.curti(app, req, res);
		});
		app.get('/Ncurti', function (req, res) {
				app.app.controller.noticias.Ncurti(app, req, res);
		});
	}
