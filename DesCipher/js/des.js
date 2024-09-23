// Import CryptoJS for DES encryption and decryption
// Include this line in your HTML before the script tag: <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

function process() {
    const action = document.getElementById('action').value;
    const key = document.getElementById('key').value;
    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('fileInput');

    if (key.length !== 8) {
        alert('Khóa phải có đúng 8 ký tự!');
        return;
    }

    if (inputText) {
        const result = desCipher(inputText, key, action);
        document.getElementById('result').innerText = result;
        prepareDownload(result);
    } else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            const result = desCipher(fileContent, key, action);
            document.getElementById('result').innerText = result;
            prepareDownload(result);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng nhập chuỗi ký tự hoặc tải lên một file!');
    }
}

function desCipher(text, key, action) {
    let result = '';
    if (action === 'encrypt') {
        result = CryptoJS.DES.encrypt(text, CryptoJS.enc.Utf8.parse(key)).toString();
    } else {
        result = CryptoJS.DES.decrypt(text, CryptoJS.enc.Utf8.parse(key)).toString(CryptoJS.enc.Utf8);
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
