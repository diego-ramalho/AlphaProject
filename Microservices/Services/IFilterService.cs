using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IFilterService
    {
        IEnumerable<Filter> GetAll();

        IEnumerable<RegisterFilters> GetFilterRegistersAll();

        Filter GetById(int id);

        void Add(FilterIn zone);

        void Delete(int id);

        void Update(int id, FilterIn entity);
    }
}
