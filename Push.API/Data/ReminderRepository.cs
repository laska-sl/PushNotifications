using System.Collections.Generic;
using System.Threading.Tasks;
using Push.API.Data;
using Microsoft.EntityFrameworkCore;
using Push.API.Models;
using System.Linq;

namespace Push.API.Data
{
    public class ReminderRepository : IRemindersRepository
    {
        private readonly DataContext _context;
        public ReminderRepository(DataContext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Reminder> GetReminder(int userId, int id)
        {
            var reminder = await _context.Reminders.Where(r => r.UserId == userId).FirstOrDefaultAsync(p => p.Id == id);
            return reminder;
        }

        public async Task<IEnumerable<Reminder>> GetReminders(int userId)
        {
            var reminders = await _context.Reminders.Where(r => r.UserId == userId).ToListAsync();
            return reminders;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Reminders).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Reminders).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}