'use strict'

const url = 'https://www.menuwithprice.com/menu/wahlburgers/'
const cheerio = require('cheerio')
const request = require('request-promise-native')

/**
 * Gets dem Wahlburger burgers.
 *
 * @name getBurgers
 * @type function
 *
 * @return Promise
 */
module.exports = async () => {
  const html = await request(url)
  const $ = cheerio.load(html)

  const getBurger = (i, el) => {
    const $tds = $(el).find('td')
      .map((i, el) => $(el).text())

    return {
      name: $tds[0],
      price: $tds[1],
      desc: $tds[2]
    }
  }

  const burgers0 = $('table.prc-table:nth-child(4) tr')
    .map(getBurger)
    .get()

  const burgers1 = $('table.prc-table:nth-child(6) tr')
    .map(getBurger)
    .get()

  const burgers = burgers0.concat(burgers1)
  return burgers
}

if (!module.parent) {
  module.exports()
    .then((burgers) => {
      console.log(JSON.stringify(burgers, null, 2))
    })
}
