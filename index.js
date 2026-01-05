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