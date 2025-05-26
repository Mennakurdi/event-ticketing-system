import React from 'react';

export default function ConfirmationDialog({ message, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[300px]">
        <p className="mb-4 text-center">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 border border-gray-400 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
