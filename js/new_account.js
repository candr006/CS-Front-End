'use strict';

class NewAccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  email: '',
		  password1: '',
		  password2:'',
		  err_general:0,
		  err_email: '',
		  err_password1:'',
		  err_password2:'',
		  submitted:0
		};
	  }
	  handleChange= (event) =>{
		let ename = event.target.name;
		let evalue = event.target.value;
		this.setState({[ename]: evalue});
	  }
	  
	  validateSubmit= (event) => {	
		event.preventDefault();
		this.state.err_general=0;
		this.state.submitted=1;
		
		//Create regex for alphanumeric tests
		var email_match= /^[0-9a-zA-Z._]+@[0-9a-zA-Z]+.[0-9a-zA-Z]+/;
		
		//validate Username field
		console.log("Email match: "+email_match.test(this.state.email));
		if(!email_match.test(this.state.email)){
			this.state.err_general=1;
			this.setState({["err_email"]:"Enter a valid email address"});
			console.log("VS: "+this.state.email);
		}else{
			this.setState({["err_email"]:""});
		}
		
		
		
		
		//Validate password fields
		var atleast1num= /\d/
		var atleast1specialchar=/[~!@#$%^&*]+/;
		
		

		var pwd_len=this.state.password1.length;
		console.log("Password length: "+pwd_len);
		if(!(pwd_len>7)){
			this.state.err_general=1;
			this.setState({["err_password1"]:"Your password must be at least 8 characters long"});
			console.log("Err Password1: "+this.state.err_password1);
		}else{
			if(!(atleast1num.test(this.state.password1)) && !(atleast1specialchar.test(this.state.password1))){
				this.state.err_general=1;
				this.setState({["err_password1"]:"Your password must contain at least 1 number OR special character: ~!@#$%^&*"});
			}else if (!(this.state.password1==this.state.password2)){
				this.state.err_general=1;
				this.setState({["err_password2"]:"Password fields must match"});
				this.setState({["err_password1"]:"Password fields must match"});
			}else{
				this.setState({["err_password1"]:""});
				this.setState({["err_password2"]:""});
			}
		}

	}
		
	  render() {
	  	return(
			<form onSubmit={this.validateSubmit} class="col-lg-8 offset-lg-3 ">
				{this.state.err_general > 0 ? (
					<div class="alert alert-danger" role="alert">Please correct the errors below</div>
					): null }
					
				{((this.state.err_general < 1)&&(this.state.submitted>0)) ? (
					<div class="alert alert-success" role="alert">Success! Your new account has been created</div>
					): null }
					
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="email">Username </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="email" name="email" onChange={this.handleChange} placeholder="Enter a valid email address" required />
						<div class="text-danger"><small>{this.state.err_email}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="password1">Password </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="password1" name="password1" onChange={this.handleChange} placeholder="Must include at least 8 characters and one number or special character: ~!@#$%^&*" required/>
						<div class="text-danger"><small>{this.state.err_password1}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="password2">Re-Enter Password </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="password2" name="password2" onChange={this.handleChange} placeholder="This value must match the password field" required/>
						<div class="text-danger"><small>{this.state.err_password2}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<div class="col-sm-9">
					<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
			);
		}
	}

	ReactDOM.render(<NewAccountForm />, document.getElementById('form_card_body'));