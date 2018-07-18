let mysql = require('mysql'); 

let acessar_banco = function() {
	return mysql.createConnection({ 
			host:'www.db4free.net', 
			user:'jogossistemas', 
			password:'99510796', 
			database:'jogossistemas'
		});
}

module.exports = function(){
	console.log('Banco Jogos Conectado !!'); 
	return acessar_banco; 
 }