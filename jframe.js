class JFrame{

    constructor(settings) {
        JFrame.instance.push(this);

        this.settings = settings

        var page = {
            height: settings.height,
            width: settings.width,
            resize: settings.resize,
            src: settings.src
        }

        var titlebar = {
            title: settings.title
        }

        // PARENT
        this.parent = settings.parent || document.body

        // WINDOWS DIV
        this.windowDiv = document.createElement("div");
        this.windowDiv.setAttribute("class", "windows")
        this.windowDiv.setAttribute("id", "windows" + JFrame.instance.length)

        this.windowDiv.style.width = settings.width + "px"
        this.windowDiv.style.height = settings.height + "px"
        this.windowDiv.style.position = "absolute"

        this.windowDiv.style.border = "1px solid black"
        this.windowDiv.style.borderRadius = "4px"
        document.body.style.margin = "0"

        this.parent.appendChild(this.windowDiv)

        // ELEMENT
        this.Titlebar = new Titlebar(titlebar, this.windowDiv)
        this.Page = new Page(page, this.windowDiv)

        this.maximize = false
        this.displayed = true

        // START CENTER
        let random_x = Math.floor(Math.random() * 50);
        let random_y = Math.floor(Math.random() * 50);

        if (random_x % 2){ random_x = random_x * -1 }
        if (random_y % 2){ random_y = random_y * -1 }

        this.windowDiv.style.left = (window.innerWidth / 2 - this.windowDiv.offsetWidth / 2) + random_x + 'px';
        this.windowDiv.style.top = (window.innerHeight / 2 - this.windowDiv.offsetHeight / 2) + random_y + 'px';



        // DRAG AND DROP
        this.Titlebar.DragTitle.addEventListener("mousedown", (event) => {

            // FOCUS
            this.focus()

            //
            if (!this.maximize){

                var drag = true

                this.Titlebar.DragTitle.addEventListener("mousemove", (event) => {

                    if (drag){
                        this.windowDiv.style.left = event.pageX - this.Titlebar.DragTitle.offsetWidth / 2 + 'px';
                        this.windowDiv.style.top = event.pageY - this.Titlebar.DragTitle.offsetHeight / 2 + 'px';
                    }

                })

                this.Titlebar.DragTitle.addEventListener("mouseleave", (event) => {
                    if (drag){
                        this.windowDiv.style.left = event.pageX - this.Titlebar.DragTitle.offsetWidth / 2 + 'px';
                        this.windowDiv.style.top = event.pageY - this.Titlebar.DragTitle.offsetHeight / 2 + 'px';
                    }
                })

                this.Titlebar.DragTitle.addEventListener("mouseup", (event) => {
                    drag = false
                })
            }
        })

        // RESIZE FULLSCRENN
        window.addEventListener("resize", (event) => {

            if (this.maximize){
                this.setMaximize()
            }

        })

        // CLOSE BUTTON
        this.Titlebar.CloseButton.addEventListener("click", () => {
            this.close()
        })
        this.Titlebar.CloseButton.addEventListener("mouseenter", () => {
            this.Titlebar.CloseButton.style.backgroundColor = "#b22626"
        })
        this.Titlebar.CloseButton.addEventListener("mouseleave", () => {
            this.Titlebar.CloseButton.style.backgroundColor = "#ff4141"
        })

        // MAXIMISE BUTTON
        this.Titlebar.MaximiseButton.addEventListener("click", () => {
            if (this.maximize){
                this.setUnMaximise()
            } else {
                this.setMaximise()
            }
        })
        this.Titlebar.MaximiseButton.addEventListener("mouseenter", () => {
            this.Titlebar.MaximiseButton.style.backgroundColor = "#cc7e29"
        })
        this.Titlebar.MaximiseButton.addEventListener("mouseleave", () => {
            this.Titlebar.MaximiseButton.style.backgroundColor = "#ffa041"
        })
    }

    getAll() {
        return JFrame.instance
    }


    get(index){
        return JFrame.instance[index]
    }

    focus(){

        for (let instance of JFrame.instance){
            instance.windowDiv.style.zIndex = -1;
        }
        this.windowDiv.style.zIndex = 1;

    }

    setMaximise() {
        this.windowDiv.style.width = window.innerWidth - 10 + "px"
        this.windowDiv.style.height = window.innerHeight - 10 + "px"

        this.windowDiv.style.left = 0;
        this.windowDiv.style.top = 0;

        this.windowDiv.style.margin = "5px"

        this.maximize = true
        this.focus()
    }
    setUnMaximise(settings) {

        this.windowDiv.style.width = this.settings.width + "px"
        this.windowDiv.style.height = this.settings.height + "px"

        let random_x = Math.floor(Math.random() * 50);
        let random_y = Math.floor(Math.random() * 50);

        if (random_x % 2){ random_x = random_x * -1 }
        if (random_y % 2){ random_y = random_y * -1 }

        this.windowDiv.style.left = (window.innerWidth / 2 - this.windowDiv.offsetWidth / 2) + random_x + 'px';
        this.windowDiv.style.top = (window.innerHeight / 2 - this.windowDiv.offsetHeight / 2) + random_y + 'px';

        this.maximize = false
    }

    close() {

        this.windowDiv.style.display = "none"
        this.displayed = false

    }
    show() {

        this.windowDiv.style.display = "absolute";
        this.displayed = true

    }

    static instance = [];
}

class Titlebar {

    constructor(settings, windowDiv) {

        this.settings = settings


        // WINDOWS TITLE
        this.TitlebarDiv = document.createElement("div");
        this.TitlebarDiv.setAttribute("class", "taskbar")

        // grid
        this.TitlebarDiv.style.display = "grid"
        this.TitlebarDiv.style.gridTemplateColumns = "1fr repeat(2, 30px) 0"
        this.TitlebarDiv.style.gridTemplateRows = "1fr"
        this.TitlebarDiv.style.gridColumnGap = "5px"

        this.TitlebarDiv.style.width = "100%"
        this.TitlebarDiv.style.height = "30px"
        this.TitlebarDiv.style.backgroundColor = "#30343f"
        this.TitlebarDiv.style.borderTopLeftRadius = "3px"
        this.TitlebarDiv.style.borderTopRightRadius = "3px"
        this.TitlebarDiv.style.userSelect = "none"

        windowDiv.appendChild(this.TitlebarDiv)


        // ICON TITLE
        this.DragTitle = document.createElement("div");

        this.TitlebarDiv.appendChild(this.DragTitle)

        this.title = document.createElement("p");
        this.title.innerHTML = settings.title || "Windows"
        this.title.style.lineHeight = "30px"
        this.title.style.margin = 0
        this.title.style.textAlign = "center"
        this.title.style.color = "#a5a5a5"
        this.title.style.fontFamily = '"Gill Sans", sans-serif'
        this.title.style.fontWeight = "600"
        this.title.style.letterSpacing = "0.5px"
        this.title.style.fontSize = "13px"

        this.DragTitle.appendChild(this.title)

        //

        this.Maximise = document.createElement("div");
        this.TitlebarDiv.appendChild(this.Maximise)

        this.MaximiseButton = document.createElement("p")

        this.MaximiseButton.style.backgroundColor = "#ffa041"
        this.MaximiseButton.style.borderRadius = "20px"
        this.MaximiseButton.style.border = "1px black solid"
        this.MaximiseButton.style.width = "18px"
        this.MaximiseButton.style.height = "18px"
        this.MaximiseButton.style.margin = "4px"

        this.Maximise.appendChild(this.MaximiseButton)

        //

        this.Close = document.createElement("div");
        this.TitlebarDiv.appendChild(this.Close)

        this.CloseButton = document.createElement("p")

        this.CloseButton.style.backgroundColor = "#ff4141"
        this.CloseButton.style.borderRadius = "20px"
        this.CloseButton.style.border = "1px black solid"
        this.CloseButton.style.width = "18px"
        this.CloseButton.style.height = "18px"
        this.CloseButton.style.margin = "4px"

        this.Close.appendChild(this.CloseButton)
    }

    setTitle (name) {
        this.title.innerHTML = settings.title || "Windows"
    }

}

class Page {

    constructor(settings, windowDiv) {

        this.settings = settings

        // WINDOWS PAGE
        this.PageDiv = document.createElement("div");
        this.PageDiv.setAttribute("class", "page")

        this.PageDiv.style.width = "100%"
        this.PageDiv.style.height = "calc(100% - 30px)"
        this.PageDiv.style.backgroundColor = "blue"
        this.PageDiv.style.borderBottomLeftRadius = "3px"
        this.PageDiv.style.borderBottomRightRadius = "3px"

        this.PageDiv.style.backgroundColor = "black"


        this.iframe = document.createElement("iframe")
        this.iframe.setAttribute("src", this.settings.src || "")

        this.iframe.style.width = "100%"
        this.iframe.style.height = "100%"
        this.iframe.style.border = 0

        this.PageDiv.appendChild(this.iframe)

        windowDiv.appendChild(this.PageDiv)

    }

}
