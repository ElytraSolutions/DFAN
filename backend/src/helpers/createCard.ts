import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs/promises';

export interface CardData {
    fileName: string;
    id: string;
    name: string;
    gender: string;
    mobile: string;
    address: string;
    type: string;
    image: string;
}
const defaultData: CardData = {
    fileName: '',
    id: '',
    name: '',
    gender: '',
    mobile: '',
    address: '',
    type: 'General Member',
    image: 'default.png',
};
async function createCard(data: CardData) {
    const { fileName, id, name, gender, mobile, address, type, image } = {
        ...defaultData,
        ...data,
    };
    const pdfData = await fs.readFile('./public/dfancard.pdf');
    const pdfdoc = await PDFDocument.load(pdfData);
    const firstPage = pdfdoc.getPages()[0];

    const color = rgb(1, 1, 1);
    const size = 40;
    let embedImage;
    if (image && (image.endsWith('jpg') || image.endsWith('jpeg'))) {
        embedImage = await pdfdoc.embedJpg(
            await fs.readFile(`./public/avatars/${image}`),
        );
    } else if (image && image.endsWith('png')) {
        embedImage = await pdfdoc.embedPng(
            await fs.readFile(`./public/avatars/${image}`),
        );
    } else {
        throw 'Unsupported file type';
    }
    const scaled = embedImage.scaleToFit(250, 250);
    firstPage.drawImage(embedImage, {
        x: 740,
        y: 200,
        width: Math.max(scaled.width, 250),
        height: Math.max(scaled.height, 250),
    });
    firstPage.drawText(type, {
        x: 410,
        y: 475,
        size: 30,
        color: rgb(0, 0, 0),
    });
    firstPage.drawText(id, {
        x: 170,
        y: 375,
        size: size,
        color: color,
    });
    firstPage.drawText(name, {
        x: 175,
        y: 305,
        size: size,
        color: color,
    });
    firstPage.drawText(gender, {
        x: 190,
        y: 245,
        size: size,
        color: color,
    });
    firstPage.drawText(mobile, {
        x: 300,
        y: 180,
        size: size,
        color: color,
    });
    firstPage.drawText(address, {
        x: 360,
        y: 125,
        size: size,
        color: color,
    });
    const pdfBytes = await pdfdoc.save();
    // await fs.writeFile(`../../public/cards/${fileName}.pdf`, pdfBytes);
    return pdfBytes;
}

export default createCard;
