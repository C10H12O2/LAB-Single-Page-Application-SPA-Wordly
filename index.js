const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const results = document.getElementById("results");

function showLoading() {
    const results = document.getElementById("results");
    results.classList.add("show");

    document.getElementById("word-title").textContent = "Searching...";
    document.getElementById("definition-text").textContent = "";
    document.getElementById("example-text").textContent = "";
    showLoading();
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const word = input.value.trim();
    if (!word) return;

    const errorEl = document.getElementById("error-message");
    errorEl.classList.add("hidden");

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!response.ok) {
            throw new Error("Couldn't find that word. Please try something else.");
        }

        const data = await response.json();
        displayWord(data[0]);
    } catch (error) {
        showErrorCard(error.message, word);
    }
});

function displayWord(wordData) {
    const results = document.getElementById("results");
    results.classList.add("show");

    const meaning = wordData.meanings[0];
    const def = meaning.definitions[0];

    document.getElementById("word-title").textContent = wordData.word;
    document.getElementById("phonetics").textContent =
        wordData.phonetics[0]?.text || "";

    document.getElementById("part-of-speech").textContent =
        meaning.partOfSpeech;

    document.getElementById("definition-text").textContent =
        def.definition;

    document.getElementById("example-text").textContent =
        def.example ? `"${def.example}"` : "";

    document.getElementById("synonyms-text").textContent =
        meaning.synonyms?.length
            ? `Synonyms: ${meaning.synonyms.join(", ")}`
            : "";

    const audioBtn = document.getElementById("audio-btn");

    const audioSrc = wordData.phonetics.find(p => p.audio)?.audio;

    if (audioSrc) {
        const audio = new Audio(audioSrc);

        audioBtn.classList.remove("hidden");
        audioBtn.onclick = () => audio.play();
    } else {
        audioBtn.classList.add("hidden");
    }
}

function showErrorCard(message, searchedWord) {
    const results = document.getElementById("results");
    results.classList.remove("hidden");

    document.getElementById("word-title").textContent = searchedWord;
    document.getElementById("phonetics").textContent = "";

    document.getElementById("part-of-speech").textContent = "";
    document.getElementById("definition-text").textContent = "";
    document.getElementById("example-text").textContent = "";
    document.getElementById("synonyms-text").textContent = "";

    const errorEl = document.getElementById("error-message");
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");

}



