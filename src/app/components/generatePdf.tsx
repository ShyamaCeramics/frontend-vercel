import React, { useState } from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";

type props = {
    html?: React.MutableRefObject<HTMLDivElement>;
};

const GeneratePdf: React.FC<props> = ({ html }: any) => {
    const [selectState, setSelectState] = useState('');

   const generateImage = async () => {
        const element = html.current;
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const image = await toPng(element, { quality: 0.95 });
        const doc = new jsPDF({
            orientation: width > height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [width, height]
        });
        doc.addImage(image, 'PNG', 0, 0, width, height);
        doc.save('shyama-ceramics-products.pdf');
    };

    function exportToWord(elementId: string, filename = 'document.doc') {
        const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        const postHtml = "</body></html>";
        const htmlDoc = document.getElementById(elementId);
        if (!htmlDoc) return;

        const html = preHtml + htmlDoc.innerHTML + postHtml;
        const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
        const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        const downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return <>
        <select
            style={{ border: '1px solid black', borderRadius: '5px' }}
            onChange={(event) => {
                const exportFormat: any = event.target.value ? event.target.value : '';
                if (exportFormat) {
                    if (exportFormat === 'pdf') {
                        generateImage();
                    } else {
                        exportToWord('exportCompletePage');
                    }
                }
                setSelectState('');
            }}
            value={selectState}
        >
            <option value="">Export</option>
            <option value="word">Export Word</option>
            <option value="pdf">Export PDF</option>
        </select>
    </>;
};

export default GeneratePdf;
