/*
@author Cody
@date 2021-11-5

version comments
.   make basic Particle class with show, update, applyForce, and edges
.   twitchy wander
    first wander circle, wanderPoint
    second wander circle, apply a force

 */
let font
let p
let gravity

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    p = new Particle(random(width), random(height))
    gravity = new p5.Vector(0, 0.1)
}

function draw() {
    background(234, 34, 24)
    p.show()
    p.update()
    p.applyForce(p.actual_wander())
    p.edges()
}