import React, { useState, useEffect } from 'react';

const DevelopmentTable = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients] = useState([
        { id: 1, name: 'Danışan 1' },
        { id: 2, name: 'Danışan 2' }
    ]);

    useEffect(() => {
        if (selectedClient) {

        }
    }, [selectedClient]);

    const handleClientSelect = (clientId) => {
        setSelectedClient(clientId);
    };

    return (
        <div className="mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Danışan Takip</h1>
            <div className="mb-4">
                <label htmlFor="clientSelect" className="block font-semibold">Danışan Seç:</label>
                <select
                    id="clientSelect"
                    onChange={(e) => handleClientSelect(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                    value={selectedClient || ""}
                >
                    <option value="">Danışan Seçiniz</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>
            {selectedClient && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Danışan {selectedClient} için bilgiler</h2>

                </div>
            )}
        </div>
    );
};

export default DevelopmentTable;
