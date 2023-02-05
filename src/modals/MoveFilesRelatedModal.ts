import { renderBasicButton } from "components/molecule/Button";
import { AllTagsInterface } from "../@types/AllTagsInterface";
import { App, Modal } from "obsidian";
import { createTitle } from "components/molecule/Title";
import { ManageFilesByTagModal } from "modals";
import SelectDestinationPathModal from "./SelectDestinationPathModal";

class MoveFilesRelatedModal extends Modal {
	allTags: AllTagsInterface;

	constructor(app: App, allTags: AllTagsInterface) {
		super(app);
		this.allTags = allTags;
	}

	async renderModal() {
		this.renderTitle();
		this.renderContent();
		this.renderFooter();

		this.contentEl.style.padding = "15px";
	}

	renderTitle() {
		const title = createTitle("Select A Tag");
		this.contentEl.appendChild(title);
	}

	renderContent() {
		for (const eachTag in this.allTags) {
			const tagButton = renderBasicButton(`${eachTag} ${this.allTags[eachTag]}`);
			tagButton.addEventListener("click", (event: MouseEvent) => {
				this.close();
				new SelectDestinationPathModal(this.app, this.allTags, eachTag).open();
			});
			this.contentEl.appendChild(tagButton);
		}
	}

	renderFooter() {
		const footerDiv = this.contentEl.createDiv("manage-file-by-tag-footer-div");
		const backButton = renderBasicButton("Back");
		backButton.addEventListener("click", (event: MouseEvent) => {
			this.close();
			new ManageFilesByTagModal(this.app).open();
		});
		backButton.style.marginTop = "40px";
        footerDiv.appendChild(backButton);
		this.contentEl.appendChild(footerDiv);
	}

	onOpen() {
		this.renderModal();
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

export default MoveFilesRelatedModal;
