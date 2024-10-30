using WebApiTemplate.Dtos;

namespace WebApiTemplate.Services
{
    public interface ILogsTransactionalService
    {
        void Add(LogsIn logs);
    }
}
