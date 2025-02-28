using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTienda.Models
{
    public class ProductVariant
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("id")]
        [Column("model_id")]
        public int ModelId { get; set; }
        
        [MaxLength(50)]
        [Column("storage")]
        public string? Storage { get; set; }
        
        [MaxLength(50)]
        [Column("ram")]
        public string? Ram { get; set; }
        
        [MaxLength(50)]
        [Column("color")]
        public string? Color { get; set; }
        
        [Column("price", TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Column("stock")]
        public int Stock { get; set; }
        [Column("garantia")]
        public string? Garantia { get; set; }
        [Column("condicion")]
        public string? Condicion { get; set; }
        public virtual required Product Model { get; set; }
    }
}
