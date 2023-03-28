function generateNameplate() {
    console.log('Generating nameplate...');
}

function makeQR(form) {
    let formData = new FormData(form);
    let settings = {
        text: formData.get("text"),
        id: "svgQR",
        width: 200,
        height: 200,
        useSVG: true,
        correctLevel: QRCode.CorrectLevel.Q
    }

    console.log("qrcode", settings)
    var code = new QRCode("qrcode", settings)

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