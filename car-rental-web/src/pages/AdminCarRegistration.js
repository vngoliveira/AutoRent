import React, { useState } from 'react';
import '../styles/AdminCarRegistration.css';

const AdminCarRegistration = () => {
  const [formData, setFormData] = useState({
    model: '',
    category: '',
    dailyRate: '',
    availability: true,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Carro cadastrado com sucesso!');
        setFormData({ model: '', category: '', dailyRate: '', availability: true });
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao cadastrar carro: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Erro ao cadastrar carro.');
    }
  };

  return (
    <div className="admin-car-registration">
      <h1>Cadastro de Carros</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo:
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoria:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Preço por Dia:
          <input
            type="number"
            name="dailyRate"
            value={formData.dailyRate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Disponível:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminCarRegistration;
