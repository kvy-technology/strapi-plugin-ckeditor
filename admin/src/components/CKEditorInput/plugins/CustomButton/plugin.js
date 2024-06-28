import { CustomButtonPanelView } from './CustomButtonPanelView';
import { InsertButtonCommand } from './InsertButtonCommand';
const Plugin = window.CKEditor5.core.Plugin;
const createDropdown = window.CKEditor5.ui.createDropdown;
const toWidget = window.CKEditor5.widget.toWidget;

export const buttonConfigs = [
  { label: 'Primary Button', className: 'btn-primary' },
  { label: 'Outline Button', className: 'btn-outline' },
  // add more button configs as needed
];

export class CustomButton extends Plugin {
  static get pluginName() {
    return 'CustomButton';
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this._defineCommands();
    this._addToolbarButton();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('button', {
      allowWhere: '$text',
      allowContentOf: '$block',
      isInline: true,
      isObject: true,
      allowAttributes: ['class', 'type']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for('upcast').elementToElement({
      view: {
        name: 'button',
        attributes: {
          type: 'button'
        }
      },
      model: (viewElement, { writer }) => {
        return writer.createElement('button', {
          class: viewElement.getAttribute('class'),
          type: 'button'
        });
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'button',
      view: (modelElement, { writer }) => {
        return writer.createContainerElement('button', {
          class: modelElement.getAttribute('class'),
          type: 'button'
        });
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'button',
      view: (modelElement, { writer }) => {
        const button = writer.createContainerElement('button', {
          class: modelElement.getAttribute('class'),
          type: 'button'
        });
        return toWidget(button, writer, { label: 'button widget' });
      }
    });
  }

  _defineCommands() {
    this.editor.commands.add('insertCustomButton', new InsertButtonCommand(this.editor));
  }

  _addToolbarButton() {
    const editor = this.editor;

    editor.ui.componentFactory.add('customButton', (locale) => {
      const dropdown = createDropdown(locale);

      const panelView = new CustomButtonPanelView(locale, (buttonText, className) => {
        editor.execute('insertCustomButton', { buttonText, className });
        dropdown.isOpen = false;
      });

      dropdown.panelView.children.add(panelView);

      dropdown.buttonView.set({
        label: 'Custom Buttons',
        tooltip: true,
        withText: true
      });

      dropdown.on('change:isOpen', () => {
        if (dropdown.isOpen) {
          panelView.focus();
        }
      });

      return dropdown;
    });
  }
}
