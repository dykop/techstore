using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Interfaces
{
    public interface IProductoRepositorio
    {
        Task<IEnumerable<Product>> GetAllWithVariantsAsync();
        Task<Product> GetByIdWithVariantsAsync(int id);
        Task<Product> AddAsync(Product product);
        Task<ProductVariant> AddVariantAsync(ProductVariant variant);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId);
        Task<IEnumerable<Product>> GetFilteredProductsAsync(ProductoFilterDto filterDto);
        
        // Nuevos métodos para consultas específicas de variantes
        Task<ProductVariant> GetVariantBySpecsAsync(int productId, string ram, string storage, string color);
        Task<IEnumerable<string>> GetDistinctRamOptionsAsync(int productId);
        Task<IEnumerable<string>> GetDistinctStorageOptionsAsync(int productId, string ram);
        Task<IEnumerable<string>> GetDistinctColorOptionsAsync(int productId, string ram, string storage);
    }
}
