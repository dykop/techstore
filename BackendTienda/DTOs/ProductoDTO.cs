using BackendTienda.DTOs;

namespace BackendTienda.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public List<ProductVariantDTO> Variants { get; set; } = new();

        // Métodos de ayuda para obtener las opciones disponibles
        public IEnumerable<string> GetAvailableRAM()
        {
            return Variants
                .Select(v => v.Ram)
                .Where(r => !string.IsNullOrEmpty(r))
                .Distinct()
                .OrderBy(r => r);
        }

        public IEnumerable<string> GetAvailableStorage(string ram)
        {
            return Variants
                .Where(v => v.Ram == ram)
                .Select(v => v.Storage)
                .Where(s => !string.IsNullOrEmpty(s))
                .Distinct()
                .OrderBy(s => s);
        }

        public IEnumerable<string> GetAvailableColors(string ram, string storage)
        {
            return Variants
                .Where(v => v.Ram == ram && v.Storage == storage)
                .Select(v => v.Color)
                .Where(c => !string.IsNullOrEmpty(c))
                .Distinct()
                .OrderBy(c => c);
        }
    }

    public class CreateProductoDto
    {
        public string Name { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public List<ProductVariantDTO>? Variants { get; set; }
    }

    public class ProductoFilterDto
    {
        public string? Brand { get; set; }
        public string? Category { get; set; }
    }
}
