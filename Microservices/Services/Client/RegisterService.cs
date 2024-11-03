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

        public int Add(RegisterIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var registerCreatedId = _registerTransactionalService.Add(entity);

            return registerCreatedId;
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
            _entity.Dni = entity.Dni;
            _entity.LastContact = entity.LastContact;
            _entity.Email = entity.Email;
            _entity.SaleDate = entity.SaleDate;
            _entity.Adviser = entity.Adviser;
            _entity.FinalSalePrice = entity.FinalSalePrice;
            _entity.Reduction = entity.Reduction;
            _entity.Particular = entity.Particular;
            _entity.RealEstate = entity.RealEstate;
            _entity.Fee = entity.Fee;
            _entity.Observation = entity.Observation;
            _entity.Tracing = entity.Tracing;
            _entity.Number = entity.Number;
            _entity.LastUpdate = entity.LastUpdate;
            _entity.ZoneId = entity.ZoneId;

            _registerTransactionalService.Update(_entity);

            if (_entity.Id > 0)
            {
                var _getEntity = _context.RegisterFilters.Where(f => f.RegisterId == _entity.Id).ToList();

                if (_getEntity.Count > 0) {
                    _context.RegisterFilters.RemoveRange(_getEntity);
                }
            }

            if (_entity.Id > 0 && entity.filterList.Count() > 0)
            {
                List<RegisterFilters> _registerFilters = new List<RegisterFilters>();

                foreach (var item in entity.filterList)
                {
                    _registerFilters.Add(new RegisterFilters() { RegisterId = _entity.Id, FilterId = int.Parse(item) });
                };

                _context.RegisterFilters.AddRange(_registerFilters);
            }

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _registerTransactionalService.Delete(id);
        }
    }
}
