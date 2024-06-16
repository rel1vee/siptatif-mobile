import React from "react";
import CustomDropdown from "./CustomDropdown";

interface Pembimbing {
  nama: string;
}

interface PembimbingDropdownProps {
  pembimbings: Pembimbing[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const PembimbingDropdown: React.FC<PembimbingDropdownProps> = ({
  pembimbings,
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  const items = pembimbings.map((pembimbing) => ({
    label: pembimbing.nama,
    value: pembimbing.nama,
  }));

  return (
    <CustomDropdown
      items={items}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      placeholder={placeholder}
    />
  );
};

export default PembimbingDropdown;