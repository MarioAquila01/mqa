// src/components/Admin/Filters.jsx
import React, { useMemo, useState } from 'react';

const HOURS_NEW = 48; // janela p/ "novo"

const onlyDate = (iso) => {
  if (!iso) return '';
  // retorna YYYY-MM-DD
  return new Date(iso).toISOString().slice(0, 10);
};

const isWithinHours = (iso, hours = HOURS_NEW) => {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return Date.now() - t <= hours * 60 * 60 * 1000;
};

const Filters = ({ leads, setFilteredLeads }) => {
  const [etapa, setEtapa] = useState('all');
  const [dataEvento, setDataEvento] = useState('');
  const [cadastroDe, setCadastroDe] = useState('');   // YYYY-MM-DD
  const [cadastroAte, setCadastroAte] = useState(''); // YYYY-MM-DD
  const [somenteNovos, setSomenteNovos] = useState(false);

  // opções distintas de etapas encontradas nos leads (normaliza)
  const etapaOptions = useMemo(() => {
    const base = new Set(['live', 'sala', 'grupo', 'individual']);
    (leads || []).forEach(l => {
      const e = (l?.selectedOption || '').toString().toLowerCase();
      if (e) base.add(e);
    });
    return Array.from(base);
  }, [leads]);

  const aplicarFiltro = () => {
    let filtered = Array.isArray(leads) ? [...leads] : [];

    // Etapa
    if (etapa !== 'all') {
      filtered = filtered.filter((lead) => {
        const val = (lead?.selectedOption || '').toString().toLowerCase();
        return val === etapa;
      });
    }

    // Data do evento (igualdade de data no formato YYYY-MM-DD)
    if (dataEvento) {
      filtered = filtered.filter((lead) => {
        const ev = (lead?.eventDate || '').toString().slice(0, 10);
        return ev === dataEvento;
      });
    }

    // Janela por "Cadastrado em" (createdAt / created_at)
    if (cadastroDe || cadastroAte) {
      filtered = filtered.filter((lead) => {
        const created = onlyDate(lead?.createdAt || lead?.created_at);
        if (!created) return false;
        if (cadastroDe && created < cadastroDe) return false;
        if (cadastroAte && created > cadastroAte) return false;
        return true;
      });
    }

    // Somente "Novos" (últimas HOURS_NEW horas)
    if (somenteNovos) {
      filtered = filtered.filter((lead) => isWithinHours(lead?.createdAt || lead?.created_at));
    }

    setFilteredLeads(filtered);
  };

  // Atalhos de período
  const setUltimas24h = () => {
    const now = new Date();
    const de = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    setCadastroDe(de.toISOString().slice(0, 10));
    setCadastroAte(now.toISOString().slice(0, 10));
  };

  const setUltimos7d = () => {
    const now = new Date();
    const de = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    setCadastroDe(de.toISOString().slice(0, 10));
    setCadastroAte(now.toISOString().slice(0, 10));
  };

  const limpar = () => {
    setEtapa('all');
    setDataEvento('');
    setCadastroDe('');
    setCadastroAte('');
    setSomenteNovos(false);
    setFilteredLeads(Array.isArray(leads) ? leads : []);
  };

  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">
      {/* Etapa */}
      <div className="flex flex-col">
        <label className="text-white mb-1">Etapa</label>
        <select
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={etapa}
          onChange={(e) => setEtapa(e.target.value)}
        >
          <option value="all">Todas</option>
          {etapaOptions.map((opt) => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Data do Evento */}
      <div className="flex flex-col">
        <label className="text-white mb-1">Data do Evento</label>
        <input
          type="date"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={dataEvento}
          onChange={(e) => setDataEvento(e.target.value)}
        />
      </div>

      {/* Cadastrado entre (De / Até) */}
      <div className="flex flex-col">
        <label className="text-white mb-1">Cadastrado de</label>
        <input
          type="date"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={cadastroDe}
          onChange={(e) => setCadastroDe(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-white mb-1">Cadastrado até</label>
        <input
          type="date"
          className="p-2 rounded bg-gray-900 border border-gray-700 text-white"
          value={cadastroAte}
          onChange={(e) => setCadastroAte(e.target.value)}
        />
      </div>

      {/* Checkbox Somente Novos */}
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={somenteNovos}
          onChange={(e) => setSomenteNovos(e.target.checked)}
        />
        Somente novos (últimas {HOURS_NEW}h)
      </label>

      {/* Botões */}
      <div className="flex gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={aplicarFiltro}
        >
          Filtrar
        </button>

        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
          onClick={limpar}
        >
          Limpar
        </button>
      </div>

      {/* Atalhos */}
      <div className="flex gap-2">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded"
          onClick={setUltimas24h}
          title="Define De/Até para últimas 24h"
        >
          Últimas 24h
        </button>
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded"
          onClick={setUltimos7d}
          title="Define De/Até para últimos 7 dias"
        >
          Últimos 7 dias
        </button>
      </div>
    </div>
  );
};

export default Filters;
