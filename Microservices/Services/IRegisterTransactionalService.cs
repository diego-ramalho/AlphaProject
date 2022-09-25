using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IRegisterTransactionalService
    {
        IEnumerable<Register> GetAll();

        Register GetById(int id);

        void Add(RegisterIn register);

        void AddBulk(List<RegisterIn> registers);

        void Delete(int id);

        void Update(Register entity);

        bool SaveChanges();
    }
}
