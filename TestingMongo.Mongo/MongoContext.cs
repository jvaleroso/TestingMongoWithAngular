using System.Collections.Concurrent;
using System.Configuration;
using MongoDB.Driver;
using TestingMongo.Mongo.Properties;

namespace TestingMongo.Mongo
{
    public class MongoContext
    {
        private static readonly ConcurrentDictionary<string, MongoClient> MongoClients
            = new ConcurrentDictionary<string, MongoClient>();

        private readonly string _connectionString;
        private readonly string _db;

        public MongoContext():
            this(ConfigurationManager.ConnectionStrings[Settings.Default.ConnectionStringName].ConnectionString,
            Settings.Default.Database)
        {
        }

        public MongoContext(string connectionString, string db)
        {
            _connectionString = connectionString;
            _db = db;
        }

        public MongoCollection GetCollection(string collectionName)
        {
            MongoClient mongoClient;

            if (!MongoClients.TryGetValue(_connectionString, out mongoClient))
            {
                mongoClient = new MongoClient(_connectionString);
                MongoClients.TryAdd(_connectionString, mongoClient);
            }

            var db = mongoClient.GetServer().GetDatabase(_db);
            return db.GetCollection(collectionName);
        }
    }
}
