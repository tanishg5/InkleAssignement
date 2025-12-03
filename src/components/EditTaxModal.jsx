import React, { useState } from "react";
import { FiX, FiChevronDown, FiEdit2 } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";

export default function EditTaxModal({ record, countries, onClose, onSave }) {
  const initialCountry =
    countries.find((c) => c.name === record.country) ||
    countries.find((c) => c.country === record.country);

  const [name, setName] = useState(record.name);
  const [countryId, setCountryId] = useState(initialCountry?.id || "");
  const [countryName, setCountryName] = useState(
    initialCountry?.name || initialCountry?.country || record.country
  );

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onSave({
      ...record,
      name,
      countryId,
      country: countryName,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-xl shadow-lg overflow-visible">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Edit Customer</h2>
          <FiX className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* COUNTRY FIELD */}
          <div className="relative">
            <label className="text-sm font-medium">Country</label>

            {/* Selected value box */}
            <div
              className="w-full mt-1 px-3 py-3 border rounded-lg flex justify-between items-center cursor-pointer bg-gray-50"
              onClick={() => setOpen(!open)}
            >
              <span className="text-gray-800 font-medium">
                {countryName || "Select country"}
              </span>

              {/* Pencil appears ONLY after selecting a country */}
              <div className="flex items-center gap-3">
                {countryName && <FiEdit2 className="text-purple-500 text-sm" />}
                <FiChevronDown className="text-gray-600 text-lg" />
              </div>
            </div>

            {/* DROPDOWN */}
            {open && (
              <div
                className="
                  absolute left-0 right-0 bg-white border rounded-lg shadow-lg mt-2 z-50
                  max-h-60 overflow-y-auto
                "
              >
                {countries.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setCountryId(c.id);
                      setCountryName(c.name || c.country);
                      setOpen(false);
                    }}
                  >
                    {/* Left: map icon + name */}
                    <div className="flex items-center gap-2">
                      <LuMapPin className="text-gray-400 text-lg" />
                      <span className="text-gray-700">{c.name || c.country}</span>
                    </div>

                    {/* Pencil icon */}
                    <FiEdit2 className="text-purple-500 text-sm" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button className="px-4 py-2 border rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
