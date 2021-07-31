using GoodLawSoftwareCrud.Core;
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
    public class BooksController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public BooksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _unitOfWork.Books.GetAllAsync(new[] { "Author" }));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Book entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _unitOfWork.Books.AddAsync(entity);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            if (id <= 0)
                return BadRequest();

            //var book = await _unitOfWork.Books.GetByIdAsync(id);
           var book = await _unitOfWork.Books.GetByIdAsync(id,new[] { "Author"});

            if (book == null)
                return NotFound();
            else
                return Ok(book);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest();

            var book = await _unitOfWork.Books.GetByIdAsync(id);
            if (book == null)
                return NotFound();
            else
                _unitOfWork.Books.Delete(book);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != entity.Id)
                return NotFound();
            else
                _unitOfWork.Books.Update(entity);

            if (_unitOfWork.Complete() == 0)
                return BadRequest();

            return Ok();
        }
    }
}
