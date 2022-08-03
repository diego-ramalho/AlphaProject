using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IChargesTransactionalService
    {
        IEnumerable<Charges> GetAll();

        Charges GetById(int id);

        void Add(ChargesIn entity);

        void Delete(int id);

        void Update(Charges entity);

        bool SaveChanges();
    }
}
