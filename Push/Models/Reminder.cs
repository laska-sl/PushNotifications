using System;
using System.Collections.Generic;

namespace Push.API.Models
{
    public class Reminder
    {
        public int Id { get; set; }
        public DateTime ResponseTime { get; set; }
        public string Text { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}