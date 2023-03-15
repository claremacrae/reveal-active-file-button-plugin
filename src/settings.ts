import { App, PluginSettingTab, Setting } from 'obsidian';
import RevealActiveFileButtonPlugin from './main';

export class RevealSettingTab extends PluginSettingTab {
	plugin: RevealActiveFileButtonPlugin;

	constructor(app: App, plugin: RevealActiveFileButtonPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'reveal' });

		new Setting(containerEl)
			.setName('revealTitle')
			.setDesc(
				'reveal active file cliking on the header title (file name part)'
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableRevealTitle)
					.onChange((value) => {
						this.plugin.settings.enableRevealTitle = value;
						this.plugin.saveSettings();
						if (!this.plugin.settings.enableRevealTitle) {
							const containerEl = this.app.workspace.containerEl;
							containerEl.removeEventListener(
								'click',
								this.plugin.clickHandler
							);
						} else {
							const containerEl = this.app.workspace.containerEl;
							containerEl.addEventListener(
								'click',
								this.plugin.clickHandler
							);
						}
					})
			);
            
		new Setting(containerEl)
			.setName('revealButton')
			.setDesc(
				'add a reveal button in the left sidebar to reveal active file'
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enableRevealButton)
					.onChange((value) => {
						this.plugin.settings.enableRevealButton = value;
						this.plugin.saveSettings();
						if (!this.plugin.settings.enableRevealButton) {
							this.app.workspace.off('layout-change', () => {
								this.plugin.revealButton();
							});
							this.plugin.removeRevealButton();
						} else {
							this.plugin.revealButton();
						}
					})
			);
	}
}
