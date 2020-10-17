import * as vscode from "vscode";
import {
  convertFileToAngleBrackets,
  convertSelectionToAngleBrackets,
} from "./angle-bracket-converter";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets",
      convertFileToAngleBrackets
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "vscode-ember-angle-brackets-converter.convertSelectionToAngleBrackets",
      convertSelectionToAngleBrackets
    )
  );
}

export function deactivate() {}
