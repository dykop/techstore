using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;

namespace BackendTienda.Interfaces.InterfacesView
{
    public interface IFiltroCategoryService
    {
        Task<List<FiltroCategoryDTO>> GetCategoriesAsync();
    }
}