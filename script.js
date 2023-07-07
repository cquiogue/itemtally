function toggleLP() {
  tallyItems();
}

function toggleExtendedOutput() {
  tallyItems();
}

function tallyItems() {
  const inputText = document.getElementById('inputText').value;
  const lines = inputText.split('\n');
  const tally = {};
  const includeLP = document.getElementById('lpCheckbox').checked;
  const extendedOutputCheckbox = document.getElementById(
    'extendedOutputCheckbox'
  ).checked;
  const caseNumber = document.getElementById('caseNumber').value || '\u00A0';

  lines.forEach(line => {
    const item = line.trim();
    if (item !== '') {
      let trimmedItem = item.replace(/\s+1$/, ''); // Remove the trailing "1"
      if (!includeLP && trimmedItem.endsWith('-LP')) {
        trimmedItem = trimmedItem.slice(0, -3); // Remove the last 3 characters ("-LP")
      }
      if (tally[trimmedItem]) {
        tally[trimmedItem]++;
      } else {
        tally[trimmedItem] = 1;
      }
    }
  });

  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  if (Object.keys(tally).length > 0) {
    const outputTable = document.createElement('div');
    outputTable.classList.add('output-table');

    const headerRow = document.createElement('div');
    headerRow.classList.add('row', 'header-row');

    const itemHeader = document.createElement('div');
    itemHeader.classList.add('column');
    itemHeader.innerText = 'Item';
    headerRow.appendChild(itemHeader);

    const quantityHeader = document.createElement('div');
    quantityHeader.classList.add('column');
    quantityHeader.innerText = 'Qty';
    headerRow.appendChild(quantityHeader);

    if (extendedOutputCheckbox) {
      const emptyColumns = ['\u00A0', '\u00A0', '\u00A0'];
      const fixedColumns = ['\u00A0', '\u00A0', '\u00A0'];

      emptyColumns.forEach(column => {
        const emptyColumn = document.createElement('div');
        emptyColumn.classList.add('column');
        emptyColumn.innerHTML = column;
        headerRow.appendChild(emptyColumn);
      });

      fixedColumns.forEach(column => {
        const fixedColumn = document.createElement('div');
        fixedColumn.classList.add('column');
        fixedColumn.innerText = column;
        headerRow.appendChild(fixedColumn);
      });
    }

    outputTable.appendChild(headerRow);

    for (const item in tally) {
      const quantity = tally[item];

      const row = document.createElement('div');
      row.classList.add('row');

      const itemColumn = document.createElement('div');
      itemColumn.classList.add('column');
      itemColumn.innerText = item;
      row.appendChild(itemColumn);

      const quantityColumn = document.createElement('div');
      quantityColumn.classList.add('column');
      quantityColumn.innerHTML = `<strong>${quantity}</strong>`;
      row.appendChild(quantityColumn);

      if (extendedOutputCheckbox) {
        const emptyColumns = ['\u00A0', '\u00A0', '\u00A0'];
        const fixedColumns = ['1002', caseNumber, 'YBAB'];

        emptyColumns.forEach(column => {
          const emptyColumn = document.createElement('div');
          emptyColumn.classList.add('column');
          emptyColumn.innerHTML = column;
          row.appendChild(emptyColumn);
        });

        fixedColumns.forEach(column => {
          const fixedColumn = document.createElement('div');
          fixedColumn.classList.add('column');
          fixedColumn.innerText = column;
          row.appendChild(fixedColumn);
        });
      }

      outputTable.appendChild(row);
    }

    outputDiv.appendChild(outputTable);
    outputDiv.style.display = 'block'; // Display the output div
  } else {
    outputDiv.style.display = 'none'; // Hide the output div
  }
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('output').innerHTML = '';
  document.getElementById('output').style.display = 'none'; // Hide the output div
}

function copyOutput() {
  const outputElement = document.getElementById('output');
  const outputTable = outputElement.querySelector('.output-table');

  // Create a range object to select the text
  const range = document.createRange();
  range.selectNode(outputTable);

  // Exclude the header row from the selection
  const headerRow = outputTable.querySelector('.header-row');
  range.setStartAfter(headerRow);

  // Add the selected text to the clipboard
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');

  // Change the copy button text and disable it temporarily
  const copyBtn = document.querySelector('.copy-btn');
  copyBtn.innerHTML = '<i class="far fa-copy"></i> Copied';
  copyBtn.disabled = true;

  // Reset the copy button state after 2 seconds
  setTimeout(() => {
    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
    copyBtn.disabled = false;
  }, 2000);
}
