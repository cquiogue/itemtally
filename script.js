function tallyItems() {
  const inputText = document.getElementById('inputText').value;
  const lines = inputText.split('\n');
  const tally = {};

  lines.forEach(line => {
    const item = line.trim();
    if (item !== '') {
      if (tally[item]) {
        tally[item]++;
      } else {
        tally[item] = 1;
      }
    }
  });

  const outputDiv = document.getElementById('output');
  const outputTable = document.createElement('div');
  outputTable.classList.add('output-table');

  outputDiv.innerHTML = '';

  if (Object.keys(tally).length > 0) {
    const headerRow = document.createElement('div');
    headerRow.classList.add('row', 'header-row');

    const itemHeader = document.createElement('div');
    itemHeader.classList.add('column');
    itemHeader.innerText = 'Item';
    headerRow.appendChild(itemHeader);

    const quantityHeader = document.createElement('div');
    quantityHeader.classList.add('column');
    quantityHeader.innerText = 'Quantity';
    headerRow.appendChild(quantityHeader);

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

      outputTable.appendChild(row);
    }

    outputDiv.appendChild(outputTable);
    outputDiv.style.display = 'block';
  }
}

function clearAll() {
  document.getElementById('inputText').value = '';
  document.getElementById('output').innerHTML = '';
  document.getElementById('output').style.display = 'none';
}
