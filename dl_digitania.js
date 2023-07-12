const CND = 'https://cdn9.floowie.digitania.eu/gluster/{{id}}/high/bg{{num}}.webp?v0';
const ID = new URL(location.href).pathname.split('/').slice(1,3).join('/');
const PAGES = [];

async function importJsPDF() {
    if (window.jspdf) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
    while (!window.jspdf) {
        await new Promise(r => setTimeout(r, 200));
    }
}


function parseNumbers(arr) {
    const result = new Set();

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (typeof item === 'number') {
            result.add(item); // Pokud je to číslo, přidej ho do výsledného pole
        } else if (typeof item === 'string') {
            if (item.includes('-')) {
                const range = item.split('-');

                if (range.length === 2) {
                    const start = parseInt(range[0]);
                    const end = parseInt(range[1]);

                    if (!isNaN(start) && !isNaN(end)) {
                        // Kontrola, zda jsou start a end čísla
                        for (let j = start; j <= end; j++) {
                            result.add(j); // Přidej všechna čísla v daném rozmezí do výsledného pole
                        }
                    }
                }
            } else {
                const num = parseInt(item);

                if (!isNaN(num)) {
                    result.add(num); // Pokud je to číslo, přidej ho do výsledného pole
                }
            }
        }
    }

    return Array.from(result).sort();
}


async function main() {
    await importJsPDF();

    const doc = new jspdf.jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const pages = parseNumbers(PAGES);

    for (let i = 1; ; i++) {
        try {
            const url = CND.replace('{{num}}', i).replace('{{id}}', ID);
            const res = await fetch(url, {
                credentials: 'include',
            });
            if (res.status !== 200) break;
            if (pages.length) {
                if (!pages.includes(i)) continue;
                if (pages.at(-1) < i) break;
            }
            const data = new Uint8Array(await res.arrayBuffer());
            console.log(`Processing page ${i}...`);
            doc.addImage(data, 'WEBP', 0, 0, width, height);
            doc.addPage();
        } catch (err) {
            console.error(err);
            break;
        }
    }

    doc.deletePage(doc.internal.getNumberOfPages());
    console.log(`Done!`);
    doc.save(`${document.title}.pdf`);
}


main();
