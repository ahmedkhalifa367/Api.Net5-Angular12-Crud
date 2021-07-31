using GoodLawSoftwareCrud.Core.Interfaces;
using GoodLawSoftwareCrud.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoodLawSoftwareCrud.Core
{
    public interface IUnitOfWork : IDisposable
    {
        IBaseRepository<Author> Authors { get; }
        IBaseRepository<Book> Books { get; }


        int Complete();
    }
}
