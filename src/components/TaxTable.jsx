import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { FiEdit2, FiFilter } from "react-icons/fi";

export default function TaxTable({ data, onEdit }) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const filterRef = useRef(null);

  
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  
const filteredData = useMemo(() => {
    if (selectedCountries.length === 0) return data;
  
    return data.filter((row) => {
      const countryValue =
        row.country || row.countryName || row.country_code || row.countryId;
  
      return selectedCountries.includes(countryValue);
    });
  }, [selectedCountries, data]);
  

  const columns = useMemo(
    () => [
      {
        id: "entity",
        accessorKey: "entity",
        header: () => <span className="text-gray-600">Entity</span>,
        cell: (info) => (
          <span className="text-indigo-600 cursor-pointer hover:underline">
            {info.getValue() || "—"}
          </span>
        ),
      },

      {
        id: "gender",
        accessorKey: "gender",
        header: () => <span className="text-gray-600">Gender</span>,
        cell: (info) => {
          const value = info.getValue();
          const style =
            value === "Male"
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600";

          return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}>
              {value}
            </span>
          );
        },
      },

      {
        id: "requestDate",
        accessorKey: "requestDate",
        header: () => <span className="text-gray-600">Request date</span>,
        cell: (info) => {
            const date = new Date(info.getValue());
            const formatted = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            console.log(formatted);
            return <span>{formatted}</span>;
          },
          
      },

      {
        id: "country",
        accessorKey: "country",
        header: () => (
          <div ref={filterRef} className="flex items-center gap-2 relative">
            <span className="text-gray-600">Country</span>

            <FiFilter
              className="cursor-pointer text-gray-500"
              onClick={() => setShowFilter(!showFilter)}
            />

            
            {showFilter && (
              <div className="absolute top-7 left-0 bg-white border rounded-md shadow-lg p-3 w-40 z-50">
                {["India", "US", "UK"].map((c) => (
                  <label key={c} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(c)}
                      onChange={() => {
                        setSelectedCountries((prev) =>
                          prev.includes(c)
                            ? prev.filter((x) => x !== c) // remove filter
                            : [...prev, c] // add filter
                        );
                      }}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ),
        cell: (info) => info.getValue(),
      },

      {
        id: "actions",
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => (
          <button
            onClick={() => onEdit(row.original)}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            <FiEdit2 className="text-gray-600" />
          </button>
        ),
      },
    ],
    [showFilter, selectedCountries]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border rounded-xl bg-white shadow-sm overflow-visible relative">
      <thead className="bg-gray-50 relative z-[20] overflow-visible">
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th
                key={header.id}
                className="px-5 py-3 text-left text-sm font-semibold text-gray-600"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
  
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-t hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-5 py-4 text-sm">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}
