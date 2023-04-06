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
    let svgNS = "http://www.w3.org/2000/svg";
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
 * marking. Only the name of the marking will be stored either written on the nameplate or in the qr Code.
 * @param markings markings according to README.md specification
 * @returns {*[]}
 */
function extractImagesFromMarkings(markings) {
    const result = [];
    Object.keys(markings).forEach((key) => {
        if (markings[key]['FilePath']) {
            result.push(markings[key]['FilePath']);
        }
    });
    return result;
}

/**
 * Displays the markings on the nameplate SVG.
 * @param markingImages extracted FilePath values according to function extractImagesFromMarkings()
 * @param nameplateSvg the nameplate svg - markings are displayed on here
 */
function displayMarkingImages(markingImages, nameplateSvg) {
    const maxDisplay = 8;
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
