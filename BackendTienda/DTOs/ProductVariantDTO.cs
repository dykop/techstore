namespace BackendTienda.DTOs
{
    public class ProductVariantDTO
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? Storage { get; set; }
        public string? Ram { get; set; }
        public string? Color { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? Garantia { get; set; }
        public string? Condicion { get; set; }

    }

    public class CreateVariantDto
    {
        public string? Storage { get; set; }
        public string? Ram { get; set; }
        public string? Color { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? Garantia { get; set; }
        public string? Condicion { get; set; }
    }
}
