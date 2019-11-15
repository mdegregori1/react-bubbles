import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};




const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [add, setAdd] = useState({ 
    color: '', 
    code: { hex: ''}
  })

  const handleChange = (event, hex) => {
    setAdd({...add,  [event.target.name]: hex ? { hex } : event.target.value })
  }
  
  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

      const submitForm = event => {
        event.preventDefault();
        axiosWithAuth()
        .post(`http://localhost:5000/api/colors`, add)
        .then( response => {
            console.log('response after adding color', response.data);
        })
      }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log(response)
      setColorToEdit(colorToEdit)
    })
    .catch( err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(response => console.log('erased color',response))
    .catch(err => console.log(err.response));

  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div />
      <form onSubmit={submitForm}>
        <input
        type="text"
        name="color"
        placeholder="color name"
        value={add.color}
        onChange={handleChange}
        />
        <input
        type="text"
        name="code"
        placeholder="hex code"
        value={add.code.hex}
        onChange={(e) => handleChange(e, e.target.value)} 
        />
        <button type='submit'>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
