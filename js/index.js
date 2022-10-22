class App {
    constructor() {
        const video = document.getElementById('videoInput')
        
        if (this.isDarkMode()) this.changeTheme(true)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        let constraints = { audio: false, video: true }
        function successCallback(stream) {
            video.srcObject = stream
            video.play()
        }
        function errorCallback(error) {
            console.log(error)
        }
        navigator.getUserMedia(constraints, successCallback, errorCallback)

        const item = document.getElementById('item')
        
        this.speak(item.innerText, {
            rate: 1,
            pitch: 1.2,
            lang: 'Ko-KR'
        })
    }

    speak(text, opt_prop) {
        if (typeof SpeechSynthesisUtterance === "undefined" || typeof window.speechSynthesis === "undefined") {
            alert("이 브라우저는 음성 합성을 지원하지 않습니다.")
            return
        }
        
        window.speechSynthesis.cancel() // 현재 읽고있다면 초기화

        const prop = opt_prop || {}

        const speechMsg = new SpeechSynthesisUtterance()
        speechMsg.rate = prop.rate || 1 // 속도: 0.1 ~ 10      
        speechMsg.pitch = prop.pitch || 1 // 음높이: 0 ~ 2
        speechMsg.lang = prop.lang || "ko-KR"
        speechMsg.text = text
        
        // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
        window.speechSynthesis.speak(speechMsg)
    }

    /**
     * 웹 사이트 다크 모드, 라이트 모드 변경
     * @param {boolean} dark 
     */
    changeTheme(dark) {
        let themeColors = { '--bg': '#0f1421', '--btn': '#272b38', '--txt': '#cfcfcf', '--border': '#303540', '--section': '#191f2c' }
        if (!dark) themeColors = { '--bg': '#D8DEE9', '--btn': '#D8DEE9', '--txt': '#2E3440', '--border': '#AAB2CD', '--section': '#E5E9F0' }
        const root = document.querySelector(':root')
        for (const key in themeColors) root.style.setProperty(key, themeColors[key])
    }

    isDarkMode() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    }
}

window.onload = () => new App()