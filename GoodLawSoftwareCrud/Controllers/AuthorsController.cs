using GoodLawSoftwareCrud.Core;
using GoodLawSoftwareCrud.Core.Dtos;
using GoodLawSoftwareCrud.Core.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoodLawSoftwareCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AuthorsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _unitOfWork.Authors.GetAllAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Author entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _unitOfWork.Authors.AddAsync(entity);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0)
                return BadRequest();

            var author = await _unitOfWork.Authors.GetByIdAsync(id);

            if (author == null)
                return NotFound();
            else
                return Ok(author);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest();

            var author = await _unitOfWork.Authors.GetByIdAsync(id);

            if (author == null)
                return NotFound();
            else
                _unitOfWork.Authors.Delete(author);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id,[FromBody] Author entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != entity.Id)
                return NotFound();
            else
                _unitOfWork.Authors.Update(entity);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();

            return Ok();
        }

    }
}
