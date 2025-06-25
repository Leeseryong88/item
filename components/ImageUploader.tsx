import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { useTranslation } from '../hooks/useTranslation';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, disabled }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      // Validate file type (optional, browser also does this with 'accept')
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      } else {
        // Handle invalid file type, e.g., show an error message
        console.warn("Invalid file type dropped:", file.type);
      }
    }
  }, [onImageUpload, disabled]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full max-w-2xl p-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center w-full h-80 border-4 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                    ${isDragging ? 'border-purple-500 bg-purple-900 bg-opacity-30 scale-105' : 'border-gray-600 hover:border-purple-400'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        role="group"
        aria-label={t('uploader.inputAccessibilityLabel')}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/*" // Added image/* for broader mobile compatibility for camera/gallery
          onChange={handleFileChange}
          className="hidden"
          id="imageUploadInput"
          disabled={disabled}
          aria-labelledby="imageUploadLabel"
        />
        <label htmlFor="imageUploadInput" id="imageUploadLabel" className={`flex flex-col items-center justify-center w-full h-full p-5 text-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <UploadIcon className={`w-16 h-16 mb-6 ${isDragging ? 'text-purple-400' : 'text-gray-500 group-hover:text-purple-400'}`} aria-hidden="true" />
          <p className={`text-xl font-semibold ${isDragging ? 'text-purple-300' : 'text-gray-300'}`}>
            {t('uploader.dragDrop')}
          </p>
          <p className={`text-sm ${isDragging ? 'text-purple-400' : 'text-gray-500'}`}>
            {t('uploader.browse')}
          </p>
          {isDragging && !disabled && (
             <p className="mt-4 text-lg font-bold text-purple-400">{t('uploader.releaseToUpload')}</p>
          )}
        </label>
      </div>
      <p className="mt-6 text-center text-gray-400 text-sm max-w-md mx-auto">
        {t('uploader.instructions')}
      </p>
      <p className="mt-2 text-center text-purple-400 text-sm font-medium">
        {t('uploader.mobileSupport')}
      </p>
    </div>
  );
};
