# Word Frequency Analysis Project

This project analyzes the word frequency in a document and retrieves additional information for the most frequent words using the Yandex Dictionary API. It outputs a JSON object with the word count, synonyms, and part of speech (POS) for the top 10 words in the document.

## Project Structure

- **word_analysis.js**: Main script that fetches and processes the document.
- **package.json**: Node.js configuration and dependencies.
- **.gitignore**: Specifies files that should be ignored by git.

## Setup and Running the Project

### Prerequisites

- Node.js installed (tested with Node.js v20.17.0).
- Yandex Dictionary API key (already included in the script).

### Running the Project

To run this project in GitHub Codespaces or any local Node.js environment:

1. **Install Dependencies**:
   In the project directory, install the dependencies:
   ```bash
   npm install

2. **Run The Project**:
    Within the same project directory:
    ```bash
    node word_analysis.js

#### Other Files

- **document.txt**: Copy of file form the Doc_URL for reference.
- **sample_output.json**: Expected result of the program.