import { PDFDocument, StandardFonts } from 'pdf-lib'

export const signEhb = async ({ arrayBufferFile, signatureBuffer, profile: { position, fullName } }) => {
  const pdfDoc = await PDFDocument.load(arrayBufferFile)
  const { 25: twentySixthPage, 26: twentySevenPage } = pdfDoc.getPages()
  const signatureImage = await pdfDoc.embedPng(signatureBuffer)
  await pdfDoc.embedFont(StandardFonts.TimesRoman)

  twentySixthPage.drawImage(signatureImage, {
    x: twentySixthPage.getWidth() / 2 - signatureImage.scale(0.5).width / 2 + 25,
    y: twentySixthPage.getHeight() / 2 - signatureImage.scale(0.5).height / 2 - 63,
    width: signatureImage.scale(0.1).width,
    height: signatureImage.scale(0.1).height
  })

  twentySixthPage.drawText(fullName, {
    size: 11,
    x: twentySixthPage.getWidth() / 2 - 100,
    y: twentySixthPage.getHeight() / 2 - 85
  })

  twentySixthPage.drawText(position, {
    size: 11,
    x: twentySixthPage.getWidth() / 2 + 85,
    y: twentySixthPage.getHeight() / 2 - 85
  })

  const todaydate = new Date()
  const date = new Intl.DateTimeFormat('en-US').format(todaydate)

  twentySixthPage.drawText(date, {
    size: 11,
    x: twentySixthPage.getWidth() / 2 + 65,
    y: twentySixthPage.getHeight() / 2 - 112
  })

  twentySevenPage.drawImage(signatureImage, {
    x: twentySevenPage.getWidth() / 2 - signatureImage.scale(0.5).width / 2 + 25,
    y: twentySevenPage.getHeight() / 2 - signatureImage.scale(0.5).height / 2 - 78,
    width: signatureImage.scale(0.1).width,
    height: signatureImage.scale(0.1).height
  })

  twentySevenPage.drawText(fullName, {
    size: 11,
    x: twentySevenPage.getWidth() / 2 - 100,
    y: twentySevenPage.getHeight() / 2 - 98
  })

  twentySevenPage.drawText(position, {
    size: 11,
    x: twentySevenPage.getWidth() / 2 + 85,
    y: twentySevenPage.getHeight() / 2 - 98
  })

  twentySevenPage.drawText(date, {
    size: 11,
    x: twentySevenPage.getWidth() / 2 + 65,
    y: twentySevenPage.getHeight() / 2 - 127
  })
  return await pdfDoc.save()
}
