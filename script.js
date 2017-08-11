var canvas = document.getElementById('canvas');

window.onload = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx = canvas.getContext('2d');

    var stars = [];

    init();

    setInterval(function() {
        update();
        draw();
    }, 1000 / 30);

    function init() {
        for(var i = 0; i < 1000; i++) {
            stars.push(generateStar());
        }
    }

    function generateStar() {
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var star = {
            x: getRandomInt(centerX - 30, centerX + 30),
            y: getRandomInt(centerY - 30, centerY + 30),
            colorCode: getRandomInt(0, 255)
        };
        star.fillStyle = generateColor(star.colorCode);

        if (star.x - (canvas.width / 2) > 0) {
            star.dx = getRandomInt(1, 3);
        }
        if (star.x - (canvas.width / 2) < 0) {
            star.dx = getRandomInt(-3, 1);
        }
        if (star.y - (canvas.height / 2) > 0) {
            star.dy = getRandomInt(1, 3);
        }
        if (star.y - (canvas.height / 2) < 0) {
            star.dy = getRandomInt(-3, 1);
        }

        return star;
    };

    function generateColor(colorCode) {
        return 'rgb(' + colorCode + ',' + colorCode + ',' + colorCode + ')';
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.random() * (max - min +1)) + min;
    }

    function update() {
        stars = stars.map(function(star) {
            if (star.x > canvas.width) {
                return generateStar();
            }
            if (star.x < 0) {
                return generateStar();
            }
            if (star.y > canvas.height) {
                return generateStar();
            }
            if (star.y < 0) {
                return generateStar();
            }
            return star;
        });

        stars.forEach(function(star) {
            star.x += star.dx;
            star.y += star.dy;
            star.dx = star.dx * 1.04;
            star.dy = star.dy * 1.04;
            star.fillStyle = generateColor(star.colorCode);
        });

    }

    function draw() {
        clear();
        stars.forEach(function(star) {
            drawStar(star);
        });
    }
    function clear() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawStar(star) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3,0, 2 * Math.PI);
        ctx.restore();

        ctx.fillStyle = 'white';
        ctx.fill();
    }
};

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
