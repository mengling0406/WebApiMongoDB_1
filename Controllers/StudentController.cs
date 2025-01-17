using Microsoft.AspNetCore.Mvc;
using WebApiMongoDB_1.Models;
using WebApiMongoDB_1.Services;

namespace WebApiMongoDB.Controllers
{
    /*
    The [Route] attribute specifies the route template that this controller responds to. 
    This means that any HTTP requests to the path api/student (and related routes) will be handled by this controller.
    */
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentServices _studentServices;

        public StudentController(StudentServices studentServices) {
            _studentServices = studentServices;
        }

        [HttpGet]
        public async Task<List<Student>> Get() => await _studentServices.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Student>> Get(string id)
        {
            Student student = await _studentServices.GetAsync(id);
            if(student == null)
            {
                return NotFound();
            }

            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> Post(Student newStudent)
        {
            await _studentServices.CreateAsync(newStudent);
            return CreatedAtAction(nameof(Get), new {id = newStudent.Id}, newStudent);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Student updateStudent)
        {
            Student student = await _studentServices.GetAsync(id);
            if(student == null)
            {
                return NotFound("There is no student with this id: "+ id);
            }

            updateStudent.Id = student.Id;

            await _studentServices.UpdateAsync(id, updateStudent);

            return Ok("Updated Successfully");
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Student student = await _studentServices.GetAsync(id);
            if (student == null)
            {
                return NotFound("There is no student with this id: " + id);
            }

            await _studentServices.RemoveAsync(id);

            return Ok("Deleted Successfully");
        }
    }
}