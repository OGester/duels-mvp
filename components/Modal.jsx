"use client";

import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
        <button className="absolute top-3 right-3 text-black" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
