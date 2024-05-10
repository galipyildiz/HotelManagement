using HotelManagement.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Service.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Storage> Storages { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<InventoryItemLocation> InventoryItemLocations { get; set; }
        public DbSet<WorkOrder> WorkOrders { get; set; }
        public DbSet<InventoryMovement> InventoryMovements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //many to many
            modelBuilder.Entity<InventoryItem>()
                .HasMany(e => e.Storages)
                .WithMany(e => e.InventoryItems)
                .UsingEntity<InventoryItemLocation>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
