var nodemailer = require('nodemailer');
module.exports.acessar = function(app, req, res) {
  res.render('login/login', {
    Titulo: 'Login JIIF',
    validacao: {},
    color: {},
    color_font: {}
  });
}

var sess; // guardar cookie para validar sessão , não há como separar esse codigo senão vai da pau

module.exports.não_encontrado = function(app, req, res) {

  sess = req.session;

  if (sess.user && sess.matricula) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/acessar');
  }
}

module.exports.login_entrar = function(app, req, res) {
  sess = req.session;
  let user = req.body;

  req.assert('user', 'Campo usuário vazio..').notEmpty();
  req.assert('Ra', 'Campo matricula vazio ..').notEmpty();

  var erros = req.validationErrors();
  if (erros) {
    res.render('login/login', {
      Titulo: 'Login JIIF',
      validacao: erros,
      color: {},
      color_font: {}
    });
    return;
  }
  sess.user = req.body.user;
  sess.matricula = req.body.Ra;
  sess.tipo = req.body.tipo_acesso;
  res.redirect('/dashboard');
}

module.exports.admin = function(app, req, res) {
  sess = req.session;

  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);


  if (sess.tipo == 'Lider de sala') {

    Usuario.login(sess.user, sess.matricula, function(error, result1) {
      if (result1.length == 0) {
        res.render('login/login', {
          Titulo: 'Acessar conta cadastrada',
          color: {},
          color_font: {},
          validacao: [{
            msg: 'Lider de sala e matricula não encontrado , por favor você precisa ser matriculado !!'
          }]
        });
        return;
      }
    result1.forEach(function(turma) {
     Usuario.noticias(function(error,noticias){   
      Usuario.login_acesso(turma.id_lider,function(error,update){
        Usuario.modalidades(function(error, modalidades) {
          Usuario.pontuação(turma.nome_turma, function(error, total) {
            total.forEach(function(soma) {
              Usuario.recursos_turma(turma.nome_turma, function(error, recurso) {
                Usuario.pontuação_turma(turma.nome_turma, function(error, pontos) {
                  Usuario.atletas_turma(turma.nome_completo, function(error, atletas) {
                    res.render('acesso_privado/acesso_privado', {
                      Titulo: 'Painel JIIFs',
                      validacao: {},
                      dados: atletas,
                      pontuações: pontos,
                      recursos: recurso,
                      pontuação: soma.soma,
                      Lider: turma.nome_completo,
                      lider_turma: turma.nome_turma,
                      foto_turma: turma.img_turma,
                      modalidades_disponiveis: modalidades,
                      id_lider: turma.id_lider,
                      id_turma: turma.id_turma,
                      color: {},
                      color_font: {},
                      noticias : noticias,
                      modalidades: modalidades
                    });
                  });
                });
              });
            });
          });
        });
      });
    })
    })
   }) 
  } else if (sess.tipo == 'Arbitragem') {
    Usuario.arbitragem(sess.user, sess.matricula, function(error, arbitro) {
      if (arbitro.length == 0) {
        res.render('login/login', {
          Titulo: 'Painel arbitragem',
          color: {},
          color_font: {},
          validacao: [{
            msg: 'Arbitro não encontrado , por favor você precisa ser membro da comissão de arbitragem !!'
          }]
        });
        return;
      }
      arbitro.forEach(function(informações) {
        Usuario.modalidades(function(error, modalidades) {
          Usuario.turma(function(error, turma) {
            Usuario.arbitragem_relatorio(sess.user, function(error, disputas) {
              res.render('arbitragem/disputas', {
                Titulo: 'Painel Lançamento de disputas',
                arbitro: informações.nome_integrante_organização,
                id_arbitro: informações.id_arbitro,
                ra: informações.RA,
                modalidades_disponiveis: modalidades,
                pontuações: disputas,
                turma: turma,
                validacao: {}
              });
            })
          })
        })
      })
    });
  } else {
    res.render('login/login', {
      Titulo: 'Login JIIF',
      color: '#fff',
      color_font: 'green',
      validacao: [{
        msg: 'Seja bem vindo, faça seu login não se esqueça de selecionar sua organização !!!'
      }]
    });
  }
}

module.exports.finalizar_sessão = function(app, req, res) {
  sess = req.session;
  sess.destroy(function(err) {
    delete sess;
    req.session = null;
    res.redirect('/dashboard');
  });
}

module.exports.cadastrar_atleta = function(app, req, res) {
  sess = req.session;
  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);
  Usuario.login(sess.user, sess.matricula, function(error, result1) {
    if (result1.length == 0) {
      res.render('login/login', {
        Titulo: 'Login JIIF',
        color: {},
        color_font: {},
        validacao: [{
          msg: 'Acesso não permitido !!'
        }]
      });
      return;
    }
    result1.forEach(function(turma) {
      Usuario.atletas_turma(turma.nome_completo, function(error, atletas) {
        Usuario.modalidades(function(error, modalidades) {
          res.render('inscrever/inscrição', {
            Lider: turma.nome_completo,
            Titulo: 'Cadastradar JIIFs',
            lider_turma: turma.nome_turma,
            foto_turma: turma.img_turma,
            modalidades_disponiveis: modalidades,
            id_lider: turma.id_lider,
            id_turma: turma.id_turma,
            validacao: {},
            dados: atletas
          });
        });
      });
    });
  });
}
module.exports.recurso = function(app, req, res) {
  sess = req.session;
  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);
  Usuario.login(sess.user, sess.matricula, function(error, result1) {
    if (result1.length == 0) {
      res.render('login/login', {
        Titulo: 'Login JIIF',
        color: {},
        color_font: {},
        validacao: [{
          msg: 'Acesso não permitido !!'
        }]
      });
      return;
    }
    result1.forEach(function(turma) {
      Usuario.atletas_turma(turma.nome_completo, function(error, atletas) {
        res.render('recurso/recurso', {
          Lider: turma.nome_completo,
          Titulo: 'Painel JIIF recurso',
          lider_turma: turma.nome_turma,
          foto_turma: turma.img_turma,
          id_lider: turma.id_lider,
          id_turma: turma.id_turma,
          validacao: {},
        });
      });
    });
  });
}

module.exports.salvar_atleta = function(app, req, res) {
  sess = req.session;
  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);
  Usuario.login(sess.user, sess.matricula, function(error, result1) {
    if (result1.length == 0) {
      res.render('login/login', {
        Titulo: 'Login JIIF',
        color: {},
        color_font: {},
        validacao: [{
          msg: 'Acesso não permitido !!'
        }]
      });
      return;
    }

    let user = req.body;

    req.assert('nome_aluno', 'Campo aluno vazio..').notEmpty();
    req.assert('RA', 'Campo matricula vazio ..').notEmpty();
    req.assert('email', 'Campo email  vazio ..').notEmpty();
    req.assert('RA','Registro de estudante não tem caracter suficiente, no minimo 6 digitos').len(6,6);
    req.assert('email','Email invalido').isEmail();

    console.log(user);

    var erros = req.validationErrors();
    result1.forEach(function(turma) {
    Usuario.verificar_usuario_existe_modalidade(user.nome_aluno,user.RA,user.modalidade,function(error,Registro) {
      Usuario.atletas_turma(turma.nome_completo, function(error, atletas) {
        Usuario.modalidades(function(error, modalidades) {
          if (erros) {
            res.render('inscrever/inscrição', {
              Lider: turma.nome_completo,
              Titulo: 'Painel JIIF',
              lider_turma: turma.nome_turma,
              foto_turma: turma.img_turma,
              modalidades_disponiveis: modalidades,
              id_lider: turma.id_lider,
              id_turma: turma.id_turma,
              validacao: erros,
              dados: atletas
            });
            return;
          }

      if (Registro.length >=1) {
         res.render('inscrever/inscrição', {
              Lider: turma.nome_completo,
              Titulo: 'Painel JIIF',
              lider_turma: turma.nome_turma,
              foto_turma: turma.img_turma,
              modalidades_disponiveis: modalidades,
              id_lider: turma.id_lider,
              id_turma: turma.id_turma,
              validacao: [{msg:'Atletas  já cadastrado nessa modalidade'}],
              dados: atletas
            });
            return;
      }
        Usuario.encontrar_modalidade(user.modalidade,function(erros,modalidade_inscrita){

        modalidade_inscrita.forEach(function(encontrado_inscrição){
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'jiifcampusdourados@gmail.com',
              pass: '99510796'
            }
          });

          var mailOptions = {
            from: 'JIIF Campus Dourados',
            to:req.body.email,
            subject: 'Inscrição no JIIF',
            html: "<h1>Parabéns Você foi inscrito JIIF</h1><b>16/06/2018 das 8:00 ás 17:00 </b><a href='https://goo.gl/maps/ZHnXJuPmJJs'>Localização</a><p>'" + user.nome_aluno + " '  Você foi inscrito na modalidade '"+encontrado_inscrição.nome_modalidade+"' pelo seu lider de sala no jogos interno do Instituto Federal do Campus Dourados</p><br><b>Mensagem gerada automaticamente</b>"
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          Usuario.insert_aluno(user.nome_aluno, user.RA, user.id_turma, user.id_lider, user.modalidade, user.email, function(error, result) {
            res.redirect('/altletas/inscrever');
          });
        });
      });
    });
  });
}) ; 
})
}) 
}
module.exports.solicitar_recurso = function(app, req, res) {
  sess = req.session;
  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);
  Usuario.login(sess.user, sess.matricula, function(error, result1) {
    if (result1.length == 0) {
      res.render('login/login', {
        Titulo: 'Login JIIF',
        color: {},
        color_font: {},
        validacao: [{
          msg: 'Acesso não permitido !!'
        }]
      });
      return;
    }

    let user = req.body;

    req.assert('turma', 'Campo turma vazio..').notEmpty();
    req.assert('lider', 'Campo lider de sala vazio ..').notEmpty();
    req.assert('argumentos', 'Campo argumentação vazio ..').notEmpty();
    req.assert('modalidade', 'Campo modalidade vazio ..').notEmpty();

    var erros = req.validationErrors();
    result1.forEach(function(turma) {
      Usuario.atletas_turma(turma.nome_completo, function(error, atletas) {
        if (erros) {
          res.render('recurso/recurso', {
            Lider: turma.nome_completo,
            Titulo: 'Painel JIIF',
            lider_turma: turma.nome_turma,
            foto_turma: turma.img_turma,
            id_lider: turma.id_lider,
            id_turma: turma.id_turma,
            validacao: erros,
            dados: atletas,
            color: {},
            color_font: {},
          });
          return;
        }
        Usuario.entrar_recurso(user.argumentos, user.modalidade, user.lider, user.turma, function(error, result) {
          res.render('recurso/recurso', {
            Lider: turma.nome_completo,
            Titulo: 'Painel JIIF',
            lider_turma: turma.nome_turma,
            foto_turma: turma.img_turma,
            id_lider: turma.id_lider,
            id_turma: turma.id_turma,
            validacao: erros,
            dados: atletas,
            color: '#669966',
            color_font: '#fff',
            validacao: [{
              msg: 'Recurso enviado , aguarde resposta da organização do evento !!!'
            }]
          });
        });
      });
    });
  });
}
module.exports.enviar_disputa = function(app, req, res) {
  sess = req.session;
  let connection = app.Server_config.banco();
  let Usuario = new app.app.model.pesquisar_dados(connection);
  Usuario.arbitragem(sess.user, sess.matricula, function(error, arbitro) {
    if (arbitro.length == 0) {
      res.render('login/login', {
        Titulo: 'Login JIIF',
        color: {},
        color_font: {},
        validacao: [{
          msg: 'Acesso não permitido !!'
        }]
      });
      return;
    }

    let user = req.body;

    req.assert('arbitro', 'Campo arbitro vazio..').notEmpty();
    req.assert('adv', ' Campo  adversário  vazio ..').notEmpty();
    req.assert('pontuação', 'Campo pontuação vazio..').notEmpty();
    req.assert('date', 'Campo data vazio ..').notEmpty();
    req.assert('modalidade', 'Campo modalidade vazio ..').notEmpty();
    req.assert('Turma', 'Campo turma vazio ..').notEmpty();
    req.assert('text', 'Campo relatório vazio ..').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      arbitro.forEach(function(informações) {
        Usuario.modalidades(function(error, modalidades) {
          Usuario.turma(function(error, turma) {
            Usuario.arbitragem_relatorio(sess.user, function(error, disputas) {
              res.render('arbitragem/disputas', {
                Titulo: 'Painel Lançamento de disputas',
                arbitro: informações.nome_integrante_organização,
                id_arbitro: informações.id_arbitro,
                ra: informações.RA,
                modalidades_disponiveis: modalidades,
                pontuações: disputas,
                turma: turma,
                validacao: erros
              });
            })
          })
        })
      })
      return;
    }
    Usuario.enviar_disputada(user.date, user.text, user.adv, user.pontuação, user.modalidade, user.Turma, user.arbitro, function(error, result) {
      res.redirect('/dashboard');
    });
  });
}