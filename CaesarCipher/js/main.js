function process() {
    const action = document.getElementById('action').value;
    const shift = parseInt(document.getElementById('shift').value);

    const inputText = document.getElementById('inputText').value;
    const fileInput = document.getElementById('fileInput');

    if (inputText) {
        const result = caesarCipher(inputText, shift, action);
        document.getElementById('result').innerText = result;
        prepareDownload(result);
    } else if (fileInput.files.length) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            const result = caesarCipher(fileContent, shift, action);
            document.getElementById('result').innerText = result;
            prepareDownload(result);
        };

        reader.readAsText(file);
    } else {
        alert('Vui lòng nhập chuỗi hoặc tải lên một file!');
    }
}

function caesarCipher(text, shift, action) {
    let result = '';
    const direction = action === 'encrypt' ? shift : -shift;

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        // Mã hóa tất cả ký tự dựa trên mã Unicode của chúng
        result += String.fromCharCode((charCode + direction + 65536) % 65536);
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