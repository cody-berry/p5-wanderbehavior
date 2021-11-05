
class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.r = 5 // radius
    }

    show() {
        noStroke()
        circle(this.pos.x, this.pos.y, this.r*2)
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

    edges() {
        // x's

        if (this.pos.x + this.r > width) { // right
            this.pos.x = this.r // we want to wrap around
        }
        if (this.pos.x - this.r < 0) { // left
            this.pos.x = width - this.r
        }

        // y's

        if (this.pos.y + this.r > height) { // bottom (positive y's are
            // downward)
            this.pos.y = this.r
        }
        if (this.pos.y - this.r < 0) { // top
            this.pos.y = height - this.r
        }
    }
}


