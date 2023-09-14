const fs = require('fs');
const UglifyJS = require('uglify-js');

// Define the list of files. Inlude the relative path to them
const files = [
    '../js/app.js',
    '../js/validation.js',
    '../js/additional-features.js'
    // add more file paths here
];

// Read and store content of each file
const fileContents = files.map((filePath) => {
    return fs.readFileSync(filePath, 'utf8');
});

// Combine the content of all files
const combinedCode = fileContents.join(';');

// Minify the combined code
const minified = UglifyJS.minify(combinedCode);

if (minified.error) {
    console.error('Error during minification:', minified.error);
    return;
}

// Write the minified code to a new file
fs.writeFileSync('combined-and-minified-file.min.js', minified.code, 'utf8');

console.log('Minification complete.');
