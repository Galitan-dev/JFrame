//DEFAULT BODY STYLE
document.body.style.margin = 0

class Jframe {

    //APPLICATION
    static registerNewApplication (options = {}) {
        let instance = new Application(options, this.applicationInstances.length)
        this.applicationInstances.push(instance)
        return instance;
    }

    static getAllApplication () { return this.applicationInstances }
    static getApplication (id = 0) { return this.applicationInstances[id] }

    //DESKTOP
    static registerComputer(options = {}) { this.computerInstance =new Computer(options) }

    //INSTANCES SAVE
    static applicationInstances = []
    static computerInstance;

}

class Application {

    static default_icon = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fhawcons%2F32%2F699297-icon-68-document-file-app-512.png&f=1&nofb=1"

    constructor (options = {}, id) {

        this.options = options
        this.isOpen = false
        this.id = id

        if (this.options.desktop){
            Desktop.addApplication(this)
        }
    }

    open () {
        if (this.isOpen){
            this.focus()
        } else {
            Taskbar.registerNewTaskbarApp(this, Jframe.computerInstance.getTaskbar().taskbarUl, Jframe.computerInstance.getTaskbar().options)
            this.isOpen = true
        }
    }

    close () {

    }

    focus ( ) {

    }

    getOption () { return this.options }
    getId() {return this.id }
    getIcon() {return (this.options.icon || Application.default_icon)}

    checkIfOpen() {
        return this.isOpen
    }


}

class Computer {

    constructor(options = {}) {

        this.options = options

        //CREATE COMPUTER
        this.computerDiv = document.createElement("div")
        this.computerDiv.setAttribute("class", "computer")

        //STYLE COMPUTER
        this.computerDiv.style.display = 'grid'
        this.computerDiv.style.gridTemplateColumns = '1fr'
        this.computerDiv.style.width = '100vw'
        this.computerDiv.style.height = '100vh'
        this.computerDiv.style.backgroundColor = (this.options.backgroundColor || "black")
        this.computerDiv.style.backgroundImage = "url("+ this.options.backgroundImg +")"
        this.computerDiv.style.backgroundPosition = "center center"
        this.computerDiv.style.backgroundRepeat = "no-repeat"
        this.computerDiv.style.backgroundAttachment = "fixed"
        this.computerDiv.style.backgroundSize = "cover"

        //APPEND COMPUTER TO PAGE
        document.body.appendChild(this.computerDiv)

        //CREATE DESKTOP
        this.desktopDiv = document.createElement("div")
        this.desktopDiv.setAttribute("class", "desktop")

        //APPEND DESKTOP TO COMPUTER
        this.computerDiv.appendChild(this.desktopDiv)

        //CREATE DESKTOP INSTANCE
        this.desktop = new Desktop(this.desktopDiv, this.options)

        if (this.options.taskbar){

            // STYLE COMPUTER GRID WHEN TASKBAR
            this.computerDiv.style.gridTemplateRows = '1fr ' + ( ( this.options.taskbarHeight || 60 ) + 10) + 'px'

            //CREATE TASKBAR
            this.taskbarDiv = document.createElement("div")
            this.taskbarDiv.setAttribute("class", "taskbar")

            //APPEND TASKBAR TO COMPUTER
            this.computerDiv.appendChild(this.taskbarDiv)

            //CREATE TASKBAR INSTANCE
            this.taskbar = new Taskbar(this.taskbarDiv, this.options)

        } else {
            // STYLE COMPUTER GRID WHEN NO TASKBAR
            this.computerDiv.style.gridTemplateRows = '1fr'
        }

    }

    getOption () { return this.options }
    getTaskbar () { return this.taskbar }
    getDesktop () { return this.desktop }

}

class Taskbar {

    constructor(taskbarDiv, options) {

        this.options = options

        this.taskbarDiv = taskbarDiv

        this.taskbarDiv.style.display = "grid"
        this.taskbarDiv.style.gridTemplateRows = "1fr"

        //CREATE TASKBAR UL
        this.taskbarUl = document.createElement("ul")
        this.taskbarUl.style.listStyleType = 'none'
        this.taskbarUl.style.gridArea = "1 / 2 / 2 / 3"
        this.taskbarUl.style.textAlign = 'center'
        this.taskbarUl.style.margin = 0
        this.taskbarUl.style.padding = 0

        //APPEND TASKBAR UL TO TASKBAR DIV
        this.taskbarDiv.appendChild(this.taskbarUl)
    }

    static registerNewTaskbarApp(application, parent, options){
        if (this.TaskbarAppInstances.length < 30){
            this.TaskbarAppInstances.push(new TaskbarItem(application, parent, options))
        }
    }

    static TaskbarAppInstances = []
    static getAllTaskbarApp() { return this.TaskbarAppInstances }
    static getTaskbarApp (id = 0) { return this.TaskbarAppInstances[id] }

}

class TaskbarItem {

    constructor(app, parent, options) {

        this.options = options
        this.parent = parent
        this.app = app

        //CREATE TASKBAR UL
        let li = document.createElement("li")
        li.setAttribute("id", this.app.options.appId + "Taskbar")
        li.style.listStyleType = "none"
        li.style.float = "left"
        li.style.display = "grid"
        li.style.gridTemplateColumns = "25px 10px 25px"
        li.style.gridTemplateRows = ( ( this.options.taskbarHeight || 60 ) - 20) + "px 15px 5px"
        li.style.gridColumnGap = ( ( this.options.taskbarGap || 0 ) / 2 ) + "px"
        li.style.gridRowGap = '0px'
        li.style.cursor = 'pointer'
        li.style.transition = 'transform 200ms ease-in-out'

        let style = document.createElement("style")
        style.innerHTML = "#"+ ( this.app.options.appId || app.id ) +"Taskbar:hover{transform: scale(1.1);}"
        document.head.appendChild(style)

        let img = document.createElement("img")
        img.setAttribute("src", ( app.getIcon()) )
        img.style.gridArea = "1 / 1 / 2 / 4"

        if (this.options.taskbarIconSize > ( this.options.taskbarHeight || 60 )) {
            this.options.taskbarIconSize = ( this.options.taskbarHeight || 60 ) - 10
        }

        img.style.width = ( this.options.taskbarIconSize || 50 ) + "px"
        img.style.height = ( this.options.taskbarIconSize || 50 ) + "px"
        img.style.margin = "auto"
        li.appendChild(img)

        let bottomBar = document.createElement("div")
        bottomBar.style.gridArea = "3 / 2 / 4 / 3"
        bottomBar.style.width = "100%"
        bottomBar.style.height = "5px"
        bottomBar.style.backgroundColor = "#cbcbcb"
        bottomBar.style.borderRadius = "10px"
        li.appendChild(bottomBar)

        //APPEND TASKBAR UL TO TASKBAR DIV
        this.parent.appendChild(li)
    }

}

class Desktop {

    constructor(desktopDiv, options) {

        this.desktopDiv = desktopDiv
        this.desktopDiv.style.display = "grid"
        this.desktopDiv.style.margin = "15px"
        this.desktopDiv.style.gridTemplateColumns = "repeat(" + Math.round((this.desktopDiv.offsetWidth - 30) / (options.desktopIconSize + 10))  + ", "+ (options.desktopIconSize+10) +"px)"
        this.desktopDiv.style.gridTemplateRows = "repeat(" + Math.round((this.desktopDiv.offsetHeight - 30) / (options.desktopIconSize + 40))  + ", "+ (options.desktopIconSize+40) +"px)"
    }

    getDesktopDiv () {return this.desktopDiv}

    static addApplication (app) {Desktop.applicationInstances.push(new DesktopItem(app, Jframe.computerInstance.getDesktop().getDesktopDiv()))}
    static getAllApplication () { return this.applicationInstances }
    static getApplication (id = 0) { return this.applicationInstances[id] }

    static applicationInstances = []

}

class DesktopItem {

    constructor(app, parent) {

        this.app = app

        this.grid = document.createElement("div")
        this.grid.setAttribute("id", app.options.appId + "Desktop")
        this.grid.style.cursor = "pointer"
        this.grid.style.transition = "background-color 200ms ease-in-out"
        this.grid.style.overflow = "hidden"

        this.style = document.createElement("style")
        this.style.innerHTML = "#"+ ( app.options.appId || app.id ) +"Desktop:hover{background-color: rgba(255,255,255,0.3);}" +
            "#"+ ( app.options.appId || app.id ) +"Desktop:active{transform: scale(0.9);"
        document.head.appendChild( this.style)

        //CREATE IMG
        this.img = document.createElement("img")
        this.img.setAttribute("src", ( app.getIcon()) )

        this.img.style.width = ( (Jframe.computerInstance.getTaskbar().options.desktopIconSize - 10) || 50 ) + "px"
        this.img.style.height = ( (Jframe.computerInstance.getTaskbar().options.desktopIconSize - 10) || 50 ) + "px"
        this.img.style.margin = "10px"

        //APPEND TO GRID
        this.grid.appendChild( this.img)

        //CREATE TXT
        this.txt = document.createElement("textarea")
        this.txt.innerText = app.options.title
        this.txt.style.margin = "0"
        this.txt.style.fontSize = "13px"
        this.txt.style.textAlign = "center"
        this.txt.style.overflow = "hidden"
        this.txt.style.textOverflow = "ellipsis"
        this.txt.style.width = "100%"
        this.txt.style.height = "100%"
        this.txt.style.outline = "none"
        this.txt.style.resize = "none"
        this.txt.style.border = "none"
        this.txt.style.background = "none"
        this.txt.style.color = "white"
        this.grid.appendChild(this.txt)

        //APPEND GRID TO PARENT
        parent.appendChild( this.grid)

        this.listener()
    }

    listener () {

        this.grid.addEventListener("click", () => {
            this.app.open()
        })

    }

}