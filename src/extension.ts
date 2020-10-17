import * as vscode from "vscode";
import { convertFileToAngleBrackets } from "./angle-bracket-converter";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "ember-angle-brackets-converter.convertFileToAngleBrackets",
      convertFileToAngleBrackets
    )
  );
}

export function deactivate() {}
