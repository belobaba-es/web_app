import { ref } from 'vue'
import jsPDF from 'jspdf'

export default (logo: string, title: string, data: any, footer:string) => {
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
  
  pdf.value.save('NobaDespositData.pdf')
}
