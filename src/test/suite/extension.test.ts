import * as path from "path";
import * as assert from "assert";
import * as fs from "fs";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';
// import * as myExtension from '../extension';

const fixturePath = path.join(__dirname, "test-fixtures");

interface Fixture {
  infilePath: string;
  outfilePath: string;
  infile: string;
  outfile: string;
}

function getFixtures(filename: string): Fixture {
  const infilePath = path.join(fixturePath, filename + ".in.hbs");
  const outfilePath = path.join(fixturePath, filename + ".out.hbs");

  return {
    infilePath,
    outfilePath,
    infile: fs.readFileSync(infilePath, { encoding: "utf8" }),
    outfile: fs.readFileSync(outfilePath, { encoding: "utf8" }),
  };
}

async function loadFixture(fixture: Fixture) {
  const document = await vscode.workspace.openTextDocument(fixture.infilePath);
  await vscode.window.showTextDocument(document);
}

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Simple", async () => {
    const fixtures = getFixtures("simple");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });

  test("with params", async () => {
    const fixtures = getFixtures("complex");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });

  test("For selections", async () => {
    const fixtures = getFixtures("selection");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    vscode.window.activeTextEditor.selection = new vscode.Selection(1, 2, 1, 37);

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertSelectionToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });

  test("For invalid selections", async () => {
    const fixtures = getFixtures("invalid-selection");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    vscode.window.activeTextEditor.selection = new vscode.Selection(1, 2, 1, 31);

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertSelectionToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );
  });

  test("Handles block components", async () => {
    const fixtures = getFixtures("block-component");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });

  test("Handles nested modules components", async () => {
    const fixtures = getFixtures("nested-module");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });

  test("Handles nested modules components with dash", async () => {
    const fixtures = getFixtures("nested-dash");
    await loadFixture(fixtures);

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.infile
    );

    await vscode.commands.executeCommand(
      "vscode-ember-angle-brackets-converter.convertFileToAngleBrackets"
    );

    assert.strictEqual(
      vscode.window.activeTextEditor.document.getText(),
      fixtures.outfile
    );
  });
});
