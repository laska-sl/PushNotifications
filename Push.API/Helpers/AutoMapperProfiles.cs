using System.Linq;
using AutoMapper;
using Push.API.DTOs;
using Push.API.Models;

namespace Push.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDTO>();
            CreateMap<Reminder, ReminderForReturnDTO>();
        }

    }
}