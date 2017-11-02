# NodeJS-Starter-Kit
_Made by Luciano Nooijen_
Version 1.0.0 (still in development)

Status: [![Build Status](https://travis-ci.org/lucianonooijen/NodeJS-Starter-Kit.svg?branch=master)](https://travis-ci.org/lucianonooijen/NodeJS-Starter-Kit)

## Why this starter kit?
I created this starter kit for all of my NodeJS projects to save time on setting everything up. Because of this the workflow can be different from what you're used to, for example, I like to use CodeKit for small projects instead of Gulp or similar tools. You can of course change the the complete workflow to suit your needs. This is also the reason why I chose ejs and not pug for example. If you are looking for a custom boiler plate with Angular or React of some sort, of a more complete starter kit, check out [Mega Boiler Plate](http://megaboilerplate.com/), it's great!

## Installation
This starter kid requires [Node.js](https://nodejs.org/) to run (duh).
```sh
$ npm install
```
```sh
$ npm nodemon
```

## Useful notes
Just a handful of useful notes I would recommend using when you work with this starter kit.
* Don't add any files into the ./public folder. Always put them in the ./src folder. All images and such will be copied so don't worry. (And otherwise you can always change the gulpfile.js to include the stuff you added if it's not there yet)

## Features I am still working on (kind of a to do list for myself too)
* A form that you can use
* Better styling, some more elements
* I might add some more pages, like about us, services, contact, etc.
* True MVC structure, not just the views
* Maybe a login feature, although I am not sure yet about that
* Some sort of backend panel would be nice with a couple of options
* Mongoose integration
* I might add a blog function to the starter kit
* Integration of Angular (so it is kind of a MEAN stack starter kit)
* Gulp environments

## Contributors
[lucianonooijen](https://github.com/lucianonooijen/)

## Licence
MIT - so use it whenever, whereever and however you want it :)
