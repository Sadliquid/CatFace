"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSidebarViewProvider = void 0;
const vscode = require("vscode");
class CustomSidebarViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }
    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        this._updateView();
    }
    _updateView() {
        if (this._view) {
            this._view.webview.html = this.getHtmlContent(this._view.webview);
        }
    }
    getHtmlContent(webview) {
        const diagnostics = this.getDiagnostics();
        const numProblems = diagnostics.length;
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "main.js"));
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "reset.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "vscode.css"));
        const stylesheetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "main.css"));
        let imageUrl = '';
        let message = "";
        switch (true) {
            case numProblems === 0:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "0errors.png")).toString();
                message = "purrr-fect the cat is PLEASE,You make the cat very happy!";
                break;
            case numProblems >= 1 && numProblems < 3:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "3errors.png")).toString();
                message = "meow... already? we just started. smh my paw my paw ";
                break;
            case numProblems >= 3 && numProblems < 6:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "40errors.png")).toString();
                message = "oh so ur just winging it huh. bold strategy ngl mrow.";
                break;
            case numProblems >= 6 && numProblems < 10:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "10errors.png")).toString();
                message = "MEHHHH??? did u even test this or just close ur eyes and pray";
                break;
            case numProblems >= 10 && numProblems < 15:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "15errors.png")).toString();
                message = "10 errors. TEN. the cat is not okay. I am not okay. nobody is okay.";
                break;
            case numProblems >= 15 && numProblems < 25:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "20errors.png")).toString();
                message = "bro cooked and left the stove on MROW WHAT IS THIS.";
                break;
            case numProblems >= 25 && numProblems < 35:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "25errors.png")).toString();
                message = "MEOOOOHHH ur compiler called. it said it quit. it said goodbye.";
                break;
            case numProblems >= 35 && numProblems < 50:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "30errors.png")).toString();
                message = "at this point just delete the repo and become a farmer MRRROW.";
                break;
            case numProblems >= 50:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "35errors.png")).toString();
                message = "50+ errors??? FIFTY??? the cat has ascended. i am beyond disappointment. ur on ur own.";
                break;
            default:
                imageUrl = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "0errors.png")).toString();
                message = "purrr-fect the cat is PLEASED, you make the cat very happy!";
        }
        const errorMessages = diagnostics.map(diagnostic => {
            const lineNumber = diagnostic.range.start.line + 1;
            return `<li id="individualErrors">[Line ${lineNumber}]: ${diagnostic.message}</li>`;
        });
        const nonce = getNonce();
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}'; img-src * data:;">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;700&display=swap" rel="stylesheet">

            <link href="${styleResetUri}" rel="stylesheet">
            <link href="${styleVSCodeUri}" rel="stylesheet">
            
            <link href="${stylesheetUri}" rel="stylesheet">
            
        </head>

        <body>
            <img src="${imageUrl}" alt="Cat face">
            <h2>Errors: ${numProblems}</h2>
            <p></p>
            <h3>${message}</h3>
            <ul id="errorMessages">
                ${errorMessages.join('')}
            </ul>
        </body>

        </html>`;
    }
    getDiagnostics() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            return vscode.languages.getDiagnostics(document.uri);
        }
        return [];
    }
    updateView() {
        this._updateView();
    }
}
exports.CustomSidebarViewProvider = CustomSidebarViewProvider;
CustomSidebarViewProvider.viewType = "vscodeSidebar.openview";
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}