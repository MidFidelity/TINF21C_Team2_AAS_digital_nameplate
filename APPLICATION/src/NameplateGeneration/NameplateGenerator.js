/**
 * Generates the nameplate from the given data and markings and injects the resulting SVG into the DOM element with the
 * given ID.
 * @param data All the key-value pairs out of the asset WITHOUT the markings.
 * @param markings All Marking-Data as it is retrieved from the asset.
 * @param id ID of the DOM element into which the nameplate will be injected.
 */
function generateNameplate(data, markings, id) {
    // this is the root svg in which the nameplate is build
    const nameplateSvg = initSvg('1000px', '600px', true, 'nameplateSvg');

    // this transforms the data & markings into one single string with linebreaks ('\n')
    // this is the content of the qr-code
    const qrCodeString = nameplateContentObjectToString(data, markings);

    // this svg warps around the qr-code svg
    // it is mainly used for styling and positioning
    // make sure, that this svg is square, otherwise positioning will be off!!!
    const qrCodeSvg = initSvg('400px', '400px', false, 'qrCodeSvg');
    // these two attributes manage the offset inside the 'nameplateSvg' from the top-left corner
    qrCodeSvg.setAttribute('x', '500px');
    qrCodeSvg.setAttribute('y', '100px');

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
        correctLevel: QRCode.CorrectLevel.Q
    }
    const qrCode = new QRCode(document.getElementById(id), settings)
}

function startDownload(data, name) {
    console.log("Starting download")
    var a = document.createElement("a");
    a.href = data;
    a.download = name
    a.click();
}

function downloadPlate(type) {
    let svg = document.getElementById("svgQR");

    switch (type) {
        case "svg":
            let svgDataUrl = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
            startDownload(svgDataUrl, "code.svg")
            break;
        case "png":
            createPNG(200, 200, svg, startDownload);
            break;
        default:
            console.error(`Type ${type} not supported.`);
    }
}

function createPNG(width, height, contents, callback) {
    var src = "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(contents));

    var canvas = document.querySelector("canvas")
    var context = canvas.getContext("2d");

    canvas.width = width
    canvas.height = height

    let htmlImg = document.getElementById("img");
    htmlImg.src = src;

    var image = new Image();

    image.onload = function () {
        console.log("image loaded")
        context.drawImage(image, 0, 0, width, height);
        /*var a = document.createElement("a");
        a.download = filename;
        a.href = canvas.toDataURL("image/png");
        a.click();*/
        console.log("Calling callback")
        callback(canvas.toDataURL("image/png"), "code.png");

        canvas.remove()
    };
    image.src = src;
}