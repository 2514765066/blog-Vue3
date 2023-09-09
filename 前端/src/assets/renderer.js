class Draw {
	constructor(data) {
		this.$container = data.el;
		this.bg = data.bg;
		this.$canvas = document.createElement("canvas");
		this.$container.appendChild(this.$canvas);
		this.context = this.$canvas.getContext("2d");
		this.setup();
		this.render();
	}
	POINT_INTERVAL = 4; //水面点之间的间隔
	FISH_COUNT = 4; //小鱼的数量
	MAX_INTERVAL_COUNT = 50; //水面波动的最大间隔次数
	INIT_HEIGHT_RATE = 0.4; //水面高度占画布高度的比例
	THRESHOLD = 50; //水面波动的阈值
	bg; //颜色

	setup() {
		this.points = [];
		this.fishes = [];
		this.watchIds = [];
		this.render = this.render.bind(this);
		this.width = this.$container.offsetWidth;
		this.height = this.$container.offsetHeight;
		this.$canvas.width = this.width;
		this.$canvas.height = this.height;

		this.fishes.push(new FISH(this));
		this.createSurfacePoints();
	}
	//创建点
	createSurfacePoints() {
		const count = Math.round(this.width / this.POINT_INTERVAL);
		this.pointInterval = this.width / (count - 1);
		this.points.push(new SURFACE_POINT(this, 0));

		for (let i = 1; i < count; i++) {
			const point = new SURFACE_POINT(this, i * this.pointInterval);
			const previous = this.points[i - 1];

			point.setPreviousPoint(previous);
			previous.setNextPoint(point);
			this.points.push(point);
		}
	}
	generateEpicenter(x, y, velocity) {
		if (y < this.height / 2 - this.THRESHOLD || y > this.height / 2 + this.THRESHOLD) return;

		const index = Math.round(x / this.pointInterval);

		if (index < 0 || index >= this.points.length) return;

		this.points[index].interfere(y, velocity);
	}
	controlStatus() {
		//这里必须分开写
		this.points.forEach(item => {
			item.updateSelf();
		});
		this.points.forEach(item => {
			item.updateNeighbors();
		});

		if (this.fishes.length >= this.FISH_COUNT) return;

		if (--this.MAX_INTERVAL_COUNT == 0) {
			this.fishes.push(new FISH(this));
		}
	}
	render() {
		requestAnimationFrame(this.render);
		this.controlStatus();
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = this.bg;

		this.fishes.forEach(item => {
			item.render(this.context);
		});

		this.context.save();
		this.context.globalCompositeOperation = "xor";
		this.context.beginPath();
		this.context.moveTo(0, this.reverse ? 0 : this.height);

		this.points.forEach(item => {
			item.render(this.context);
		});

		this.context.lineTo(this.width, this.reverse ? 0 : this.height);
		this.context.closePath();
		this.context.fill();
		this.context.restore();
	}
}
class SURFACE_POINT {
	constructor(renderer, x) {
		this.renderer = renderer;
		this.x = x;

		this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
		this.height = this.initHeight;
		this.fy = 0;
		this.force = { previous: 0, next: 0 };
	}
	SPRING_CONSTANT = 0.03;
	SPRING_FRICTION = 0.9;
	WAVE_SPREAD = 0.3;
	ACCELARATION_RATE = 0.01;

	setPreviousPoint(previous) {
		this.previous = previous;
	}
	setNextPoint(next) {
		this.next = next;
	}
	interfere(y, velocity) {
		this.fy = this.renderer.height * this.ACCELARATION_RATE * (this.renderer.height - this.height - y >= 0 ? -1 : 1) * Math.abs(velocity);
	}
	updateSelf() {
		this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height);
		this.fy *= this.SPRING_FRICTION;
		this.height += this.fy;
	}
	updateNeighbors() {
		if (this.previous) {
			this.force.previous = this.WAVE_SPREAD * (this.height - this.previous.height);
		}
		if (this.next) {
			this.force.next = this.WAVE_SPREAD * (this.height - this.next.height);
		}
	}
	render(context) {
		if (this.previous) {
			this.previous.height += this.force.previous;
			this.previous.fy += this.force.previous;
		}
		if (this.next) {
			this.next.height += this.force.next;
			this.next.fy += this.force.next;
		}
		context.lineTo(this.x, this.renderer.height - this.height);
	}
}
class FISH {
	constructor(renderer) {
		this.renderer = renderer;
		this.init();
	}
	GRAVITY = 0.4;

	init() {
		this.direction = Math.random() < 0.5;
		this.x = this.direction ? this.renderer.width + this.renderer.THRESHOLD : -this.renderer.THRESHOLD;
		this.previousY = this.y;
		this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1);

		if (this.renderer.reverse) {
			this.y = this.getRandomValue((this.renderer.height * 1) / 10, (this.renderer.height * 4) / 10);
			this.vy = this.getRandomValue(2, 5);
			this.ay = this.getRandomValue(0.05, 0.2);
		} else {
			this.y = this.getRandomValue((this.renderer.height * 6) / 10, (this.renderer.height * 9) / 10);
			this.vy = this.getRandomValue(-5, -2);
			this.ay = this.getRandomValue(-0.2, -0.05);
		}

		this.isOut = false;
		this.theta = 0;
		this.phi = 0;
	}
	getRandomValue(min, max) {
		return min + (max - min) * Math.random();
	}
	controlStatus() {
		this.previousY = this.y;
		this.x += this.vx;
		this.y += this.vy;
		this.vy += this.ay;

		if (this.renderer.reverse) {
			if (this.y > this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
				this.vy -= this.GRAVITY;
				this.isOut = true;
			} else {
				if (this.isOut) {
					this.ay = this.getRandomValue(0.05, 0.2);
				}
				this.isOut = false;
			}
		} else {
			if (this.y < this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
				this.vy += this.GRAVITY;
				this.isOut = true;
			} else {
				if (this.isOut) {
					this.ay = this.getRandomValue(-0.2, -0.05);
				}
				this.isOut = false;
			}
		}
		if (!this.isOut) {
			this.theta += Math.PI / 20;
			this.theta %= Math.PI * 2;
			this.phi += Math.PI / 30;
			this.phi %= Math.PI * 2;
		}
		this.renderer.generateEpicenter(this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD, this.y, this.y - this.previousY);

		if ((this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD) || (this.vx < 0 && this.x < -this.renderer.THRESHOLD)) {
			this.init();
		}
	}
	render(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(Math.PI + Math.atan2(this.vy, this.vx));
		context.scale(1, this.direction ? 1 : -1);
		context.beginPath();
		context.moveTo(-30, 0);
		context.bezierCurveTo(-20, 15, 15, 10, 40, 0);
		context.bezierCurveTo(15, -10, -20, -15, -30, 0);
		context.fill();

		context.save();
		context.translate(40, 0);
		context.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
		context.beginPath();
		context.moveTo(0, 0);
		context.quadraticCurveTo(5, 10, 20, 8);
		context.quadraticCurveTo(12, 5, 10, 0);
		context.quadraticCurveTo(12, -5, 20, -8);
		context.quadraticCurveTo(5, -10, 0, 0);
		context.fill();
		context.restore();

		context.save();
		context.translate(-3, 0);
		context.rotate((Math.PI / 3 + (Math.PI / 10) * Math.sin(this.phi)) * (this.renderer.reverse ? -1 : 1));

		context.beginPath();

		if (this.renderer.reverse) {
			context.moveTo(5, 0);
			context.bezierCurveTo(10, 10, 10, 30, 0, 40);
			context.bezierCurveTo(-12, 25, -8, 10, 0, 0);
		} else {
			context.moveTo(-5, 0);
			context.bezierCurveTo(-10, -10, -10, -30, 0, -40);
			context.bezierCurveTo(12, -25, 8, -10, 0, 0);
		}
		context.closePath();
		context.fill();
		context.restore();
		context.restore();
		this.controlStatus(context);
	}
}

export default Draw;
