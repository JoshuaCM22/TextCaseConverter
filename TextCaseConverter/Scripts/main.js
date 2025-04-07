$(document).ready(function () {
    $("#TextAreaMain").focus();  // Set focus to the text area on page load

    $('#TextAreaMain').on('input', function () {
        computeTotals();
    });

});

const CaseType = {
    SENTENCE: "SENTENCE",
    LOWER: "LOWER",
    UPPER: "UPPER",
    CAPITALIZED: "CAPITALIZED",
    ALTERNATING: "ALTERNATING",
    TITLE: "TITLE",
    INVERSE: "INVERSE"
};

function clearTextArea() {
    $("#spTotalCharacter").text("0");
    $("#spTotalWord").text("0");
    $("#spTotalSentence").text("0");
    $("#spTotalLine").text("0");

    $("#TextAreaMain").val("");  // Clear the text area
    $("#TextAreaMain").focus();  // Set focus back to the text area
}

function convertCase(caseType = CaseType.SENTENCE) {
    if (hasText()) {
        let currentValue = $("#TextAreaMain").val();  // Create a variable to hold the modified text

        switch (caseType) {
            case CaseType.SENTENCE:
                // Convert the first letter of the text to uppercase and the rest to lowercase
                convertedValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1).toLowerCase();
                break;
            case CaseType.LOWER:
                convertedValue = currentValue.toLowerCase();  // Convert the text to lowercase
                break;
            case CaseType.UPPER:
                convertedValue = currentValue.toUpperCase();  // Convert the text to uppercase
                break;
            case CaseType.CAPITALIZED:
                // Lowercase the entire string first
                convertedValue = currentValue.toLowerCase()
                    // Capitalize the first letter of each word
                    .replace(/\b\w/g, function (char) {
                        return char.toUpperCase(); // Capitalize first letter of each word
                    })
                    // Convert all letters following both straight and curly apostrophes to lowercase
                    .replace(/['’](\w)/g, function (match, p1) {
                        return "'" + p1.toLowerCase(); // Keep the apostrophe and lowercase the following letter
                    });
                break;
            case CaseType.ALTERNATING:
                // Convert the entire string to lowercase first
                convertedValue = currentValue.toLowerCase()
                    .split('')
                    .map((char, index) => {
                        // Alternate case: Uppercase for odd-indexed characters, lowercase for even-indexed characters
                        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
                    })
                    .join('');
                break;
            case CaseType.TITLE:
                // Define a list of small words to ignore in title case
                const smallWords = ["a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "of", "on", "or", "the", "to", "up", "yet"];

                convertedValue = currentValue.toLowerCase()
                    .split(/(\s+|[,.!?]+)/) // Split by whitespace and keep the delimiters
                    .map((word, index) => {
                        // Capitalize the first word or any word that is not in the small words list
                        if (index === 0 || !smallWords.includes(word.toLowerCase())) {
                            return word.charAt(0).toUpperCase() + word.slice(1);
                        }
                        return word; // Return the word as it is for small words
                    })
                    .join(''); // Join words back into a string without losing spaces or special characters
                break;
            case CaseType.INVERSE:
                // Inverse case: Convert uppercase to lowercase and vice versa
                convertedValue = currentValue.split('').map(char =>
                    char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
                ).join('');
                break;
        }

        $("#TextAreaMain").val(convertedValue);  // Update the text area with the modified value
    }
    $("#TextAreaMain").focus();
}


function changeButtonColor(button) {
    // Reset all buttons' background color
    var buttons = document.getElementsByClassName('buttonDesign');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = ""; // Reset background color
    }
    // Change the background color of the clicked button
    button.style.backgroundColor = "#000"; // Change to your desired color
}

function downloadText() {
    if (hasText()) {
        // Get the value from the textarea
        const text = $('#TextAreaMain').val();

        // Create a Blob from the text
        const blob = new Blob([text], { type: 'text/plain' });

        // Create a link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'TextCaseConverter.txt'; // Name of the file to be downloaded

        // Append the link to the body (not visible)
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    } else alertAndFocus();
}

function copyToClipBoard() {
    if (hasText()) {
        const $textarea = $('#TextAreaMain');
        $textarea.select();
        $textarea[0].setSelectionRange(0, 99999); // For mobile devices

        try {
            document.execCommand('copy');
            alert('Successfully Text copied to clipboard!');
        } catch (err) {
            alert('Unable to copy text using fallback method.');
            console.error('Fallback copy failed: ', err);
        }

    } else alertAndFocus();
}

function hasText() {
    const currentValue = $("#TextAreaMain").val();  
    return (currentValue.length > 0);
}

function alertAndFocus() {
    alert('Please type some text first!');
    $("#TextAreaMain").focus();
}


function computeTotals() {
    sumCharacters();
    sumWords();
    sumSentence();
    sumLine();
}

function sumCharacters() {
    const characterCount = $('#TextAreaMain').val().length;
    $('#spTotalCharacter').text(characterCount);
}

function sumWords() {
    const text = $('#TextAreaMain').val();

    const wordCount = text.trim().split(/\s+/).filter(function (word) {
        return word.length > 0;
    }).length;

    $('#spTotalWord').text(wordCount);
}

function sumSentence() {
    const text = $('#TextAreaMain').val();

    let sentenceCount = text.split(/[.!?]+/).filter(function (sentence) {
        return sentence.trim().length > 0;
    }).length;

    $('#spTotalSentence').text(sentenceCount);
}

function sumLine() {
    const text = $('#TextAreaMain').val();
    const lineCount = text.split('\n').length;
    $('#spTotalLine').text(lineCount);
}