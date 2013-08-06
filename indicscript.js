
	//0x94d
	var vowels=[];
	vowels["अ".charCodeAt(0)]="a";
	vowels["आ".charCodeAt(0)]="ā";
	vowels["ा".charCodeAt(0)]="ā";
	
	vowels["ि".charCodeAt(0)]="i";
	vowels["ी".charCodeAt(0)]="ī";
	vowels["इ".charCodeAt(0)]="i";
	vowels["ई".charCodeAt(0)]="ī";

	vowels["उ".charCodeAt(0)]="u";
	vowels["ऊ".charCodeAt(0)]="ū";
	vowels["ु".charCodeAt(0)]="u";
	vowels["ू".charCodeAt(0)]="ū";


	vowels["ए".charCodeAt(0)]="e";
	vowels["ऐ".charCodeAt(0)]="ai";
	vowels["े".charCodeAt(0)]="e";
	vowels["ै".charCodeAt(0)]="ai";
		
	vowels["ओ".charCodeAt(0)]="o";
	vowels["औ".charCodeAt(0)]="au";
	vowels["ो".charCodeAt(0)]="o";
	vowels["ौ".charCodeAt(0)]="au";
		
	vowels["ऋ".charCodeAt(0)]="ṛ";
	vowels["ॠ".charCodeAt(0)]="ṝ";
	vowels["ृ".charCodeAt(0)]="ṛ";
	vowels["ॄ".charCodeAt(0)]="ṝ";
	/*	
	vowels["ऌ".charCodeAt(0)]="ḷ";
	vowels["ॡ".charCodeAt(0)]="ḹ";
	vowels["ॢ".charCodeAt(0)]="ḷ";
	vowels["ॣ".charCodeAt(0)]="ḹ";
	*/	
	vowels["ं".charCodeAt(0)]="ṃ"; // or vowel ?
	vowels["ः".charCodeAt(0)]="ḥ";
	
	
	
	var consonants=[];
	consonants["क".charCodeAt(0)]="k";
	consonants["ख".charCodeAt(0)]="kh";
	consonants["ग".charCodeAt(0)]="g";
	consonants["घ".charCodeAt(0)]="gh";
	consonants["ङ".charCodeAt(0)]="ṅ";
	consonants["च".charCodeAt(0)]="c";
	consonants["छ".charCodeAt(0)]="ch";
	consonants["ज".charCodeAt(0)]="j";
	consonants["झ".charCodeAt(0)]="jh";
	consonants["ञ".charCodeAt(0)]="ñ";
	consonants["ट".charCodeAt(0)]="ṭ";
	consonants["ठ".charCodeAt(0)]="ṭh";
	consonants["ड".charCodeAt(0)]="ḍ";
	consonants["ढ".charCodeAt(0)]="ḍh";
	consonants["ण".charCodeAt(0)]="ṇ";
	consonants["त".charCodeAt(0)]="t";
	consonants["थ".charCodeAt(0)]="th";
	consonants["द".charCodeAt(0)]="d";
	consonants["ध".charCodeAt(0)]="dh";
	consonants["न".charCodeAt(0)]="n";
	consonants["प".charCodeAt(0)]="p";
	consonants["फ".charCodeAt(0)]="ph";
	consonants["ब".charCodeAt(0)]="b";
	consonants["भ".charCodeAt(0)]="bh";
	consonants["म".charCodeAt(0)]="m";
	consonants["य".charCodeAt(0)]="y";
	consonants["र".charCodeAt(0)]="r";
	consonants["ल".charCodeAt(0)]="l";
	
	consonants["ळ".charCodeAt(0)]="ḷ";
	//consonants["ऴ".charCodeAt(0)]="ḷ";
	
	consonants["व".charCodeAt(0)]="v";
	consonants["श".charCodeAt(0)]="ś";
	consonants["ष".charCodeAt(0)]="ṣ"
	consonants["स".charCodeAt(0)]="s";
	consonants["ह".charCodeAt(0)]="h";
	
	var symbols=[];
	symbols[0x200d]="";
	symbols["॰".charCodeAt(0)]=".";
	symbols["॥".charCodeAt(0)]="||";
	symbols["।".charCodeAt(0)]="|";
	symbols["१".charCodeAt(0)]="1";
	symbols["२".charCodeAt(0)]="2";
	symbols["३".charCodeAt(0)]="3";
	symbols["४".charCodeAt(0)]="4";
	symbols["५".charCodeAt(0)]="5";
	symbols["६".charCodeAt(0)]="6";
	symbols["७".charCodeAt(0)]="7";
	symbols["८".charCodeAt(0)]="8";
	symbols["९".charCodeAt(0)]="9";
	symbols["०".charCodeAt(0)]="0";
	//symbols[1]="a";‍

	
	var enumerateDevanagariToken = function(instr) { // return array of tokens in a string
		var r=[];
		var indeva=false;
		var deva="";
		for (var i in instr) {
			var cc=instr.charCodeAt(i);
			if (cc===0x200d) continue;   // zero width joiner
			if (cc>=0x900 && cc<=0x97f) {
				if (cc!=0x964 && cc!=0x965)	deva+=instr[i];
			} else {
				if (deva) r.push(deva);
				deva="";
			}
		}
		if (deva) r.push(deva);
		return r;
	}
	var devanagariToRoman =function(s) {
		var output="";
		var followconsonant=false;
		for (var i=0;i<s.length;i++ ) {
			var cc=s.charCodeAt(i);
			var c=consonants[cc];
			if (cc===0x94d) {
			  followconsonant=false;
			  continue;
		    }
			if (c) { //isconsonant
				if (followconsonant) output+="a";
				followconsonant=true;
				output+=c
			} else {
				var sym=symbols[cc];
				if (sym!==undefined) {
					if (followconsonant) output+="a";
					output+=sym;
				} else {
					var v=vowels[cc];
					if (followconsonant && cc==0x902) output+="a";
					if (v) output+=v;
					else {
						if (followconsonant) output+="a";
					    output+=s[i];
					}
				}
				followconsonant=false;
			}	
		}
		if (followconsonant) output+="a";
		return output;
	}
	
module.exports= { devanagariToRoman:devanagariToRoman, 
					enumerateDevanagariToken:enumerateDevanagariToken);