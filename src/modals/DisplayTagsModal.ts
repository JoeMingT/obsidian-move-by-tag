import { AllTagsInterface } from "../@types/AllTagsInterface";
import { renderBasicButton } from "components/molecule/Button";
import { App, getAllTags, Modal, TFile } from "obsidian";
import { createTitle } from "components/molecule/Title";
import { renderTagTable } from "components/organisms/Table";

class DisplayTagModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	renderModal(allTags: AllTagsInterface) {
		this.renderTitle();
		this.renderContent(allTags);
		this.renderFooter();

		this.contentEl.style.padding = "15px";
	}
	
	renderTitle() {
		const title = createTitle("All Tags in the Vault");
		this.contentEl.appendChild(title);
	}

	renderContent(allTags: AllTagsInterface) {
		const contentDiv = this.contentEl.createDiv("manage-file-by-tag-content-div");
		const contentTable = renderTagTable(allTags);
		contentDiv.append(contentTable);
	}

	renderFooter() {
		const footerDiv = this.contentEl.createDiv("manage-file-by-tag-footer-div");
		const cancelButton = renderBasicButton("Cancel");
		cancelButton.addEventListener("click", (event: MouseEvent) => {
			this.close();
		});
		cancelButton.style.marginTop = "40px";
        footerDiv.appendChild(cancelButton);
		this.contentEl.appendChild(footerDiv);
	}

	getAllTagsInVault() {
		let allTags: AllTagsInterface = {};
		this.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const cache = this.app.metadataCache.getFileCache(file);
			if (cache) {
				const tagsInFile = getAllTags(cache);
				if (tagsInFile) {
					for (const eachTag of tagsInFile) {
						if (allTags[eachTag]) {
							allTags[eachTag]++;
						} else {
							allTags[eachTag] = 1;
						}
					}
				}
			}
		});
		return allTags;
	}

	onOpen() {
		const allTags = this.getAllTagsInVault();
		this.renderModal(allTags);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export default DisplayTagModal;
