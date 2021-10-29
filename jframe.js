class JFrame {

    constructor(settings) {
        JFrame.instance.push(this);

        this.settings = settings
        this.id = JFrame.instance.length - 1

        let page = {
            height: settings.height,
            width: settings.width,
            resize: settings.resize,
            src: settings.src,
            frame: settings.frame
        };

        let titlebar = {
            title: settings.title,
            frame: settings.frame
        };

        // PARENT
        this.parent = settings.parent || document.body

        // WINDOWS DIV
        this.windowDiv = document.createElement("div");
        this.windowDiv.setAttribute("class", "windows")
        this.windowDiv.setAttribute("id", "windows" + JFrame.instance.length)

        this.windowDiv.style.position = "absolute"

        this.windowDiv.style.border = "1px solid black"
        this.windowDiv.style.borderRadius = "4px"

        document.body.style.margin = "0"
        document.body.style.overflow = "hidden"

        //MAX SIZE
        this.windowDiv.style.maxWidth = settings.maxWidth + "px"
        this.windowDiv.style.maxHeight = settings.maxHeight + "px"

        this.windowDiv.style.width = (settings.width || 600) + "px"
        this.windowDiv.style.height = (settings.height || 400) + "px"

        //CSS RESIZE
        this.windowDiv.style.minWidth = (settings.minWidth || 600 ) + "px"
        this.windowDiv.style.minHeight = (settings.minHeight || 400) + "px"
        if (settings.reszeable === false){
            this.windowDiv.style.resize = settings.reszeable
        } else {
            this.windowDiv.style.resize = "both"
        }
        this.windowDiv.style.overflow = "hidden"
        this.windowDiv.style.maxWidth = "fit-content"
        this.windowDiv.style.maxHeight = "fit-content"


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


            let shiftX = event.clientX - this.Titlebar.DragTitle.getBoundingClientRect().left;
            let shiftY = event.clientY - this.Titlebar.DragTitle.getBoundingClientRect().top;

            // FOCUS
            this.focus()

            //
            if (!this.maximize){

                let drag = true;

                this.Titlebar.DragTitle.addEventListener("mousemove", (event) => {

                    if (drag){
                        this.drag(event, {x: shiftX, y:shiftY})
                    }

                })

                this.Titlebar.DragTitle.addEventListener("mouseleave", (event) => {
                    if (drag){
                        this.drag(event, {x: shiftX, y:shiftY})
                    }
                })

                this.Titlebar.DragTitle.addEventListener("mouseup", (event) => {
                    drag = false
                })
            }
        })

        // RESIZE FULLSCREEN
        window.addEventListener("resize", (event) => {

            if (this.maximize){
                this.setMaximise()
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
                this.windowDiv.style.resize = "both"
            } else {
                this.size = [this.windowDiv.offsetWidth, this.windowDiv.offsetHeight]
                this.setMaximise()
                this.windowDiv.style.resize = "none"
            }
        })
        this.Titlebar.MaximiseButton.addEventListener("mouseenter", () => {
            this.Titlebar.MaximiseButton.style.backgroundColor = "#cc7e29"
        })
        this.Titlebar.MaximiseButton.addEventListener("mouseleave", () => {
            this.Titlebar.MaximiseButton.style.backgroundColor = "#ffa041"
        })

        this.focus()
    }

    get_name(){
        return this.Titlebar.title.innerText
    }

    getAll() {
        return JFrame.instance
    }


    get(index){
        return JFrame.instance[index]
    }

    focus(){

        for (let instance of JFrame.instance){
            instance.windowDiv.style.zIndex = 2;
        }
        this.windowDiv.style.zIndex = 3;

    }

    setMaximise() {
        this.windowDiv.style.width = window.innerWidth + "px"
        this.windowDiv.style.height = window.innerHeight + "px"

        this.windowDiv.style.left = 0;
        this.windowDiv.style.top = 0;

        this.maximize = true
        this.focus()
    }
    setUnMaximise(settings) {

        this.windowDiv.style.width = this.size[0] + "px"
        this.windowDiv.style.height = this.size[1] + "px"

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

        TaskbarItem.close(this.id)

    }
    show() {

        this.windowDiv.style.display = "absolute";
        this.displayed = true

    }
    drag(event, shift){
        this.windowDiv.style.left = event.pageX - shift.x + 'px';
        this.windowDiv.style.top = event.pageY - shift.y + 'px';
    }

    setPos(x, y){
        this.windowDiv.style.left = x;
        this.windowDiv.style.top = y;
    }

    static instance = [];
}

class Titlebar {

    constructor(settings, windowDiv) {

        this.settings = settings


        // WINDOWS TITLE
        this.TitlebarDiv = document.createElement("div");
        this.TitlebarDiv.setAttribute("class", "header")

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

        if (this.settings.frame == false){
            this.TitlebarDiv.style.display = "none"
        }
    }

    setTitle (name) {
        this.title.innerHTML = name || "Window"
    }

    setBackgroundColor(color){
        this.title.style.backgroundColor = color
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


        if (this.settings.frame == false){
            this.PageDiv.style.height = "100%"
        }

    }

    setSrc (src) {
        this.iframe.setAttribute("src", src)
    }

}

class Taskbar {
    constructor(settings) {

        //TASKBAR
        this.position = settings.position
        this.height = settings.height

        this.taskbarDiv = document.createElement("div");
        this.taskbarDiv.setAttribute("class", "taskbsar")
        this.taskbarDiv.setAttribute("id", "tasksbar")

        this.taskbarDiv.style.position = "absolute"

        if (this.position ===  0){
            this.taskbarDiv.style.top = 0
        } else if (this.position === 1){
            this.taskbarDiv.style.bottom = 0
        }
        this.taskbarDiv.style.width = "100%"
        this.taskbarDiv.style.height = this.height + "px"

        this.taskbarDiv.style.backgroundColor = "#161616"
        this.taskbarDiv.style.zIndex = 1;

        document.body.appendChild(this.taskbarDiv)

        //WINDOWS LIST
        this.taskbarUl = document.createElement("ul");
        this.taskbarUl.style.margin = 0
        this.taskbarUl.style.padding = 0
        this.taskbarUl.style.listStyleType = "none"

        this.taskbarDiv.appendChild(this.taskbarUl)

        for (let frame of JFrame.instance){
            new TaskbarItem(frame.get_name(), this.taskbarUl, this.height)
        }

    }
}

class TaskbarItem{

    constructor(name, parent, height) {
        TaskbarItem.instance.push(this);
        this.name = name

        //WINDOWS LIST
        this.taskbarLi = document.createElement("li");
        this.taskbarLi.innerText = name

        this.taskbarLi.style.height = height + "px"
        this.taskbarLi.style.padding = "10px 20px"
        this.taskbarLi.style.backgroundColor = "red"
        this.taskbarLi.style.float = "left"

        parent.appendChild(this.taskbarLi)
    }

    getAll() {
        return TaskbarItem.instance
    }

    get(index){
        return TaskbarItem.instance[index]
    }

    static close(id){
        TaskbarItem.instance[id].taskbarLi.style.display = "none"
    }

    static instance = [];
}

class Desktop{
    constructor() {
    }
}
