const {Builder, By} = require("selenium-webdriver")

async function test(){

    let driver = await new Builder()
        .forBrowser("chrome")
        .build()

    await driver.get("http://localhost:3000")

    let title = await driver.getTitle()

    console.log(title)

    await driver.sleep(5000)

    await driver.quit()

}

test()