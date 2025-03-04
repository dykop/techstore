using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTienda.Models.Views
{
    public class FiltroBrand   
    {
        [Column("brand")]
        public string? Brand { get; set; }
    }
}
