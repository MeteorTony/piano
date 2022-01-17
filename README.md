# Piano

A piano keyboard with recorder available (please check remarks at the bottom). 

[Have a try here!](https://meteortony.github.io/piano/)

<img src="https://user-images.githubusercontent.com/61377153/149753717-12fd2c2c-d933-486c-a65f-af092eab29f6.png" alt="Preview" style="width:750px"/>

## How to play

2 ways to play the piano: click or press computer keys

Here is the correspondance of computer keys to piano keys:

<img src="https://user-images.githubusercontent.com/61377153/149757888-f3efd8c4-3795-4d88-9462-78fba6381776.png" alt="computer keys to piano keys" style="width:750px"/>

It is recommended to play by <b>pressing keys</b>, as the piano pedal can only work under this scenario.


## Installation

To run this page on your local machine, the required dependencies should be installed using following commands.

First command:

```
npm i express ejs mongoose
```

Second command:

```
npm i --save-dev nodemon
```
Make sure this is added to package.json (inside "scripts"):

```
"devStart": "nodemon server.js"
```

Then use this to run the web server:

```
npm run devStart
```

## Remarks

1. The recorded song currently cannot be downloaded.

2. Note that only static pages are supported by GitHub pages, so the <b> recorder feature is not available online </b>, please try it locally.
