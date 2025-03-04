using BackendTienda.Data;
using BackendTienda.Interfaces.InterfacesView;
using BackendTienda.DTOs.DTOsVistas;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendTienda.Repositorios
{
    public class FiltroCategoryRepositorio : IFiltroCategoryRepositorio
    {
        private readonly ApplicationDbContext _context;

        public FiltroCategoryRepositorio(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<FiltroCategoryDTO>> GetCategoriesAsync()
        {
            return await _context.FiltroCategory
                .Select(b => new FiltroCategoryDTO { Category = b.Category })
                .ToListAsync();
        }

        
    }
}