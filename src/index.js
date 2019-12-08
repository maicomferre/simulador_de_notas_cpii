var MATERIAS_NUM = 14;
var notas = new Array(MATERIAS_NUM);
var nota_minima = 6;
var PESO1 = 3;
var PESO2 = 3;
var PESO3 = 4;
var pesoPFV_ma = 3;
var pesoPFV = 2; 
var nota_minima_pfv = 5;
var maximo_materias_coc = 3;

function load_table(){
    var x = document.getElementById('load_obj');
    var html = "";

    for(var i=0; i<MATERIAS_NUM; i++)
    {
    	notas[i] = 
    	{
    		texto:"",
    		cert1:{graus:0,apoio:-1,media:0,ok:false},
    		cert2:{graus:0,apoio:-1,media:0,ok:false},
    		cert3:{graus:0,apoio:-1,media:0,ok:false},
    		final:{ma:0,pfv:-1,mf:0},
    		nota:false,
    	};
        html += '<tr>\
                <td id="texto_'+i+'" ><input style="width:220px;" type="text" id="texto_input_'+i+'" placeholder="Disciplina" /></td>\
                <td id="graus1_'+i+'" ><input style="width:40px;" type="text" id="graus_input1_'+i+'" placeholder="Graus" /></td>\
                <td id="apoio1_'+i+'" ><input style="width:40px;display:none;color:" type="text" id="apoio_input1_'+i+'" placeholder="Apoio" /></td>\
                <td id="media1_'+i+'" ></td>\
                \
                <td id="graus2_'+i+'" ><input style="width:40px;" type="text" id="graus_input2_'+i+'" placeholder="Graus" /></td>\
                <td id="apoio2_'+i+'" ><input style="width:40px;display:none;" type="text" id="apoio_input2_'+i+'" placeholder="Apoio" /></td>\
                <td id="media2_'+i+'" ></td>\
                \
                <td id="graus3_'+i+'" ><input style="width:40px;" type="text" id="graus_input3_'+i+'" placeholder="Graus" /></td>\
                <td id="apoio3_'+i+'" ><input style="width:40px;display:none;" type="text" id="apoio_input3_'+i+'" placeholder="Apoio" /></td>\
                <td id="media3_'+i+'" ></td>\
                \
                <td id="graus_'+i+'" ></td>\
                <td id="apoio_'+i+'" ><input style="width:40px;display:none;" type="text" id="apoio_inputpfv_'+i+'" placeholder="Apoio" /></td>\
                <td id="media_'+i+'" ></td>\
            </tr>';
    }
    x.innerHTML = x.innerHTML +html;
}

document.addEventListener('input',function(inpt){
	inpt.target.value = inpt.target.value.replace(',','.');
	//inpt.target.value = inpt.target.value.replace(/[^\d]+/g,'');

	if(inpt.target.value > 10)
		inpt.target.value = 10;
	if(inpt.target.value < 0)
		inpt.target.value = 0;
	calcular_notas();
});


function calcular_notas()
{
	for(var i=0; i<MATERIAS_NUM; i++)
	{
		var c1_graus = document.getElementById('graus_input1_'+ i);
		var c1_apoio = document.getElementById('apoio_input1_'+ i);
		var c1_media = document.getElementById('media1_'+ i);

		var c2_graus = document.getElementById('graus_input2_'+ i);
		var c2_apoio = document.getElementById('apoio_input2_'+ i);
		var c2_media = document.getElementById('media2_'+ i);

		var c3_graus = document.getElementById('graus_input3_'+ i);
		var c3_apoio = document.getElementById('apoio_input3_'+ i);
		var c3_media = document.getElementById('media3_'+ i);

		var ma = document.getElementById('graus_'+ i);
		var pfv = document.getElementById('apoio_inputpfv_'+ i);
		var mf = document.getElementById('media_'+ i);

		notas[i].cert1.graus = c1_graus.value;
		notas[i].cert1.apoio = c1_apoio.value;
		//notas[i].cert1.media = ;

		notas[i].cert2.graus = c2_graus.value;
		notas[i].cert2.apoio = c2_apoio.value;
		//notas[i].cert2.media = ;

		notas[i].cert3.graus = c3_graus.value;
		notas[i].cert3.apoio = c3_apoio.value;
		//notas[i].cert3.media = ;

		//notas[i].final.ma = ;
		//notas[i].final.pfv = ;
		//notas[i].final.mf = ;

		if(c1_graus.value != '')
		{
			if(notas[i].cert1.graus < nota_minima)
			{
				if(c1_apoio.style.display == "none" ){
					c1_apoio.style.display = "block";
					c1_apoio.value = '';				
					notas[i].cert1.ok_apoio=true
				}
				if(notas[i].cert1.apoio != '')
				{
					notas[i].cert1.apoio = c1_apoio.value;
					var calc = ((parseFloat(notas[i].cert1.graus) + parseFloat(notas[i].cert1.apoio)) / 2.0).toFixed(2);
					notas[i].cert1.media = calc;
					c1_media.innerHTML = notas[i].cert1.media;
				}
				else
					c1_media.innerHTML = '';
			}
			else
			{
				
				c1_apoio.style.display = "none";
				notas[i].cert1.media = notas[i].cert1.graus;
				c1_media.innerHTML = notas[i].cert1.media.Length !== 0 ? notas[i].cert1.media : '';
			}
		}
		else{
			
			c1_apoio.style.display = "none";
			c1_media.innerHTML = '';
		}

		setDefaultColor(c1_graus,notas[i].cert1.graus);
		setDefaultColor(c1_apoio,notas[i].cert1.apoio);
		setDefaultColor(c1_media,notas[i].cert1.media);

		if(notas[i].cert2.graus != '')
		{
			if(notas[i].cert2.graus < nota_minima)
			{
				if(c2_apoio.style.display === "none" ){
					c2_apoio.style.display = "block";
					c2_apoio.value = '';
					
									
				}
				if(notas[i].cert2.apoio != 0)
				{
					notas[i].cert2.apoio = c2_apoio.value;
					var calc = ((parseFloat(notas[i].cert2.graus) + parseFloat(notas[i].cert2.apoio)) / 2).toFixed(2);
					notas[i].cert2.media = calc;
					c2_media.innerHTML = notas[i].cert2.media;
				}
				else
					c2_media.innerHTML = '';
			}
			else
			{
				
				c2_apoio.style.display = "none";
				notas[i].cert2.media = notas[i].cert2.graus;
				c2_media.innerHTML = notas[i].cert2.media.Length !== 0 ? notas[i].cert2.media : '';
			}
		}
		else{
			
			c2_apoio.style.display = "none";
			c2_media.innerHTML = '';
		}

		setDefaultColor(c2_graus,notas[i].cert2.graus);
		setDefaultColor(c2_apoio,notas[i].cert2.apoio);
		setDefaultColor(c2_media,notas[i].cert2.media);


		if(notas[i].cert3.graus != '')
		{
			if(notas[i].cert3.graus < nota_minima)
			{
				if(c3_apoio.style.display === "none" ){
					c3_apoio.style.display = "block";
					c3_apoio.value = '';
					
									
				}
				if(notas[i].cert3.apoio != 0)
				{
					notas[i].cert3.apoio = c3_apoio.value;
					var calc = ((parseFloat(notas[i].cert3.graus) + parseFloat(notas[i].cert3.apoio)) / 2).toFixed(2);
					notas[i].cert3.media = calc;
					c3_media.innerHTML = notas[i].cert3.media;
				}
				else
					c3_media.innerHTML = '';
			}
			else
			{
				
				c3_apoio.style.display = "none";
				notas[i].cert3.media = notas[i].cert3.graus;
				c3_media.innerHTML = notas[i].cert3.media.Length !== 0 ? notas[i].cert3.media : '';
			}
		}
		else{
			
			c3_apoio.style.display = "none";
			c3_media.innerHTML = '';
		}

		setDefaultColor(c3_graus,notas[i].cert3.graus);
		setDefaultColor(c3_apoio,notas[i].cert3.apoio);
		setDefaultColor(c3_media,notas[i].cert3.media);

		if(notas[i].cert1.media != '' && notas[i].cert2.media != '' && notas[i].cert3.media != '')
		{
			var calc = ((notas[i].cert1.media * PESO1 + notas[i].cert2.media * PESO2 + notas[i].cert3.media * PESO3) / (PESO1+PESO2+PESO3)).toFixed(2);
			notas[i].final.ma = calc;
			ma.innerHTML = notas[i].final.ma;
			if(calc < nota_minima)
			{
				if(notas[i].final.pfv.Length != '')
				{
					pfv.style.display = "block";
					calc = (( notas[i].final.ma * pesoPFV_ma ) + ( notas[i].final.pfv  * pesoPFV))  / (pesoPFV + pesoPFV_ma);
					mf.innerHTML = notas[i].final.mf = calc;
				}
			}
			else
			{
				pfv.style.display = "none";
				notas[i].final.mf = notas[i].final.ma;
				mf.innerHTML = notas[i].final.mf;
			}
		}
		else
		{
			pfv.style.display = "none";			
			ma.innerHTML = '';
			mf.innerHTML = '';
		}

		setDefaultColor(ma,notas[i].final.ma);
		setDefaultColor(pfv,notas[i].final.pfv,true);
		setDefaultColor(mf,notas[i].final.ma);
	}
}
function setDefaultColor(element,nota,pfv=false)
{
	if(!pfv)
	{
		if(nota >= nota_minima)
			element.style.color = 'blue';
		if(nota < nota_minima)
			element.style.color = 'red';
	}
	else
	{
		if(nota >= nota_minima_pfv)
			element.style.color = 'blue';
		if(nota < nota_minima_pfv)
			element.style.color = 'red';		
	}
}