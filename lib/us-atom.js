'use babel';

import UsAtomView from './us-atom-view';
import { CompositeDisposable } from 'atom';

//var fs = require 'fs'

export default {

  usAtomView: null,
  modalPanel: null,
  subscriptions: null,
	config : {
		"errCode" : {
			"description" : "Current Error code",
			"type" : "integer",
			"default" : 10001
		},
		"errCodeBrace" : {
			"description" : "Error code Brace for example <br/> or \n or space",
			"type" : "string",
			"default" : "<br/>"
		}
	},
  activate(state) {
    this.usAtomView = new UsAtomView(state.usAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.usAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'us-atom:insertErr': () => this.insertErr()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.usAtomView.destroy();
  },

  serialize() {
    return {
      usAtomViewState: this.usAtomView.serialize()
    };
  },

	insertErr() {
		//atom.notifications.addWarning("Allah Allah");
		//console.log("Insert Error Code");
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      //let selection = editor.getSelectedText();
      //selection = "[E"+selection+"]";
			let currentCode
			if (atom.config.get("us-atom.errCode")){
				currentCode=Number(atom.config.get("us-atom.errCode"))+1;
				atom.config.set("us-atom.errCode",currentCode);
			} else {
				currentCode=10001
			}
			let nokta=editor.getCursorBufferPosition();

			let sonraki
			sonraki=editor.getTextInBufferRange([nokta,[nokta.row,Number(nokta.column)+1]]);
			if (sonraki=='"') {
				editor.insertText(atom.config.get("us-atom.errCodeBrace")+'[E'+currentCode+']');
			} else {
				editor.insertText('+"'+atom.config.get("us-atom.errCodeBrace")+'[E'+currentCode+']"');
			}

    } else {
			atom.notifications.addWarning("Editor alinamadi");
		}

		//editor.setCursorBufferPosition([0,0]);
		//editor.insertText('calisti mi');
		editor.save();
  }

};
