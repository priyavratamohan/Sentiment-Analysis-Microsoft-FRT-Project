const newInputButton = document.getElementById('newInputButton');
    const inputList = document.getElementById('inputList');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const analyzeButton = document.getElementById('analyzeButton');
    const inputText = document.getElementById('inputText');
    const resultsDiv = document.getElementById('results');

    // Fetch and display the last 5 inputs
    async function fetchInputs() {
      const response = await fetch('/inputs');
      const inputs = await response.json();
      inputList.innerHTML = '';
      inputs.forEach(input => {
        const li = document.createElement('li');
        li.textContent = input.input;
        li.dataset.id = input.id;

        li.addEventListener('click', () => {
          inputText.value = input.input;
        });

        li.addEventListener('mouseover', () => {
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            await fetch(`/inputs/${input.id}`, { method: 'DELETE' });
            fetchInputs();
          });
          li.appendChild(deleteButton);
        });

        li.addEventListener('mouseout', () => {
          li.querySelector('button').remove();
        });

        inputList.appendChild(li);
      });
    }

    newInputButton.addEventListener('click', async () => {
        document.getElementById("inputText").value="";
        alert("Text area is cleared, you can add you new input now!");
        fetchInputs();
    });

    saveButton.addEventListener('click', async() => {
        const inputTextValue = inputText.value;
        if (!inputTextValue) {
            alert('Please enter some text');
            return;
        }
        else{
            await fetch('/inputs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: inputTextValue }),
            });
        fetchInputs();
        }
    });

    deleteAllButton.addEventListener('click', async () => {
      await fetch('/inputs', { method: 'DELETE' });
      fetchInputs();
    });

    analyzeButton.addEventListener('click', async () => {
      const inputTextValue = inputText.value;

      if (!inputTextValue) {
        alert('Please enter some text');
        return;
      }

      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documents: [inputTextValue] }),
      });

      const results = await response.json();
      resultsDiv.innerHTML = '';

      results.forEach(result => {
        if (result.error) {
          resultsDiv.innerHTML += `<p>Error: ${result.error}</p>`;
        } else {
          resultsDiv.innerHTML += `
            <h2>Document Sentiment: ${result.sentiment}</h2>
            <p>Confidence Scores: ${JSON.stringify(result.confidenceScores)}</p>
            <h3>Sentences</h3>
          `;
          result.sentences.forEach(sentence => {
            resultsDiv.innerHTML += `
              <p><strong>Sentence:</strong> ${sentence.text}</p>
              <p><strong>Sentiment:</strong> ${sentence.sentiment}</p>
              <p><strong>Confidence Scores:</strong> ${JSON.stringify(sentence.confidenceScores)}</p>
            `;
          });
        }
      });
    });

    // Fetch inputs on page load
    fetchInputs();