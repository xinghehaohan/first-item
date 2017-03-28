/**
 * Created by su on 17/3/28.
 */
class Circle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = Math.random()*14+1;
        this._mx = Math.random()*2-1;
        this._my = Math.random()*2-1
    }
    drawCircle(ctx){
        ctx.beginPath();
        // arc(x, y, radius, startAngle, 开始, 结束)
        ctx.arc(this.x,this.y,this.r,0,360);
        ctx.closePath();
        ctx.fillStyle='rgba(204, 204, 204, 0.2)';
        // 当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。
        ctx.fill();
    }
    drawLine(ctx,_cirle){
        // 画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
        let dx = this.x - _cirle.x;
        let dy = this.y - _cirle.y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if(d<150){
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(_cirle.x,_cirle.y);
            ctx.closePath();
            ctx.strokeStyle='rgba(204, 204, 204, 0.1)';
            ctx.stroke();
        }
    }

    move(w,h){
        this._mx= (this.x < w && this.x >0) ? this._mx:( - this._mx);
        this._my = ( this.y <h && this.y >0) ? this._my: ( - this._my);
        this.x += this._mx;
        this.y += this._my;

    }
}

class currentCircle extends Circle {
    // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
    constructor(x,y){
        super(x,y);
    }
    drawCircle(ctx){
        ctx.beginPath();
        this.r = (this.r <14 && this.r>1)? this.r+(Math.random()*2-1):2;
        ctx.arc(this.x,this.y,this.r,0,360);
        ctx.closePath();
        ctx.fillStyle='rgba(45, 120, 244, ' + (parseInt(Math.random()*100)/100) + ')';
        ctx.fill();
    }
}



window.requestAnimationFrame = window.requestAnimationFrame ||window.mozRequestAnimationFrame ||window.webkitRequestAnimationFrame ||window.msRequestAnimationFrame;
let canvans = document.getElementById('canvas');
let ctx = canvans.getContext('2d');
let w = canvans.width = canvans.offsetWidth;
let h = canvans.height = canvans.offsetHeight;
let circles = [];
let current_circle  = new currentCircle(0, 0);

let draw = function () {
    // clearRect(x, y, width, height),清除指定矩形区域，让清除部分完全透明。
    ctx.clearRect(0,0,w,h);
    for(let i=0 ;i<circles.length;i++){
        circles[i].move(w,h);
        circles[i].drawCircle(ctx);
        for(j=i+1; j<circles.length; j++){
            circles[i].drawLine(ctx,circles[j])
        }
    }
    if(current_circle.x){
        currentCircle.drawCircle(ctx);
        for(let k=1 ;k<circles.length; circles++){
            currentCircle.drawLine(ctx,circles[k])
        }
    }
    requestAnimationFrame(draw);
};

let init = function (num) {
    for(var i=0; i<num ;i++){
        circles.push(new Circle(Math.random()*w,Math.random()*h))
    }
    draw();
};

window.addEventListener('load',init(80));
window.onmouseove = function (e) {
    e= e ||window.event;
    currentCircle.x = e.clientX;
    currentCircle.y = e.clientY;
};
window.onmouseout = function () {
    currentCircle.x = null;
    currentCircle.y = null;
};