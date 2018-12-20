/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, Input, AfterViewInit, ElementRef, ViewChild, forwardRef, NgZone, Output, EventEmitter, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorConfigService } from '../editor-config.service';

let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorConfigService),
      multi: true
    }
  ]
})
export class MonacoEditorComponent implements AfterViewInit, OnChanges {

  @ViewChild('editorContainer') _editorContainer: ElementRef;

  @Input() code = '';
  @Output() codeChange = new EventEmitter<String>();

  // Holds instance of the current code editor
  codeEditorInstance: monaco.editor.IStandaloneCodeEditor;

  constructor(private zone: NgZone, private configService: EditorConfigService) { }

  // supports two-way binding
  ngOnChanges() {
    if (this.codeEditorInstance) {
      this.codeEditorInstance.setValue(this.code);
    }
  }

  ngAfterViewInit() {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco();
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });

          (<any>window).require(['vs/editor/editor.main'], () => {
            this.initMonaco();
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = 'assets/monaco/vs/loader.js';
          loaderScript.addEventListener('load', onAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onAmdLoader();
        }
      });
    }
  }

  initMonaco(): void {
    // configure the monaco editor to understand custom language - customLang
    monaco.languages.register(this.configService.getCustomLangExtensionPoint());
    monaco.languages.setMonarchTokensProvider('CustomLang', this.configService.getCustomLangTokenProviders());
    // monaco.editor.defineTheme('customLangTheme', this.configService.getCustomLangTheme());   // add your custom theme here

    this.codeEditorInstance = monaco.editor.create(this._editorContainer.nativeElement, {
      value: this.code,
      language: 'CustomLang',
      theme: 'vs-dark'
      // theme: 'customLangTheme'
    });

    // To support two-way binding of the code
    this.codeEditorInstance.getModel().onDidChangeContent(e => {
      this.codeChange.emit(this.codeEditorInstance.getValue());
    });
  }

}
