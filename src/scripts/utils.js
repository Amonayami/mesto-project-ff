//Процесс загрузки
export function loadingButton(submitButton, promise) {
    const originalText = submitButton.textContent
    submitButton.textContent = 'Сохранение...'
    submitButton.disabled = true
    return Promise.resolve(promise).finally(() => {
        submitButton.textContent = originalText
        submitButton.disabled = false
    })
}