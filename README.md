# PUPPETEER-BRIDGE

Bridge to print local html file to PDF

## Install

```shell script
$ npm i
```

## Usage web service

```shell script
$ ./puppeteer-server
Listening to port 3900
```
 
### Example HTTP call:

```http request
POST http://localhost:3900
{
    "html": "<html><body><style>body {color: red}</style><h1>Hello World</h1></body></html>"
}
```

## Usage cli

```shell script
$ ./puppeteer --filepath=$PWD/sample/index.html \
              --pdfOutputPath=$PWD/sample/screen.pdf \
              --pdfMarginTop='30mm' \
              --pdfMarginLeft='20mm' \
              --pdfMarginRight='20mm' \
              --pdfMarginBottom='20mm' \
              --pdfLandscape=true
```
