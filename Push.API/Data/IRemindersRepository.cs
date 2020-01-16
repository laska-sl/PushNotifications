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
        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetUsers();
        Task<IEnumerable<Reminder>> GetReminders(int userId);
        Task<Reminder> GetReminder(int id);
    }
}