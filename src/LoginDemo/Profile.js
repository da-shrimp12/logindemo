import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDTO: "",
    };
  }

  componentDidMount(){
    this.loadDataProfile();
  }

  loadDataProfile = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"))

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/Demo/account-controller/getAccountById?id=?}",requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
        throw Error(response.status)
    })
    .then(result => {
        console.log(result)
        this.setState({user: result})
    })
    .catch(error => {
        console.log('error',error)
        this.logout();
    });

  }

  logout = () =>{
    localStorage.removeItem("accessToken")
    this.props.onLogoutSuccess();
  }

  render(){
    return <div>
        <div>AccountID: {this.state.profileDTO.acc_id}</div>
        <div>First Name: {this.state.profileDTO.firstname}</div>
        <div>Last Name: {this.state.profileDTO.lastname}</div>
        <div>Age: {this.state.profileDTO.age}</div>
        <div>Full Name: {this.state.profileDTO.firstname} {this.state.profileDTO.lastname} </div>
        <button type="button" onClick={this.logout}>Logout</button>
    </div>
  }

}
