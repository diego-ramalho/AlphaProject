using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface ILogsService
    {
        void Add(LogsIn logs);


        IEnumerable<Logs> GetAll();

        Logs GetById(int id);
    }
}
