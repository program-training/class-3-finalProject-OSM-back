const allowedOrigins = ["213.151.48.57",'http://localhost', 'http://127.0.0.1', 'http://localhost:8181'];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
