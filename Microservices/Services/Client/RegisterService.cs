using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class RegisterService : IRegisterService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IRegisterTransactionalService _registerTransactionalService;

        public RegisterService(AppDbContext context, IMapper mapper,
            IRegisterTransactionalService registerTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _registerTransactionalService = registerTransactionalService;
        }

        public IEnumerable<Register> GetAll()
        {
            //var _userZone = new UserZones();

            //if (_user.RoleId == 2) //Not Admin
            //    _userZone = _context.UserZones.FirstOrDefault(p => p.UserId == _user.Id);

            //var teste = _context.I.Items["User"];


            return _context.Registers.OrderBy(r => r.Address).ToList();
        }

        public Register GetById(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _registerTransactionalService.GetById(id);

            return _entity;
        }

        public void Add(RegisterIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _registerTransactionalService.Add(entity);
        }

        public void AddBulk(List<RegisterIn> entities)
        {
            if (entities == null) throw new ArgumentNullException(nameof(entities));

            _registerTransactionalService.AddBulk(entities);
        }

        public void Update(int id, RegisterIn entity)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Registers.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _entity.Address = entity.Address;
            _entity.Name = entity.Name;
            _entity.Number = entity.Number;
            _entity.Phone = entity.Phone;
            _entity.Observation = entity.Observation;
            _entity.Tracing = entity.Tracing;
            _entity.Number = entity.Number;
            _entity.ZoneId = entity.ZoneId;

            _registerTransactionalService.Update(_entity);
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _registerTransactionalService.Delete(id);
        }
    }
}
