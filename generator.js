// x(t+1) = ((2^17 + 3) * x(t)) % 2^35
// x(0) = 1
// t = 0,1,2....

function xt_generator(length)
{
	var x = [];
	x[0] = 1;

	for (var i = 0; i < length - 1; i++) {
		x[i + 1] = ((2**17 + 3) * x[i]) % 2**35;
	}
	return x;
}

function start()
{
	const length = parseInt(document.getElementById('length').value|0);
	xt_arr = xt_generator(length);
	console.log(xt_arr);

	const test_number = parseInt(document.getElementById('test_number').value);
	var test2 = document.getElementById('test2').style.display = 'none';

	switch(test_number) {
		case 1:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_one(xt_arr);
			break;
		case 2:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_two(xt_arr);
			break;
		case 31:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_three_1(xt_arr);
			break;
		case 32:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_three_2(xt_arr);
			break;
		case 33:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_three_3(xt_arr);
			break;
		case 4:
			ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);			//clear canvas
			test_four(xt_arr);
			break;
		default:
			alert('Error');
	}
}