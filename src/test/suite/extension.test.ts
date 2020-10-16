import * as path from "path";
import * as assert from "assert";
import * as fs from "fs";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';
// import * as myExtension from '../extension';

const fixturePath = path.join(__dirname, "test-fixtures");

function getFixtures(filename: string) {
  const infilePath = path.join(fixturePath, filename + ".in.hbs");
  const outfilePath = path.join(fixturePath, filename + ".out.hbs");

  return {
    infilePath,
    infile: fs.readFileSync(infilePath, { encoding: "utf8" }),
    outfile: fs.readFileSync(outfilePath, { encoding: "utf8" }),
  };
}

async function loadFixture(fixture: any) {
  const uri = vscode.Uri.file(fixture.infilePath);
  const document = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(document);
  return document;
}

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Simple", async () => {
		const fixtures = getFixtures('simple');
		const document = await loadFixture(fixtures);

		assert.strictEqual(document.getText(), fixtures.infile);

		await vscode.commands.executeCommand('editor.action.convertToAngleBrackets');


		assert.strictEqual(document.getText(), fixtures.outfile);
  });
});
