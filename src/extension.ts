import * as vscode from "vscode";
import AngleBracketConverter from "./angle-bracket-converter";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider(
    { scheme: "file", language: "handlebars" },
    new AngleBracketConverter()
  );
  vscode.languages.registerDocumentRangeFormattingEditProvider(
    { scheme: "file", language: "handlebars" },
    new AngleBracketConverter()
  );
}

export function deactivate() {}
