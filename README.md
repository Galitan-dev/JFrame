# JFrame

> If you encounter a problem [join the discord and go to the support](https://discord.gg/8BnPPR89MG).

## Table of contents
* [Description](#description)
* [Setup](#setup)
* [Tutorial](#tutorial)
* [Documentation](#documentation)
* [CSS](#css)

## Description
This project is a library that allows you to create simple and beautiful windows in a website.

![image](https://user-images.githubusercontent.com/46485459/135723707-ac0c8fe9-fbe7-4d3d-a2b7-85d5a6378e6c.png)
	
## Setup
### Local library :

Download the jframe.js file and place it in your project.

```
<script src="jframe.js"></script>
```

### Distant library

Link the file hosted on github.

```
<script src="https://raw.githubusercontent.com/ZirconWare/JFrame/main/jframe.js"></script>
```
## Tutorial

#### Simple Window:

```
new JFrame({
	title: "Wikipédia",
	height: 700,
	width: 900,
	src: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal"
})
```
#### Simple Taskbar:

```
new Taskbar({
    position: 1,
    height: 40
})
```
#### Create Window:
```
const window = new JFrame({option})
```
#### Create Taskbar
```
const taskbar = new Taskbar({option})
```

## Documentation

* **Window Settings** :

    **Name**|**Value**|**Utility**
    -----|-----|-----
    title|string|Name of the window
    src|string : link / local path|Source of the content
    frame|boolean|Remove the edge
    height|int|Height
    minHeight|int|Minimum heigh
    maxHeight|int|Maximum height
    width|int|Width
    minWidth|int|Minimum width
    maxWidth|int|Maximum width
    

* **Window Function** :

    **Name**|**Value**|**Utility**
    -----|-----|-----
    new JFrame().setMaximise()|null|Maximise
    new JFrame().setUnMaximise()|null|Unmaximise
    new JFrame().setPos(int, int)|int|Set the window pos
    new JFrame().Titlebar.setBackgroundColor(string)|String / Hex|Change background color
    new JFrame().Titlebar.setTitle(string)|string|title
    new JFrame().Page.setSrc(string)|string : link / local path|Source of the content
    
* **Window instance** :

    **Name**|**Value**|**Return**|**Utility**
    -----|-----|-----|------
    JFrame.getAll()|null|Array|Get a list of all window instances
    JFrame.get(int)|int|Jframe object|Get the object of a certain window
    
* **Taskbar instance** :

    **Name**|**Value**|**Return**|**Utility**
    -----|-----|-----|------
    TaskbarItem.getAll()|null|Array|Get a list of all taskbar item instances
    TaskbarItem.get(int)|int|TaskbarItem object|Get the object of a certain taskbar item
## CSS

* **Windows** :

    **Name**|**Selector**|**Type**
    -----|-----|-----
    All Windows|windows|class
    One Windows|windows + id|id
    Titlebar|windows selector > header|class > class
    Page|windows selector > page|id > class
    Titlebar Title Div|windows selector > page > title|class > class > class
    Titlebar Reduce Div|windows selector > page > reduce|class > class > class
    Titlebar Maximise Div|windows selector > page > maximise|class > class > class
    Titlebar Reduce Div|windows selector > page > close|class > class > class
    Titlebar Title Text|windows selector > page > close > p|class > class > class > HTMLElement
    Titlebar Reduce Button|windows selector > page > close > p|class > class > class > HTMLElement
    Titlebar Maximise Button|windows selector > page > close > p|class > class > class > HTMLElement
    Titlebar Close Button|windows selector > page > close > p|class > class > class > HTMLElement
    
* **Taskbar** :

    **Name**|**Selector**|**Type**
    -----|-----|-----
    Taskbar|taskbar|class
    Taskbar List|taskbar > ul|class > HTMLElement
    Taskbar Item|taskbar > ul > window_item|class > HTMLElement > class

