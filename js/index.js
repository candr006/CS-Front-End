'use strict';

//const e = React.createElement;

	
class preApprovalForm extends React.Component {
	
  constructor(props) {
	  console.log('HERE1');
		super(props);
	}

  render() {
   // if (this.state.liked) {
   //   return 'Hello world.';
  //  }
  console.log('HERE2');
    return (<Form />);
		//index form
			
		/*<form class="col-lg-8 offset-lg-3 ">
			<div class="form-group row">
				<label class="col-sm-6 col-form-label required_label" for="investmentAmount">Investment Amount </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="investmentAmount" placeholder="Ex: 25000" required>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-sm-6 col-form-label required_label" for="investmentType">Investment Type </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="investmentType" placeholder="Investment Type" required>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-sm-6 col-form-label required_label" for="totalNetWorth">Total Net Worth </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="totalNetWorth" placeholder="Ex: 1000000" required>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-sm-6 col-form-label required_label" for="estimatedYearlyIncome">User Estimated Yearly Income </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="estimatedYearlyIncome" placeholder="Ex: 1000000" required>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-sm-6 col-form-label required_label" for="estimatedCreditScore">User Estimated Credit Score </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="estimatedCreditScore" placeholder="Ex: 1000000" required>
				</div>
			</div>
			<div class="form-group row">
				<div class="col-sm-9">
				<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>*/

    //);
  }
}


//const domContainer = document.querySelector('#form_card_body');
/*ReactDOM.render((preApprovalForm), domContainer);*/
ReactDOM.render(<preApprovalForm />, document.querySelector('#form_card_body'));