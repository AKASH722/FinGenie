import dotenv from 'dotenv'

/**
 * Load environment variables from a .env file into process.env
 */
const env = dotenv.config()

// Throw an error if there is an issue loading the environment variables
if (env.error) {
  console.error(env.error)
}

const config = {
  PORT: parseInt(process.env.PORT || '80', 10),
}

export default config
