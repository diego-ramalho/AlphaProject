using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IRegisterTransactionalService
    {
        IEnumerable<Register> GetAll();

        Register GetById(int id);

        void Add(RegisterIn zone);

        void Delete(int id);

        void Update(Register entity);

        bool SaveChanges();
    }
}
