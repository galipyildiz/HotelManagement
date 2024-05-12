using HotelManagement.Data.Models;
using HotelManagement.Service.Data;
using HotelManagement.Service.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Service.Services
{
    public class EFRepository<T> : IRepository<T> where T : Base
    {
        private readonly HotelManagementDbContext _dbContext;

        public EFRepository(HotelManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<T> AddAsync(T entity)
        {
            _dbContext.Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _dbContext.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            var result = await _dbContext.Set<T>().OrderBy(x => x.Id).ToListAsync();
            return result;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var result = await _dbContext.FindAsync<T>(id);
            if (result == null)
                throw new NullReferenceException($"{id} not found");

            return result;
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
