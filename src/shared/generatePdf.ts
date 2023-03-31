import { ref } from 'vue'
import jsPDF from 'jspdf'

export enum jsPDFOptionsOrientationEnum {
  PORTRAIT = 'p',
  LANDSCAPE = 'l',
}

const setHeader = (pdf: any, logo: string, title: string) => {
  pdf.value.addImage(logo, 'PNG', 15, 10, 40, 20)
  pdf.value.setFontSize(18)
  pdf.value.text(title, 75, 40)
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

export const generatePDFTable = (
  nameFile: string,
  logo: string,
  title: string,
  data: any,
  footer: string,
  orientation: jsPDFOptionsOrientationEnum = jsPDFOptionsOrientationEnum.PORTRAIT
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
  let i = 1

  const keys = Object.keys(data)
  let rowCounter = 0
  let pageCounter = 1

  keys.forEach(element => {
    pdf.value.setFontSize(15)
    pdf.value.setTextColor(0, 0, 0)
    // pdf.value.text(element, 15, 55 * i)
    i = i + 0.15
    pdf.value.setFontSize(12)
    pdf.value.setTextColor(108, 117, 125)
    pdf.value.text(data[element], 15, 55 * i)
    // console.log('data[element]', data[element])
    i = i + 0.2
    rowCounter++
    if (rowCounter === 7) {
      console.warn('----------------------new page------------------------------')
      pageCounter++
      rowCounter = 0
      i = 1
      pdf.value.addPage()
      setHeader(pdf, logo, title)
    }
    // console.log('pdf i,', i)
    // console.log('pdf  pageCounter', pageCounter)
    // console.log('pdf  rowCounter', rowCounter)
    // console.log('pdf element', element)

    pdf.value.setFontSize(12)
    pdf.value.setTextColor(0, 0, 0)
    pdf.value.text(footer, 15, orientation === jsPDFOptionsOrientationEnum.LANDSCAPE ? 200 : 285)
  })

  var html =
    '<table><thead><tr><th style="background-color: #ccc; border: 1px solid #000;">Header 1</th><th style="background-color: #ccc; border: 1px solid #000;">Header 2</th></tr></thead><tbody><tr><td style="border: 1px solid #000;">Cell 1-1</td><td style="border: 1px solid #000;">Cell 1-2</td></tr><tr><td style="border: 1px solid #000;">Cell 2-1</td><td style="border: 1px solid #000;">Cell 2-2</td></tr></tbody></table>'

  // draw the HTML table in the PDF
  // pdf.value.html(html, {
  //   callback: function () {
  //     // save the PDF
  //     pdf.value.save('example.pdf')
  //   },
  // })

  pdf.value.save(`${nameFile}.pdf`)
}

export const generateTransactionReceipt = (
  nameFile: string,
  logo: string,
  title: string,
  data: any,
  footer: string
) => {
  const pdf = ref(new jsPDF())
  pdf.value.addImage(logo, 'PNG', 85, 10, 40, 20)
  pdf.value.setFontSize(28)
  pdf.value.text(title, 65, 45)

  let i = 1
  let index = 0

  const keys = Object.keys(data)

  keys.forEach(element => {
    index++

    const backgroundRowHeigthPosition = 60 * i + 2.7
    const textHeigthPosition = backgroundRowHeigthPosition + 9

    pdf.value.setFillColor(
      getRowALternateBackgroundColor(index)[0],
      getRowALternateBackgroundColor(index)[1],
      getRowALternateBackgroundColor(index)[2]
    )
    pdf.value.rect(10, backgroundRowHeigthPosition, 190, 15, 'F')
    pdf.value.setFontSize(16)
    pdf.value.setTextColor(0, 0, 0)
    pdf.value.text(element, 15, textHeigthPosition)
    pdf.value.text(data[element], 100, textHeigthPosition)

    i = i + 0.17
    i = i + 0.1
  })

  pdf.value.setFontSize(32)
  pdf.value.setTextColor(0, 0, 0)
  pdf.value.text(footer, 15, 285)

  pdf.value.save(`${nameFile}.pdf`)
}

const getRowALternateBackgroundColor = (i: number) => {
  return i % 2 !== 0 ? [200, 200, 200] : [240, 240, 240]
}
