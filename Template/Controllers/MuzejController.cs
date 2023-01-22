using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Template.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4jClient;
using Neo4jClient.Cypher;
using Neo4j;

namespace Template.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MuzejController : ControllerBase
    {
        private readonly IGraphClient _client;
        public MuzejController(IGraphClient client)
        {
            _client = client;
        }
        [Route ("PreuzmiMuzeje")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
             var muzeji = await _client.Cypher.Match(@"(n: Muzej)")
                                                   .Return(n => n.As<Muzej>()).ResultsAsync;                                                                   

             foreach(Muzej muzej in muzeji) 
             {
                Console.WriteLine(muzej.id);
                var dela=await _client.Cypher.Match(@"(n: UmetnickoDelo) - [: IS_IN] -> (s: Muzej)")
                                                    .Where( (Muzej s) => s.id == muzej.id)
                                                    .Return(n => n.As<UmetnickoDelo>()).ResultsAsync;
                muzej.ListaUmetnickihDela=dela;        
                  
             }                                 

            return Ok(muzeji);
       }
       [Route ("DodajMuzej")]
       [HttpPost]
       public async Task<IActionResult> Create([FromBody]Muzej muzej){
           await _client.Cypher.Create("(d:Muzej $muzej)")
                               .WithParam("muzej", muzej)
                               .ExecuteWithoutResultsAsync();

            return Ok();
       }

      [HttpPut("{naziv}")]
       public async Task<IActionResult> Update(string naziv, [FromBody]Muzej muzej){
            await _client.Cypher.Match("(d:Muzej)")
                                .Where((Muzej d) => d.naziv == naziv)
                                .Set("d = $muzej")
                                .WithParam("muzej", muzej)
                                .ExecuteWithoutResultsAsync();
           return Ok();
       }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            await  _client.Cypher.Match("(d:Muzej)")
                                 .Where((Muzej d) => d.id == id)
                                 .Delete("d")
                                 .ExecuteWithoutResultsAsync();
            return Ok();

       }

    }
}
