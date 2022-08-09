local Translations = {
    error = {
        busy = "Zaten bir şey yapıyorsun!",
        cantdo = "O eylemi yapamam!",
    }
}
Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})