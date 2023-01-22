using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Template.Models
{
    public class Muzej
    {
       public int id { get; set; }
       public String naziv { get; set; }   
       public int kapacitet {get;set;} 
       public String lokacija {get;set;}
       public IEnumerable<UmetnickoDelo> ListaUmetnickihDela {get;set;}
    }
}