module.exports = {
  servers: {
    one: {
      host: '52.14.63.199',
      username: 'ubuntu',
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
      "pem": "../../yo.pem"
    }
  },

  meteor: {
    name: 'gov-emailer',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://emailer.macbrowne.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: "abernix/meteord:base",
    deployCheckWaitTime: 300
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
