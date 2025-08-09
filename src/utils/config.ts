export const config = {
  apiUrl: 'http://localhost:3000', // this needs to be made dynamic
  databaseUrl: process.env.DATABASE_URL,
  
  validate: () => {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
  }
};

if (typeof window === 'undefined') {
  config.validate();
}
