import fs from 'fs'
import vanillaPuppeteer, { Page } from 'puppeteer'
import { Cluster } from 'puppeteer-cluster'
import { addExtra, VanillaPuppeteer } from 'puppeteer-extra'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'

interface QueueData {
  state: string
  year?: number
}

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'DF',
  'CE',
  'ES',
  'GO',
  'MT',
  'MS',
  'MA',
  'MG',
  'PA',
  'PR',
  'PB',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

async function readStateHoliday(page: Page, state = 'SP', year = 2020) {
  await page.goto(
    `http://www.feriados.com.br/feriados-estado-${state.toLowerCase()}.php?ano=${year}`,
    {
      waitUntil: 'domcontentloaded'
    }
  )
  const holidays = await page.evaluate(() => {
    const holidays = document.querySelectorAll(
      'div.rounded_borders div > span[class^=style_lista]'
    )
    if (!holidays) return []

    return Array.from(holidays).map(
      ({ parentElement: parent, textContent: holiday = '' }) => ({
        holiday,
        type: parent?.title
      })
    )
  })

  return holidays.map(({ holiday, type }) => {
    const cleanedType = type
      ?.replace(/(<([^>]+)>)/gi, '')
      .trim()
      .toUpperCase()
      .replace(' ', '_')
    const [date, name] = holiday?.split('-') as string[]
    const cleanedDate = date.trim()
    const cleanedName = name.trim()

    return {
      type: cleanedType,
      date: cleanedDate,
      name: cleanedName
    }
  })
}

async function main() {
  const puppeteer = addExtra((vanillaPuppeteer as unknown) as VanillaPuppeteer)

  puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

  const cluster: Cluster<QueueData, void> = await Cluster.launch({
    puppeteer,
    monitor: true,
    maxConcurrency: 2,
    concurrency: Cluster.CONCURRENCY_CONTEXT
  })

  await cluster.task(async ({ page, data }) => {
    const { year = 2020, state } = data
    const holidays = await readStateHoliday(page, state, year)
    const fileName = `temp/holiday-${state}-${year}.json`
    fs.writeFile(fileName, JSON.stringify(holidays), 'utf8', function (err) {
      if (err) {
        console.log(
          fileName,
          'An error occurred while writing JSON Object to File.'
        )
        return console.log(err)
      }
    })
  })

  states.forEach(state =>
    cluster.queue({
      state
    })
  )

  await cluster.idle()
  await cluster.close()
}

main().catch(console.warn)
