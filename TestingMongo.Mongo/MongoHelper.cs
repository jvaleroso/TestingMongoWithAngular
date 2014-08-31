using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace TestingMongo.Mongo
{
    public static class MongoHelper<T> where T:class 
    {
        public static MongoCollection<T> Collection { get; private set; }

        static MongoHelper()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["MongoDb"]
                .ConnectionString;
            var client = new MongoClient(connectionString);
            var server = client.GetServer();
            var database = server
                .GetDatabase(ConfigurationManager.ConnectionStrings["MongoDb"].Name);
            Collection = database.GetCollection<T>(typeof (T).Name.ToLower());
        }
    }
}
