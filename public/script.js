let selectTag = document.getElementById('type');

let intake =`<div class="col-md-4 mb-2">
              <label for="description">Description of Food</label>
              <input type="text" class="form-control" id="description" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid description is required.
              </div>
            </div>
          <div class="col-md-4 mb-2">
            <label for="amount">Calories consumed</label>
            <input type="number" class="form-control" id="amount" placeholder="0" required>
            <div class="invalid-feedback">
              Please enter a valid number.
            </div>
          </div>`

let loss =`<div class="col-md-4 mb-2">
              <label for="description">Description of Activity</label>
              <input type="text" class="form-control" id="description" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid description is required.
              </div>
            </div>
          <div class="col-md-4 mb-2">
            <label for="amount">Calories Lost</label>
            <input type="number" class="form-control" id="amount" placeholder="0" required>
            <div class="invalid-feedback">
              Please enter a valid number.
            </div>
          </div>`





const showAppropriateOptions = e => {
  document.getElementById('intakeOrLoss').innerHTML = ``;
  if(e.target.value == "Intake"){
    $('#intakeOrLoss').append(intake);
  }
  else if(e.target.value == "Loss"){
     $('#intakeOrLoss').append(loss);
  }
}




selectTag.addEventListener('change', showAppropriateOptions)

