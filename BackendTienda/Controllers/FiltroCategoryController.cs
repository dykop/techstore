using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;
using BackendTienda.Interfaces.InterfacesView;
using Microsoft.AspNetCore.Mvc;

namespace BackendTienda.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FiltroCategoryController : ControllerBase
    {
        private readonly IFiltroCategoryService _filtroCategoryService;

        public FiltroCategoryController(IFiltroCategoryService filtroCategoryService)
        {
            _filtroCategoryService = filtroCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<FiltroCategoryDTO>>> GetCategories()
        {
            var categories = await _filtroCategoryService.GetCategoriesAsync();
            return Ok(categories);
        }
    }
}