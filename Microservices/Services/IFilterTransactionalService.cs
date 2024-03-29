﻿using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IFilterTransactionalService
    {
        IEnumerable<Filter> GetAll();

        IEnumerable<RegisterFilters> GetFilterRegistersAll();

        Filter GetById(int id);

        void Add(FilterIn zone);

        void Delete(int id);

        void Update(Filter entity);

        bool SaveChanges();
    }
}
