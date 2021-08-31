'use strict';

class PreApprovalForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  investment_amount: null,
		  investment_type: '',
		  total_net_worth:null,
		  estimated_yearly_income: null,
		  estimated_credit_score: null,
		  err_general:0,
		  err_investment_amount: '',
		  err_investment_type:'',
		  err_total_net_worth:'',
		  err_estimated_yearly_income:'',
		  err_estimated_credit_score:''
		};
	  }
	  
     
   //This function will return 200 when approved and 'D' when disqualified
	  mock_fetch(url,params){

		 return new Promise(function(resolve,reject){
		    setTimeout(function(){

		  	var status=200;
		  	var fifth_of_yearly_income=(params.estimated_yearly_income/5);
		  	var three_per_net_worth=(params.total_net_worth*.03);
		  	var message='Approved';

		  	if(params.investment_amount>9000000){
		  		//bad request
		  		status=400;
		  		message='Bad Request';

		  	}

		  	//if the investment amount is greater than 1/5 of the yearly income, disqualify
		  	else if(params.investment_amount>fifth_of_yearly_income){
		  		//forbidden status
		  		status=403;
		  		message='Disqualified';
		  	}

		  	//if the estimated credit score is less than 600, disqualify
		  	else if(params.estimated_credit_score<600){
		  		//forbidden status
		  		status=403;
		  		message='Disqualified';
		  	}

		  	//if investment amount is more than 3% net worth, disqualify
		  	else if(params.investment_amount > three_per_net_worth){
		  		//forbidden status
		  		status=403;
		  		message='Disqualified';
		  	}

		  
		  	resolve({'status' : status});
		    },20)
		  });
        
        
	  }
	  
	  
	  investmentApprovalAPI(data) {
  	   //mock_fetch simulates a fetch()
  		return this.mock_fetch('api/mock_url', data)
          .then(function (response) {
          		console.log("Response: "+response.status);
          		//if approved, send user to new account page
          		if(response.status==200){
          			window.location.replace('views/new_account.html');
          		}
				else if(response.status==400){
					alert("Error 400: Bad Request");
				}
          		//if disqualified, send user to disqualification page
          		else{
					window.location.replace('views/results.html');
          		}
              });
		}
		
		

	  
	  //update state of each prop as it is changed
	  handleChange= (event) =>{
		let ename = event.target.name;
		let evalue = event.target.value;
		this.setState({[ename]: evalue});
	  }
	  
	  validateSubmit= (event) => {	
		event.preventDefault();
		this.state.err_general=0;
		
		//Create regex for alphanumeric tests
		var alphanumeric_match= /^[0-9a-zA-Z]+$/;
		
		//validate Investment Amount field
		if(!Number(this.state.investment_amount)){
			this.state.err_general=1;
			this.setState({["err_investment_amount"]:"This field can only contain numbers"});
		}else{
			this.setState({["err_investment_amount"]:""});
		}
		
		//validate Investment Type field
		if(!alphanumeric_match.test(this.state.investment_type)){
			this.state.err_general=1;
			this.setState({["err_investment_type"]:"This field can only contain alphanumeric characters (A-Z, 0-9)"});
			console.log("VS: "+this.state.investment_type);
		}else{
			this.setState({["err_investment_type"]:""});
		}
		
		
		//validate Total Net Worth field
		if(!Number(this.state.total_net_worth)){
			this.state.err_general=1;
			this.setState({["err_total_net_worth"]:"This field can only contain numbers"});
		}else{
			this.setState({["err_total_net_worth"]:""});
		}
		
		//validate User Estimated Yearly Income
		if(!Number(this.state.estimated_yearly_income)){
			this.state.err_general=1;
			this.setState({["err_estimated_yearly_income"]:"This field can only contain numbers"});
		}else{
			this.setState({["err_estimated_yearly_income"]:""});
		}
		
		//Validate Credit Score
		if(!Number(this.state.estimated_credit_score)){
			this.state.err_general=1;
			this.setState({["err_estimated_credit_score"]:"This field can only contain numbers"});
		}else{
			if(this.state.estimated_credit_score<300 || this.state.estimated_credit_score>850){
				this.state.err_general=1;
				this.setState({["err_estimated_credit_score"]:"Enter a valid credit score between 300 and 850"});
			}else{
				this.setState({["err_estimated_credit_score"]:""});
			}
		}
		
		if(this.state.err_general<1){
			this.investmentApprovalAPI(this.state);		
		}
		
		
	  }
	  render() {
	  	return(
			<form onSubmit={this.validateSubmit} class="col-lg-8 offset-lg-3 ">
				{this.state.err_general > 0 ? (
					<div class="alert alert-danger" role="alert">Please correct the errors below</div>
					): null }
					
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="investmentAmount">Investment Amount </label>
					<div class="col-sm-9">
						<input type="text" class="form-control is-invalid" id="investmentAmount" name="investment_amount" onChange={this.handleChange} placeholder="Ex: 25000" required />
						<div class="text-danger"><small>{this.state.err_investment_amount}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="investmentType">Investment Type </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="investmentType" name="investment_type" onChange={this.handleChange} placeholder="Investment Type" required/>
						<div class="text-danger"><small>{this.state.err_investment_type}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="totalNetWorth">Total Net Worth </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="totalNetWorth" name="total_net_worth" onChange={this.handleChange} placeholder="Ex: 1000000" required />
						<div class="text-danger"><small>{this.state.err_total_net_worth}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="estimatedYearlyIncome">User Estimated Yearly Income </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="estimatedYearlyIncome" name="estimated_yearly_income" onChange={this.handleChange} placeholder="Ex: 1000000" required />
						<div class="text-danger"><small>{this.state.err_estimated_yearly_income}</small></div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-sm-6 col-form-label required_label" for="estimatedCreditScore">User Estimated Credit Score </label>
					<div class="col-sm-9">
						<input type="text" class="form-control" id="estimatedCreditScore" name="estimated_credit_score" onChange={this.handleChange} placeholder="Ex: 1000000" required />
						<div class="text-danger"><small>{this.state.err_estimated_credit_score}</small></div>
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

	ReactDOM.render(<PreApprovalForm />, document.getElementById('form_card_body'));