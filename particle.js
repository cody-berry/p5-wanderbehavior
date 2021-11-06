
class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.r = 5 // radius
        this.maxForce = 0.01 // our maximum force
        this.maxSpeed = 5 // our maximum speed

        this.wanderAngle = 0 // this is the meaning of our point on our circle.

        // what is our path?
        // we need a current path because what happens if we warp to the
        // other edge?
        this.currentPath = []
        this.path = [this.currentPath]
    }

    show() {
        noStroke()
        fill(0, 0, 100)
        circle(this.pos.x, this.pos.y, this.r*2)

        // we can draw our path!
        noFill()
        stroke(0, 0, 100, 20)
        strokeWeight(2)
        for (let path of this.path) {

            beginShape()
            for (let v of path) {
                vertex(v.x, v.y)
            }
            endShape()
        }
    }

    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.maxSpeed) // we don't want our vehicle to go too fast
        // because then our vehicle would eventually have an infinite position
        this.pos.add(this.vel)
        this.acc.setMag(0)
        // we should append not our actual position, but a copy of it.
        this.currentPath.push(this.pos.copy())

    }

    applyForce(f) {
        // F = ma. This particle should be much lighter than 1 unit, but for
        // the sake of programming, m = 1, so a = F.
        this.acc.add(f)
    }

    edges() {

        // did we hit an edge? ...
        let hitEdge = false
        // x's

        if (this.pos.x + this.r > width) { // right
            this.pos.x = this.r // we want to wrap around
            // in any of these, we should set hitEdge to true. Here...
            hitEdge = true
        }
        if (this.pos.x - this.r < 0) { // left
            this.pos.x = width - this.r
            // ...here...
            hitEdge = true
        }

        // y's

        if (this.pos.y + this.r > height) { // bottom (positive y's are
            // downward)
            this.pos.y = this.r
            // ...here...
            hitEdge = true
        }
        if (this.pos.y - this.r < 0) { // top
            this.pos.y = height - this.r
            // ...and here...
            hitEdge = true
        }
        // ...and if so...
        if (hitEdge) {
            // ...we should reset our path...
            this.currentPath = []
            // ...and add it.
            this.path.push(this.currentPath)
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
        strokeWeight(2)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        noFill()
        circle(wanderPoint.x, wanderPoint.y, wanderRadius*2)

        // now that we have our wander circle, we can compute a random point
        // on our circle based on this.wanderAngle!
        // we need to find the offset between our current wander point and
        // the point that we're applying our steering force to.
        let x = wanderRadius*cos(this.wanderAngle)
        let y = wanderRadius*sin(this.wanderAngle)
        // and now we can add the existing PVector(x, y) to our wander point.
        wanderPoint.add(new p5.Vector(x, y))
        // we can also draw a point there.
        stroke(map(this.wanderAngle, 0, 2*PI, 0, 360)%360, 50, 100)
        strokeWeight(10)
        point(wanderPoint.x, wanderPoint.y)

        // we can also draw a line between ourselves to our wander point.
        strokeWeight(5)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)

        // we also need to add a random bit to this.wanderAngle.
        this.wanderAngle += random(-0.1, 0.1)

        return p5.Vector.sub(wanderPoint, this.pos).limit(this.maxForce)
    }

}


