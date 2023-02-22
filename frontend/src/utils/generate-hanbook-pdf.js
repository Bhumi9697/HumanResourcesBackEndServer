import { PDFDocument, StandardFonts, layoutMultilineText, PageSizes } from 'pdf-lib'

function fillParagraph(text, font, fontSize, maxWidth, wishedParagraphs) {
  const allParagraphs = text.split('\n').filter((paragraph) => paragraph !== ' ' && paragraph !== '')

  const paragraphs =
    wishedParagraphs && wishedParagraphs <= allParagraphs.length
      ? allParagraphs.slice(0, wishedParagraphs)
      : allParagraphs

  for (let index = 0; index < paragraphs.length; index++) {
    const paragraph = paragraphs[index]
    if (font.widthOfTextAtSize(paragraph, fontSize) > maxWidth) {
      const words = paragraph.split(' ')
      const newParagraph = []
      let i = 0
      newParagraph[i] = []
      for (let k = 0; k < words.length; k++) {
        const word = words[k]
        newParagraph[i].push(word)
        if (font.widthOfTextAtSize(newParagraph[i].join(' '), fontSize) > maxWidth) {
          newParagraph[i].splice(-1) // retira a ultima palavra
          i = i + 1
          newParagraph[i] = []
          newParagraph[i].push(word)
        }
      }
      paragraphs[index] = newParagraph.map((p) => p.join(' ')).join('\n')
    }
  }

  return {
    text: paragraphs.join('\n'),
    remainingParagraphs:
      paragraphs.length <= wishedParagraphs
        ? allParagraphs.slice(wishedParagraphs, allParagraphs.length).join('\n')
        : ''
  }
}

const drawMultipleLines = ({ startingPosition, initialPage, finalPage, multiLines, font }) => {
  let page = initialPage
  for (let i = 0; i < multiLines.length; i++) {
    if (startingPosition < 60) {
      // reset starting position
      page = finalPage
      startingPosition = PageSizes.Letter[1] - 60
    }
    page.drawText(`${multiLines[i].text}`, {
      x: 60,
      y: startingPosition,
      size: 12,
      maxWidth: PageSizes.Letter[0],
      font: font
    })
    // move position down
    startingPosition = startingPosition - 15
  }
}

export async function generateHandbookPDF({ data, arrayBufferFile, logoBuffer, isLogoPNG }) {
  const companyName = data.company_name
  const personInCharge = data.questions[1].answer
  const pdfDoc = await PDFDocument.load(arrayBufferFile)
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const textWidth = font.widthOfTextAtSize(companyName, 50)
  const defaultFontSize = 12
  const {
    0: firstPage,
    1: secondPage,
    3: fourthPage,
    4: fifthPage,
    5: sixthPage,
    6: seventhPage,
    8: ninethPage,
    9: tenPage,
    10: elevenPage,
    11: twelvePage,
    12: thirteenPage,
    13: fourteenPage,
    14: fifteenPage,
    17: eighteenPage,
    18: nineteenPage,
    19: twentyPage,
    20: twentyOnePage,
    21: twentyTwoPage,
    22: twentyThreePage,
    23: twentyFourPage,
    24: twentyFifthPage,
    25: twentySixPage,
    26: twentySevenPage
  } = pdfDoc.getPages()

  if (logoBuffer) {
    const embedLogo = isLogoPNG ? await pdfDoc.embedPng(logoBuffer) : await pdfDoc.embedJpg(logoBuffer)
    firstPage.drawImage(embedLogo, {
      x: firstPage.getWidth() / 2 - embedLogo.scale(0.1).width / 2,
      y: firstPage.getHeight() / 2 - embedLogo.scale(0.1).height / 2 - 100,
      width: embedLogo.scale(0.1).width,
      height: embedLogo.scale(0.1).height
    })
  }

  firstPage.drawText(companyName, {
    size: 50,
    x: firstPage.getWidth() / 2 - textWidth / 2,
    y: firstPage.getHeight() / 2 + 50
  })

  secondPage.drawText(companyName, {
    size: defaultFontSize,
    x: 262,
    y: 662
  })

  secondPage.drawText(companyName, {
    size: defaultFontSize,
    x: 243,
    y: 534
  })

  secondPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 290,
    y: 478
  })

  secondPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 460,
    y: 320
  })

  fourthPage.drawText(fillParagraph(data.questions[0].answer, font, defaultFontSize, 450).text, {
    size: defaultFontSize,
    x: 60,
    y: 410
  })

  fourthPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: 143
  })

  fifthPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 177,
    y: 465
  })

  fifthPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 453,
    y: 202
  })

  sixthPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 490,
    y: sixthPage.getHeight() / 2 - 52
  })

  seventhPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: sixthPage.getHeight() / 2 - 64
  })

  ninethPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: ninethPage.getHeight() / 2 + 57
  })

  ninethPage.drawText(data.questions[2].answer, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 + 17,
    y: ninethPage.getHeight() / 2 + 57
  })

  ninethPage.drawText(`${companyName} is ${data.questions[3].answer}`, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 - 55,
    y: ninethPage.getHeight() / 2 - 43
  })

  ninethPage.drawText(companyName, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 + 30,
    y: ninethPage.getHeight() / 2 - 163
  })

  tenPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: 190,
    y: ninethPage.getHeight() / 2 - 103
  })

  tenPage.drawText(data.questions[4].answer, {
    size: defaultFontSize,
    x: 60,
    y: ninethPage.getHeight() / 2 - 145
  })

  tenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: 68
  })

  elevenPage.drawText(companyName, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 + 56,
    y: 687
  })

  elevenPage.drawText(personInCharge, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 + 72,
    y: 480
  })

  elevenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: ninethPage.getWidth() / 2 + 90,
    y: 375
  })

  elevenPage.drawText(companyName, {
    size: defaultFontSize,
    x: ninethPage.getWidth() / 2 + 112,
    y: 261
  })

  const { text: answerElevenFormatted } = fillParagraph(data.questions[5].answer, font, defaultFontSize, 450)

  const multiTextElevenAndTwelve = layoutMultilineText(answerElevenFormatted, {
    alignment: 'left',
    font,
    fontSize: 12,
    bounds: { width: PageSizes.Letter[0], height: PageSizes.Letter[1] - 60 }
  })

  drawMultipleLines({
    startingPosition: 120,
    initialPage: elevenPage,
    finalPage: twelvePage,
    multiLines: multiTextElevenAndTwelve.lines,
    font
  })

  const answer34 = [
    data.questions[6].answer,
    data.questions[7].answer,
    data.questions[8].answer,
    data.questions[9].answer,
    data.questions[10].answer
  ]
    .map((a) => a.trim())
    .join('\n')

  const { text: answerTwelveFormatted } = fillParagraph(answer34, font, defaultFontSize, 450)

  const multiText = layoutMultilineText(answerTwelveFormatted, {
    alignment: 'left',
    font,
    fontSize: 12,
    bounds: { width: PageSizes.Letter[0], height: PageSizes.Letter[1] - 60 }
  })

  drawMultipleLines({
    startingPosition: 200,
    initialPage: twelvePage,
    finalPage: thirteenPage,
    multiLines: multiText.lines,
    font
  })

  fourteenPage.drawText(`${companyName} does/does`, {
    size: defaultFontSize,
    x: 160,
    y: fourteenPage.getHeight() / 2 + 82
  })

  fourteenPage.drawText(data.questions[12].answer.trim(), {
    size: defaultFontSize,
    x: 505,
    y: fourteenPage.getHeight() / 2 + 82
  })

  fourteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: fourteenPage.getHeight() / 2 + 40
  })

  fourteenPage.drawText(data.questions[13].answer.trim(), {
    size: defaultFontSize,
    x: 260,
    y: fourteenPage.getHeight() / 2 + 10
  })

  fourteenPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 357,
    y: fourteenPage.getHeight() / 2 - 32
  })

  fourteenPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 353,
    y: fourteenPage.getHeight() / 2 - 45
  })

  fourteenPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 318,
    y: fourteenPage.getHeight() / 2 - 88
  })

  fourteenPage.drawText(data.questions[16].answer.trim(), {
    size: defaultFontSize,
    x: 105,
    y: fourteenPage.getHeight() / 2 - 223
  })

  const { text: answerFifteenFormatted } = fillParagraph(data.questions[18].answer, font, defaultFontSize, 450)

  const multiTextFifteen = layoutMultilineText(answerFifteenFormatted, {
    alignment: 'left',
    font,
    fontSize: 12,
    bounds: { width: PageSizes.Letter[0], height: PageSizes.Letter[1] - 60 }
  })

  drawMultipleLines({
    startingPosition: fourteenPage.getHeight() / 2 + 30,
    initialPage: fifteenPage,
    finalPage: fifteenPage,
    multiLines: multiTextFifteen.lines,
    font
  })

  fifteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: 276
  })

  fifteenPage.drawText(data.questions[19].answer.trim(), {
    size: defaultFontSize,
    x: 60,
    y: 98
  })

  const { text: answerFifteen2Formatted } = fillParagraph(
    '                                                                                  ' + data.questions[20].answer,
    font,
    defaultFontSize,
    450
  )

  const multiTextFifteen2 = layoutMultilineText(answerFifteen2Formatted, {
    alignment: 'left',
    font,
    fontSize: 12,
    bounds: { width: PageSizes.Letter[0], height: PageSizes.Letter[1] - 60 }
  })

  drawMultipleLines({
    startingPosition: 85,
    initialPage: fifteenPage,
    finalPage: fifteenPage,
    multiLines: multiTextFifteen2.lines,
    font
  })

  eighteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: 420
  })

  eighteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 260,
    y: 292
  })

  eighteenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 487,
    y: 249
  })

  eighteenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 157,
    y: 178
  })

  eighteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 120,
    y: 92
  })

  nineteenPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 349,
    y: 615
  })

  nineteenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 60,
    y: 382
  })

  nineteenPage.drawText(companyName, {
    size: defaultFontSize,
    x: 60,
    y: 296
  })

  nineteenPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 104,
    y: 168
  })

  twentyPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 60,
    y: 402
  })

  twentyOnePage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 60,
    y: 636
  })

  twentyOnePage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 60,
    y: 530
  })

  twentyOnePage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 95,
    y: 318
  })

  twentyOnePage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 83,
    y: 155
  })

  twentyTwoPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 74,
    y: 345
  })

  twentyThreePage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 224,
    y: 720
  })

  twentyThreePage.drawText(personInCharge, {
    size: defaultFontSize - 1,
    x: 93,
    y: 338
  })
  twentyThreePage.drawText(personInCharge, {
    size: defaultFontSize - 1,
    x: 220,
    y: 338
  })
  twentyThreePage.drawText(personInCharge, {
    size: defaultFontSize - 1,
    x: 525,
    y: 325
  })
  twentyThreePage.drawText(personInCharge, {
    size: defaultFontSize - 1,
    x: 220,
    y: 282
  })

  twentyFourPage.drawText(fillParagraph(data.questions[21].answer.trim(), font, defaultFontSize, 450).text, {
    size: defaultFontSize - 1,
    x: 60,
    y: 690
  })

  twentyFifthPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 145,
    y: 682
  })

  twentyFifthPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 281,
    y: 526
  })

  twentyFifthPage.drawText(companyName, {
    size: defaultFontSize - 1,
    x: 300,
    y: 412
  })

  twentySixPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 81,
    y: 683
  })

  twentySixPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 214,
    y: 340
  })

  twentySevenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 80,
    y: 696
  })

  twentySevenPage.drawText(`${companyName}'s`, {
    size: defaultFontSize - 1,
    x: 214,
    y: 326
  })

  return await pdfDoc.save()
}
