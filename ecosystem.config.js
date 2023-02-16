module.exports = {
  apps : [{
    name: 'api',
    script: './dist/main.js',
    watch: 'false',
    instances: 4,
    exec_mode: 'cluster',
    ignore_watch: ['[\/\\]\./', 'node_modules'],
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: './logs/app-err.log',
    out_file: './logs/app-out.log',
    log: './logs/app.log',

    env: {
      NODE_ENV: "development",
    },
    env_staging: {   
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
    },

  }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
