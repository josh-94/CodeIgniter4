import React, { Component } from 'react';
import axios from "axios";


export default class Edit extends Component {

    constructor(){
        super()
        this.state = {
          id:0,
          fieldnombre:"",
          fieldcorreo_electronico:"",
          fieldcontraseña:""
        }
      }

      componentDidMount()
  {
    let userId = this.props.match.params.id;
    axios.get("http://localhost:8080/api/customer/get/"+userId)
    .then(response=>{
      const res = response.data
      if (res.success) {
        console.log("Customer ");
        console.log(res.data);
        this.setState({
          id: res.data.id,
          fieldnombre:res.data.nombre,
          fieldcorreo_electronico:res.data.correo_electronico,
          fieldcontraseña:res.data.contraseña
        })
      }
    })
    .catch(error=>{
      alert("Error ==>"+error)
    })
  }

  render() {

    // for get params id from url route
    let userId = this.props.match.params.id;

    return (
      <div>
        <h4>Editar Usuario {this.state.id} </h4>
        <hr />
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Nombre {this.state.fieldnombre}</label>
            <input type="text" class="form-control" placeholder="Name"
              value={this.state.fieldnombre}
              onChange={(value)=>this.setState({fieldnombre:value.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="email">Correo Electrónico</label>
                        <input type="email" class="form-control" placeholder="you@example.com"
            value={this.state.fieldcorreo_electronico}
            onChange={(value)=>this.setState({fieldcorreo_electronico:value.target.value})}/>
          </div>
        </div>

				<div class="row">
          <div class="col-md-6 mb-3">
						<label for="address">Constraseña</label>
                        <input type="text" class="form-control"
            value={this.state.fieldcontraseña}
            onChange={(value)=>this.setState({fieldcontraseña:value.target.value})}/>
          </div>
        </div>
				<div class="row">
					<div class="col-md-6 mb-3">
                    <button onClick={()=>this.onClickUpdate()} class="btn btn-primary btn-block" type="submit">Save</button>
					</div>
				</div>
      </div>
    )
  }

  onClickUpdate()
  {
    const id = this.state.id
    const baseUrl = "http://localhost:8080/api/customer/update/"+id

    const datapost = {
      nombre: this.state.fieldnombre,
      correo_electronico: this.state.fieldcorreo_electronico,
      contraseña: this.state.fieldcontraseña
    }
 
    axios.put(baseUrl,datapost)
    .then(response=>{
        console.log(response);
      alert(response.data.message)
    })
    .catch(error=>{
      alert("Error 500 "+error)
    })
  }
}
