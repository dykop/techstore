using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTienda.Models.Views
{
    public class FiltroCategory   
    {       
        [MaxLength(50)]
        [Column("category")]
        public string? Category { get; set; }
    }
}
