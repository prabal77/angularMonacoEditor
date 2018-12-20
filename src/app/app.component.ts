import { Component, ViewChild } from '@angular/core';
import { MonacoEditorComponent } from './monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initCode = `
    // Type source code in your language here...
    class MyClass {
      @attribute
      void main() {
        Console.writeln( "Hello Monarch world\\n");
      }
    }
  `;
  // Either you can use the two-way binding and abstraction or
  // you can directly access the monaco-editor instance in your parent class.
  // @ViewChild('MonacoEditorComponent')
  // editorComponent: MonacoEditorComponent;

  saveCode(): void {
    console.log(`saving code -> ${this.initCode}`);
  }

  clearCode(): void {
    console.log('clearing the code');
    this.initCode = '';
  }
}
