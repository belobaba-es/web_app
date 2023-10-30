import { useToast } from 'primevue/usetoast'
import { ToastServiceMethods } from 'primevue/toastservice'

export const validateObject = (toast: ToastServiceMethods, object: any): boolean => {
  let isValid = true

  for (const fieldKey in object) {
    const value = object[fieldKey]

    const trimmedValue = value && typeof value === 'string' ? value.trim() : value

    if (!trimmedValue) {
      toast.add({
        severity: 'warn',
        summary: 'Valdation field',
        detail: `The field ${fieldKey} is required.`,
        life: 4000,
      })
      isValid = false
    }
  }

  return isValid
}
