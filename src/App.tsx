import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#333", color: "white", padding: "20px", minHeight: "100vh" }}>
      <h2>MINI ERP</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "15px 0" }}><Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link></li>
        <li><Link to="/productos" style={{ color: "white", textDecoration: "none" }}>Productos</Link></li>
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Panel Principal</h1>
      <p>Bienvenido al sistema Mini ERP.</p>
    </div>
  );
}

function Productos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [form, setForm] = useState({ nombre: "", codigo: "", precio: "", stock: "", categoria: "" });

  const cargar = async () => {
    try {
      const res = await fetch(`${API_URL}/productos`);
      const data = await res.json();
      if (data.success) setProductos(data.data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  useEffect(() => { cargar(); }, []);

  const guardar = async (e: any) => {
    e.preventDefault();
    await fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, precio: Number(form.precio), stock: Number(form.stock) })
    });
    setForm({ nombre: "", codigo: "", precio: "", stock: "", categoria: "" });
    cargar();
  };

  const eliminar = async (id: number) => {
    if (window.confirm("¿Eliminar producto?")) {
      await fetch(`${API_URL}/productos/${id}`, { method: "DELETE" });
      cargar();
    }
  };

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <form onSubmit={guardar} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required />
        <input type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required />
        <input placeholder="Categoría" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} />
        <button type="submit">Guardar</button>
      </form>
      
      <table border={1} cellPadding={10} style={{ width: "100%", background: "white", borderCollapse: "collapse" }}>
        <thead style={{ background: "#ddd" }}>
          <tr><th>ID</th><th>Nombre</th><th>Código</th><th>Precio</th><th>Stock</th><th>Acción</th></tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nombre}</td><td>{p.codigo}</td><td>${p.precio}</td><td>{p.stock}</td>
              <td><button onClick={() => eliminar(p.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;