function test_one(output_array)
{
	output_array.sort();									//предварительная сортировка
	//считаем кол-во повторений каждого числа в массиве
	var result = {};
	for (var i = 0; i < output_array.length; ++i)
	{
	    var a = output_array[i];
	    if (result[a] != undefined)
	        ++result[a];
	    else
	        result[a] = 1;
	}
	drawTest(result, 1);
	return result;
}

function test_two(output_array)
{
	var result = [];

	for (var i = 0; i < output_array.length; i++) {
		console.log(output_array[i] +", " + output_array[i + 1]);
		result[i] = output_array[i] + ", " + output_array[i + 1];				//заполню массив парами, потом колхоз: скопирую с консоли эти пары и в экселе точечный график нарисую)
		// ctx.fillRect(output_array[i], output_array[i + 1], 1,1);				//отрисовка точек(закомител, потому что точки рисует за пределами видимости - очень большие значения)
	}
	// console.log(result);
	var test2 = document.getElementById('test2');								//далее просто покажем скрин из excel)))
	test2.style.display = 'block';
}

function test_three(output_array)
{
	var binary_str = '';
	for (var i = 0; i < output_array.length; i++) {
		binary_str += output_array[i].toString(2);								//переводим всю последовательность в бинарный вид и записываем все в строку
	}
	return binary_str;
}

function test_three_1(output_array)
{
	var binary_str = test_three(output_array);

	var count_zero = binary_str.split(/[0]/).length - 1;						//считаем в бинарной последовательности кол-во 0
	var count_one = binary_str.split(/[1]/).length - 1;							//считаем в бинарной последовательности кол-во 1

	console.log('0 - ' + count_zero);
	console.log('1 - ' + count_one);

	var result = [count_zero, count_one];
	drawTest(result, 10000);
}

function test_three_2(output_array)
{
	var binary_str = test_three(output_array);

	var count_zero_zero = binary_str.split(/[00]/).length - 1;				//считаем в бинарной последовательности кол-во пар 00
	var count_zero_one = binary_str.split(/[01]/).length - 1;
	var count_one_zero = binary_str.split(/[10]/).length - 1;
	var count_one_one = binary_str.split(/[11]/).length - 1;

	console.log('00 - ' + count_zero_zero);
	console.log('01 - ' + count_zero_one);
	console.log('10 - ' + count_one_zero);
	console.log('11 - ' + count_one_one);

	var result = [count_zero_zero, count_zero_one, count_one_zero, count_one_one];
	drawTest(result, 10000);
}

function test_three_3(output_array)
{
	var binary_str = test_three(output_array);

	var count_zero_zero_zero = binary_str.split(/[000]/).length - 1;
	var count_zero_zero_one = binary_str.split(/[001]/).length - 1;
	var count_zero_one_zero = binary_str.split(/[10]/).length - 1;
	var count_zero_one_one = binary_str.split(/[011]/).length - 1;

	var count_one_zero_zero = binary_str.split(/[00]/).length - 1;
	var count_one_zero_one = binary_str.split(/[101]/).length - 1;
	var count_one_one_zero = binary_str.split(/[110]/).length - 1;
	var count_one_one_one = binary_str.split(/[111]/).length - 1;


	console.log('000 - ' + count_zero_zero_zero);
	console.log('001 - ' + count_zero_zero_one);
	console.log('010 - ' + count_zero_one_zero);
	console.log('011 - ' + count_zero_one_one);

	console.log('100 - ' + count_one_zero_zero);
	console.log('101 - ' + count_one_zero_one);
	console.log('110 - ' + count_one_one_zero);
	console.log('111 - ' + count_one_one_one);

	var result = [count_zero_zero_zero, count_zero_zero_one, count_zero_one_zero, count_zero_one_one, count_one_zero_zero, count_one_zero_one, count_one_one_zero, count_one_one_one];
	drawTest(result, 50000);
}

function test_four(output_array)
{
	var binary_str = [];

	for (var i = 0; i < output_array.length; i++) {
		binary_str += output_array[i].toString(2);								//переводим всю последовательность в бинарный вид и записываем все в строку
	}
	binary_str = binary_str.split('');

	// Алгоритм Берлекэмпа-Мэсси
	var s = [];
	for (var i = 0; i < binary_str.length; i++) {
		s[i] = parseInt(binary_str[i]);
	}
	var n = s.length;
	var c = [];
	var b = [];

	for(var i = 0; i < n; i++) {
		c[i] = 0;
		b[i] = 0;
	}
	c[0] = 1;
	b[0] = 1;

	var L = 0;
	var m = -1;
	var N = 0;

	var L_arr = [];

	while (N < n) {
		var suma = 0;

		for (var i = 1; i < L + 1; i++) {
			suma = (suma + c[i] * s[N - i]) % 2;
		}
		var d = (s[N] + suma) % 2;

		if(d == 1) {
			var t = [];
			for (var i = 0; i < n; i++) {
				t[i] = c[i];
			}

			for (var j = 0; j < n - N + m; j++) {
				c[N - m + j] = (c[N - m + j] + b[j]) % 2;
			}

			if (L <= N / 2) {
				L = N + 1 - L;
				m = N;
				var b = [];
				for (var i = 0; i < n; i++) {
					b[i] = t[i];
				}
			}
		}
		L_arr[N] = L;
		N++;
	}

	// console.log(L_arr);

	drawTest(L_arr, 10);
}

function test_seven(output_array)
{
	// var arr = [1, -2, 1, -10];
	var size = output_array.length;
	var m = size + ( size % 2 ); //размер выходного буфера должен быть четным
	var out = new Array( m );
	var pid = ( 2.0 * Math.PI ) / size;
	
	var r, i, w, t;

	//высчитываем среднее значение по всему интервалу
	//для последующей нормализации
	var mv = 0;
	for ( t = 0; t < size; t++ ) mv += output_array[t];
	mv = mv / size;

	for ( w = 0; w < m; w++ ) {
		var a = w * pid;
		r = 0;
		i = 0;
		for ( t = 0; t < size; t++ ) {
			//нормализация значения из интервала
			var v = output_array[t] - mv;
			var ta = a * t;
			r += v * Math.cos( ta );
			i += v * Math.sin( ta );
		}
		out[w] = Math.sqrt( r * r + i * i ) / size;
	}

	console.log('out');
	console.log(out);
	drawTest(out, 500000000);
}

function drawTest(my_array, gridScale)
{
	var myBarchart = new Barchart(
	    {
	        canvas:myCanvas,
	        padding:30,
	        gridScale:gridScale,
	        gridColor: '#000',
	        data:my_array,
	        colors:['#bc500b','#bca500']
	    }
	);
	myBarchart.draw();
}
