export default {
  name: 'Typemaster',
  version: '1.0.0',
  extra: {
    apiKey: process.env.REACT_NATIVE_API_KEY,
    authDomain: process.env.REACT_NATIVE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_NATIVE_DB_URL,
    projectId: process.env.REACT_NATIVE_PROJECT_ID,
    storageBucket: process.env.REACT_NATIVE_STORAGE_BUCKET,
    messagingSenderId: process.REACT_NATIVE_SENDER_ID,
    measurementId: process.env.REACT_NATIVE_MEASUREMENT_ID,
  },
};
