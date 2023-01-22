import {Slikar} from "./Slikar.js"
import {UmetnickoDelo} from "./UmetnickoDelo.js"
import { UmetnickoDeloZaUpis } from "./UmetnickoDeloZaUpis.js"
import {SlikarZaUpis} from "./SlikarZaUpis.js"

export class Muzej
{
    constructor(id,nazivMuzeja,kapacitet,lokacija)
    {
        this.id=id;
        this.nazivMuzeja=nazivMuzeja;
        this.kapacitet=kapacitet;
        this.lokacija=lokacija;

        this.listaUmetnickihDela=[];
        this.listaSlikara=[];
        this.kont=null;
        this.kontForma=null;
        this.kontPrikaz=null;
        this.kontIzmeni=null;
        this.kontDodaj=null;
    }
    dodajUmetnickoDeloUListu(deloo)
    {
        this.listaUmetnickihDela.push(deloo); 
    }
    crtaj(host)
    {
        var l=document.createElement("h3");
        l.innerHTML=this.nazivMuzeja;
        l.className="Naslov";
        host.appendChild(l);

        this.kont=document.createElement("div");
        this.kont.className=this.nazivMuzeja;
        this.kont.classList.add("kont");
        host.appendChild(this.kont);

        this.kontForma=document.createElement("div");
        this.kontForma.className="Forma";
        this.kont.appendChild(this.kontForma);

        this.crtajFormu(this.kontForma);
    }

    crtajRed(host)
    {
        let red=document.createElement("div");
        red.className="red";
        host.appendChild(red);
        return red; 
    }

    crtajFormu(host)
    {
        // ----red za umetnicko delo-----
        let red2=this.crtajRed(host);

        let labelaUmetnickoDelo=document.createElement("label");
        labelaUmetnickoDelo.className="labela";
        labelaUmetnickoDelo.innerHTML="Naziv umetnickog dela: ";
        red2.appendChild(labelaUmetnickoDelo);

        let delo=document.createElement("input");
        delo.className="delo";
        red2.appendChild(delo);

        //------dugme nadji-----------
        let red3=this.crtajRed(host);

        let dugmeNadji=document.createElement("button");
        dugmeNadji.innerHTML="Nadji";
        dugmeNadji.className="dugmeNadji";
        red3.appendChild(dugmeNadji);

        var upisanoUmetnickoDelo=null;
        
        dugmeNadji.onclick=(ev)=>{

            if(this.kont.querySelector(".delo").value != "")
            upisanoUmetnickoDelo=(this.kont.querySelector(".delo").value);
            console.log(upisanoUmetnickoDelo);

            this.crtajPrikaz(upisanoUmetnickoDelo);
        }

    }

    crtajPrikaz(upisanoUmetnickoDelo)
    {
       this.kontPrikaz=document.createElement("div");
       this.kontPrikaz.className="Prikaz";
       this.kont.appendChild(this.kontPrikaz);

      //crtanje tabele za prikaz
       var tabela=document.createElement("table");
       tabela.className="tabela";
       this.kontPrikaz.appendChild(tabela);

       var tabelahead=document.createElement("thead");
       tabelahead.className="head";
       tabela.appendChild(tabelahead);

       var tr=document.createElement("tr");
       tabelahead.appendChild(tr);

       var tabelaBody=document.createElement("tbody");
       tabelaBody.className="TabelaPodaci";
       tabela.appendChild(tabelaBody);

       let th;
       var zag=["Naziv umetnickog dela","Boja rama","Slikar","     ","     "];
      

       zag.forEach(el=>{
           th=document.createElement("th");
           th.innerHTML=el;
           tr.appendChild(th);
       })

      
       if( upisanoUmetnickoDelo != null)
        {
            console.log(this.listaUmetnickihDela)
            this.listaUmetnickihDela.forEach(l=>
            {
                if(upisanoUmetnickoDelo==l.naziv)
                {
                    this.crtajUmetnickoDelo(tabelaBody,l,upisanoUmetnickoDelo);
                    console.log(upisanoUmetnickoDelo);
                    
                }
            })
         }
    
    }

    crtajUmetnickoDelo(tabelaBody,l, upisanoUmetnickoDelo)
    {

            let tr=document.createElement("tr"); 
            tabelaBody.appendChild(tr);

            // slikar ime
            let td=document.createElement("td")  
            td.innerHTML=l.naziv;
            tr.appendChild(td);

            //naziv umetnickog dela
            td=document.createElement("td")
            td.innerHTML=l.bojarama;
            tr.appendChild(td);

            //naziv muzeja
            td=document.createElement("td") 
            td.innerHTML=l.paintedby.ime;
            tr.appendChild(td); 

            //DUGME IZMENI
             let dugmeIzmeni=document.createElement("button");
             dugmeIzmeni.className="DugmeIzmeni";
             dugmeIzmeni.innerHTML="Izmeni";
             tr.appendChild(dugmeIzmeni);
 
             dugmeIzmeni.onclick=(ev)=>
             {
                this.izmeni(l,upisanoUmetnickoDelo);
             }
 
             //DUGME Obrisi
             let dugmeObrisi=document.createElement("button");
             dugmeObrisi.className="DugmeObrisi";
             dugmeObrisi.innerHTML="Obrisi";
             tr.appendChild(dugmeObrisi);
 
             dugmeObrisi.onclick=(ev)=>
             {
                this.obrisi(l, upisanoUmetnickoDelo);
             }
             
             //DUGME DODAJ
             let dugmeDodaj=document.createElement("button");
             dugmeDodaj.className="DugmeDodaj";
             dugmeDodaj.innerHTML="Dodaj";
             this.kontPrikaz.appendChild(dugmeDodaj);
 
             dugmeDodaj.onclick=(ev)=>
             {
                this.dodajSve(l);
             }

    }
    

    izmeni(l,upisanoUmetnickoDelo)
    {
        this.kontIzmeni=document.createElement("div");
        this.kontIzmeni.className="Izmeni";
        this.kont.appendChild(this.kontIzmeni);

        //--------Boja rama-----------
        let red1=this.crtajRed(this.kontIzmeni); 

        let labelaSlikar=document.createElement("label");
        labelaSlikar.className="Labela";
        labelaSlikar.innerHTML="Boja rama: ";
        red1.appendChild(labelaSlikar);

        let slikar=document.createElement("input");
        slikar.className="Slikar";
        red1.appendChild(slikar);



        //----DUGME koje sacuva izmene imena slikara--------------
        let red6=this.crtajRed(this.kontIzmeni);
            
        let dugmeSacuvajIzmene=document.createElement("button");
        dugmeSacuvajIzmene.className="DugmeIzmeni";
        dugmeSacuvajIzmene.innerHTML="Sacuvaj Izmene";
        red6.appendChild(dugmeSacuvajIzmene);

        var pokupljenobojarama=null;

        dugmeSacuvajIzmene.onclick=(ev)=>
        {
            if(this.kont.querySelector(".Slikar").value != "")
            pokupljenobojarama=(this.kont.querySelector(".Slikar").value);


            this.azuriraj(l,pokupljenobojarama)
        }
    }

    azuriraj(l,pokupljenobojarama)
    {
        console.log(pokupljenobojarama)
        console.log(l.naziv)
        console.log(l)

        fetch("https://localhost:5001/UmetnickoDelo/Izmeni/"+ pokupljenobojarama + "/" +l,
        {
            method:"PUT",
            headers:
            {
                "Content-Type":"application/json"
            }    
        }).then(s=>{
            if(s.ok)
            {
                this.listaUmetnickihDela.forEach(p=>
                    {
                        if(p.id==l.id)
                        {
                            p.bojarama=pokupljenobojarama;
                    
                        }
                    })
            }
        })
    }

    dodajSve(l)
    {
        this.kontDodaj=document.createElement("div");
        this.kontDodaj.className="Dodaj";
        this.kont.appendChild(this.kontDodaj);

        //--------Ime Slikara-----------
        let red1=this.crtajRed(this.kontDodaj); 

        let labelaSlikar=document.createElement("label");
        labelaSlikar.className="Labela";
        labelaSlikar.innerHTML="Ime slikara: ";
        red1.appendChild(labelaSlikar);

        let slikar=document.createElement("input");
        slikar.className="Ime";
        red1.appendChild(slikar);

        //-----Prezime slikara----------
        let red2=this.crtajRed(this.kontDodaj); 

        let labelaPrezime=document.createElement("label");
        labelaPrezime.className="Labela";
        labelaPrezime.innerHTML="Prezime slikara: ";
        red2.appendChild(labelaPrezime);

        let prezimeslikara=document.createElement("input");
        prezimeslikara.className="Prezime";
        red2.appendChild(prezimeslikara);

        //----DUGME za IME i PREZIME SLIKARA dodati--------------
        let red3=this.crtajRed(this.kontDodaj);
            
        let dugmedodajSlikara=document.createElement("button");
        dugmedodajSlikara.className="DugmeDodaj";
        dugmedodajSlikara.innerHTML="Dodaj slikara";
        red3.appendChild(dugmedodajSlikara);

        var pokupljenoime=null;
        var pokupljenoprezime=null;

        dugmedodajSlikara.onclick=(ev)=>
        {
            if(this.kont.querySelector(".Ime").value != "")
            pokupljenoime=(this.kont.querySelector(".Ime").value);

            if(this.kont.querySelector(".Prezime").value != "")
            pokupljenoprezime=(this.kont.querySelector(".Prezime").value);

            this.dodajSlikara(l,pokupljenoime,pokupljenoprezime)
        }
            //--------Naziv umetnickog dela-----------
            let red4=this.crtajRed(this.kontDodaj); 

            let labelaUmetnicko=document.createElement("label");
            labelaUmetnicko.className="Labela";
            labelaUmetnicko.innerHTML="Naziv umetnicko dela: ";
            red4.appendChild(labelaUmetnicko);

            let umetnicko=document.createElement("input");
            umetnicko.className="UmetnickoDelo";
            red4.appendChild(umetnicko);

              //--------Boja rama-----------
              let red8=this.crtajRed(this.kontDodaj); 

              let labelaBojaRama=document.createElement("label");
              labelaBojaRama.className="Labela";
              labelaBojaRama.innerHTML="Boja rama: ";
              red8.appendChild(labelaBojaRama);
      
              let ram=document.createElement("input");
              ram.className="Ram";
              red8.appendChild(ram);

            //-----DUGME za umetnicko dela dodati--------------------
            let red5=this.crtajRed(this.kontDodaj);
                
            let dugmeDodatiUmetnickoDelo=document.createElement("button");
            dugmeDodatiUmetnickoDelo.className="DugmeDodati";
            dugmeDodatiUmetnickoDelo.innerHTML="Dodaj umetnicko delo";
            red5.appendChild(dugmeDodatiUmetnickoDelo);

            var pokupljennazivumetnickog=null;
            var pokupljenabojarama=null;

            dugmeDodatiUmetnickoDelo.onclick=(ev)=>
            {
                if(this.kont.querySelector(".UmetnickoDelo").value != "")
                pokupljennazivumetnickog=(this.kont.querySelector(".UmetnickoDelo").value);

                if(this.kont.querySelector(".Ram").value != "")
                pokupljenabojarama=(this.kont.querySelector(".Ram").value);

                this.dodajUmetnickoDelo(l,pokupljennazivumetnickog,pokupljenabojarama)
            }
    }

    dodajSlikara(l,pokupljenoime,pokupljenoprezime)
    {
        console.log(pokupljenoime)
        console.log(pokupljenoprezime)
        var slikar=new SlikarZaUpis(pokupljenoime,pokupljenoprezime);
        fetch("https://localhost:5001/Slikar/DodajSlikara/",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ slikar })
        }).then(s=>{
            if(s.ok)
            {
                this.listaSlikara.push(slikar);
            }
        })
    }
   
    dodajUmetnickoDelo(l,pokupljennazivumetnickog,pokupljenabojarama)
    {
        console.log(pokupljenabojarama)
        console.log(pokupljennazivumetnickog)

        var delo=new UmetnickoDeloZaUpis(pokupljennazivumetnickog,pokupljenabojarama);
        fetch("https://localhost:5001/UmetnickoDelo/DodajUmetnickoDelo/",
        {
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ delo })
        }).then(s=>{
            if(s.ok)
            {
                this.listaUmetnickihDela.push(delo);
            }
        })
    }
   
    
    obrisi(l, upisanoUmetnickoDelo)
    {
        fetch("https://localhost:5001/Slikar/ObrisiSlikara/"+ l.id,
        {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }   
        }).then(s=>{
            if(s.ok)
            {
                this.listaSlikara.forEach(p=>{
                    if(p.id==l.id)
                    {
                        console.log("Obrisano");
                    }
                })
            }
        })
    }



}