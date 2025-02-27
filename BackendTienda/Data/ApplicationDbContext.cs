using Microsoft.EntityFrameworkCore;
using BackendTienda.Models;
using BackendTienda.DTOs;

namespace BackendTienda.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product_models");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("name");
                entity.Property(e => e.Brand)
                    .HasMaxLength(100)
                    .HasColumnName("brand")
                    .IsRequired(false);
                entity.Property(e => e.Category)
                    .HasMaxLength(50)
                    .HasColumnName("category")
                    .IsRequired(false);
                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("text")
                    .IsRequired(false);
                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(255)
                    .HasColumnName("image_url")
                    .IsRequired(false);
            });

            modelBuilder.Entity<ProductVariant>(entity =>
            {
                entity.ToTable("product_variants");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.ModelId).HasColumnName("model_id");
                entity.Property(e => e.Storage)
                    .HasMaxLength(50)
                    .HasColumnName("storage")
                    .IsRequired(false);
                entity.Property(e => e.Ram)
                    .HasMaxLength(50)
                    .HasColumnName("ram")
                    .IsRequired(false);
                entity.Property(e => e.Color)
                    .HasMaxLength(50)
                    .HasColumnName("color")
                    .IsRequired(false);
                entity.Property(e => e.Price)
                    .HasColumnName("price")
                    .HasPrecision(10, 2);
                entity.Property(e => e.Stock)
                    .HasColumnName("stock")
                    .HasDefaultValue(0);

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Variants)
                    .HasForeignKey(d => d.ModelId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ProductVariants_ProductModels");
            });
        }
    }
}