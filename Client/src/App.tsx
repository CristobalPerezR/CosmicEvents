import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    // Aquí puedes envolver el router con Proveedores de Contexto (Auth, Theme, etc.)
    // que necesiten estar disponibles en todo el cosmos de tu app.
    <AppRouter />
  );
}

export default App;