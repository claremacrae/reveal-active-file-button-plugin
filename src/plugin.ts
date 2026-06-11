import { Plugin, setIcon, WorkspaceLeaf } from 'obsidian';

export class RevealActiveFileButtonPlugin extends Plugin {
  onload() {
    // Initialize
    this.app.workspace.onLayoutReady(() => {
      const explorers = this.getFileExplorers();
      explorers.forEach((exp) => {
        this.addRevealButton(exp);
      });
    });

    // File explorers that get opened later on
    this.registerEvent(
      this.app.workspace.on('layout-change', () => {
        const explorers = this.getFileExplorers();
        explorers.forEach((exp) => {
          this.addRevealButton(exp);
        });
      })
    );
  }

  onunload(): void {
    // Remove all reveal buttons
    const explorers = this.getFileExplorers();
    explorers.forEach((exp) => {
      this.removeRevealButton(exp);
    });
  }

  /**
   * Adds the reveal button to a file explorer leaf.
   * Returns the newly created button element or the old one if already there.
   */
  private addRevealButton(explorer: WorkspaceLeaf): void {
    const container = explorer.view.containerEl as HTMLDivElement;
    const navContainer = container.querySelector(
      'div.nav-buttons-container'
    );
    if (!navContainer) {
      return null;
    }

    const existingButton = this.getRevealButton(explorer);
    if (existingButton) {
      return;
    }

    const newIcon = createDiv();
    this.setButtonProperties(newIcon);
    newIcon.className = 'clickable-icon nav-action-button reveal-active-file-button';
    this.registerDomEvent(newIcon, 'click', () => {
      this.onButtonClick(explorer);
    });
    navContainer.appendChild(newIcon);
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
  private onButtonClick(explorer: WorkspaceLeaf): void {
    if (explorer) {
      this.revealActiveFile();
      // Send the command twice like a double-click, to handle the frequent case where Obsidian fails to jump to the file
      window.setTimeout(() => {
        this.revealActiveFile();
      }, 50)
    }
  }

  private revealActiveFile(): void {
    (this.app as unknown as { commands: { executeCommandById: (id: string) => void } })
        .commands.executeCommandById('file-explorer:reveal-active-file');
  }

  private setButtonProperties(
      button: HTMLElement
  ): void {
    setIcon(button, 'crosshair');
    button.setAttribute(
        'aria-label',
        'Reveal active file'
    );
  }

  /**
   * Returns all loaded file explorer leaves
   */
  private getFileExplorers(): WorkspaceLeaf[] {
    return this.app.workspace.getLeavesOfType('file-explorer');
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
