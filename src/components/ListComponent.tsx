import React, { useState, useEffect, ComponentType } from 'react';
import { Link } from 'react-router-dom';
import mongoose from 'mongoose';

interface ItemListProps {
  title: string
  link: string
}

interface ListItem {
  getItemName() : string
  getId() : string
}

export const ListComponent: React.FC<ItemListProps> = ({ title, link }) => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems : ListItem[] = await mongoose.model('Atletas').find()
      setItems(fetchedItems);
    };

    fetchItems();
  }, [search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.getItemName().toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="ListComponent">
      <h1>{title}</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearchChange}
      />
      <Link to={link} className="button-link">
      <button>Crear Atleta</button>
        </Link>
      <ul>
        {filteredItems.map(item => (
          <li key={item.getId()}>{item.getItemName()}</li>
        ))}
      </ul>
    </div>
  );
};
