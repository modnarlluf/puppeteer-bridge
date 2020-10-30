const tmp = require('tmp');
const fs = require('fs');
const generateFromFile = require('./generateFromFile');

async function generateFromHtml(options) {
    const tmpHtmlFile = tmp.fileSync({postfix: '.html'});
    const tmpPdfFile = tmp.fileSync({postfix: '.pdf'});

    fs.writeFileSync(tmpHtmlFile.name, options.html);
    await generateFromFile(tmpHtmlFile.name, {...options, pdfOutputPath: tmpPdfFile.name});

    return tmpPdfFile.name;
}

module.exports = generateFromHtml;
