using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class ZoneService : IZoneService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IZoneTransactionalService _zoneTransactionalService;

        public ZoneService(AppDbContext context, IMapper mapper,
            IZoneTransactionalService zoneTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _zoneTransactionalService = zoneTransactionalService;
        }

        public IEnumerable<Zone> GetAll()
        {
            return _context.Zones.ToList();
        }

        public Zone GetById(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _zoneTransactionalService.GetById(id);

            return _entity;
        }

        public void Add(ZoneIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _zoneTransactionalService.Add(entity);
        }

        public void Update(int id, ZoneIn entity)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Zones.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _entity.ZoneName = entity.ZoneName;

            _zoneTransactionalService.Update(_entity);
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _zoneTransactionalService.Delete(id);
        }
    }
}
