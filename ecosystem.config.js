module.exports = {
  apps: [{
    name: "empleados-api",
    script: "./src/index.ts",
    instances: 1,                    // ✅ Una instancia es suficiente
    autorestart: true,
    watch: false,
    interpreter: 'tsx',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "production",
      PORT: 3000
    },
    
    // Configuración de logs
    error_file: "/var/www/mi-app/logs/err.log",
    out_file: "/var/www/mi-app/logs/out.log",
    log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    merge_logs: true
  }],
  
  // Configuración de CI/CD
  deploy: {
    production: {
      user: 'ubuntu',
      host: '3.130.246.188',         // ✅ SIN http://
      ref: 'origin/main',
      repo: 'git@github.com:adsingo/empleados_backend.git',
      path: '/var/www/mi-app',
      'post-deploy': 'mkdir -p logs && npm install && pm2 reload ecosystem.config.js --env production && pm2 save',
      ssh_options: "IdentityFile=~/.ssh/mi-clave-ec2.pem"
    }
  }
};