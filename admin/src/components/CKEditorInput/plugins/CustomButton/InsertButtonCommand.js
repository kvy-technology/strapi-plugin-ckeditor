const Command = window.CKEditor5.core.Command;

export class InsertButtonCommand extends Command {
  execute(options = {}) {
    const { buttonText = 'Call to action', className } = options;
    const editor = this.editor;

    editor.model.change(writer => {
      const buttonElement = writer.createElement('button', {
        class: className,
        type: 'button'
      });
      writer.append(writer.createText(buttonText), buttonElement);
      editor.model.insertContent(buttonElement);
    });
  }
}