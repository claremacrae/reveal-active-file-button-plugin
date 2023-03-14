import { Plugin, WorkspaceLeaf } from 'obsidian';
import { REVEAL_ACTIVE_FILE_BUTTON_ICON } from './constants';

export default class RevealActiveFileButtonPlugin extends Plugin {
	async onload() {
		// Initialize
		this.app.workspace.onLayoutReady(() => {
			const explorer = this.getFileExplorers();
			this.addRevealButton(explorer);
		});
		// File explorers that get opened later on
		this.registerEvent(
			this.app.workspace.on('layout-change', () => {
				const explorer = this.getFileExplorers();
				this.addRevealButton(explorer);
			})
		);
	}
	onunload() {
		// Remove all reveal buttons
		const explorer = this.getFileExplorers();
		this.removeRevealButton(explorer);
	}

	private addRevealButton(explorer: WorkspaceLeaf): void {
		const container = explorer.view.containerEl;
		const navContainer = container.querySelector(
			'div.nav-buttons-container'
		) as HTMLDivElement;

		const existingButton = this.getRevealButton(explorer);
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
			this.onButtonClick(explorer);
		});
	}

	/**
	 * Remove the reveal button from a given file explorer leaf.
	 */
	private removeRevealButton(explorer: WorkspaceLeaf): void {
		const button = this.getRevealButton(explorer);
		if (button) {
			button.remove();
		}
	}

	/**
	 * Reveal the active file in the given file explorer
	 */
	private onButtonClick = (explorer: WorkspaceLeaf) => {
		if (explorer) {
			// @ts-ignore
			await this.app.commands.executeCommandById(
				'file-explorer:reveal-active-file'
			);
		}
	}

	/**
	 * Returns all loaded file explorer leaf
	 */
	private getFileExplorers(): WorkspaceLeaf {
		return this.app.workspace.getLeavesOfType('file-explorer')[0];
	}

	/**
	 * Get the reveal button for a given file explorer, if it exists
	 */
	private getRevealButton(explorer: WorkspaceLeaf): HTMLDivElement | null {
		return explorer.view.containerEl.querySelector(
			'.reveal-active-file-button'
		);
	}
}
