// <script src="https://cdnjs.cloudflare.com/ajax/libs/rita/1.3.94/rita-full.js" integrity="sha256-JiBQUIqNWcLOeJ9hzQE/fu+9+m3gg0Vhndm3+q+2dBs=" crossorigin="anonymous"></script>

// POS Key
/*

const POS = {
	"cc":"Coordinating conjunction",
	"dt":"Determiner",
	"jj":"Adjective",
	"nn":"Noun, singular or mass",
	"prp":"Personal pronoun",
	"vbd":"Verb, past tense"
}; 

*/   

function doInput(e){
    let text = e.target.value;
	if (text.length == 0) return;
	let rs = RiString(text);

    let words = rs.words();
    let s = "";
    
    for (let i = 0; i < words.length; i++)
    {
        let w = words[i];
        if (rs.posAt(i) == "nnp")
        {
            let similarWords = RiTa.similarBySound(w);
            if (similarWords.length > 0)
            {
                w = similarWords[Math.floor(Math.random() * similarWords.length)];
            }
        }
        
        s += w + " ";
    }
    
    output.innerHTML = s;

// POS Code
/*    

    let pos = rs.pos();
    let s = "<ul>";
    for(let item of pos){
      let desc = POS[item];
      if(desc == undefined) desc = "??"
      s += `<li><b>${item}</b> : ${desc}</li>`;
    }
    s += "</ul>";
    output.innerHTML = s;
    
*/

}