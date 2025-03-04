using BackendTienda.Data;
using BackendTienda.Interfaces.InterfacesView;
using BackendTienda.DTOs.DTOsVistas;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendTienda.Repositorios
{
    public class FiltroBrandRepositorio : IFiltroBrandRepositorio
    {
        private readonly ApplicationDbContext _context;

        public FiltroBrandRepositorio(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<FiltroBrandDTO>> GetBrandsAsync()
        {
            return await _context.FiltroBrands
                .Select(b => new FiltroBrandDTO { Brand = b.Brand })
                .ToListAsync();
        }
    }
}