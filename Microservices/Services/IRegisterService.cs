using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IRegisterService
    {
        IEnumerable<Register> GetAll();

        Register GetById(int id);

        void Add(RegisterIn zone);

        void Delete(int id);

        void Update(int id, RegisterIn entity);
    }
}
