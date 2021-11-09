//DEFAULT BODY STYLE
document.body.style.margin = 0

class Jframe {

    //APPLICATION
    static registerNewApplication (options = {}) { this.applicationInstances.push(new Application(options)) }
    static getAllApplication () { return this.applicationInstances }
    static getOpenApplication () {

        let open = []

        for (let app of this.getAllApplication()){

            if (app.checkIfOpen()){
                open.push(app)
            }

        }

        return open
    }
    static getApplication (id = 0) { return this.applicationInstances[id] }

    //DESKTOP
    static registerComputer(options = {}) { this.computerInstance = new Computer(options) }
    static getComputer() { return this.computerInstance }

    //INSTANCES SAVE
    static applicationInstances = []
    static computerInstance;

}

class Application {

    constructor (options = {}) {

        this.options = options
        this.isOpen = 1

    }

    getOption () { return this.options }

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
        this.computerDiv.style.backgroundColor = this.options.backgroundColor
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
        this.desktop = new Desktop(this.desktopDiv)

        if (this.options.taskbar){

            // STYLE COMPUTER GRID WHEN TASKBAR
            this.computerDiv.style.gridTemplateRows = '1fr ' + ( this.options.taskbarHeight + 10) + 'px'

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

        for (let app of Jframe.getOpenApplication()){
            Taskbar.registerNewTaskbarApp(app, this.taskbarUl, this.options)
        }

    }

    static registerNewTaskbarApp(application, parent, options){

        this.TaskbarAppInstances.push(new TaskbarItem(application, parent, options))

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
        li.setAttribute("id", this.app.options.appId)
        li.style.listStyleType = "none"
        li.style.float = "left"
        li.style.display = "grid"
        li.style.gridTemplateColumns = "25px 10px 25px"
        li.style.gridTemplateRows = ( this.options.taskbarHeight - 20) + "px 15px 5px"
        li.style.gridColumnGap = ( this.options.taskbarGap * 2 ) + "px"
        li.style.gridRowGap = '0px'
        li.style.cursor = 'pointer'
        li.style.transition = 'transform 200ms ease-in-out'

        let style = document.createElement("style")
        style.innerHTML = "#"+this.app.options.appId+":hover{transform: scale(1.1);}"
        document.head.appendChild(style)

        let img = document.createElement("img")
        img.setAttribute("src", app.getOption().icon)
        img.style.gridArea = "1 / 1 / 2 / 4"

        if (this.options.taskbarIconSize > this.options.taskbarHeight) {
            this.options.taskbarIconSize = this.options.taskbarHeight - 10
        }

        img.style.width = this.options.taskbarIconSize + "px"
        img.style.height = this.options.taskbarIconSize + "px"
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

    constructor(desktopDiv) {

        this.desktopDiv = desktopDiv

    }

}
