using HotelManagement.Data.Models;

namespace HotelManagement.Service.Services
{
    public interface IRepository<T> where T : Base
    {
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
    }
}
