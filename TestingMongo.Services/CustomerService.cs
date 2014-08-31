using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using TestingMongo.Data;

namespace TestingMongo.Services
{
    public class CustomerService: ICustomerService
    {
        private readonly ICustomerDao _customerDao;

        public CustomerService(ICustomerDao customerDao)
        {
            _customerDao = customerDao;
        }

        public IList<Customer> GetList()
        {
            return _customerDao.GetList();
        }

        public void Save(Customer customer)
        {
            _customerDao.Save(customer);
        }

        public void Update(Customer customer)
        {
            _customerDao.Update(customer);
        }

        public void Delete(Customer customer)
        {
            _customerDao.Delete(customer);
        }

        public Customer GetById(string id)
        {
            return _customerDao.GetById(id);
        }
    }
}
