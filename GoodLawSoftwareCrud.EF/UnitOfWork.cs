using GoodLawSoftwareCrud.Core;
using GoodLawSoftwareCrud.Core.Interfaces;
using GoodLawSoftwareCrud.Core.Models;
using GoodLawSoftwareCrud.EF.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoodLawSoftwareCrud.EF
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public IBaseRepository<Author> Authors { get; private set; }
        public IBaseRepository<Book> Books { get; private set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;

            Authors = new BaseRepository<Author>(_context);
            Books = new BaseRepository<Book>(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
