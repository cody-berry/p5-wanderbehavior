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
let particles
let p
let gravity

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    particles = []
    // for (let i = 0; i < 100; i++) {
    //     let p = new Particle(random(width), random(height))
    //     particles.push(p)
    // }
    p = new Particle(width/2, height/2)
    gravity = new p5.Vector(0, 0.1)
    // frameRate(10)
}

function draw() {
    background(234, 34, 24)
    // for (let p of particles) {
    //     p.update()
    //     p.show_ball()
    //     p.applyForce(p.wander())
    //     p.edges()
    // }
    p.update()
    p.show_ball()
    p.show_path()
    p.applyForce(p.wander())
    // p.kiwi_wander()
    p.edges()
}