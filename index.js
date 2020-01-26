const { Builder, By, Key, until } = require('selenium-webdriver');


const buttons= {
    sendWhatsapp: '_36or _2y_c _2z0c _2z07',
    useWhatsappText: 'use WhatsApp Web',
    sendMessage: '_3M-N-'
};
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const {sendWhatsapp, useWhatsappText, sendMessage} = buttons
        await openSendPage('966553903500', '1234')
        await clickClass(sendWhatsapp)
        await waitUntilPageLoads(useWhatsappText)
        await clickTitle(useWhatsappText)
        const hasQRCode = await getQRPage()
        if (hasQRCode) {
            await waitUntilChatsPageLoads()
            await clickClass(sendMessage)
        }

    } finally {
        // await close();
    }

//_36or _2y_c _2z0c _2z07


    async function openPage() {
        await driver.get('http://web.whatsapp.com');
    }

    async function clickClass(btnClass){

       let button= await driver.wait(until.elementLocated(By.className(btnClass)), 30000);
       await button.click();
    }
    
    async function openSendPage(phone, code){
        await driver.get(`https://wa.me/${phone}?text=${code}`)
    }

    async function getQRPage() {
        await (await driver.findElement(By.className('_3YhvY'))).isDisplayed()
    }

    async function clickTitle(title){
        let button= await driver.wait(until.elementLocated(By.linkText(title)), 30000);
        await button.click();
    }

    async function waitUntilChatsPageLoads() {
        await driver.wait(until.elementLocated(By.className('app _1Jzz1')), 30000);
    }

    async function waitUntilPageLoads(pageText){
        await driver.wait(until.elementLocated(By.linkText(pageText)), 30000);
    }

    async function close() {
        await driver.quit();
    }


})();


