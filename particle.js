
class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.r = 5 // radius
    }

    show() {
        noStroke()
        circle(this.pos.x, this.pos.y, this.r)
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.setMag(0)
    }

    applyForce(f) {
        // F = ma. This particle should be much lighter than 1 unit, but for
        // the sake of programming, m = 1, so a = F.
        this.acc.add(f)
    }
}


