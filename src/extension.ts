'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "powershellformatter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.formatDocument', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        let powerShellDocument = new PowerShellDocument();
        powerShellDocument.formatDocument(); 
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

export class PowerShellDocument {
    public formatDocument() {
        let editor = vscode.window.activeTextEditor;
        let doc = editor.document;

        if(doc.languageId !== "powershell"){
            return;
        }

        var content = doc.getText();

        content = this.applyRules(content);

        this.edit(editor,content);
    }

    public applyRules(content:string){
        rules.forEach(reg => {
            content = content.replace(reg[0], reg[1])
        });
        return content;
    }

    private edit(editor:vscode.TextEditor, content:string){
        let doc = editor.document;
        
        editor.edit((editBuilder : vscode.TextEditorEdit) =>{
            let start = new vscode.Position(0,0);
            let end = new vscode.Position(doc.lineCount-1, doc.lineAt(doc.lineCount-1).text.length)
            let range = new vscode.Range(start,end);
            editBuilder.replace(range,content);    
        })
    }
}

let rules: [RegExp,string][] = [
    [/\bbegin\b/ig, 'Begin'],
    [/\bbreak\b/ig, 'Break'],
    [/\bcatch\b/ig, 'Catch'],
    [/\bcontinue\b/ig, 'Continue'],
    [/\bdata\b/ig, 'Data'],
    [/\bdo\b/ig, 'Do'],
    [/\bdynamicparam\b/ig, 'DynamicParam'],
    [/\belse\b/ig, 'Else'],
    [/\belseif\b/ig, 'Elseif'],
    [/\bend\b/ig, 'End'],
    [/\bexit\b/ig, 'Exit'],
    [/\bfilter\b/ig, 'Filter'],
    [/\bfinally\b/ig, 'Finally'],
    [/\bfor\b/ig, 'For'],
    [/\bforeach\b/ig, 'ForEach'],
    [/\bfrom\b/ig, 'From'],
    [/\bfunction\b/ig, 'Function'],
    [/\bif\b/ig, 'If'],
    [/\bin\b/ig, 'In'],
    [/\binlinescript\b/ig, 'InlineScript'],
    [/\bhidden\b/ig, 'Hidden'],
    [/\bparallel\b/ig, 'Parallel'],
    [/\bparam\b/ig, 'Param'],
    [/\bprocess\b/ig, 'Process'],
    [/\breturn\b/ig, 'Return'],
    [/\bsequence\b/ig, 'Sequence'],
    [/\bswitch\b/ig, 'Switch'],
    [/\bthrow\b/ig, 'Throw'],
    [/\btrap\b/ig, 'Trap'],
    [/\btry\b/ig, 'Try'],
    [/\buntil\b/ig, 'Until'],
    [/\bwhile\b/ig, 'While'],
    [/\bworkflow\b/ig, 'Workflow'],
    [/\t/g, "    "],
    [/\n\s*({)\n/g, "$1\n"],
    [/([^\s])(\()/g, "$1 $2"],
    [/(\))([^\s])/g, "$1 $2"],
    [/(\})([^\s])/g, "$1 $2"],
];