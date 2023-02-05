import { renderBasicButton } from "components/molecule/Button";
import { AllTagsInterface } from "../@types/AllTagsInterface";
import { App, Modal } from "obsidian";
import { createTitle } from "components/molecule/Title";
import { ManageFilesByTagModal } from "modals";
import MoveFilesRelatedModal from "./MoveFilesRelatedModal";
import { renderSearchBar } from "components/molecule/SearchBar";
import { renderSearchFolderPathForm } from "components/organisms/SearchFolderPathForm";

class SelectDestinationPathModal extends Modal {
	allTags: AllTagsInterface;
    selectedTag: string;

	constructor(app: App, allTags: AllTagsInterface, selectedTag: string) {
		super(app);
		this.allTags = allTags;
        this.selectedTag = selectedTag;
	}

	async renderModal() {
		this.renderTitle();
		this.renderContent();
		this.renderFooter();

		this.contentEl.style.padding = "15px";
	}

	renderTitle() {
		const title = createTitle("Move to Where?");
		this.contentEl.appendChild(title);
	}

	renderContent() {
        const contentDiv = this.contentEl.createDiv("manage-file-by-tag-content-div");
        contentDiv.style.display = "flex";
        contentDiv.style.flexDirection = "column";

        const tagNameDiv = this.contentEl.createDiv("select-destination-path-modal-selected-tag-name-div");
		const tagTitle = createTitle(`${this.selectedTag}`);
        tagNameDiv.appendChild(tagTitle);

        const searchFolderPathDiv = this.contentEl.createDiv("select-destination-path-modal-search-folder-path-div");
        const searchFolderPathForm = renderSearchFolderPathForm();
        searchFolderPathDiv.appendChild(searchFolderPathForm);

        contentDiv.appendChild(tagTitle);
        contentDiv.appendChild(searchFolderPathDiv);
	}

	renderFooter() {
		const footerDiv = this.contentEl.createDiv("manage-file-by-tag-footer-div");
		const backButton = renderBasicButton("Back");
		backButton.addEventListener("click", (event: MouseEvent) => {
			this.close();
			new MoveFilesRelatedModal(this.app, this.allTags).open();
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

export default SelectDestinationPathModal;
