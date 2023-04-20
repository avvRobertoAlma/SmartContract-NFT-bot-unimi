export async function fetchSVG(fileName) {
    let svgFileObject = await fetch('../svg/' + fileName);
    let svgContent = await svgFileObject.text();

    const parser = new DOMParser();

    return parser
        .parseFromString(svgContent, "text/html")
        .getElementsByTagName("svg")[0]
}

export async function createSVGBot(details) {

    // get bothead
    let botSvg = await fetchSVG("../svg/bothead.svg");

    // change bot colors
    botSvg.querySelectorAll('.frame').forEach(f => {
        f.style.fill = `rgb${details.colors[0]}`;
    });

    botSvg.querySelectorAll('.visor').forEach(v => {
        v.style.fill = `rgb${details.colors[1]}`;
    });

    botSvg.querySelectorAll('.background').forEach(b => {
        b.style.fill = `rgb${details.colors[2]}`;
    });

    // accessori del bot
    let accessorySvgs = [];
    for (let i = 0; i < 3; i++) {
        let filename =
            details.accessories[i].toLowerCase().replaceAll(" ", "-") + ".svg";

        let svg = await fetchSVG('../svg/' + filename);
        accessorySvgs.push(svg);
    }

    // merge SVGs
    accessorySvgs.forEach((a) => {
        Array.from(a.getElementsByTagName("style")).forEach((e) => {
            botSvg.getElementsByTagName("defs")[0].appendChild(e);
        });

        Array.from(a.getElementsByTagName("path")).forEach((e) => {
            botSvg.appendChild(e);
        });

        Array.from(a.getElementsByTagName("polyline")).forEach((e) => {
            botSvg.appendChild(e);
        });
    });


    return botSvg

}