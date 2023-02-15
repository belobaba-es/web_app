export default (toast: any, severity: string = 'error', summary: string = '', detail: string, life: number = 4000) => {
  toast.add({
    severity: severity,
    summary: summary,
    detail: detail,
    life: life,
  })
}
