import { Plugin, WorkspaceLeaf } from 'obsidian';
import { REVEAL_ACTIVE_FILE_BUTTON_ICON } from './constants';
import { RevealSettingTab } from './settings';

interface RevealSettings {
	enableRevealButton: boolean;
	enableRevealTitle: boolean;
}

const DEFAULT_SETTINGS: RevealSettings = {
	enableRevealButton: false,
	enableRevealTitle: true
};

export default class RevealActiveFileButtonPlugin extends Plugin {
	settings: RevealSettings;

	async onload() {

		await this.loadSettings();

		// Initialize
		if (
			this.settings.enableRevealTitle ||
			this.settings.enableRevealButton
		) {
			this.app.workspace.onLayoutReady(() => {
				if (this.settings.enableRevealTitle) {
					const containerEl = this.app.workspace.containerEl;
					this.registerDomEvent(
						containerEl,
						'click',
						this.clickHandler
					);
				}
				if (this.settings.enableRevealButton) {
					this.revealButton();
				}
			});
		}
		// File explorers that get opened later on
		if (this.settings.enableRevealButton) {
			this.registerEvent(
				this.app.workspace.on('layout-change', () => {
					this.revealButton();
				})
			);
		}

		this.addSettingTab(new RevealSettingTab(this.app, this));
	}

	onunload() {
		// Remove all reveal buttons
		this.removeRevealButton();
	}

	private addRevealButton(): void {
		const explorer = this.getFileExplorers();
		const container = explorer.view.containerEl;
		const navContainer = container.querySelector(
			'div.nav-buttons-container'
		) as HTMLDivElement;

		const existingButton = this.getRevealButton();
		if (existingButton) {
			return;
		}

		const newIcon = navContainer.createEl(
			'button',
			{
				attr: { 'aria-label': 'Reveal active file' },
				cls: 'clickable-icon nav-action-button reveal-active-file-button'
			},
			(el) => {
				el.innerHTML = REVEAL_ACTIVE_FILE_BUTTON_ICON;
			}
		);
		this.registerDomEvent(newIcon, 'click', async () => {
			this.onButtonClick();
		});
	}

	/**
	 * Remove the reveal button from a given file explorer leaf.
	 */
	removeRevealButton(): void {
		const explorer = this.getFileExplorers();
		const button = this.getRevealButton();
		if (button) {
			button.remove();
		}
	}

	/**
	 * Reveal the active file in the given file explorer
	 */
	private onButtonClick = async () => {
		const explorer = this.getFileExplorers();
		if (explorer) {
			// @ts-ignore
			await this.app.commands.executeCommandById(
				'file-explorer:reveal-active-file'
			);
		}
	};

	/**
	 * Returns all loaded file explorer leaf
	 */
	private getFileExplorers(): WorkspaceLeaf {
		return this.app.workspace.getLeavesOfType('file-explorer')[0];
	}

	/**
	 * Get the reveal button for a given file explorer, if it exists
	 */
	private getRevealButton(): HTMLDivElement | null {
		const explorer = this.getFileExplorers();
		return explorer.view.containerEl.querySelector(
			'.reveal-active-file-button'
		);
	}

	revealButton() {
		const explorer = this.getFileExplorers();
		this.addRevealButton();
	}

	clickHandler = async (evt: any) => {
		if (evt.target.classList.contains('view-header-title')) {
			await (this.app as any).commands.executeCommandById(
				'file-explorer:reveal-active-file'
			);
		}
	};

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
