import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, PenTool, Type } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  initialName?: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState(initialName);
  const [selectedFont, setSelectedFont] = useState<'cursive' | 'serif' | 'script'>('cursive');
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#1a365d'; // Deep executive blue
      }
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSave = () => {
    if (mode === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        onSave(canvas.toDataURL('image/png'));
        onClose();
      }
    } else {
      // Create a canvas with typed calligraphy signature
      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 400;
      offscreenCanvas.height = 150;
      const ctx = offscreenCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        ctx.fillStyle = '#1e3a8a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (selectedFont === 'cursive') {
          ctx.font = 'italic bold 36px "Brush Script MT", "Caveat", "Segoe Script", cursive';
        } else if (selectedFont === 'script') {
          ctx.font = 'italic 34px "Lucida Handwriting", "Apple Chancery", cursive';
        } else {
          ctx.font = 'italic 32px "Georgia", serif';
        }
        
        ctx.fillText(typedName || initialName || 'Signature', 200, 75);
        onSave(offscreenCanvas.toDataURL('image/png'));
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-lg">Digital Signature Pad</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition ${
              mode === 'draw'
                ? 'bg-white shadow-xs text-blue-700 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Draw Signature
          </button>
          <button
            type="button"
            onClick={() => setMode('type')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition ${
              mode === 'type'
                ? 'bg-white shadow-xs text-blue-700 border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-4 h-4" />
            Type Calligraphy
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {mode === 'draw' ? (
            <div>
              <p className="text-xs text-slate-500 mb-2">
                Use your mouse, trackpad, or stylus to draw your statutory signature below:
              </p>
              <div className="border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={460}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 cursor-crosshair touch-none"
                />
              </div>
              <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
                <span>Sign above the line</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Pad
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Name for Signature
                </label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Calligraphic Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['cursive', 'script', 'serif'] as const).map((font) => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => setSelectedFont(font)}
                      className={`p-3 border rounded-lg text-center transition ${
                        selectedFont === font
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-600'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span
                        className="text-lg block capitalize"
                        style={{
                          fontFamily:
                            font === 'cursive'
                              ? 'Brush Script MT, cursive'
                              : font === 'script'
                              ? 'Lucida Handwriting, cursive'
                              : 'Georgia, serif',
                          fontStyle: 'italic'
                        }}
                      >
                        {typedName || 'Signature'}
                      </span>
                      <span className="text-[11px] text-slate-500 capitalize">{font}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-medium text-sm transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm flex items-center gap-2 shadow-xs transition"
          >
            <Check className="w-4 h-4" />
            Apply Signature
          </button>
        </div>
      </div>
    </div>
  );
};
