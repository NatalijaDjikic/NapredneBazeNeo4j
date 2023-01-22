using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Template.Models;
using Neo4jClient;
using Neo4jClient.Cypher;
using Microsoft.AspNetCore.Http;

namespace Template.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlikarController : ControllerBase
    {
        private readonly IGraphClient _client;
      
        public SlikarController(IGraphClient client)
        {
            _client = client;
        }

        [Route ("PreuzmiSlikareIListu")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
           
            var slikari = await _client.Cypher.Match("(n: Slikar)")
                                                .Return(n => n.As<Slikar>()).ResultsAsync;                                                                                               
            return Ok(slikari);
       }

       [Route ("DodajSlikara")]
       [HttpPost]
       public async Task<IActionResult> Create([FromBody]Slikar slikar)
       {
           await _client.Cypher.Create("(d:Slikar $slikar)")
                               .WithParam("slikar", slikar)
                               .ExecuteWithoutResultsAsync();

            return Ok();
       }

      [HttpPut("{ime}")]
       public async Task<IActionResult> Update(string ime, [FromBody]Slikar slikar){
            await _client.Cypher.Match("(d:Slikar)")
                                .Where((Slikar d) => d.ime == ime)
                                .Set("d = $slikar")
                                .WithParam("slikar", slikar)
                                .ExecuteWithoutResultsAsync();
           return Ok();
       }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            await  _client.Cypher.Match("(d:Slikar)")
                                 .Where((Slikar d) => d.id == id)
                                 .Delete("d")
                                 .ExecuteWithoutResultsAsync();
            return Ok();
       }
    }
}
