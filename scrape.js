const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.marutisuzuki.com/alto', {waitUntil : 'domcontentloaded'});
    
    await page.click('#selectstate');
    var dropdowns = await page.$$eval("select#selectstate option", all => all.map(a => a.textContent)
    , {waitUntil : 'domcontentloaded'})
    await console.log(dropdowns)
    
    await page.click('#selectcity');
    var dropdowns = await page.$$eval("select#selectcity option", all => all.map(a => a.textContent))
    await console.log(dropdowns)

    await page.click('#selectvariant');
    var dropdowns = await page.$$eval("select#selectvariant option", all => all.map(a => a.textContent))
    await console.log(dropdowns)
    
    var dropdowns = await page.$$eval("select#price-text option", all => all.map(a => a.textContent))
    await console.log(dropdowns)
    

    const result = await page.evaluate(() => {
        let state = document.querySelector('#selectstate').innerText;
        let city = document.querySelector('#selectcity').innerText;
        let variant = document.querySelector('#selectvariant').innerText;
        let price =document.querySelector('#price-text').innerText;

      

        return {
           //    state,city,variant,price
        }
    });

 

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});