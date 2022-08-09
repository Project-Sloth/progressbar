local Translations = {
    error = {
        busy = "You are already doing something!",
        cantdo = "Can't do that action!",
    }
}
Lang = Locale:new({
    phrases = Translations,
    warnOnMissing = true
})