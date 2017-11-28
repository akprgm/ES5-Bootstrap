const redis = require('redis');

/**
 * module for intialzing redis connection
 */
let Module = (function () {
  let instance;

  /**
   * private method for creating instance of redis connection
   * @return redis connection
   */
  function createInstance() {
    return redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      detect_buffers: true
    });
  }

  return {
    getInstance: function () {
      let promiseObj = new Promise((resolve, reject)=>{
        if (!instance) {
          instance = createInstance();
        }

        if (instance) {
          resolve(instance);
        } else {
          reject("Unable to create connection with redis, please make sure redis server is running.");
        }

      })

      return promiseObj;
    }
  };
})();

module.exports = Module.getInstance();
