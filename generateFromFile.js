const puppeteer = require('puppeteer');
const fs = require('fs');

async function generateFromFile(path, options) {
    const defaultOptions = {
        url: null,
        filepath: null,
        html: null,
        pdfMarginTop: 0,
        pdfMarginLeft: 0,
        pdfMarginRight: 0,
        pdfMarginBottom: 0,
        pdfOutputPath: null,
        pdfFormat: 'A4',
        pdfLandscape: false,
        pdfDisplayHeaderFooter: false,
        pdfHeaderTemplate: null,
        pdfFooterTemplate: null,
        args: [],
    };

    const mergedOptions = {...defaultOptions, ...options};

    const fileExists = fs.existsSync(path);

    if (!fileExists) {
        throw new Error('File does not exists');
    }

    const browser = await puppeteer.launch({headless: true, args: options.args});

    const page = await browser.newPage();
    await page.emulateMediaType('screen');
    await page.goto('file://' + path);

    await page.waitForTimeout(1000);

    const pdfOptions = {
        path: mergedOptions.pdfOutputPath,
        format: mergedOptions.pdfFormat,
        landscape: mergedOptions.pdfLandscape === 'true' || mergedOptions.pdfLandscape,
        displayHeaderFooter: mergedOptions.pdfDisplayHeaderFooter === 'true' || mergedOptions.pdfDisplayHeaderFooter,
        margin: {
            top: mergedOptions.pdfMarginTop,
            left: mergedOptions.pdfMarginLeft,
            right: mergedOptions.pdfMarginRight,
            bottom: mergedOptions.pdfMarginBottom,
        }
    };

    if (pdfOptions.displayHeaderFooter) {
        pdfOptions.headerTemplate = mergedOptions.pdfHeaderTemplate;
        pdfOptions.footerTemplate = mergedOptions.pdfFooterTemplate;
    }

    await page.pdf(pdfOptions);

    await browser.close();
}

module.exports = generateFromFile;
