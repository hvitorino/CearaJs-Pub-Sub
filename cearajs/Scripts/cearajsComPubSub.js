/// <reference path="ext-3.3.0/adapter/jquery/ext-jquery-adapter-debug.js" />
/// <reference path="ext-3.3.0/ext-all-debug.js" />
/// <reference path="ext-3.3.0/adapter/Ext.ux.MsgBus.js" />

Ext.ns('CearaJs');

Ext.onReady(function() {
    var teste1 = new Ext.FormPanel({
        plugins      : ['msgbus'],
        title        : 'Teste 1',
        width        : 390,
        height       : 180,
        padding      : 10,
        subscriptions: {
            'cearajs.teste': function(mensagem) {
                teste1.getComponent('mensagemRecebida').setValue(mensagem);
            }
        },
        items: [
            {
                xtype     : 'textfield',
                itemId    : 'topico',
                fieldLabel: 'Tópico',
                value     : 'cearajs.teste'
            },
            {
                xtype     : 'textfield',
                itemId    : 'mensagem',
                fieldLabel: 'Mensagem',
                width     : 250,
                value     : 'Mensagem'
            },
            {
                xtype     : 'textfield',
                itemId    : 'mensagemRecebida',
                fieldLabel: 'Mensagem Recebida',
                width     : 250,
                editable  : false
            }
        ],
        buttons: [
            {
                text   : 'Publicar',
                handler: function() {
                    var topico   = teste1.getComponent('topico').getValue();
                    var mensagem = teste1.getComponent('mensagem').getValue();

                    teste1.publish(topico, mensagem);
                }
            }
        ]
    });

    var teste2 = new Ext.FormPanel({
        plugins      : ['msgbus'],
        title        : 'Teste 2',
        width        : 390,
        height       : 180,
        padding      : 10,
        subscriptions: {
            'cearajs.teste': function(mensagem) {
                teste2.getComponent('mensagemRecebida').setValue(mensagem);
            }
        },
        items: [
            {
                xtype     : 'textfield',
                itemId    : 'topico',
                fieldLabel: 'Tópico',
                value     : 'cearajs.teste'
            },
            {
                xtype     : 'textfield',
                itemId    : 'mensagem',
                fieldLabel: 'Mensagem',
                width     : 250,
                value     : 'Mensagem'
            },
            {
                xtype     : 'textfield',
                itemId    : 'mensagemRecebida',
                fieldLabel: 'Mensagem Recebida',
                width     : 250,
                editable  : false
            }
        ],
        buttons: [
            {
                text   : 'Publicar',
                handler: function() {
                    var topico   = teste2.getComponent('topico').getValue();
                    var mensagem = teste2.getComponent('mensagem').getValue();

                    teste2.publish(topico, mensagem);
                }
            }
        ]
    });

    var janela = new Ext.Window({
        title : 'Pub/Sub',
        width : 400,
        height: 410,
        items : [teste1, teste2]
    });

    janela.show();
});