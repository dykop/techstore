using AutoMapper;
using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Mapeo de Product <-> ProductoDTO
            CreateMap<Product, ProductoDTO>();
            CreateMap<ProductoDTO, Product>();

            // Mapeo de ProductVariant <-> ProductVariantDTO
            CreateMap<ProductVariant, ProductVariantDTO>()
                .ForMember(dest => dest.ModelId, opt => opt.MapFrom(src => src.ModelId));
            CreateMap<ProductVariantDTO, ProductVariant>()
                .ForMember(dest => dest.ModelId, opt => opt.MapFrom(src => src.ModelId));

            // Mapeo para creación
            CreateMap<CreateProductoDto, Product>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
            CreateMap<CreateVariantDto, ProductVariant>();
        }
    }
}