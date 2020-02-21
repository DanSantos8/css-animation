let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
//c.fillRect(x, y, width, height);
/*c.fillRect(100, 100, 100, 100);
c.fillRect(400, 300, 100, 100);
c.fillRect(700, 200, 100, 100);*/

//line

/*c.beginPath();
c.moveTo(150, 50);
c.lineTo(50, 500);
c.lineTo(150, 200);
c.strokeStyle = 'blue';
c.stroke();*/

//arc/circle

//c.arc(x:int, y:int, r: int, startAngle: float, endAngle: float, drawCounterClockWise: bool (false));

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 35;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fill();
    }

    this.update = function () {
        if ( this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }

        if ( this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        if (mouse.x < this.x + 50 && mouse.x - this.x > -50 && mouse.y < this.y + 50 && mouse.y - this.y > -50 && this.radius < maxRadius){
            this.radius +=1;
        } else {
            if (this.radius > 4){
                this.radius -= 1;
            }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}
let circleArray = [];
for (let  i = 0; i < 100; i++){
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() * 3 - 0.8;
    let dy = Math.random() * 3 - 0.8;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for ( let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}
animate();