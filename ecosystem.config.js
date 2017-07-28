module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'server',
      script    : 'server/server.js',
      env: {
        COMMON_VARIABLE: 'true',
        MG_KEY: 'key-bd23c419f97d297c4dfddf069c04974d',
        MG_DOMAIN: 'mg.gennuity.org'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
    {
      name      : 'testrpc',
      script    : 'bin/testrpc.sh',
      env: {
        COMMON_VARIABLE: 'true',
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

    /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};