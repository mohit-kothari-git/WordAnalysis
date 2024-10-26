import fetch from "node-fetch";

// Yandex API key and URL
const API_KEY = "dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf";
const API_URL = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
const DOC_URL = "http://norvig.com/big.txt";

// fetch and analyze document
async function fetchDocument() {
  const response = await fetch(DOC_URL);
  const text = await response.text();
  return text;
}

// count words in the document
function countWords(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g); // Tokenize and normalize
  const wordCounts = {};

  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, 10); // Take top 10
}

// fetch word details from Yandex API
async function fetchWordDetails(word) {
  const url = `${API_URL}?key=${API_KEY}&lang=en-en&text=${word}`;
  const response = await fetch(url);
  const data = await response.json();

  const definition = data.def && data.def[0];
  const synonyms = definition ? definition.tr.map(item => item.text) : [];
  const pos = definition ? definition.pos : "unknown";

  return { word, synonyms, pos };
}

// Main function to run the analysis
async function main() {
  try {
    // Fetch and process document
    const text = await fetchDocument();
    const topWords = countWords(text);

    // Fetch additional data for each top word asynchronously
    const wordDataPromises = topWords.map(async ([word, count]) => {
      const details = await fetchWordDetails(word);
      return {
        Word: word,
        "Occurrence Count": count,
        Synonyms: details.synonyms,
        POS: details.pos
      };
    });

    // Resolve all promises and log the final result
    const wordData = await Promise.all(wordDataPromises);
    console.log(JSON.stringify(wordData, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();