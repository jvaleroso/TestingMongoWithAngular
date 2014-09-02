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
            this._connectionString = connectionString;
            this._db = db;
        }

        public MongoCollection GetCollection(string collectionName)
        {
            MongoClient mongoClient;

            if (!MongoClients.TryGetValue(this._connectionString, out mongoClient))
            {
                mongoClient = new MongoClient(this._connectionString);
                MongoClients.TryAdd(this._connectionString, mongoClient);
            }

            var db = mongoClient.GetServer().GetDatabase(this._db);
            return db.GetCollection(collectionName);
        }
    }
}
