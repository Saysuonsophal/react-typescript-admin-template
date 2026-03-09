import { HexColorPicker } from "react-colorful";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Input } from "@/components/ui/input";
import { useState } from "react";

type ColorPickerFieldProps = {
  value: string;
  onChange: (value: string) => void;
  presets?: string[];
  showInput?: boolean;
  defaultColor?: string;
};

export function ColorPickerField({
  value,
  onChange,
  presets = [],
  //showInput = true,
  defaultColor = "#3b82f6",
}: ColorPickerFieldProps) {
  const currentColor = value || defaultColor;
  const [open, setOpen] = useState(true);

  return (
    <div className="flex items-center gap-3">
      {/* Preset Colors */}
      {/* {presets.length > 0 &&
        presets.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`h-8 w-8 rounded-full border-2 ${
              currentColor === color ? "border-black" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
          />
        ))} */}

      {/* Popover Picker */}
      {/* <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="h-8 w-8 rounded border"
            style={{ backgroundColor: currentColor }}
          />
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={currentColor} onChange={onChange} />
        </PopoverContent>
      </Popover> */}

      {/* Optional Hex Input */}
      {/* {showInput && (
        <Input
          className="w-24"
          value={currentColor}
          onChange={(e) => onChange(e.target.value)}
        />
      )} */}

      {/* Preview Box */}
      <div
        className="flex items-center gap-3 border rounded-lg p-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-8 h-8 rounded-md border"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm">{value}</span>
      </div>

      {open && (
        <div className="space-y-4 p-4 rounded-xl border bg-popover shadow-md">
          {/* Main Saturation Picker */}
          <HexColorPicker color={value} onChange={onChange} />

          {/* HEX Input */}
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />

          {/* Preset Colors */}
          <div>
            <p className="text-sm mb-2">Saved Colors</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange(color)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    currentColor === color ? "border-black" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
    </div>
  );
}
