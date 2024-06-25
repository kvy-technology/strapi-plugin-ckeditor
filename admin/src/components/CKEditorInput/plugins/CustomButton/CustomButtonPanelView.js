const ButtonView = window.CKEditor5.ui.ButtonView;
const InputTextView = window.CKEditor5.ui.InputTextView;
const View = window.CKEditor5.ui.View;
import { buttonConfigs } from './plugin';

export class CustomButtonPanelView extends View {
  constructor(locale, executeCallback) {
    super(locale);

    this.inputView = this._createInputView();
    this.buttons = this._createButtons(executeCallback);

    this.setTemplate({
      tag: 'div',
      attributes: {
        class: ['ck', 'custom-button-panel']
      },
      children: [
        this.inputView,
        ...this.buttons
      ]
    });
  }

  _createInputView() {
    const inputView = new InputTextView(this.locale);
    inputView.set({
      placeholder: 'Button text'
    });
    return inputView;
  }

  _createButtons(executeCallback) {
    return buttonConfigs.map(config => {
      const button = new ButtonView(this.locale);
      button.set({
        label: config.label,
        withText: true,
        class: config.className
      });

      button.on('execute', () => {
        const buttonText = this.inputView.element.value || 'Click me';
        executeCallback(buttonText, config.className);
      });

      return button;
    });
  }

  focus() {
    this.inputView.focus();
  }
}
