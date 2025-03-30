import * as vscode from 'vscode';

export class SecureStorage {
    private static context: vscode.ExtensionContext;

    static initialize(context: vscode.ExtensionContext) {
        this.context = context;
    }

    static async storeOpenAIKey(key: string): Promise<boolean> {
        if (!this.validateOpenAIKey(key)) {
            return false;
        }
        await this.context.secrets.store('openai_api_key', key);
        return true;
    }

    static async getOpenAIKey(): Promise<string | undefined> {
        return await this.context.secrets.get('openai_api_key');
    }

    private static validateOpenAIKey(key: string): boolean {
        return key.startsWith('sk-') && key.length > 30;
    }
}