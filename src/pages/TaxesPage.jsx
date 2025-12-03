import React, { useEffect, useState } from "react";
import TaxTable from "../components/TaxTable";
import EditTaxModal from "../components/EditTaxModal";

export default function TaxesPage() {
  const [taxes, setTaxes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const taxRes = await fetch(
          "https://685013d7e7c42cfd17974a33.mockapi.io/taxes"
        );
        const countryRes = await fetch(
          "https://685013d7e7c42cfd17974a33.mockapi.io/countries"
        );

        setTaxes(await taxRes.json());
        setCountries(await countryRes.json());
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSave = async (updatedRecord) => {
    try {
      await fetch(
        `https://685013d7e7c42cfd17974a33.mockapi.io/taxes/${updatedRecord.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecord),
        }
      );

      setTaxes((prev) =>
        prev.map((row) =>
          row.id === updatedRecord.id ? updatedRecord : row
        )
      );

      setSelected(null);
    } catch (err) {
      alert("Failed to save changes");
    }
  };

  if (loading) return <p className="p-6 text-lg">Loading...</p>;

  return (
    <div className="p-8">

      <TaxTable data={taxes} onEdit={setSelected} />

      {selected && (
        <EditTaxModal
          record={selected}
          countries={countries}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
