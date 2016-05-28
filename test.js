 var canvas = document.getElementById('test');
 ctxTest = canvas.getContext('2d');

 canvas.width = 900;
 canvas.height = 900;
 var step = 40;
 ctxTest.fillStyle = 'black';
 ctxTest.fillRect(0, 0, 900, 900)
 ctxTest.lineWidth = 4;
 ctxTest.strokeStyle = 'white';
 ctxTest.beginPath();
 ctxTest.moveTo(0, 0);
 ctxTest.lineTo(6, 0);
 ctxTest.lineTo(12, 0);
 ctxTest.lineTo(18, 0);
 ctxTest.lineTo(18, 6);
 ctxTest.lineTo(12, 6);
 ctxTest.lineTo(6, 6);
 ctxTest.lineTo(0, 6);
 ctxTest.lineTo(0, 12);
 // 0,0,6,0,12,0,18,0,18,6,12,6,6,6,0,6,0,12,6,12,12,12,18,12,18,18,12,18,6,18,0,18
 ctxTest.stroke();
