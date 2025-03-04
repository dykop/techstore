using BackendTienda.DTOs;
using BackendTienda.Models;
using BackendTienda.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace BackendTienda.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IProductoRepositorio _repositorio;
        private readonly IMapper _mapper;

        public ProductoService(IProductoRepositorio repositorio, IMapper mapper)
        {
            _repositorio = repositorio;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductoDTO>> GetAllProductsAsync()
        {
            var products = await _repositorio.GetAllWithVariantsAsync();
            return products.Select(MapToDTO);
        }

        public async Task<ProductoDTO> GetProductByIdAsync(int id)
        {
            var product = await _repositorio.GetByIdWithVariantsAsync(id);
            return product != null ? MapToDTO(product) : null;
        }

        public async Task<ProductoDTO> CreateProductAsync(CreateProductoDto createDto)
        {
            var product = _mapper.Map<Product>(createDto);
            await _repositorio.AddAsync(product);
            return MapToDTO(product);
        }

        public async Task<ProductVariantDTO> AddVariantAsync(int productId, CreateVariantDto variantDto)
        {
            var variant = _mapper.Map<ProductVariant>(variantDto);
            variant.ModelId = productId;
            await _repositorio.AddVariantAsync(variant);
            return _mapper.Map<ProductVariantDTO>(variant);
        }

        public async Task<IEnumerable<ProductVariantDTO>> GetVariantsByProductIdAsync(int productId)
        {
            var variants = await _repositorio.GetVariantsByProductIdAsync(productId);
            return variants.Select(v => _mapper.Map<ProductVariantDTO>(v));
        }

        public async Task<IEnumerable<ProductoDTO>> GetFilteredProductsAsync(ProductoFilterDto filterDto)
        {
            var products = await _repositorio.GetFilteredProductsAsync(filterDto);
            return products.Select(MapToDTO);
        }

        public async Task<ProductVariantDTO> GetVariantBySpecsAsync(int productId, string ram, string storage, string color, string garantia, string condicion)
        {
            var variant = await _repositorio.GetVariantBySpecsAsync(productId, ram, storage, color, garantia, condicion);
            return variant != null ? _mapper.Map<ProductVariantDTO>(variant) : null;
        }

        public async Task<IEnumerable<string>> GetAvailableRamOptionsAsync(int productId)
        {
            return await _repositorio.GetDistinctRamOptionsAsync(productId);
        }

        public async Task<IEnumerable<string>> GetAvailableStorageOptionsAsync(int productId, string ram)
        {
            return await _repositorio.GetDistinctStorageOptionsAsync(productId, ram);
        }

        public async Task<IEnumerable<string>> GetAvailableColorOptionsAsync(int productId, string ram, string storage)
        {
            return await _repositorio.GetDistinctColorOptionsAsync(productId, ram, storage);
        }

        private ProductoDTO MapToDTO(Product product)
        {
            if (product == null) return null;

            return new ProductoDTO
            {
                Id = product.Id,
                Name = product.Name,
                ImageUrl = product.ImageUrl ?? "",
                Description = product.Description ?? "",
                Brand = product.Brand ?? "",
                Category = product.Category ?? "",
                Variants = product.Variants?.Select(v => new ProductVariantDTO
                {
                    Id = v.Id,
                    ModelId = v.ModelId,
                    Storage = v.Storage ?? "",
                    Ram = v.Ram ?? "",
                    Color = v.Color ?? "",
                    Price = v.Price,
                    Stock = v.Stock,
                    Garantia = v.Garantia,
                    Condicion = v.Condicion
                }).ToList() ?? new List<ProductVariantDTO>()
            };
        }
    }
}
