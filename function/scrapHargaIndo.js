// const puppeteer = require('puppeteer');
// const fs = require('fs');

// async function scrapHarga() {
//     try {
//         const browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();
//         await page.goto('https://moogold.com/product/mobile-legends-indonesia/');

//         // Tunggu hingga elemen <select> muncul
//         await page.waitForSelector('select.aelia_cs_currencies');

//         // Pilih elemen <select> dan ubah nilai menjadi MYR
//         await page.select('select.aelia_cs_currencies', 'MYR');

//         // Tunggu hingga elemen <ul> muncul
//         await page.waitForSelector('ul.variable-items-wrapper.button-variable-items-wrapper');

//         // Ambil semua elemen <li> di dalam elemen <ul>
//         const liElements = await page.$$('ul.variable-items-wrapper.button-variable-items-wrapper li');

//         const productList = [];

//         // Loop melalui setiap elemen <li>
//         for (let i = 0; i < liElements.length; i++) {
//             // Ambil nama produk dari setiap elemen <li>
//             const productNameElement = await liElements[i].$eval('div > span', span => span.textContent.trim());
//             const productName = productNameElement.trim();

//             // Klik pada elemen <li>
//             await liElements[i].click();
            
//             try {
//                 // Ambil data harga dari elemen yang muncul setelah mengklik
//                 const priceElement = await page.$('div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span > ins');
//                 const priceText = await page.evaluate(element => element.textContent.trim(), priceElement);
//                 const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Menguraikan angka dari teks harga
                
//                 productList.push({ produk: productName, harga: price });
//             } catch (error) {
//                 // Jika elemen ins tidak ditemukan, ambil nilai dari elemen sebelumnya
//                 const previousPriceElement = await page.$('div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span');
//                 const previousPriceText = await page.evaluate(element => element.textContent.trim(), previousPriceElement);
//                 const previousPrice = parseFloat(previousPriceText.replace(/[^\d.]/g, '')); // Menguraikan angka dari teks harga
                
//                 productList.push({ produk: productName, harga: previousPrice });
//             }
//         }

//         await browser.close();

//         // Simpan data ke dalam file mobile-legends.js di dalam direktori produk
//         const filePath = './produk/mobile-legends.js';
//         const dataToWrite = `const list1000 = () => {
//     return {
//         "mla": ${JSON.stringify(productList, null, 4)}
//     };
// };

// module.exports = { list1000 };`;

//         fs.writeFileSync(filePath, dataToWrite, 'utf-8');
//         console.log("Data telah disimpan pada file mobile-legends.js di dalam direktori produk");
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// scrapHarga();