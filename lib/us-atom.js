'use babel';

import UsAtomView from './us-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  usAtomView: null,
  modalPanel: null,
  subscriptions: null,

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
		atom.notifications.addWarning("Allah Allah");
		console.log("Insert Error Code");
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText();
      selection = "[E"+selection+"]";
      editor.insertText(selection);
    } else {
			atom.notifications.addWarning("Editor alinamadi");
		}

		editor.setCursorBufferPosition([0,0]);
		editor.insertText('calisti mi');
		editor.save();
  }

};
