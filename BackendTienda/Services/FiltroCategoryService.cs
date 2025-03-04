using System.Collections.Generic;
using System.Threading.Tasks;
using BackendTienda.DTOs.DTOsVistas;
using BackendTienda.Interfaces.InterfacesView;

namespace BackendTienda.Services
{
    public class FiltroCategoryService : IFiltroCategoryService
    {
        private readonly IFiltroCategoryRepositorio _filtroCategoryRepositorio;

        public FiltroCategoryService(IFiltroCategoryRepositorio filtroCategoryRepositorio)
        {
            _filtroCategoryRepositorio = filtroCategoryRepositorio;
        }

        public async Task<List<FiltroCategoryDTO>> GetCategoriesAsync()
        {
            return await _filtroCategoryRepositorio.GetCategoriesAsync();
        }
    }
}