import React, {useState} from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function PotripSelect({items, ...props}) {
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <FormControl
      margin="dense"
      fullWidth
      size="small"
    >
      <InputLabel id={`potrip-select-label-${props.name}`}>{props.label}</InputLabel>
      <Select
        labelId={`potrip-select-label-${props.name}`}
        id={`potrip-simple-select-${props.name}`}
        value={selectValue}
        onChange={handleChange}
        {...props}
      >
        {items && items.map((Item) => (
          <MenuItem key={Item.id} value={Item.value}>{Item.text}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PotripSelect;
