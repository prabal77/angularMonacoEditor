Angular Monaco Editor integration project.

This sample project shows how to integrate monaco editor (https://microsoft.github.io/monaco-editor/) with Angular 7 and above application without using any third-party component or framework like ngx-monaco-editor. You can refer/copy the code to your project for moanco-editor integration. Should work with any angular and monaco-editor version.
Check monaco-editor documentations for latest api's and modify your code accordingly.

Versions:
monaco-editor - 0.15.6 (at the time of writing)
angular		  - 7.1.4 (at the time of writing)

Factors that influenced in writing this sample: 
	Unavailability of any sample/guide to integrate monaco-editor with plain vanilla angular application. The community contributed integration components available at the time of writing (e.g. ngx-monaco-editor and ngx-monaco ) projects were not up to date and looked abandoned by the contributor.
	

Steps:

1. Create your angular project.

2. install monaco-editor using npm
		npm install monaco-editor@0.15.6

3. This project uses monaco-editor's AMD version (minified) and loader.js - the AMD loader provided by microsoft along with the project.
	https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-amd.md - Integrating the AMD version of the Monaco Editor
	
4. Modify angular.json file to add monaco-editor library under assets. This wil make angular to copy moanco-editor's source files under asset folder of your angular application (dist folder).

	{ "glob": "**/*", "input": "node_modules/monaco-editor/min", "output": "./assets/monaco/" },

	e.g. 
	
	"assets": [
	  { "glob": "**/*", "input": "node_modules/monaco-editor/min", "output": "./assets/monaco/" },
	  "src/favicon.ico",
	  "src/assets"
	],

5. Add /// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" /> to any .ts file where you want to monaco namespace. As this project uses AMD loader, moanco specific typings will not be available. 
	Don't import moanco following ES6 modules loader i.e. import * as monaco from 'monaco-editor'. This will make angular's webpack to bundle monaco-editor library along with the AMD specfic bunlding that we are using here.
	
6. In this sample i have created editor for a custom language. The configs for custom language can be passed to monaco object in any way you like. I have injected it using service.
   The component i have created exposes the "code" ( code text typed by user on editor) via output property for the parent component to access the value and save. Feel free to come up with your design.