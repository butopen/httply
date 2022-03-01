export function pasteHotkey(){
    let userAgent = window.navigator.userAgent.toLowerCase(),
        macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
        windowsPlatforms = /(win32|win64|windows|wince)/i

    let hotkey = ""
    if (macosPlatforms.test(userAgent)) {
        hotkey = "CMD+V";
    } else if (windowsPlatforms.test(userAgent)) {
        hotkey = "CTRL+V";
    }
    return hotkey
}
