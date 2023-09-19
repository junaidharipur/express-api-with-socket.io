export const GlobalSettings = {
  app: {
    port: process.env.PORT || 8080,
    jwtSecret: "abc123",
  },
  database: {
    connection_string: process.env.DATABASE_URL!,
  },
};
