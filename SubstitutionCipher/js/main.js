function process() {
    const action = document.getElementById('action').value;
    const key = parseInt(document.getElementById('key').value, 10);
    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('fileInput');

    if (isNaN(key) || key <= 0) {
        alert('Khóa chuyển vị phải là một số nguyên dương!');
        return;
    }

    if (inputText) {
        const result = transpositionCipher(inputText, key, action);
        document.getElementById('result').innerText = result;
        prepareDownload(result);
    } else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            const result = transpositionCipher(fileContent, key, action);
            document.getElementById('result').innerText = result;
            prepareDownload(result);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng nhập chuỗi ký tự hoặc tải lên một file!');
    }
}

function transpositionCipher(text, key, action) {
    const rows = Math.ceil(text.length / key);
    const grid = Array.from({
        length: rows
    }, () => '');

    // Fill the grid with characters
    for (let i = 0; i < text.length; i++) {
        const row = Math.floor(i / key);
        grid[row] += text[i];
    }

    let result = '';
    if (action === 'encrypt') {
        // Read columns
        for (let col = 0; col < key; col++) {
            for (let row = 0; row < rows; row++) {
                result += grid[row][col] || ''; // Handle empty cells
            }
        }
    } else {
        // Read rows
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < key; col++) {
                result += grid[row][col] || ''; // Handle empty cells
            }
        }
    }

    return result;
}

function prepareDownload(result) {
    const downloadButton = document.getElementById('downloadButton');
    const blob = new Blob([result], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    downloadButton.href = url;
}