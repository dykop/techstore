using Microsoft.AspNetCore.Mvc;
using BackendTienda.Models;
using BackendTienda.DTOs;
using BackendTienda.Interfaces;
using Microsoft.AspNetCore.Cors;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using BackendTienda.Data;

namespace BackendTienda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("DefaultPolicy")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductoService _productoService;
        private readonly ApplicationDbContext _app;
        private readonly IWebHostEnvironment _environment;

        public ProductsController(IProductoService productoService, IWebHostEnvironment environment, ApplicationDbContext app)
        {
            _productoService = productoService;
            _environment = environment;
            _app = app;
        }
        // [HttpGet("test-variant/{id}")]
        // public async Task<IActionResult> TestVariant(int id)
        // {
        //     var variant = await _app.ProductVariants
        //         .Where(v => v.Id == id)
        //         .Select(v => new 
        //         {
        //             v.Id,
        //             v.ModelId,
        //             v.Garantia,
        //             v.Condicion
        //         })
        //         .FirstOrDefaultAsync();

        //     if (variant != null)
        //     {
        //         Console.WriteLine($"Garantia: {variant.Garantia}, Condicion: {variant.Condicion}");
        //         return Ok(variant);
        //     }
            
        //     return NotFound("No se encontró la variante del producto.");
        // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetProducts()
        {
            try
            {
                var products = await _productoService.GetAllProductsAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDTO>> GetProduct(int id)
        {
            var product = await _productoService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        [HttpGet("{productId}/variants")]
        public async Task<ActionResult<IEnumerable<ProductVariantDTO>>> GetVariants(int productId)
        {
            var variants = await _productoService.GetVariantsByProductIdAsync(productId);
            return Ok(variants);
        }

        [HttpGet("{productId}/ram-options")]
        public async Task<ActionResult<IEnumerable<string>>> GetRamOptions(int productId)
        {
            var product = await _productoService.GetProductByIdAsync(productId);
            if (product == null)
                return NotFound();

            var ramOptions = product.GetAvailableRAM();
            return Ok(ramOptions);
        }

        [HttpGet("{productId}/storage-options")]
        public async Task<ActionResult<IEnumerable<string>>> GetStorageOptions(int productId, [FromQuery] string ram)
        {
            var product = await _productoService.GetProductByIdAsync(productId);
            if (product == null)
                return NotFound();

            var storageOptions = product.GetAvailableStorage(ram);
            return Ok(storageOptions);
        }

        [HttpGet("{productId}/color-options")]
        public async Task<ActionResult<IEnumerable<string>>> GetColorOptions(int productId, [FromQuery] string ram, [FromQuery] string storage)
        {
            var product = await _productoService.GetProductByIdAsync(productId);
            if (product == null)
                return NotFound();

            var colorOptions = product.GetAvailableColors(ram, storage);
            return Ok(colorOptions);
        }

        [HttpGet("{productId}/variant")]
        public async Task<ActionResult<ProductVariantDTO>> GetVariantBySpecs(
            int productId,
            [FromQuery] string ram,
            [FromQuery] string storage,
            [FromQuery] string color,
            [FromQuery] string condicion,
            [FromQuery] string garantia)
        {
            var variant = await _productoService.GetVariantBySpecsAsync(productId, ram, storage, color, condicion, garantia);
            if (variant == null)
                return NotFound();
            
            return Ok(variant);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetFilteredProducts([FromQuery] ProductoFilterDto filterDto)
        {
            try
            {
                var products = await _productoService.GetFilteredProductsAsync(filterDto);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("imagenes/{*imagePath}")]
        public IActionResult GetImage(string imagePath)
        {
            if (!imagePath.StartsWith("imagenes"))
            {
                imagePath = Path.Combine("imagenes", imagePath);
            }

            var fullPath = Path.Combine(_environment.WebRootPath, imagePath);
            Console.WriteLine($"Attempting to load image from: {fullPath}");

            if (!System.IO.File.Exists(fullPath))
            {
                Console.WriteLine($"Image not found: {fullPath}");
                return NotFound();
            }

            var mimeType = GetContentType(Path.GetExtension(fullPath));
            return PhysicalFile(fullPath, mimeType);
        }

        private string GetContentType(string extension)
        {
            return extension.ToLower() switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
}
