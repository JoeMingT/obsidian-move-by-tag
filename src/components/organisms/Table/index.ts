import { AllTagsInterface } from "../../../@types/AllTagsInterface";

export function renderTagTable(allTags: AllTagsInterface) {
    const contentTable = document.createElement("table");
    contentTable.style.width = "100%";

    const tableHeader1 = document.createElement("th");
    const tableHeader2 = document.createElement("th");
    tableHeader1.setText("Tag Name");
    tableHeader2.setText("No. of Entries");
    contentTable.appendChild(tableHeader1);
    contentTable.appendChild(tableHeader2);

    for (const eachTag in allTags) {
        const tableRow = document.createElement("tr");
        const tagNameValue = document.createElement("td");
        const noOfFilesValue = document.createElement("td");
        tagNameValue.setText(eachTag);
        noOfFilesValue.setText(allTags[eachTag].toString());
        tableRow.appendChild(tagNameValue);
        tableRow.appendChild(noOfFilesValue);
        
        contentTable.appendChild(tableRow);
    }

    return contentTable;
}