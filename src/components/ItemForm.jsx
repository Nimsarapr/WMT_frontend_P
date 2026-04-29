import { useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const defaultValues = {
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
    manufactureDate: "",
  };

  const [formData, setFormData] = useState(() => {
    if (!initialValues) return defaultValues;

    const manufactureDate = initialValues.manufactureDate
      ? (() => {
          const d = new Date(initialValues.manufactureDate);
          return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
        })()
      : "";

    return {
      name: initialValues.name || "",
      category: initialValues.category || "",
      price:
        initialValues.price !== undefined && initialValues.price !== null
          ? initialValues.price
          : "",
      description: initialValues.description || "",
      imageUrl: initialValues.imageUrl || "",
      manufactureDate,
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    if (!payload.manufactureDate) delete payload.manufactureDate;

    onSubmit(payload);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Manufacture Date</label>
      <input
        type="date"
        name="manufactureDate"
        value={formData.manufactureDate}
        onChange={handleChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;