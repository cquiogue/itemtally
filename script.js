function toggleLP() {
  tallyItems();
}

function tallyItems() {
  const inputText = document.getElementById('inputText').value;
  const lines = inputText.split('\n');
  const tally = {};
  const includeLP = document.getElementById('lpCheckbox').checked;

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

function openPopout() {
  const width = document.querySelector('.container').offsetWidth;
  const height = 800;
  const left = window.screenLeft || window.screenX;
  const top = window.screenTop || window.screenY;
  window.open(
    window.location.href,
    '_blank',
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
