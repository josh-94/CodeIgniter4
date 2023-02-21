import React, { Component } from 'react';
import axios from "axios";

export default class Form extends Component {

    constructor(){
        super();
        this.state = {
          fieldnombre:"",
          fieldcorreo_electronico:"",
          fieldcontraseña:""
        }
      }

  render() {
    return (
      <div>
        <h4>Crear Usuario</h4>
        <hr/>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre {this.state.fieldnombre}</label>
            <input type="text" class="form-control" placeholder="Nombre"
            value={this.state.fieldnombre}
            onChange={(value)=> this.setState({fieldnombre:value.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="email">Correo Electrónico</label>
	          <input type="email" class="form-control" placeholder="usted@ejemplo.com" 
              value={this.state.fieldcorreo_electronico}
              onChange={(value)=> this.setState({fieldcorreo_electronico:value.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Constraseña</label>
	          <input type="text" class="form-control"
              value={this.state.fieldcontraseña}
              onChange={(value)=> this.setState({fieldcontraseña:value.target.value})}/>
          </div>
        </div>
				<div class="row">
					<div class="col-md-6 mb-3">
                    <button class="btn btn-primary btn-block" type="submit" onClick={()=>this.onClickSave()}>Save</button>
					</div>
				</div>
      </div>
    )
  }

  onClickSave()
  {
    const baseUrl = "http://localhost:8080/api/customer/create"

    const datapost = {
      nombre : this.state.fieldnombre,
      correo_electronico : this.state.fieldcorreo_electronico,
      contraseña : this.state.fieldcontraseña
    }

    console.log(datapost);

    axios.post(baseUrl,datapost)
    .then(response=>{
      alert(response.data.message)
    }).catch(error=>{
      alert("Error 500 "+error)
    })
    }
}