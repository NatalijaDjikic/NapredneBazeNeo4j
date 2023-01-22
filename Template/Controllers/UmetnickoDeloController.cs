using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Template.Models;
using Neo4jClient;

namespace Template.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UmetnickoDeloController : ControllerBase
    {
        private readonly IGraphClient _client;

        public UmetnickoDeloController(IGraphClient client)
        {
            _client = client;
         
        }

        [Route ("PreuzmiUmetnickaDela")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {

             var dela= await _client.Cypher.Match(@"(n: UmetnickoDelo)")
                                                   .Return(n => n.As<UmetnickoDelo>()).ResultsAsync;                                                                   

             foreach(UmetnickoDelo delo in dela) 
             {
                var muzej=await _client.Cypher.Match(@"(n: UmetnickoDelo) - [: IS_IN] -> (s: Muzej)")
                                                    .Where( (UmetnickoDelo n) => n.id == delo.id)
                                                    .Return(s=> s.As<Muzej>()).ResultsAsync;

                var slikar=await _client.Cypher.Match(@"(n: UmetnickoDelo) - [: PAINTEDBY] -> (s: Slikar)")
                                                    .Where( (UmetnickoDelo n) => n.id == delo.id)
                                                    .Return(s => s.As<Slikar>()).ResultsAsync;    
                 delo.IS_IN=muzej.FirstOrDefault();      
                 delo.PAINTEDBY=slikar.FirstOrDefault();                                                             
                      
             }                                 
            return Ok(dela);
       }

       [Route ("DodajUmetnickoDelo")]
       [HttpPost]
       public async Task<IActionResult> Create([FromBody]UmetnickoDelo delo){
           await _client.Cypher.Create("(d:UmetnickoDelo $delo)")
                               .WithParam("delo", delo)
                               .ExecuteWithoutResultsAsync();

            return Ok();
       }
       
       [Route ("Izmeni")]
       [HttpPut]
       public async Task<IActionResult> Update(string pokupljenobojarama,string naziv){
            await _client.Cypher.Match("(d:UmetnickoDelo)")
                                .Where((UmetnickoDelo d) => d.naziv == naziv)
                                .Set("d= $bojarama")
                                .WithParam("bojarama", pokupljenobojarama)
                                .ExecuteWithoutResultsAsync();
           return Ok();
       }
    
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            await  _client.Cypher.Match("(d:UmetnickoDelo)")
                                 .Where((UmetnickoDelo d) => d.id == id)
                                 .Delete("d")
                                 .ExecuteWithoutResultsAsync();
            return Ok();

       }

    
    }
}
