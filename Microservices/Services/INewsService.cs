using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface INewsService
    {
        IEnumerable<News> GetAll();

        News GetById(int id);

        void Add(NewsIn entity);

        void Delete(int id);

        void Update(int id, NewsIn entity);
    }
}
