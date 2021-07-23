// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  //recaptcha code start
  grecaptcha.ready(function(){

    window.addEventListener('load', function () {
      // Set up FeathersJS app
      var app = feathers();

      // Set up REST client
      var restClient = feathers.rest();

      // Configure an AJAX library with that client
      app.configure(restClient.fetch(window.fetch));

      // Connect to the `inputs` service
      const inputs = app.service('project');

      // Adds a signup row to the table
      const addSignup = signup =>{
        $('#inputs > tbody').append(
          `<tr>
            <td>${signup.type}</td>
            <td>${signup.description}</td>
            <td>${signup.amount}</td>
            <td><button type="button" class="btn btn-danger">Delete</button></td>
          </tr>`
        );
        $('#inputs tbody tr:last-child button').click( e => {
          inputs
          .remove( signup._id )
          .then( () => {
            $( e.target ).parent().parent().remove();
          });
          showinputs(inputs);
        });
      };

      // Shows the inputs
      const showinputs = async inputservice => {

        // Find the latest 25 inputs. They will come with the newest first
        const inputs = await inputservice.find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 25
          }
        });
        $('#inputs > tbody').html('');
        inputs.data.reverse().forEach(addSignup);

        //adding the total into the webpage
        let total= 0;
        $('#total').html('');
        inputs.data.forEach( e => {
          if(e.type == "Intake")
            total += e.amount;
          else
            total -= e.amount;
          });
          if(total >= 0){
            $('#total').append(capitalEveryFirstLetter("Total calories gained today: "))
          }else{
            $('#total').append(capitalEveryFirstLetter("Total calories lost today: "))
          }
          $('#total').append(Math.abs(total));
        };

      // Show existing inputs in the table
      showinputs(inputs);

      let capitalEveryFirstLetter = (input) => {
        let result = "";
        for(let i = 0; i < input.length; i++){
          if(i == 0 || input.charAt(i-1) == " ")
            result+=input.charAt(i).toUpperCase();
          else
            result+=input.charAt(i);
        }
        return result
      }

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');




      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (form.checkValidity()) {
            //checking with recaptha to see if all works
            grecaptcha.execute('6LfesqAaAAAAANMx5rkIZjWRQYP1PGtnaz-u1bfp', {action: 'signup'}).then(function(token){
              console.log('creating');
              inputs.create({
                type: $('#type').val(),
                description: capitalEveryFirstLetter($('#description').val()),
                amount: $('#amount').val(),
                token: token
              }).then(function(signup){
                addSignup(signup);
                $('#captchaMessage').addClass('d-none');
                form.classList.remove('was-validated');
                form.reset();
                showinputs(inputs);
              })
              .catch(function(){
                $('#captchaMessage').removeClass('d-none');
              });

            });
              console.log("successful signup");

          } else {
            form.classList.add('was-validated');
          }

        }, false);
      });

      //clear button functionality
      $('#clear').click(async() =>{
      const signs = await inputs.find();
      const inputss = app.service('project');
        signs.data.reverse().forEach(e => {
          inputss.remove(e._id)
        })

        showinputs(inputs);
      })

    });

  }, false);
}());
