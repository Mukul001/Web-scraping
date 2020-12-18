const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.hyundai.com/in/en/buy-a-car/prices', {waitUntil : 'domcontentloaded'});
    
    await page.select('#car', '12')
    await page.waitFor(300)
    await page.select('#state', '2')
    await page.waitFor(300)
    await page.select('#city','949')
    await page.waitFor(300)
    
    await page.click('#car');
    var statedrop = await page.$$eval("#car option", all => all.map(a => a.textContent)
    , {waitUntil : 'domcontentloaded'})
    await console.log(statedrop)
    
    await page.click('#state');
    var citydrop = await page.$$eval("#state option", all => all.map(a => a.textContent)
    , {waitUntil : 'domcontentloaded'})
    await console.log(citydrop)

    await page.click('#city');
    var variantdrop = await page.$$eval("#city option", all => all.map(a => a.textContent)
    , {waitUntil : 'domcontentloaded'})
    await console.log(variantdrop)
    
    
    // var dropdowns = await page.$$eval("#priceform > tr:nth-child(1) > td.last", all => all.map(a => a.textContent))
    // await console.log(dropdowns)
    

    const result = await page.evaluate(() => {
        let state = document.querySelector('#car').innerText;
        let city = document.querySelector('#state').innerText;
        let variant = document.querySelector('#city').innerText;
        let price =document.querySelector('#priceform').innerText;

      

        return {
           price //state,city,variant,price
        }
    });

    const data = await page.$$eval('#priceform > tr:nth-child(1) > td:nth-child(1)', tds => tds.map((td) => {
        return td.innerText  ;
      }));
      console.log(data);

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});





