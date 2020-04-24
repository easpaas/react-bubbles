import React, { useState } from "react";
import {useParams, useHistory} from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, setColorList, getColorList }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const params = useParams();
  const {push} = useHistory();


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    axiosWithAuth().put(`http://localhost:5000/api/colors/${params.id}`, colorToEdit)
    .then(() => {
      getColorList();
      push(`/protected`);
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
          console.log(colors)
          console.log(color.id)
          // returns a new array of bubbles with the deleted color removed
          const newColors = colors.filter(bubble => {
            console.log(bubble)
           return( `${bubble.id}` !== color.id)
          });
          setColorList(newColors);

          console.log(colors)
        // const newItems = props.items.filter(v => `${v.id}` !== res.data)
        // props.setItems(newItems)
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
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
