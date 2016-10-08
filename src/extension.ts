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
    [/\b[bB][eE][gG][iI][nN]\b/g, 'Begin'],
    [/\b[bB][rR][eE][aA][kK]\b/g, 'Break'],
    [/\b[cC][aA][tT][cC][hH]\b/g, 'Catch'],
    [/\b[cC][oO][nN][tT][iI][nN][uU][eE]\b/g, 'Continue'],
    [/\b[dD][aA][tT][aA]\b/g, 'Data'],
    [/\b[dD][oO]\b/g, 'Do'],
    [/\b[dD][yY][nN][aA][mM][iI][cC][pP][aA][rR][aA][mM]\b/g, 'DynamicParam'],
    [/\b[eE][lL][sS][eE]\b/g, 'Else'],
    [/\b[eE][lL][sS][eE][iI][fF]\b/g, 'Elseif'],
    [/\b[eE][nN][dD]\b/g, 'End'],
    [/\b[eE][xX][iI][tT]\b/g, 'Exit'],
    [/\b[fF][iI][lL][tT][eE][rR]\b/g, 'Filter'],
    [/\b[fF][iI][nN][aA][lL][lL][yY]\b/g, 'Finally'],
    [/\b[fF][oO][rR]\b/g, 'For'],
    [/\b[fF][oO][rR][eE][aA][cC][hH]\b/g, 'ForEach'],
    [/\b[fF][rR][oO][mM]\b/g, 'From'],
    [/\b[fF][uU][nN][cC][tT][iI][oO][nN]\b/g, 'Function'],
    [/\b[iI][fF]\b/g, 'If'],
    [/\b[iI][nN]\b/g, 'In'],
    [/\b[iI][nN][lL][iI][nN][eE][sS][cC][rR][iI][pP][tT]\b/g, 'InlineScript'],
    [/\b[hH][iI][dD][dD][eE][nN]\b/g, 'Hidden'],
    [/\b[pP][aA][rR][aA][lL][lL][eE][lL]\b/g, 'Parallel'],
    [/\b[pP][aA][rR][aA][mM]\b/g, 'Param'],
    [/\b[pP][rR][oO][cC][eE][sS][sS]\b/g, 'Process'],
    [/\b[rR][eE][tT][uU][rR][nN]\b/g, 'Return'],
    [/\b[sS][eE][qQ][uU][eE][nN][cC][eE]\b/g, 'Sequence'],
    [/\b[sS][wW][iI][tT][cC][hH]\b/g, 'Switch'],
    [/\b[tT][hH][rR][oO][wW]\b/g, 'Throw'],
    [/\b[tT][rR][aA][pP]\b/g, 'Trap'],
    [/\b[tT][rR][yY]\b/g, 'Try'],
    [/\b[uU][nN][tT][iI][lL]\b/g, 'Until'],
    [/\b[wW][hH][iI][lL][eE]\b/g, 'While'],
    [/\b[wW][oO][rR][kK][fF][lL][oO][wW]\b/g, 'Workflow'],
    [/([^\s])(\()/g, "$1 $2"],
    [/(\))([^\s])/g, "$1 $2"],
    [/(\})([^\s])/g, "$1 $2"],
    [/\n({)\n/g, "$1\n"]
];