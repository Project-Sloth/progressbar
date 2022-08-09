local Translations = {
    error = {
        busy = "Je doet al iets!",
        cantdo = "Kan die actie niet uitvoeren!",
    }
}
Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})