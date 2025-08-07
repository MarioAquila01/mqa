import React, { useState } from 'react';

const Filters = ({ leads, setFilteredLeads }) => {
  const [etapa, setEtapa] = useState('all');
  const [dataEvento, setDataEvento] = useState('');

  const handleFilter = () => {
    let filtered = leads;

    if (etapa !== 'all') {
      filtered = filtered.filter(lead => lead.selectedOption === etapa);
    }

    if (dataEvento) {
      filtered = filtered.filter(lead => lead.eventDate === dataEvento);
    }

    setFilteredLeads(filtered);
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4">
      <div>
        <label className="text-white mr-2">Etapa:</label>
        <select
          className="p-2 rounded"
          value={etapa}
          onChange={(e) => setEtapa(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="live">Live</option>
          <option value="sala">Sala</option>
          <option value="grupo">Grupo</option>
          <option value="individual">Individual</option>
        </select>
      </div>

      <div>
        <label className="text-white mx-2">Data do Evento:</label>
        <input
          type="date"
          className="p-2 rounded"
          value={dataEvento}
          onChange={(e) => setDataEvento(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
        onClick={handleFilter}
      >
        Filtrar
      </button>
    </div>
  );
};

export default Filters;
