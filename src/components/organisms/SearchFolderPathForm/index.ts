import { renderSearchBar } from "components/molecule/SearchBar";
import { renderSearchResults } from "components/molecule/SearchResults";
import { prepareQuery, prepareSimpleSearch, renderResults } from "obsidian";

export function renderSearchFolderPathForm() {
    const contentDiv = document.createElement("div");
    contentDiv.style.display = "flex";
    contentDiv.style.flexDirection = "column";
    
    const simpleSearch = prepareSimpleSearch("*computer | science");
    const queries = prepareQuery("Test");

    const searchBarDiv = document.createElement("div");
    const searchBar = renderSearchBar();
    searchBar.onchange = () => {
        console.log(searchBar.value);
        console.log(simpleSearch(searchBar.value)?.matches);
    }
    searchBarDiv.appendChild(searchBar);

    const breakLine = document.createElement("hr");
    breakLine.style.margin = "15px 10px";

    const searchFolderPathDiv = document.createElement("div");
    const searchResults = simpleSearch(searchBar.value);
    if (searchResults) {
        renderResults(searchFolderPathDiv, "Test", searchResults, 3);
    }
    

    


    contentDiv.append(searchBarDiv);
    contentDiv.appendChild(breakLine);

    return contentDiv;
}