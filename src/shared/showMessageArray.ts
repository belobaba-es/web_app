export default (toast: any, data: any) => {
    for (const errorKey in data) {
        toast.add({
            severity: 'warn',
            detail: data[errorKey].message,
            life: 4000,
        })
    }
}