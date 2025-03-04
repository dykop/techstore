using BackendTienda.Interfaces.InterfacesView;
using BackendTienda.DTOs.DTOsVistas;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendTienda.Services
{
    public class FiltroBrandService : IFiltroBrandService
    {
        private readonly IFiltroBrandRepositorio _filtroBrandRepositorio;

        public FiltroBrandService(IFiltroBrandRepositorio filtroBrandRepositorio)
        {
            _filtroBrandRepositorio = filtroBrandRepositorio;
        }

        public async Task<List<FiltroBrandDTO>> GetBrandsAsync()
        {
            return await _filtroBrandRepositorio.GetBrandsAsync();
        }
    }
}
