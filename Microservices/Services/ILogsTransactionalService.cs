using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface ILogsTransactionalService
    {
        void Add(LogsIn logs);

        IEnumerable<Logs> GetAll();

        Logs GetById(int id);
    }
}
