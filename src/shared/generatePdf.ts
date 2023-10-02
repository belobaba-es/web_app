import { ref } from 'vue'
import jsPDF from 'jspdf'

export enum jsPDFOptionsOrientationEnum {
  PORTRAIT = 'p',
  LANDSCAPE = 'l',
}

interface TextColor {
  red: number
  green: number
  blue: number
}

const darkerGray: TextColor = { red: 200, green: 200, blue: 200 }
const grayLight: TextColor = { red: 240, green: 240, blue: 240 }
const lightGreen: TextColor = { red: 229, green: 249, blue: 247 }
const blackLight: TextColor = { red: 27, green: 27, blue: 17 }
const primaryColor: TextColor = { red: 0, green: 190, blue: 176 }
const gray: TextColor = { red: 109, green: 110, blue: 109 }
const black: TextColor = { red: 0, green: 0, blue: 0 }

type textPayload = {
  fontSize: number
  textColor: TextColor
  text: string
  xPosition: number
  yPosition: number
}

type fillPayload = {
  textColor: TextColor
  xPosition: number
  yPosition: number
  endPosition: number
  height: number
}
export default (nameFile: string, logo: string, title: string, data: any, footer: string) => {
  const pdf = ref(new jsPDF())
  pdf.value.addImage(logo, 'PNG', 15, 10, 40, 20)

  pdf.value.setFontSize(18)
  pdf.value.text(title, 75, 40)

  let i = 1

  const keys = Object.keys(data)

  keys.forEach(element => {
    pdf.value.setFontSize(15)
    pdf.value.setTextColor(0, 0, 0)
    pdf.value.text(element, 15, 55 * i)
    i = i + 0.15
    pdf.value.setFontSize(12)
    pdf.value.setTextColor(108, 117, 125)
    pdf.value.text(data[element], 15, 55 * i)
    i = i + 0.2
  })

  pdf.value.setFontSize(12)
  pdf.value.setTextColor(0, 0, 0)
  pdf.value.text(footer, 15, 285)

  pdf.value.save(`${nameFile}.pdf`)
}

export const generateTransactionHistory = (
  nameFile: string,
  logo: string,
  title: string,
  footer: string,
  orientation: jsPDFOptionsOrientationEnum = jsPDFOptionsOrientationEnum.PORTRAIT,
  data: any,
  owner: any,
  translations: any,
  dateFilters?: any
) => {
  const pdf = ref(
    new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
    })
  )

  setHeader(pdf, logo, title)
  setSubHeader(pdf, owner, translations, dateFilters)

  let i: number = 1

  let rowCounter: number = 0
  let pageCounter: number = 1
  let rowBackgroundCounter: number = 0

  data.map((element: any) => {
    i = i + 0.15

    const rowHeightPosition: number = 70 * i
    const backgroundRowHeigthPosition: number = rowHeightPosition - 6
    createFill(
      {
        textColor: getRowAlternateFillColor(rowBackgroundCounter),
        xPosition: 15,
        yPosition: backgroundRowHeigthPosition,
        endPosition: 270,
        height: 14,
      },
      pdf
    )
    rowBackgroundCounter++

    createText(
      {
        fontSize: 12,
        textColor: gray,
        xPosition: 20,
        yPosition: rowHeightPosition,
        text: element.assetCode.toString(),
      },
      pdf
    )
    createText(
      {
        fontSize: 12,
        textColor: gray,
        xPosition: 75,
        yPosition: rowHeightPosition,
        text: element.reference.toString(),
      },
      pdf
    )
    createText(
      {
        fontSize: 12,
        textColor: gray,
        xPosition: 200,
        yPosition: rowHeightPosition,
        text: element.createdAt.toString(),
      },
      pdf
    )
    createText(
      {
        fontSize: 12,
        textColor: gray,
        xPosition: 255,
        yPosition: rowHeightPosition,
        text: element.amount.toString(),
      },
      pdf
    )

    i = i + 0.03
    rowCounter++

    if (rowCounter === 10) {
      // ----------------------new page------------------------------
      pageCounter++
      rowCounter = 0
      i = 1
      pdf.value.addPage()
      setHeader(pdf, logo, title)
      setSubHeader(pdf, owner, translations, dateFilters)
    }
  })

  pdf.value.save(`${nameFile}.pdf`)
}

export const generateTransactionReceipt = (
  nameFile: string,
  logo: string,
  title: string,
  data: any,
  footer: string
) => {
  console.log('nameFile:', nameFile)
  console.log('logo:', logo)
  console.log('title:', title)
  console.log('data:', data)
  console.log('footer:', footer)

  const pdf = ref(new jsPDF())
  pdf.value.addImage(logo, 'PNG', 85, 10, 40, 20)
  createText({ fontSize: 28, textColor: black, xPosition: 65, yPosition: 45, text: title }, pdf)

  let i = 1
  let index = 0

  const keys = Object.keys(data)
  keys.forEach(element => {
    index++

    const backgroundRowHeigthPosition = 60 * i + 2.7
    const textHeigthPosition = backgroundRowHeigthPosition + 9

    createFill(
      {
        textColor: getRowAlternateFillColor(index),
        xPosition: 10,
        yPosition: backgroundRowHeigthPosition,
        endPosition: 190,
        height: 14,
      },
      pdf
    )

    createText({ fontSize: 16, textColor: black, xPosition: 15, yPosition: textHeigthPosition, text: element }, pdf)
    createText(
      { fontSize: 16, textColor: black, xPosition: 100, yPosition: textHeigthPosition, text: data[element] },
      pdf
    )

    i = i + 0.17
    i = i + 0.1
  })

  createText({ fontSize: 16, textColor: black, xPosition: 15, yPosition: 285, text: footer }, pdf)
  pdf.value.save(`${nameFile}.pdf`)
}

const setHeader = (pdf: any, logo: string, title: string) => {
  pdf.value.addImage(logo, 'PNG', 15, 10, 40, 20)

  const headerXPos: number = 245
  const headerYPos: number = 25
  createText({ fontSize: 18, textColor: primaryColor, xPosition: headerXPos, yPosition: headerYPos, text: title }, pdf)
}

const setSubHeader = (pdf: any, owner: any, transaltions: any, dateFilters?: any) => {
  createFill(
    {
      textColor: lightGreen,
      xPosition: 15,
      yPosition: 31,
      endPosition: 270,
      height: 18,
    },
    pdf
  )

  createText({ fontSize: 10, textColor: blackLight, xPosition: 20, yPosition: 37, text: transaltions.ownersName }, pdf)

  createText(
    {
      fontSize: 10,
      textColor: blackLight,
      xPosition: 95,
      yPosition: 37,
      text: transaltions.documentPlaceholder,
    },
    pdf
  )

  createText(
    {
      fontSize: 10,
      textColor: blackLight,
      xPosition: 165,
      yPosition: 37,
      text: transaltions.divisorLabel,
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 20,
      yPosition: 43,
      text: owner.name,
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 95,
      yPosition: 43,
      text: owner.id,
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 165,
      yPosition: 43,
      text: owner.address,
    },
    pdf
  )

  createText(
    {
      fontSize: 14,
      textColor: primaryColor,
      xPosition: 15,
      yPosition: 54,
      text: transaltions.extractGenerated,
    },
    pdf
  )

  // date
  if (dateFilters.startDate && dateFilters.startDate !== '') {
    createText(
      {
        fontSize: 10,
        textColor: blackLight,
        xPosition: 15,
        yPosition: 60,
        text: transaltions.from,
      },
      pdf
    )

    createText(
      {
        fontSize: 10,
        textColor: gray,
        xPosition: 24,
        yPosition: 60,
        text: dateFilters.startDate,
      },
      pdf
    )

    createText(
      {
        fontSize: 10,
        textColor: blackLight,
        xPosition: 53,
        yPosition: 60,
        text: transaltions.to,
      },
      pdf
    )

    createText(
      {
        fontSize: 10,
        textColor: gray,
        xPosition: 58,
        yPosition: 60,
        text: dateFilters.endDate,
      },
      pdf
    )
  }

  // table header
  const tableHeaderRowHeightPosition = 71
  createFill(
    {
      textColor: getRowAlternateFillColor(1),
      xPosition: 15,
      yPosition: tableHeaderRowHeightPosition - 8,
      endPosition: 270,
      height: 14,
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 20,
      yPosition: tableHeaderRowHeightPosition,
      text: 'ASSET',
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 75,
      yPosition: tableHeaderRowHeightPosition,
      text: 'CONCEPT',
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 200,
      yPosition: tableHeaderRowHeightPosition,
      text: 'DATE/HOUR',
    },
    pdf
  )

  createText(
    {
      fontSize: 12,
      textColor: blackLight,
      xPosition: 255,
      yPosition: tableHeaderRowHeightPosition,
      text: 'AMOUNT',
    },
    pdf
  )
}

const createText = (tx: textPayload, pdf: any) => {
  pdf.value.setFontSize(tx.fontSize)
  pdf.value.setTextColor(tx.textColor.red, tx.textColor.green, tx.textColor.blue)
  pdf.value.text(tx.text, tx.xPosition, tx.yPosition)
}
const createFill = (fill: fillPayload, pdf: any) => {
  pdf.value.setFillColor(fill.textColor.red, fill.textColor.green, fill.textColor.blue)
  pdf.value.rect(fill.xPosition, fill.yPosition, fill.endPosition, fill.height, 'F')
}
const getRowAlternateFillColor = (i: number): TextColor => {
  return i % 2 !== 0 ? darkerGray : grayLight
}
