using System.Collections.Generic;
using System.Threading.Tasks;
using Push.API.Models;

namespace Push.API.Data
{
    public interface IRemindersRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}