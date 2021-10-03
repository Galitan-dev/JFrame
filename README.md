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
To use this library download the jframe.js files and place it into your project

Code exemple :

```
<script src="jframe.js"></script>

<script>
    const Windows = new WindowJS({
        title: "New Frame",
        height: 700,
        width: 900,
        src: "file.html / url",
	frame: true
    })
</script>
```
## DOCUMENTATION

#### Window Settings:
* **Option** :

    **Name**|**Value**|**Utility**
    -----|-----|-----
    title|string|Name of the window
    src|string : link / local path|source of the window content
    frame|boolean|remove the edge of the window
    height|int|height of the window
    minHeight|int|minimum width of the window
    maxHeight|int|maximum width of the window
    width|int|width of the window
    minWidth|int|minimum width of the window
    maxWidth|int|maximum width of the window


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
