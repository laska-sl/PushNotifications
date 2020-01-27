using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Push.API.Data;
using Push.API.DTOs;
using Push.API.Models;

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
            var user = await _repo.GetUser(userId);
            if (!user.Reminders.Any(r => r.Id == id))
                return Unauthorized();

            var reminderFromRepo = await _repo.GetReminder(id);

            var reminder = _mapper.Map<ReminderForReturnDTO>(reminderFromRepo);

            return Ok(reminder);
        }

        [HttpPost]
        public async Task<IActionResult> AddReminderForUser(int userId, ReminderForCreationDTO reminderForCreationDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var reminder = _mapper.Map<Reminder>(reminderForCreationDTO);

            userFromRepo.Reminders.Add(reminder);

            if (await _repo.SaveAll())
            {
                var reinderForReturn = _mapper.Map<ReminderForReturnDTO>(reminder);

                return Ok();
            }

            return BadRequest("Could not add the reminder");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int userId, int id, ReminderForUpdateDTO reminderForUpdateDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.Reminders.Any(r => r.Id == id))
                return Unauthorized();

            var reminder = await _repo.GetReminder(id);

            _mapper.Map(reminderForUpdateDTO, reminder);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.Reminders.Any(r => r.Id == id))
                return Unauthorized();

            var reminderFromRepo = await _repo.GetReminder(id);

            _repo.Delete(reminderFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the reminder");

        }



    }
}
