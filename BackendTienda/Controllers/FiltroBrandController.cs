using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;
using BackendTienda.Interfaces.InterfacesView;
using Microsoft.AspNetCore.Mvc;

namespace BackendTienda.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FiltroBrandController : ControllerBase
    {
        private readonly IFiltroBrandService _filtroBrandService;

        public FiltroBrandController(IFiltroBrandService filtroBrandService)
        {
            _filtroBrandService = filtroBrandService;
        }

        [HttpGet]
        public async Task<ActionResult<List<FiltroBrandDTO>>> GetBrands()
        {
            var brands = await _filtroBrandService.GetBrandsAsync();
            return Ok(brands);
        }
    }
}