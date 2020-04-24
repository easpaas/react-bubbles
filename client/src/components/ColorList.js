import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(false);
  const [newColor, setNewColor] = useState(initialColor)
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {push} = useHistory();


  const handleAdd = (e) => {
    e.preventDefault()
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', newColor)
      .then(res => {
        setAdd(false);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then((res) => {
      updateColors(colors.map((item) => {
        return item.id === res.data.id ? res.data : item
      }))
      setEditing(false)
    })
    .catch(error => {
      console.log(error)
    })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
      axiosWithAuth()
        .delete(`http://localhost:5000/api/colors/${color.id}`)
        .then((res) => {
          // returns a new array of bubbles with the deleted color removed
          const newColors = colors.filter(bubble => `${bubble.id}` !== color.id);
          updateColors(newColors);
          push('/protected');
        })
        .catch(err => console.log(err));
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
            <button type="submit" onClick={saveEdit}>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* ADD COLOR BUTTON TRIGGERS ADD FORM */}
      <button onClick={() => {setAdd(true)}}>Add color</button>
      {/* IF ADD BUTTON HAS BEEN CLICKED, ADD STATE IS TRUE...SWITCH TO FALSE ON SUBMIT */}
      {add && (
        <form onSubmit={handleAdd}>
          <label htmlFor='name'>
            Color Name: 
            <input 
              placeholder="color name" 
              onChange={e => 
                setNewColor({
                  ...newColor, 
                  color: e.target.value
                })
              }
              />
               {/* value={newColor.color} /> */}
          </label>
          <label htmlFor='hex'>
            Hex Code: 
            <input 
              onChange={e =>
                setNewColor({
                  ...newColor, 
                  code: { hex: e.target.value}
                })
              } 
              placeholder="hex code" 
              />
              {/* value={newColor.code.hex} /> */}
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
