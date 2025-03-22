module.exports = {
  apps: [
    {
      name: 'FinGenie',
      script: 'npm',
      args: 'run start',
      env: { NODE_ENV: 'production' },
    },
  ],
}
