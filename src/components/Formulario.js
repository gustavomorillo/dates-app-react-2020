import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  const [error, actualizarError] = useState(false);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const submitCita = e => {
    e.preventDefault();

    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("error");
      actualizarError(true);

      return;
    }
    actualizarError(false);

    //create date
    cita.id = uuidv4();
    crearCita(cita);

    // reset form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });

    console.log("enviando form");
  };

  return (
    <Fragment>
      {error ? <p className="alerta-error">An error occur, please check the fields</p> : null}

      <h2>Create date</h2>

      <form onSubmit={submitCita}>
        <label>Pet's Name</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Pet's Name"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Pet Owner</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Pet Owner"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Date</label>
        <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />

        <label>Time</label>
        <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />

        <label>Syntoms</label>
        <textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas}></textarea>

        <button type="submit" className="u-full-width button-primary">
          Add Date
        </button>
      </form>
    </Fragment>
  );
};
Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
};
export default Formulario;
