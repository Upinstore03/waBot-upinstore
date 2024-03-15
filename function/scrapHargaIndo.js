const puppeteer = require('puppeteer');

async function scrapHarga() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://moogold.com/product/mobile-legends-indonesia/');

        // Tunggu hingga elemen <select> muncul
        await page.waitForSelector('select.aelia_cs_currencies');

        // Pilih elemen <select> dan ubah nilai menjadi MYR
        await page.select('select.aelia_cs_currencies', 'MYR');

        // Tunggu hingga elemen <ul> muncul
        await page.waitForSelector('ul.variable-items-wrapper.button-variable-items-wrapper');

        // Ambil semua elemen <li> di dalam elemen <ul>
        const liElements = await page.$$('ul.variable-items-wrapper.button-variable-items-wrapper li');

        // Loop melalui setiap elemen <li>
        for (let i = 0; i < liElements.length; i++) {
            // Klik pada elemen <li>
            await liElements[i].click();

            try {
                // Ambil data harga dari elemen yang muncul setelah mengklik
                const priceElement = await page.$('#product-2362359 > div.summary.entry-summary > form > div > div > div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span > ins');
                const price = await (await priceElement.getProperty('textContent')).jsonValue();
                console.log("Harga:", price.trim());
            } catch (error) {
                // Jika elemen ins tidak ditemukan, ambil nilai dari elemen sebelumnya
                const previousPriceElement = await page.$('#product-2362359 > div.summary.entry-summary > form > div > div > div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span');
                const previousPrice = await (await previousPriceElement.getProperty('textContent')).jsonValue();
                console.log("Harga:", previousPrice.trim());
            }
        }
        await browser.close();
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = scrapHarga;