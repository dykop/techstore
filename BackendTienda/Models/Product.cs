using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTienda.Models
{
    [Table("product_models")]
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        [Column("brand")]
        public string? Brand { get; set; }

        [MaxLength(50)]
        [Column("category")]
        public string? Category { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [MaxLength(255)]
        [Column("image_url")]
        public string? ImageUrl { get; set; }

        // Colección de variantes con carga virtual para lazy loading
        public virtual ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();

        // Método para obtener el stock total
        public int GetTotalStock()
        {
            return Variants?.Sum(v => v.Stock) ?? 0;
        }

        // Método para obtener el precio base (el menor de todas las variantes)
        public decimal? GetBasePrice()
        {
            return Variants?.Min(v => v.Price);
        }

        // Método para obtener las variantes por RAM
        public IEnumerable<string> GetAvailableRAM()
        {
            return Variants?.Select(v => v.Ram)
                .Where(r => r != null)
                .Distinct()
                .OrderBy(r => r) ?? Enumerable.Empty<string>();
        }

        // Método para obtener los almacenamientos disponibles por RAM
        public IEnumerable<string> GetAvailableStorage(string ram)
        {
            return Variants?.Where(v => v.Ram == ram)
                .Select(v => v.Storage)
                .Where(s => s != null)
                .Distinct()
                .OrderBy(s => s) ?? Enumerable.Empty<string>();
        }

        // Método para obtener los colores disponibles por RAM y almacenamiento
        public IEnumerable<string> GetAvailableColors(string ram, string storage)
        {
            return Variants?.Where(v => v.Ram == ram && v.Storage == storage)
                .Select(v => v.Color)
                .Where(c => c != null)
                .Distinct()
                .OrderBy(c => c) ?? Enumerable.Empty<string>();
        }
    }
}

