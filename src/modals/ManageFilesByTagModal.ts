import { AllTagsInterface } from "../@types/AllTagsInterface";
import { renderBasicButton } from "components/molecule/Button";
import { App, getAllTags, Modal, TFile } from "obsidian";
import MoveFilesRelatedModal from "./MoveFilesRelatedModal";
import ShowFilesRelatedModal from "./ShowFilesRelatedModal";
import { createTitle } from "components/molecule/Title";



class ManageTagModal extends Modal {
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
		const title = createTitle("What To Do?");
		this.contentEl.appendChild(title);
	}

	renderContent(allTags: AllTagsInterface) {
		const centerDiv = this.contentEl.createDiv("manage-tags-center");
		centerDiv.style.display = "flex";
		centerDiv.style.alignItems = "center";
		centerDiv.style.justifyContent = "center";
		centerDiv.style.verticalAlign = "middle";

		const showFilesRelatedButton = renderBasicButton("Show All Files Related to a Tag");
		showFilesRelatedButton.style.margin = "5px 10px";
		showFilesRelatedButton.addEventListener("click", (event: MouseEvent) => {
			this.close();
			new ShowFilesRelatedModal(this.app, allTags).open();
		});
		centerDiv.appendChild(showFilesRelatedButton);

		const moveFilesRelatedButton = renderBasicButton("Move All Files with Same Tag to a Folder");
		moveFilesRelatedButton.style.margin = "5px 10px";
		moveFilesRelatedButton.addEventListener("click", (event: MouseEvent) => {
			this.close();
			new MoveFilesRelatedModal(this.app, allTags).open();
		});
		centerDiv.appendChild(moveFilesRelatedButton);

		this.contentEl.appendChild(centerDiv);
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

export default ManageTagModal;
