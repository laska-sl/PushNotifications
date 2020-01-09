using System;
using Push.API.Models;

namespace Push.API.DTOs
{
    public class ReminderForListDTO
    {
        public int Id { get; set; }
        public DateTime ResponseTime { get; set; }
        public string Text { get; set; }
    }
}