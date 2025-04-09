// src/pages/AdminCanPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // ou votre contexte d'auth

function AdminCanPage() {
  const { user } = useContext(AuthContext); // on suppose que user = { role: 'admin' } si admin
  const navigate = useNavigate();

  // 1. Vérifier le rôle admin dès le montage
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/products"); // Redirige si pas admin
    }
  }, [user, navigate]);

  // 2. État pour le formulaire
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    stock: "",
    image_url: "",
    collection_id: "",
  });

  // 3. Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faire un appel POST à votre API pour créer une cannette
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // éventuellement un token d'auth
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      alert("Cannette créée avec succès !");
      // Optionnel : réinitialiser le formulaire
      setFormData({
        nom: "",
        description: "",
        prix: "",
        stock: "",
        image_url: "",
        collection_id: "",
      });

      // navigate("/products"); // éventuellement, on peut rediriger
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de la cannette");
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <h1 className="text-2xl mb-6">Créer une nouvelle cannette</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
        <div>
          <label htmlFor="nom" className="block font-bold mb-1">Nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-bold mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="prix" className="block font-bold mb-1">Prix (€)</label>
          <input
            id="prix"
            name="prix"
            type="number"
            step="0.01"
            value={formData.prix}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block font-bold mb-1">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block font-bold mb-1">URL de l’image</label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>

        <div>
          <label htmlFor="collection_id" className="block font-bold mb-1">Collection ID</label>
          <input
            id="collection_id"
            name="collection_id"
            type="number"
            value={formData.collection_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded mt-4"
        >
          Créer
        </button>
      </form>
    </div>
  );
}

export default AdminCanPage;
