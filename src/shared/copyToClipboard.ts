import { ToastServiceMethods } from 'primevue/toastservice'

export default function (toast: ToastServiceMethods, text: string) {
  if (!navigator.clipboard) {
    toast.add({
      severity: 'error',
      detail: 'Clipboard API not available',
      life: 4000,
    })
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      severity: 'info',
      detail: text,
      life: 4000,
    })
  })
}
