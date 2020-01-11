using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Push.API.Data;
using Push.API.DTOs;

namespace Push.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/reminders")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly IRemindersRepository _repo;
        private readonly IMapper _mapper;
        public RemindersController(IRemindersRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetReminders(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var reminders = await _repo.GetReminders(userId);

            var remindersToReturn = _mapper.Map<IEnumerable<ReminderForReturnDTO>>(reminders);

            return Ok(remindersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReminder(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var reminderFromRepo = await _repo.GetReminder(userId, id);

            var reminder = _mapper.Map<ReminderForReturnDTO>(reminderFromRepo);

            return Ok(reminder);
        }

        [HttpPost]
        public async Task<IActionResult> AddReminderForUser(int userId, [FromForm]ReminderForCreationDTO reminderForCreationDTO)
        {
            throw new NotImplementedException();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int userId, int id)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int userId, int id)
        {
            throw new NotImplementedException();
        }



    }
}
