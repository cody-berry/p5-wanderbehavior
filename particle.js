
class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.r = 5 // radius
        this.maxForce = 0.01 // our maximum force
        this.maxSpeed = 15 // our maximum speed
    }

    show() {
        noStroke()
        fill(0, 0, 100)
        circle(this.pos.x, this.pos.y, this.r*2)
    }

    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed) // we don't want our vehicle to go too fast
        // because then our vehicle would eventually have an infinite position
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

    // makes us wander around the room. This wander is deprecated because it
    // gives a twitchy wander, which we don't want.
    // wander() {
    //     let force = p5.Vector.random2D()
    //     return force.limit(this.maxForce)
    // }
    
    // makes us actually wander all over the room
    actual_wander() {
        // what is our wander point?
        let wanderDistance = 100
        let wanderRadius = 50
        let wanderPoint = this.vel
        wanderPoint.setMag(wanderDistance)
        wanderPoint.add(this.pos)

        // yay! Just for testing, we can draw a line between ourselves and
        // our wander point.
        stroke(0, 0, 100)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        noFill()
        circle(wanderPoint.x, wanderPoint.y, wanderRadius)

        return p5.Vector.sub(wanderPoint, this.pos).limit(this.maxForce)
    }

}


