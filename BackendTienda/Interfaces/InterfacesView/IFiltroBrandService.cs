using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;

namespace BackendTienda.Interfaces.InterfacesView
{
    public interface IFiltroBrandService
    {
        Task<List<FiltroBrandDTO>> GetBrandsAsync();
    }
}