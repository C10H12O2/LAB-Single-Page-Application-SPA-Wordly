const form = document.getElementById('search-form');
const input = document.getElementById('word-input');
const resultDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;
    results.innerHTML = 'Loading...';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Word not found');
        const data = await response.json();
        displayWord(data[0]);
    } catch (error) {
        results.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
});

function displayWord(wordData) {
    results.innerHTML = '';

    const wordHeader = document.createElement('h2');
    wordHeader.textContent = wordData.word;

    const phonetic = wordData.phonetics[0]?.text || 'N/A';
    const phoneticElement = document.createElement('p');
    phoneticElement.textContent = `Pronunciation: ${phonetic}`;
    results.append(wordHeader, phoneticElement);
}

wordData.meanings.forEach(meaning => {
    const partOfSpeech = document.createElement('h3');
    partOfSpeech.textContent = meaning.partOfSpeech;

    meaning.definitions.forEach(def => {
        const defElement = document.createElement('div')
        defElement.classList.add('definition');
        defElement.innerHTML = `<strong>Definition:</strong> ${def.definition}
        <br><em>Example:</em> ${def.example || 'No example available'}`;
        results.append(partOfSpeech, defElement);
    })
    if (meaning.synonyms.length) {
        const synonymElement = document.createElement('p');
        synonymElement.innerHTML = `<strong>Synonyms:</strong> ${meaning.synonyms.join(', ')}`;
        results.appendChild(synonymElement);
    }
});