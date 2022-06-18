// const { projects, clients} = require('../sampleData.js')  *sample data

//Mongoose Models                                         * database data
const Project = require('../models/Project');
const Client = require('../models/Client');

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull
} = require('graphql');


//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: ()=>({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

//Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: ()=>({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID}},
            // resolve関数: 受け取ったクエリの解決方法を記述
            // `sampledata`からClientをゲットするため、keyとして上記の引数`id`を指定
            resolve(parent, args) {
                //code to get data from db/other source -> e.g: clients from sampleData.js
                return Client.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db/other source -> e.g: clients from sampleData.js
                return Project.findById(args.id)
            }
        }
    }
});

// Mutations : update data
const mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        // Add a client
        addClient:{
            type: ClientType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });

                return client.save();
            }
        },
        // Delete a Client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id)
            }
        },
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})