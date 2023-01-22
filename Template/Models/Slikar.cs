
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Template.Models
{
    public class Slikar
    {
       public int id { get; set; }
       public String ime { get; set; }
       public String prezime { get; set; }
      public IEnumerable<UmetnickoDelo> PAINTED {get;set;}
    }
}