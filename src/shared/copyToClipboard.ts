import { ToastServiceMethods } from 'primevue/toastservice'

export default function (toast: ToastServiceMethods, text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      severity: 'info',
      detail: text,
      life: 4000,
    })
  })
}
