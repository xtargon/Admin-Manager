import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';
import $ from 'jquery'
const cookies = new Cookies()

export default class Configs extends Component {
  constructor(props) {
    super(props)
    this.message1 = '';
    this.message2 = '';
    this.message3 = '';
    this.message4 = '';
    this.depo = '';
    this.trans = '';
    this.id = ''

    this.onChangeMessage1 = this.onChangeMessage1.bind(this);
    this.onChangeMessage2 = this.onChangeMessage2.bind(this);
    this.onChangeMessage3 = this.onChangeMessage3.bind(this);
    this.onChangeMessage4 = this.onChangeMessage4.bind(this);

    this.onChangDepo = this.onChangDepo.bind(this);
    this.onChangTrans = this.onChangTrans.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://'+window.location.host+':4000/students/config/', {
      headers: {
        authorization: 'Bearer '+cookies.get('token')
      }
    })
      .then(res => {

      this.message1 = res.data[0].menssage1;
      this.message2 = res.data[0].menssage2;
      this.message3 = res.data[0].menssage3;
      this.message4 = res.data[0].menssage4;
      this.depo = res.data[0].depo;
      this.trans = res.data[0].trans;
      this.id = res.data[0]._id

      $('#menssage1').val(this.message1)
      $('#menssage2').val(this.message2)
      $('#menssage3').val(this.message3)
      $('#menssage4').val(this.message4)
      $('#depo').val(this.depo)
      $('#trans').val(this.trans)

      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeMessage1(e) {
    this.message1 = e.target.value;
    $('#menssage1').val(this.message1)
  }  
  onChangeMessage2(e) {
    this.message2 = e.target.value;
    $('#menssage2').val(this.message2)
  }
  onChangeMessage3(e) {
    this.message3 = e.target.value;
    $('#menssage3').val(this.message3)
  }
  onChangeMessage4(e) {
    this.message4 = e.target.value;
    $('#menssage4').val(this.message4)
  }
  onChangDepo(e) {
    this.depo = e.target.value;
    $('#depo').val(this.depo)
  }
  onChangTrans(e) {
    this.trans = e.target.value;
    $('#trans').val(this.trans)
  }

  onSubmit(e){
  	var jsonService = {
      menssage1: this.message1,
      menssage2: this.message2,
      menssage3: this.message3,
      menssage4: this.message4,
      depo: this.depo,
      trans: this.trans,
      id: this.id
  	}

    axios.put('http://'+window.location.host+':4000/students/update-config', jsonService)
      .then((res) => {
        console.log('service successfully updated')
        //this.props.history.push('/dashboard')
      }).catch((error) => {
        console.log(error)
        alert('Ha ocurrido un error :(')
      })

      console.log(jsonService)

    // Redirect to Student List 	
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      	<h3>Configuraci??n ???</h3>
        <Form.Group controlId="Name">
          <Form.Label>Mensaje de bienvenida</Form.Label>
          <Form.Control id="menssage1" type="text" onChange={this.onChangeMessage1}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Mensaje de recordatorio</Form.Label>
          <Form.Control id="menssage2" type="text" onChange={this.onChangeMessage2}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Mensaje de suspencion</Form.Label>
          <Form.Control id="menssage3" type="text" onChange={this.onChangeMessage3}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Mensaje de Cobro</Form.Label>
          <Form.Control id="menssage4" type="text" onChange={this.onChangeMessage4}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Cuenta de Depsitos</Form.Label>
          <Form.Control id="depo" type="text" onChange={this.onChangDepo}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Cuenta de Transferencias</Form.Label>
          <Form.Control id="trans" type="text" onChange={this.onChangTrans}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Configurar Todo!
        </Button>

      </Form>
    </div>);
  }

}
