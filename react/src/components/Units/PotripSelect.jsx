import React, {useState} from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function PotripSelect({items, selectedValue, setSelectedValue, ...props}) {

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl
      margin="dense"
      fullWidth
      size="small"
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleChange}
        {...props}
      >
        {items && items.map((Item) =>
          <MenuItem key={Item.id} value={Item.value}>{Item.text}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default PotripSelect;
