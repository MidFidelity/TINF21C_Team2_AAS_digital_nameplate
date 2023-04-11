/**
 * Generates the nameplate from the given data and markings and injects the resulting SVG into the DOM element with the
 * given ID.
 * @param data All the key-value pairs out of the asset WITHOUT the markings.
 * @param markings All Marking-Data as it is retrieved from the asset.
 * @param id ID of the DOM element into which the nameplate will be injected.
 */
function generateNameplate(data, markings, id) {
    // following values are in pixels
    const nameplateWidth = 920;
    const nameplateHeight = 600;
    const qrCodeSize = 400;
    const qrCodeOffsetX = 500;
    const qrCodeOffsetY = 85;

    // this is the root svg in which the nameplate is build
    // TODO: Disable border again
    const nameplateSvg = initSvg(nameplateWidth + 'px', nameplateHeight + 'px', false, 'nameplateSvg');

    // this transforms the data & markings into one single string with linebreaks ('\n')
    // this is the content of the qr-code
    const qrCodeString = nameplateContentObjectToString(data, markings);

    // this svg warps around the qr-code svg
    // it is mainly used for styling and positioning
    // make sure, that this svg is square, otherwise positioning will be off!!!
    const qrCodeSvg = initSvg(qrCodeSize + 'px', qrCodeSize + 'px', false, 'qrCodeSvg');
    // these two attributes manage the offset inside the 'nameplateSvg' from the top-left corner
    qrCodeSvg.setAttribute('x', qrCodeOffsetX + 'px');
    qrCodeSvg.setAttribute('y', qrCodeOffsetY + 'px');

    // takes all key-value pairs from data and writes them into the given svg
    writeHeadingToSvg(data, nameplateSvg);
    writeTextToSvg(data, nameplateSvg);

    // extracts the FilePaths from the markings
    // this is where the images are stored
//    const markingImages = extractFilePathsFromMarkings(markings);
    extractAllImagesFromMarkings(markings).then((markingImages) => {
        // displays the markings on the nameplate (svg)
        displayMarkingImages(markingImages, nameplateSvg);
    });

    // the svg's are appended to the DOM before the qr-code is created, because the 'makeQrCode()' function needs to find
    // the svg-elements by 'document.getElementById()'
    appendToDocument(id, nameplateSvg);
    appendToDocument('nameplateSvg', qrCodeSvg);

    // makes the qr-code svg and injects it into the 'qrCodeSvg' element
    // the qr-code svg will be wrapped by the 'qrCodeSvg', which is mainly used for styling
    makeQrCode(qrCodeString, qrCodeSvg.id);
}

/**
 * Makes a QR-Code. The content of the QR-Code is specified in 'text'. The QR-Code SVG element is injected into the
 * element with the given 'id'. Make sure, that the element with the chosen ID is already in the DOM.
 * @param text Content of QR-Code
 * @param id ID of element in DOM, in which the QR-Code SVG will be injected.
 */
function makeQrCode(text, id) {
    const settings = {
        text: text,
        width: '100%',
        height: '100%',
        useSVG: true,
        //TODO: level M oder Q?
        correctLevel: QRCode.CorrectLevel.M
    }
    const qrCode = new QRCode(document.getElementById(id), settings)
}

/**
 * Starts the download of the nameplate with svg file format
 */
function downloadSvg() {
    const nameplateSvg = document.getElementById('nameplateSvg');
    downloadPlate('svg', CURRENT_IDSHORT, nameplateSvg, null, null);
}

/**
 * Starts the download of the nameplate with png file format
 */
function downloadPng() {
    const nameplateSvg = document.getElementById('nameplateSvg');
    const height = nameplateSvg.getAttribute('height');
    const width = nameplateSvg.getAttribute('width');
    downloadPlate('png', CURRENT_IDSHORT, nameplateSvg, width, height);
}

/**
 * Initializes download with 'a' tag
 * @param data DataURL to download
 * @param name Name of download file
 */
function startDownload(data, name) {
    const a = document.createElement('a');
    a.href = data;
    a.download = name
    a.click();
}

/**
 * Download interface
 * @param type 'svg'|'png'
 * @param name Name of download file
 * @param nameplateSvg SVG element of nameplate which is downloaded
 * @param PNG_width Width of final PNG
 * @param PNG_height Height of final PNG
 */
function downloadPlate(type, name, nameplateSvg, PNG_width, PNG_height) {
    switch (type) {
        case 'svg':
            let svgDataUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(new XMLSerializer().serializeToString(nameplateSvg));
            startDownload(svgDataUrl, name + '.svg');
            break;
        case 'png':
            createPNG(PNG_width, PNG_height, nameplateSvg, name, startDownload);
            break;
        default:
            console.error(`Type ${type} not supported.`);
    }
}

/**
 * Converts SVG to PNG DataURL
 * @param width Width of final PNG
 * @param height Height of final PNG
 * @param contents SVG element to transform
 * @param name Name of download file
 * @param callback Reference to the actual downloading function startDownload()
 */
function createPNG(width, height, contents, name, callback) {
    const src = "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(contents));

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();

    img.onload = function () {
        context.drawImage(img, 0, 0);
        callback(canvas.toDataURL('image/png'), name + '.png');
        canvas.remove();
    };
    img.setAttribute('src', src);
}