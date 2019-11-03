
var PESO_1A_CERT = 3;
var PESO_2A_CERT = 3;
var PESO_3A_CERT = 4;
var MEDIA_MINIMA = 6;

var valores = {};
var i=0;
function calcular_boletim()
{
	var mate = document.getElementById('materi').value;
	var _1a = parseFloat(document.getElementById('1acert').value).toFixed(2);
	var _2a = parseFloat(document.getElementById('2acert').value).toFixed(2);
	var _3a = parseFloat(document.getElementById('3acert').value).toFixed(2);

	for(var x=0; x<i; x++)
	{
		if(valores[x] == mate){
			alert("Matéria já adicionada.");
			return;
		}
	}

	if(mate.Length < 3)
	{
		alert('ERRO! Digite, pelo menos, 3 CARACTERES no campo matéria.');
		return;
	}
	if(_1a > 10 || _1a < 0 || _2a > 10 || _2a < 0 || _3a > 10 || _3a < 0)
	{
		alert("ERRO! Digite, no campo notas valores entre 0 e 10");
		return;
	}

	valores[i] = mate;
	i++;

	var media = (_1a * PESO_1A_CERT + _2a * PESO_2A_CERT + _3a * PESO_3A_CERT ) /
	(PESO_1A_CERT + PESO_2A_CERT + PESO_3A_CERT));

	var table = document.getElementById('tablela');

	document.getElementById('result').style.display = 'block';

	var tr = document.createElement('tr');

	var _el1 = document.createElement('td');
	var _el2 = document.createElement('td');
	var _el3 = document.createElement('td');
	var _el4 = document.createElement('td');
	var _el5 = document.createElement('td');

	_el1.appendChild(document.createTextNode(mate));
	_el2.appendChild(document.createTextNode(_1a));
	_el3.appendChild(document.createTextNode(_2a));
	_el4.appendChild(document.createTextNode(_3a));
	_el5.appendChild(document.createTextNode(media));

	_el2.style.color = color(_1a);
	_el3.style.color = color(_2a);
	_el4.style.color = color(_3a);
	_el5.style.color = color(media.toFixed(2));

	_el2.title = 'Peso: ' + PESO_1A_CERT;
	_el3.title = 'Peso: ' + PESO_2A_CERT;
	_el4.title = 'Peso: ' + PESO_3A_CERT;

	tr.appendChild(_el1);
	tr.appendChild(_el2);
	tr.appendChild(_el3);
	tr.appendChild(_el4);
	tr.appendChild(_el5);

	table.appendChild(tr);

}

function color(nota){
	if(nota < MEDIA_MINIMA)return "red";
	else if(nota >= MEDIA_MINIMA)return "blue";
}
