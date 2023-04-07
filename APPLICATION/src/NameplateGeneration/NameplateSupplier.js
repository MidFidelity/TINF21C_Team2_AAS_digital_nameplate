let CURRENT_IDSHORT = 'Nameplate';

/**
 * Creates and returns an SVG element.
 * @param xSize is the width of the SVG element.
 * @param ySize is the height of the SVG element.
 * @param border (optional) boolean, which determines if the SVG element has a border or not
 * @param id (optional) id of the SVG element
 * @returns {SVGSVGElement} SVG element of given specifications
 */
function initSvg(xSize, ySize, border, id) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', xSize);
    svg.setAttribute('height', ySize);
    if (id) {
        svg.id = id;
    }
    if (border) {
        svg.style.borderStyle = 'solid';
        svg.style.borderWidth = '1px';
    }
    return svg;
}

/**
 * Appends the 'element' as a child to the DOM element with the given 'id'.
 * @param id is the ID of the DOM element in which the given 'element' will be injected into
 * @param element element ot be injected
 */
function appendToDocument(id, element) {
    document.getElementById(id).appendChild(element);
}

/**
 * Turns data and markings into one string from which the QR-Code will be generated
 * @param data data according to README.md specification
 * @param markings markings according to README.md specification
 * @returns {string}
 */
function nameplateContentObjectToString(data, markings) {
    const markingNames = extractMarkingNames(markings);
    const dataAndMarkings = Object.assign(data, markingNames);
    const entries = Object.entries(dataAndMarkings);
    let result = "";
    entries.forEach((entry) => {
        let entryString = "";
        const lineSeparator = "\n";
        entryString = entry[0] + ': ' + entry[1] + lineSeparator;
        result += entryString;
    });
    return result;
}

/**
 * Extracts the names of each marking.
 * @param markings markings according to README.md specification
 * @returns {*}
 */
function extractMarkingNames(markings) {
    let data = structuredClone(markings);
    const keys = Object.keys(data);
    keys.forEach((key) => {
        if (data[key]['MarkingName']) {
            data[key] = data[key]['MarkingName'];
        }
    });
    return data;
}

/**
 * Writes the heading of the nameplate with idShort and ManufacturerProductDesignation. It removes those two key-value pairs
 * from data in the process.
 * @param data data according to README.md specification
 * @param nameplateSvg
 */
function writeHeadingToSvg(data, nameplateSvg) {
    const idShort_xSpace = 20;
    const idShort_ySpace = 50;
    const idShort_fontSize = 35;
    const MPD_xSpace = 20;
    const MPD_ySpace = 80;
    const MPD_fontSize = 20;

    const header = {};
    if (data['idShort']) {
        header['idShort'] = data['idShort'];
        // this variable is used to name the download file
        CURRENT_IDSHORT = data['idShort'];
        delete data['idShort'];

        let newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newText.setAttributeNS(null, 'x', idShort_xSpace + 'px');
        newText.setAttributeNS(null, 'y', idShort_ySpace + 'px');
        newText.setAttributeNS(null, 'font-size', idShort_fontSize + 'px');
        newText.setAttributeNS(null, 'font-weight', 'bold');

        let textNode = document.createTextNode(`${header['idShort']}`);
        newText.appendChild(textNode);
        nameplateSvg.appendChild(newText);
    }
    if (data['ManufacturerProductDesignation']) {
        header['ManufacturerProductDesignation'] = data['ManufacturerProductDesignation'];
        delete data['ManufacturerProductDesignation'];

        let newText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        newText.setAttributeNS(null, 'x', MPD_xSpace + 'px');
        newText.setAttributeNS(null, 'y', MPD_ySpace + 'px');
        newText.setAttributeNS(null, 'font-size', MPD_fontSize + 'px');
        newText.setAttributeNS(null, 'font-style', 'italic');

        let textNode = document.createTextNode(`${header['ManufacturerProductDesignation']}`);
        newText.appendChild(textNode);
        nameplateSvg.appendChild(newText);
    }
}

/**
 * Writes key-value pairs onto the nameplateSvg. Can be configured through constants in function.
 * @param data data according to README.md specification
 * @param nameplateSvg the nameplate svg element
 */
function writeTextToSvg(data, nameplateSvg) {
    const maxDisplay = 16;
    const maxCharsPerLine = 63;
    // following values are in pixels
    const fontSize = 17;
    const lineHeight = 25;
    const xSpace = 20;
    const ySpace = 120;

    const keys = Object.keys(data).filter((key) => {
        let displayText = `${key}: ${data[key]}`;
        return (displayText.length < maxCharsPerLine);
    });
    const limit = keys.length < maxDisplay ? keys.length : maxDisplay;
    let svgNS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < limit; i++) {
        let newText = document.createElementNS(svgNS, 'text');
        newText.setAttributeNS(null, 'x', xSpace + 'px');
        newText.setAttributeNS(null, 'y', ySpace + lineHeight * i + 'px');
        newText.setAttributeNS(null, 'font-size', fontSize + 'px');

        let textNode = document.createTextNode(`${keys[i]}: ${data[keys[i]]}`);
        newText.appendChild(textNode);
        nameplateSvg.appendChild(newText);
    }
}

/**
 * Extracts the FilePath out of the concrete marking model, if it exists. The image is stored at that
 * given path. If the marking does not have a 'FilePath' attribute, then no image is displayed for the
 * marking and no entry in the results array will be made. Only the name of the marking will be stored
 * either written on the nameplate or in the qr Code.
 * @param markings markings according to README.md specification
 * @returns {*[]}
 */
function extractFilePathsFromMarkings(markings) {
    const result = [];
    Object.keys(markings).forEach((key) => {
        if (markings[key]['FilePath']) {
            result.push(markings[key]['FilePath']);
        }
    });
    return result;
}

/**
 * Transforms an array of links referring to images into their corresponding dataUrls. This function returns a Promise
 * since loading images is asynchronous.
 * @param links Array of links to all the marking images that shall be displayed on the nameplate
 * @returns {Promise<string[]>} Promise resolving to array of dataUrls of images
 */
function convertFilePathsToDataUrls(links) {
    return new Promise((resolve) => {
        const promises = links.map((link) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    resolve(canvas.toDataURL());
                };
                img.onerror = () => {
                    resolve(null); // Resolves with null instead of rejecting.
                };
                img.src = link;
            });
        });

        Promise.all(promises).then((dataURLs) => {
            // Filter out any null values (failed images).
            const filteredDataURLs = dataURLs.filter((dataURL) => dataURL !== null);
            resolve(filteredDataURLs);
        });
    });
}

/**
 * Interface for extracting all images from the markings
 * @param markings markings according to README.md specification
 * @returns {Promise<string[]>} Promise resolving to array of dataUrls of images
 */
function extractAllImagesFromMarkings(markings) {
    const filePaths = extractFilePathsFromMarkings(markings);
    return convertFilePathsToDataUrls(filePaths);
}

/**
 * Displays the markings on the nameplate SVG.
 * @param markingImages extracted FilePath values according to function extractImagesFromMarkings()
 * @param nameplateSvg the nameplate svg - markings are displayed on here
 */
function displayMarkingImages(markingImages, nameplateSvg) {
    const maxDisplay = 7;
    // following values are in pixels
    const height = 100;
    const width = 100;
    const xSpace = 20;
    const ySpace = 500;
    const space = 20;
    
    const limit = markingImages.length < maxDisplay ? markingImages.length : maxDisplay;

    for (let i = 0; i  < limit; i++) {
        let svgImg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        svgImg.setAttributeNS(null, 'height', height + 'px');
        svgImg.setAttributeNS(null, 'width', width + 'px');
        svgImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', markingImages[i]);
        svgImg.setAttributeNS(null, 'x', xSpace + (width + space) * i + 'px');
        svgImg.setAttributeNS(null, 'y', ySpace + 'px');
        svgImg.setAttributeNS(null, 'visibility', 'visible');
        nameplateSvg.appendChild(svgImg);
    }
}
