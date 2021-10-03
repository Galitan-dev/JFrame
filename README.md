# JFrame

> If you encounter a problem [join the discord and go to the support](https://discord.gg/8BnPPR89MG).

## Table of contents
* [Description](#description)
* [Setup](#setup)
* [Tutorial](#tutorial)
* [Documentation](#documentation)

## Description
This project is a library that allows you to create simple and beautiful windows in a website.
It's developed only in Javascript.

![image](https://user-images.githubusercontent.com/46485459/135723707-ac0c8fe9-fbe7-4d3d-a2b7-85d5a6378e6c.png)
	
## Setup
### Local library :

Download the jframe.js file and place it in your project.

```
<script src="jframe.js"></script>
```

### Distant library

Link the jframe.js file hosted on github.

```
<script src="https://github.com/ZirconWare/JFrame/releases/download/{|| VERSION ||}/jframe.js"></script>
<script src="https://github.com/ZirconWare/JFrame/releases/download/v0.3-alpha/jframe.js"></script>
```
## Tutorial

#### Simple Window:

```
new WindowJS({
	title: "Wikipédia",
	height: 700,
	width: 900,
	src: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal"
})
```
#### Create Window:
```
const Windows = new JFrame({option})
```

## DOCUMENTATION

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
