import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default class List extends Component {
    constructor()
  {
    super()
    this.state = {
      listCustomer:[]
    }
  }

  componentDidMount()
  {
    axios.get("http://localhost:8080/api/customer/list")
    .then(response=>{
      console.log(response.data);
      this.setState({listCustomer:response.data.data})
    })
    .catch(error=>{
      alert("Error ==>"+error)
    })
  }

  render() {
    return (
      <section>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo Electrónico</th>
              <th scope="col">Constraseña</th>
              <th scope="col">Fecha Creación</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.listCustomer.map((data,i)=>{
                return(
                  <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.nombre}</td>
                    <td>{data.correo_electronico}</td>
                    <td>{data.contraseña}</td>
                    <td>{data.fecha_creacion}</td>
                    <td>
                      <Link class="btn btn-outline-info" to={"/customer/edit/"+data.id}>Edit</Link>
                      <a onClick={()=>this.onClickDelete(i,data.id)} href="#" class="btn btn-danger"> Delete </a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    )
  }
  onClickDelete(i,id){
    var yes = confirm("are you sure to delete this item?");
    if (yes == true) {
      const urlDelete = "http://localhost:8080/api/customer/delete/"+id
      axios.delete(urlDelete)
      .then((response)=>{
        const res = response.data
        if (res.success) {
          alert(res.message)
          const list = this.state.listCustomer
          list.splice(i,1)
          this.setState({listCustomer:list})
        }
      })
      .catch(error=>{
        alert("Error ==> "+error)
      })
    }
  }
}