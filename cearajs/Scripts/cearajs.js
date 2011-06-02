/// <reference path="ext-3.3.0/adapter/jquery/ext-jquery-adapter-debug.js" />
/// <reference path="ext-3.3.0/ext-all-debug.js" />
/// <reference path="ext-3.3.0/adapter/Ext.ux.MsgBus.js" />

Ext.ns('CearaJs');

CearaJs.PainelDeMensagens = Ext.extend(Ext.FormPanel, {
    subscriptions: {},

    onMessage: function(topico, mensagem) {
        if(this.subscriptions[topico])
            this.subscriptions[topico](mensagem);
    },

    onRender:function() {
        for(topico in this.subscriptions)
            this.subscribe(topico);
 
        CearaJs.PainelDeMensagens.superclass.onRender.apply(this, arguments);
    },

    initComponent: function () {
        var eu = this;

        var config = {
            plugins: ['msgbus'],
            items  : [
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
                    text   : 'publicar',
                    handler: function() {
                        var topico   = eu.getComponent('topico').getValue();
                        var mensagem = eu.getComponent('mensagem').getValue();

                        eu.publish(topico, mensagem);
                    }
                }
            ]
        };

        Ext.apply(eu, Ext.apply(eu.initialConfig, config));
 
        CearaJs.PainelDeMensagens.superclass.initComponent.apply(eu, arguments);
    }
});

Ext.reg('painelDeMensagens', CearaJs.PainelDeMensagens);

Ext.onReady(function() {
    var painel1 = new CearaJs.PainelDeMensagens({
        title        : 'Painel 1',
        width        : 390,
        height       : 180,
        padding      : 10,
        subscriptions: {
            'cearajs.*': function(mensagem) {
                Ext.MessageBox.alert('Mensagem', 
                    'Painel 1 recebendo mensagem : [' + mensagem + '] do tópico [cearajs.teste]');
            }
        }
    });

    var painel2 = new CearaJs.PainelDeMensagens({
        title        : 'Painel 2',
        width        : 390,
        height       : 180,
        padding      : 10,
        subscriptions: {
            'cearajs.teste': function(mensagem) {
                painel2.getComponent('mensagemRecebida').setValue(mensagem);
            }
        }
    });

    var janela = new Ext.Window({
        title : 'Pub/Sub',
        width : 400,
        height: 410,
        items : [painel1, painel2]
    });

    janela.show();
});