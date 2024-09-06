import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductDetailsDialog = ({ product, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm mx-auto bg-white p-6 rounded shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover object-center mt-4"
          />
          <div className="mt-4">
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-2 text-base font-medium text-gray-900">${product.price}</p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProductDetailsDialog;
