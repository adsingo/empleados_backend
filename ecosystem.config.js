module.exports = {
  apps: [{
    name: "empleados-api",
    script: "./src/index.ts",  // ← Cambiar si tu archivo principal es diferente
    instances: "max",       // Usa todos los núcleos de CPU
    exec_mode: "cluster",   // Modo cluster para alta disponibilidad
    interpreter: 'tsx',
    // Variables de entorno de producción
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      // Agregar tus variables aquí:
      // DB_HOST: "tu-base-de-datos.com",
      // DB_USER: "usuario",
      // DB_PASS: "password"
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
      host: 'http://3.130.246.188',  // ← CAMBIAR POR TU IP
      ref: 'origin/main',            // o 'origin/master' según tu rama
      repo: 'git@github.com:adsingo/empleados_backend.git',  // ← CAMBIAR
      path: '/var/www/mi-app',
      'post-deploy': 'mkdir -p logs && npm install && pm2 reload ecosystem.config.js --env production && pm2 save',
      ssh_options: "IdentityFile=~/.ssh/mi-clave-ec2.pem"  // ← CAMBIAR por ruta a tu .pem
    }
  }
};