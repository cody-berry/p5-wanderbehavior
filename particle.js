
class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(1, -1)
        this.acc = new p5.Vector(0, 0)
        this.sheet = loadImage("spaceship-48x48.png")
        this.maxForce = 0.1 // our maximum force
        this.maxSpeed = 2 // our maximum speed
        this.r = 5 // even though sheets don't have a radius, we still have
        // a radius because we can be a ball or our sprite.

        this.wanderAngle = 0 // this is the meaning of our point on our circle.

        // what is our path?
        // we need a current path because what happens if we warp to the
        // other edge?
        this.currentPath = []
        this.path = [this.currentPath]
    }

    show_spaceship() {
        // instead of drawing circles, we should draw our spaceship. Wee!!
        // noStroke()
        // fill(0, 0, 100)
        // circle(this.pos.x, this.pos.y, this.r*2)
        imageMode(CENTER)
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading() + PI/2)
        image(this.sheet, 0, 0)
        noFill()
        stroke(0, 0, 100)
        rectMode(CENTER)
        strokeWeight(0.1)
        rect(0, 0, 48, 48)
        pop()
    }

    show_ball() {
        circle(this.pos.x, this.pos.y, this.r)
    }

    show_path() {
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


    kiwi_wander() {
        let wanderPoint = this.vel.copy()
        const WANDER_DISTANCE = 100
        const WANDER_RADIUS = 50
        // we set the magnitude before we add the position!
        wanderPoint.setMag(WANDER_DISTANCE)
        wanderPoint.add(this.pos)

        strokeWeight(1)
        stroke(0, 0, 100, 40)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)
        // this.arrowLine(this.pos, wanderPoint)

        // area of wanderPoint circle
        noFill()
        stroke(0, 0, 100, 40)
        circle(wanderPoint.x, wanderPoint.y, WANDER_RADIUS*2)

        // point at center of wander circle
        stroke(200, 100, 100) // blue
        strokeWeight(3)
        point(wanderPoint.x, wanderPoint.y)

        // have our wanderPoint be somewhere on the circle
        let totalAngle = this.vel.heading() + this.wanderAngle
        let x = WANDER_RADIUS*cos(totalAngle)
        let y = WANDER_RADIUS*sin(totalAngle)

        // line between blue point (center of wander circle) and green point
        // point along wander circumference
        strokeWeight(1)
        stroke(0, 0, 100, 40)
        line(wanderPoint.x, wanderPoint.y, wanderPoint.x+x, wanderPoint.y+y)
        // this.arrowLine(wanderPoint, new p5.Vector(
        //     wanderPoint.x+x, wanderPoint.y+y))


        wanderPoint.add(new p5.Vector(x, y))

        strokeWeight(3)
        stroke(90, 100, 100) // green
        point(wanderPoint.x, wanderPoint.y)

        // another line from our center to the wanderPoint, now offset by angle
        strokeWeight(1)
        stroke(0, 0, 100, 40)
        line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y)
        // this.arrowLine(this.pos, wanderPoint)

        // a circle showing the range
        circle(wanderPoint.x, wanderPoint.y, WANDER_RADIUS)

        // position vector from our center to the wanderPoint
        let steeringForce = wanderPoint.sub(this.pos)
        steeringForce.setMag(this.maxForce)
        this.applyForce(steeringForce)

        this.wanderAngle += random(-1, 1)*0.5
    }

    edges() {

        // did we hit an edge? ...
        let hitEdge = false
        // x's

        let r = 24 // the airplane is 48x48. We're in ImageMode Center right
        // now.

        if (this.pos.x + this.r > width) { // right
            this.pos.x = this.r // we want to wrap around
            // in any of these, we should set hitEdge to true. Here...
            hitEdge = true
            console.log(this.pos.x)
        }
        else if (this.pos.x - this.r < 0) { // left
            this.pos.x = width - this.r
            // ...here...
            hitEdge = true
            console.log(this.pos.x)
        }

        // y's

        else if (this.pos.y + this.r > height) { // bottom (positive y's are
            // downward)
            this.pos.y = this.r
            // ...here...
            hitEdge = true
            console.log(this.pos.y)
        }
        else if (this.pos.y - this.r < 0) { // top
            this.pos.y = height - this.r
            // ...and here...
            hitEdge = true
            console.log(this.pos.y)
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
    deprecated_wander() {
        let force = p5.Vector.random2D()
        return force.limit(this.maxForce)
    }

    // makes us actually wander all over the room
    wander() {
        // what is our wander point?
        let wanderDistance = 100
        let wanderRadius = 50
        let wanderPoint = this.vel.copy()
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
        let x = wanderRadius*cos(this.wanderAngle+this.vel.heading())
        let y = wanderRadius*sin(this.wanderAngle+this.vel.heading())
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
        this.wanderAngle += random(-0.3, 0.3)

        return p5.Vector.sub(wanderPoint, this.pos).limit(this.maxForce)
    }

}


