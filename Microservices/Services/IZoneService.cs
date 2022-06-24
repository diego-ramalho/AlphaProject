using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IZoneService
    {
        IEnumerable<Zone> GetAll();

        Zone GetById(int id);

        void Add(ZoneIn zone);

        void Delete(int id);

        void Update(int id, ZoneIn entity);
    }
}
