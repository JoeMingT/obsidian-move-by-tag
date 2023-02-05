import { renderBasicButton } from "components/molecule/Button";
import { createTitle } from "components/molecule/Title";
import { ManageFilesByTagModal } from "modals";
import { App, getAllTags, Modal, Notice } from "obsidian";
import { AllTagsInterface } from "../@types/AllTagsInterface";


class ShowFilesRelatedModal extends Modal {
	allTags: AllTagsInterface;

	constructor(app: App, allTags: AllTagsInterface) {
		super(app);
		this.allTags = allTags;
	}

	async outputFilesRelatedToFile(tagName: string, tagFileDestination: string) {
		let listOfFileNames: string[] = [];
		this.app.vault.getMarkdownFiles().forEach((mdFile) => {
            const cache = this.app.metadataCache.getFileCache(mdFile);
            if (cache) {
                const tagsInFile = getAllTags(cache);
                if (tagsInFile) {
                    for (const eachTag of tagsInFile) {
                        if (eachTag == tagName){
                            listOfFileNames.push(mdFile.basename);
                        }
                    }
                }
            }
		});

		for (const fileName of listOfFileNames) {
			const lineToAdd = `[[${fileName}]]\n`;
			await this.app.vault.adapter.append(tagFileDestination, lineToAdd);
		}
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
				const tagName = tagButton.getText().split(" ")[0];
				const tagFileDestination =
					this.app.vault.getRoot().path +
					`Files_Related_to_${tagName.replace("#", "")}_Tag.md`;

				this.app.vault.adapter
					.exists(tagFileDestination)
					.then(async (res) => {
                        res && await this.app.vault.adapter.remove(tagFileDestination);
						await this.app.vault.create(tagFileDestination, "");
						this.outputFilesRelatedToFile(tagName, tagFileDestination);
                        new Notice(`A new file called "Files_Related_to_${tagName.replace("#", "")}_Tag.md" has been created successfully!`, 3000);
						this.close();
					}).catch((err) => {
                        console.log(err);
                    });
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

export default ShowFilesRelatedModal;
