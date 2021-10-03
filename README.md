# JFrame

> If you encounter a problem [join the discord and go to the support](https://discord.gg/8BnPPR89MG).

## Table of contents
* [Description](#description)
* [Setup](#setup)

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
## DOCUMENTATION

#### Window Settings:
* **Option** :

    **Name**|**Value**|**Utility**
    -----|-----|-----
    title|string|Name of the window
    src|string : link / local path|Source of the window content
    frame|boolean|Remove the edge of the window
    height|int|Height of the window
    minHeight|int|Minimum height of the window
    maxHeight|int|Maximum height of the window
    width|int|Width of the window
    minWidth|int|Minimum width of the window
    maxWidth|int|Maximum width of the window


#### Exemple:

```
new WindowJS({
	title: "Wikipédia",
	height: 700,
	width: 900,
	src: "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal"
})
```
#### Create Windows:
```
const Windows = new JFrame({option})
```
