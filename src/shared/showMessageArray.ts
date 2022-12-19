export default (toast, data) => {
    for (const errorKey in data) {
        toast.add({
            severity: 'warn',
            detail: data[errorKey].message,
            life: 4000,
        })
    }
}