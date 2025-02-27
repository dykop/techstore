using BackendTienda.Data;
using BackendTienda.Interfaces;
using BackendTienda.Models;
using BackendTienda.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BackendTienda.Repositorios
{
    public class ProductoRepositorio : IProductoRepositorio
    {
        private readonly ApplicationDbContext _context;

        public ProductoRepositorio(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllWithVariantsAsync()
        {
            return await _context.Products
                .Include(p => p.Variants)
                .ToListAsync();
        }

        public async Task<Product> GetByIdWithVariantsAsync(int id)
        {
            return await _context.Products
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<ProductVariant> AddVariantAsync(ProductVariant variant)
        {
            _context.ProductVariants.Add(variant);
            await _context.SaveChangesAsync();
            return variant;
        }

        public async Task UpdateAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<ProductVariant>> GetVariantsByProductIdAsync(int productId)
        {
            return await _context.ProductVariants
                .Where(v => v.ModelId == productId)
                .ToListAsync();
        }

        public async Task<ProductVariant> GetVariantBySpecsAsync(int productId, string ram, string storage, string color)
        {
            return await _context.ProductVariants
                .Where(v => v.ModelId == productId)
                .Where(v => v.Ram == ram)
                .Where(v => v.Storage == storage)
                .Where(v => v.Color == color)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<string>> GetDistinctRamOptionsAsync(int productId)
        {
            return await _context.ProductVariants
                .Where(v => v.ModelId == productId)
                .Select(v => v.Ram)
                .Distinct()
                .Where(r => !string.IsNullOrEmpty(r))
                .OrderBy(r => r)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetDistinctStorageOptionsAsync(int productId, string ram)
        {
            return await _context.ProductVariants
                .Where(v => v.ModelId == productId && v.Ram == ram)
                .Select(v => v.Storage)
                .Distinct()
                .Where(s => !string.IsNullOrEmpty(s))
                .OrderBy(s => s)
                .ToListAsync();
        }

        public async Task<IEnumerable<string>> GetDistinctColorOptionsAsync(int productId, string ram, string storage)
        {
            return await _context.ProductVariants
                .Where(v => v.ModelId == productId && v.Ram == ram && v.Storage == storage)
                .Select(v => v.Color)
                .Distinct()
                .Where(c => !string.IsNullOrEmpty(c))
                .OrderBy(c => c)
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetFilteredProductsAsync(ProductoFilterDto filterDto)
        {
            var query = _context.Products
                .Include(p => p.Variants)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterDto.Brand))
                query = query.Where(p => p.Brand == filterDto.Brand);

            if (!string.IsNullOrWhiteSpace(filterDto.Category))
                query = query.Where(p => p.Category == filterDto.Category);

            // if (!string.IsNullOrWhiteSpace(filterDto.Condition))
            //     query = query.Where(p => p.Condition == filterDto.Condition);

            return await query.ToListAsync();
        }
    }
}