import { Muzej } from "./Muzej.js";
import { UmetnickoDelo } from "./UmetnickoDelo.js";
import { Slikar } from "./Slikar.js";


var listaUmetnickihDela=[];
fetch("https://localhost:5001/UmetnickoDelo/PreuzmiUmetnickaDela")
.then(p=>{
        p.json().then(delo=>{
            delo.forEach(de=>
                {
                    var del=new UmetnickoDelo(de.id,de.naziv,de.bojarama,de.paintedby,de.iS_IN);
                    listaUmetnickihDela.push(del);
                })
        })
    })
console.log(listaUmetnickihDela)


var listaSlikara=[];
fetch("https://localhost:5001/Slikar/PreuzmiSlikareIListu")
.then(p=>{
        p.json().then(slikar=>{
            slikar.forEach(f=>
                {
                    var sl=new Slikar(f.id,f.ime,f.prezime)
                    listaSlikara.push(sl);
                })

        })
    })



 var listaMuzeja=[];
fetch("https://localhost:5001/Muzej/PreuzmiMuzeje")
.then(p=>{
        p.json().then(muz=>
            {
            muz.forEach(muze=>
                {
                    var muzej=new Muzej(muze.id,muze.naziv,muze.kapacitet,muze.lokacija);
                    listaMuzeja.push(muzej);
              
                    
                    listaUmetnickihDela.forEach(deloo=>
                        {
                            console.log("HELLOO")
                            if(deloo.iS_IN.id==muze.id)
                        {
                            muzej.dodajUmetnickoDeloUListu(deloo);     
                        }
                    })   
                    muzej.crtaj(document.body);  
        })
    })
})
console.log(listaMuzeja)
