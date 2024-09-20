function process() {
    const action = document.getElementById('action').value;
    const keyA = parseInt(document.getElementById('keyA').value, 10);
    const keyB = parseInt(document.getElementById('keyB').value, 10);
    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('fileInput');

    // Kiểm tra nếu keyA không coprime với 26
    if (gcd(keyA, 26) !== 1) {
        alert('Khóa A phải coprime với 26!');
        return;
    }

    if (inputText) {
        const result = affineCipher(inputText, keyA, keyB, action);
        document.getElementById('result').innerText = result;
        prepareDownload(result);
    } else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            const result = affineCipher(fileContent, keyA, keyB, action);
            document.getElementById('result').innerText = result;
            prepareDownload(result);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng nhập chuỗi ký tự hoặc tải lên một file!');
    }
}

// Affine Cipher Function
function affineCipher(text, a, b, action) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const m = 26; // Alphabet size
    let result = '';

    const modInverseA = modInverse(a, m); // Find modular inverse of a
    const upperText = text.toUpperCase();

    for (let i = 0; i < upperText.length; i++) {
        const char = upperText[i];

        if (alphabet.includes(char)) {
            const x = alphabet.indexOf(char);
            let newIndex;

            if (action === 'encrypt') {
                // Encryption: E(x) = (a * x + b) % m
                newIndex = (a * x + b) % m;
            } else {
                // Decryption: D(x) = a^(-1) * (x - b) % m
                newIndex = mod((modInverseA * (x - b)), m);
            }

            result += alphabet[newIndex];
        } else {
            result += text[i]; // Preserve non-alphabetic characters
        }
    }

    return result;
}

// GCD function to check if a and m are coprime
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to find modular inverse of a under modulo m
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // No inverse found
}

// Function to handle modulo with negative numbers
function mod(n, m) {
    return ((n % m) + m) % m;
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