module.exports = function(app) {
	app.get('/acessar',function(req,res) {
		app.app.controller.acessar.acessar(app,req,res);
	});
	app.post('/logar/user',function(req,res){
		app.app.controller.acessar.login_entrar(app,req,res);
	});
}
