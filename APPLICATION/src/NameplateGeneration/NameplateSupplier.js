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
        if (data[key]['MarkingName']){
            data[key] = data[key]['MarkingName'];
        }
    });
    return data;
}
