/*
This is a service class StudentServices in a .NET application, specifically using ASP.NET Core and MongoDB. 
This class is responsible for interacting with a MongoDB collection to perform CRUD (Create, Read, Update, Delete) operations on Student documents.
*/

using Microsoft.Extensions.Options; //Used to access configuration settings
using MongoDB.Driver; //MongoDB .NET driver for interacting with a MongoDB database
using WebApiMongoDB_1.Models;
using WebApiMongoDB_1.Data;

namespace WebApiMongoDB_1.Services
{
    public class StudentServices
    {
        private readonly IMongoCollection<Student> _studentCollection;

        /*
        Constructor that initializes the MongoDB client and database, 
        and sets up the collection reference using the provided configuration settings
        */
        public StudentServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _studentCollection = mongoDb.GetCollection<Student>(settings.Value.CollectionName); //Represents the MongoDB collection of Student documents.
        }

        // Retrieves all student documents from the collection.
        public async Task<List<Student>> GetAsync() => await _studentCollection.Find(_ => true).ToListAsync();
        

        // Retrieves a single student document by its ID.
        public async Task<Student> GetAsync(string id) =>
            await _studentCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // Inserts a new student document into the collection.
        public async Task CreateAsync(Student newStudent) =>
            await _studentCollection.InsertOneAsync(newStudent);

        // Replaces an existing student document with the updated data.
        public async Task UpdateAsync(string id, Student updateStudent) =>
            await _studentCollection.ReplaceOneAsync(x=> x.Id == id, updateStudent);

        // Deletes a student document by its ID.
        public async Task RemoveAsync(string id)=>
            await _studentCollection.DeleteOneAsync(x=> x.Id == id);
    }
}

/*
async: Indicates that the method is asynchronous 
await: Awaits the completion of the asynchronous operation
Task: The return type is Task, which represents an asynchronous operation. This means the method does not return a value but allows the caller to await its completion.
*/