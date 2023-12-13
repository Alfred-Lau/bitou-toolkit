// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './Provider/TreeDataProvider';


async function printDefinitionsForActiveEditor() {
	const activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) {
		return;
	}

	const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
		'vscode.executeDefinitionProvider',
		activeEditor.document.uri,
		activeEditor.selection.active
	);

	for (const definition of definitions) {
		console.log(definition);
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	// Samples of `window.registerTreeDataProvider`
	const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath!);
	vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bitou-toolkit.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		await printDefinitionsForActiveEditor();
		vscode.window.showInformationMessage('Wow, hello world from bitou-toolkit!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
