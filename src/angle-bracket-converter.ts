import {
  CancellationToken,
  DocumentFormattingEditProvider,
  DocumentRangeFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  Range,
  TextDocument,
  TextEdit,
} from "vscode";

export default class AngleBracketConverter
  implements
    DocumentFormattingEditProvider,
    DocumentRangeFormattingEditProvider {
  provideDocumentRangeFormattingEdits(document: TextDocument, range: Range, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
    throw new Error("Method not implemented.");
  }
  provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]> {
    throw new Error("Method not implemented.");
  }
}
