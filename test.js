 var canvas = document.getElementById('test');
 ctxTest = canvas.getContext('2d');

 canvas.width = 900;
 canvas.height = 900;
 var step = 40;
 ctxTest.fillStyle = 'black';
 ctxTest.fillRect(0, 0, 900, 900)
 ctxTest.lineWidth = 30;
 ctxTest.strokeStyle = 'white';
 ctxTest.beginPath();
 ctxTest.moveTo(30, 30);
 ctxTest.lineTo(30, 30 + step);
 ctxTest.lineTo(30 + step, 30 + step);
 ctxTest.lineTo(30 + step * 2, 30 + step);
 ctxTest.lineTo(30 + step * 2, 30 + step * 2);
 ctxTest.lineTo(30 + step, 30 + step * 2);
 ctxTest.lineTo(30, 30 + step * 2);
 ctxTest.lineTo(30, 30 + step * 3);
 ctxTest.lineTo(30 + step, 30 + step * 3);

 ctxTest.stroke();
