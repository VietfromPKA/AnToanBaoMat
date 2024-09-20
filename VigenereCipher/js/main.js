function process() {
    const action = document.getElementById('action').value;
    const key = document.getElementById('key').value.toUpperCase();
    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('fileInput');

    if (!/^[A-Z]+$/.test(key)) {
        alert('Khóa chỉ được chứa ký tự chữ cái!');
        return;
    }

    if (inputText) {
        const result = vigenereCipher(inputText, key, action);
        document.getElementById('result').innerText = result;
        prepareDownload(result);
    } else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            const result = vigenereCipher(fileContent, key, action);
            document.getElementById('result').innerText = result;
            prepareDownload(result);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng nhập chuỗi ký tự hoặc tải lên một file!');
    }
}

// Vigenere Cipher Function
function vigenereCipher(text, key, action) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const upperText = text.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < upperText.length; i++) {
        const char = upperText[i];

        if (alphabet.includes(char)) {
            const x = alphabet.indexOf(char);
            const keyChar = key[keyIndex % key.length];
            const keyShift = alphabet.indexOf(keyChar);

            if (action === 'encrypt') {
                // Mã hóa: (x + keyShift) % 26
                const newIndex = (x + keyShift) % 26;
                result += alphabet[newIndex];
            } else {
                // Giải mã: (x - keyShift + 26) % 26
                const newIndex = (x - keyShift + 26) % 26;
                result += alphabet[newIndex];
            }

            keyIndex++; // Tiến đến ký tự tiếp theo trong khóa
        } else {
            result += text[i]; // Bảo toàn ký tự không phải chữ cái
        }
    }

    return result;
}

// Prepare result for download
function prepareDownload(result) {
    const downloadButton = document.getElementById('downloadButton');
    const blob = new Blob([result], {
        type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    downloadButton.href = url;
}