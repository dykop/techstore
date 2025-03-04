using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;

namespace BackendTienda.Interfaces.InterfacesView
{
    public interface IFiltroCategoryRepositorio
    {
        Task<List<FiltroCategoryDTO>> GetCategoriesAsync();
    }
}