// logs goal.com latest news titles

const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.goto('http://www.goal.com/en-in', { waitUntil: 'networkidle' })

  // Extracting the titles from the page
  const titleArr = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('div.title h3'))
    return titles.map(title => title.textContent)
  })
  console.log(titleArr.join('\n'))
  browser.close()
})()
