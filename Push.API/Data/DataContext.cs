using Microsoft.EntityFrameworkCore;
using Push.API.Models;

namespace Push.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Reminder> Reminders { get; set; }

    }
}