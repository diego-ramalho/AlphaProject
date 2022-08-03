using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface INewsTransactionalService
    {
        IEnumerable<News> GetAll();

        News GetById(int id);

        void Add(NewsIn entity);

        void Delete(int id);

        void Update(News entity);

        bool SaveChanges();
    }
}
